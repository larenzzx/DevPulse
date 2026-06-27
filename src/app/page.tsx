"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { marked } from "marked";
import { toast } from "sonner";
import {
  Terminal as TerminalIcon,
  BookOpen,
  ListTodo,
  Trophy,
  RotateCcw,
  Play,
  Eye,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Check,
  Code
} from "lucide-react";

import { DevPulseModules, ModuleData } from "@/lib/modulesData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"tutorial" | "activity" | "challenge">("tutorial");
  const [progress, setProgress] = useState<Record<number, { activity: boolean; challenge: boolean }>>({});
  const [editorCode, setEditorCode] = useState<string>("");
  const [consoleLogs, setConsoleLogs] = useState<{ type: string; message: string }[]>([]);
  const [outputTab, setOutputTab] = useState<"preview" | "console">("preview");
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [lockModalTargetId, setLockModalTargetId] = useState<number | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Find active module metadata
  const activeModule = DevPulseModules.find(m => m.id === activeModuleId) || DevPulseModules[0];

  // 1. Client-only Mounting initialization
  useEffect(() => {
    setMounted(true);

    // Hydrate state from localStorage
    const savedActiveModule = localStorage.getItem("devpulse_active_module");
    if (savedActiveModule) {
      setActiveModuleId(parseInt(savedActiveModule));
    }

    const savedActiveTab = localStorage.getItem("devpulse_active_tab");
    if (savedActiveTab) {
      setActiveTab(savedActiveTab as any);
    }

    const savedProgress = localStorage.getItem("devpulse_progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // 2. Window messaging system for same-origin iframe sandbox capture
  useEffect(() => {
    if (!mounted) return;

    (window as any).onSandboxConsole = (type: string, message: string) => {
      setConsoleLogs(prev => [...prev, { type, message }]);
    };

    (window as any).onSandboxFetch = (method: string, url: string) => {
      setConsoleLogs(prev => [...prev, { type: "info", message: `🌐 [Fetch Call] ${method} -> ${url}` }]);
    };

    (window as any).onSandboxFetchResponse = (method: string, url: string, status: number, statusText: string) => {
      const isSuccess = status >= 200 && status < 300;
      const logType = isSuccess ? "success" : status >= 400 ? "error" : "warn";
      const icon = isSuccess ? "✅" : "❌";
      setConsoleLogs(prev => [
        ...prev,
        { type: logType, message: `📥 [HTTP Response] ${icon} ${status} ${statusText} (${method} -> ${url})` }
      ]);
    };

    return () => {
      delete (window as any).onSandboxConsole;
      delete (window as any).onSandboxFetch;
      delete (window as any).onSandboxFetchResponse;
    };
  }, [mounted]);

  // 3. Scroll to bottom of terminal console on new logs
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  // 4. Update editor contents when module or tab changes
  useEffect(() => {
    if (!mounted) return;

    if (activeTab === "tutorial") {
      setEditorCode(activeModule.exampleCode);
    } else {
      const saved = localStorage.getItem(`devpulse_code_${activeModule.id}_${activeTab}`);
      if (saved !== null) {
        setEditorCode(saved);
      } else {
        setEditorCode(activeTab === "activity" ? activeModule.activityStarter : "");
      }
    }

    // Set default output views
    if (activeModule.stage === "javascript") {
      setOutputTab("console");
    } else {
      setOutputTab("preview");
    }
  }, [activeModuleId, activeTab, mounted]);

  // Prevent loading state flashes during server-client reconciliations
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <TerminalIcon className="w-12 h-12 text-primary animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  // Helper check status functions
  const isModuleUnlocked = (modId: number) => {
    return true;
  };

  const isModuleComplete = (modId: number) => {
    const prog = progress[modId];
    return prog && prog.activity && prog.challenge;
  };

  // Navigations triggers
  const handleSelectModule = (mod: ModuleData) => {
    setActiveModuleId(mod.id);
    localStorage.setItem("devpulse_active_module", String(mod.id));
  };

  const handleTabChange = (tab: "tutorial" | "activity" | "challenge") => {
    setActiveTab(tab);
    localStorage.setItem("devpulse_active_tab", tab);
  };

  const handleCodeChange = (val: string) => {
    setEditorCode(val);
    if (activeTab !== "tutorial") {
      localStorage.setItem(`devpulse_code_${activeModule.id}_${activeTab}`, val);
    }
  };

  const handleResetCode = () => {
    if (activeTab === "tutorial") return;
    if (confirm("Reset current editor contents back to starter template?")) {
      const codeVal = activeTab === "activity" ? activeModule.activityStarter : "";
      handleCodeChange(codeVal);
      localStorage.removeItem(`devpulse_code_${activeModule.id}_${activeTab}`);
      toast.info("Workspace editor reset completed.");
    }
  };

  // Core assertion and execution compiler logic
  const handleRunCode = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    setConsoleLogs([]);
    addTerminalLine("Executing code environment...", "system");

    const isPython = activeModule.title.toLowerCase().includes("python");

    // JS compiler sandbox structure
    if (activeModule.stage === "javascript" && !isPython) {
      setOutputTab("console");

      const userJsEscaped = editorCode.replace(/<\/script>/g, '<\\/script>');
      const srcdocContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <script>
            window.logs = [];
            window.fetchCalls = [];
            
            const captureLog = (type, ...args) => {
              const msg = args.map(arg => {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'object') {
                  try { return JSON.stringify(arg); } catch(e) { return '[Object]'; }
                }
                return String(arg);
              }).join(' ');
              window.logs.push({ type, message: msg });
              
              if (window.parent.onSandboxConsole) {
                window.parent.onSandboxConsole(type, msg);
              }
            };
            
            console.log = (...args) => captureLog('log', ...args);
            console.error = (...args) => captureLog('error', ...args);
            console.warn = (...args) => captureLog('warn', ...args);
            console.info = (...args) => captureLog('info', ...args);

            window.onerror = (message, source, lineno, colno, error) => {
              captureLog('error', message);
              return true;
            };

            const originalFetch = window.fetch;
            window.fetch = async (input, init) => {
              const url = typeof input === 'string' ? input : input.url;
              const method = (init && init.method) ? init.method.toUpperCase() : 'GET';
              const headers = (init && init.headers) ? init.headers : {};
              const body = (init && init.body) ? init.body : null;
              window.fetchCalls.push({ url, method, headers, body });
              
              if (window.parent.onSandboxFetch) {
                window.parent.onSandboxFetch(method, url);
              }
              
              try {
                const response = await originalFetch(input, init);
                if (window.parent.onSandboxFetchResponse) {
                  window.parent.onSandboxFetchResponse(method, url, response.status, response.statusText || 'OK');
                }
                return response;
              } catch(err) {
                captureLog('error', 'Fetch failed: ' + err.message);
                throw err;
              }
            };
          </script>
          <script>
            (async () => {
              try {
                ${userJsEscaped}
              } catch(err) {
                console.error(err.message);
              }
            })();
          </script>
        </body>
        </html>
      `;

      iframe.srcdoc = srcdocContent;
      // Wait for network compilations
      await new Promise(r => setTimeout(r, 1000));
    } else if (isPython) {
      setOutputTab("console");
      addTerminalLine("🐍 [Python Virtual Environment] Initializing...", "info");
      addTerminalLine("🐍 [Python] Parsing source file: main.py", "info");
      addTerminalLine("🐍 [Python] Running environment simulation...", "info");
      await new Promise(r => setTimeout(r, 800));
    } else {
      // HTML/CSS Sandbox
      setOutputTab("preview");

      let fullContent = editorCode;
      if (!/<!doctype\s+html>/i.test(editorCode)) {
        fullContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
              ${editorCode}
            </body>
          </html>
        `;
      }

      iframe.srcdoc = fullContent;
      await new Promise(r => setTimeout(r, 300));
    }

    addTerminalLine("Sandbox run completed. Validating criteria...", "system");

    // Execute validation functions
    if (activeTab !== "tutorial") {
      const logs = (iframe.contentWindow as any)?.logs || [];
      const fetchCalls = (iframe.contentWindow as any)?.fetchCalls || [];

      let validationResult = { passed: false, message: "❌ Validation failed to execute." };

      // Preprocess user code to convert 'const' and 'let' declarations to 'var' at evaluation time.
      // This ensures they are properly attached to the iframe's global window scope so that
      // assertion validations (which check properties on `iframe.contentWindow`) can find them.
      const processedCode = editorCode
        .replace(/\bconst\s+/g, 'var ')
        .replace(/\blet\s+/g, 'var ');

      try {
        if (activeTab === "activity") {
          validationResult = await activeModule.activityValidation(processedCode, iframe, logs, fetchCalls);
        } else if (activeTab === "challenge") {
          validationResult = await activeModule.challengeValidation(processedCode, iframe, logs, fetchCalls);
        }
      } catch (err: any) {
        validationResult = { passed: false, message: "❌ Assertion Error during compile: " + err.message };
      }

      if (validationResult.passed) {
        addTerminalLine(validationResult.message, "success");
        markComplete(activeModuleId, activeTab);
        toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} completed successfully!`);
      } else {
        addTerminalLine(validationResult.message, "error");
        toast.error(`Criteria validation failed. Review the console logs!`);
      }
    } else {
      addTerminalLine("Example script parsed and rendered output successfully.", "success");
    }
  };

  const markComplete = (moduleId: number, tab: "activity" | "challenge") => {
    const updated = {
      ...progress,
      [moduleId]: {
        ...(progress[moduleId] || { activity: false, challenge: false }),
        [tab]: true
      }
    };
    setProgress(updated);
    localStorage.setItem("devpulse_progress", JSON.stringify(updated));

    // Display completion event toast
    if (updated[moduleId].activity && updated[moduleId].challenge) {
      toast.success(`Module ${moduleId} Completed!`, {
        description: `You have successfully solved all the criteria for "${DevPulseModules.find(m => m.id === moduleId)?.title}".`
      });
    }
  };

  const addTerminalLine = (msg: string, type: string) => {
    setConsoleLogs(prev => [...prev, { type, message: msg }]);
  };

  // Progress metrics calculations
  const totalModules = DevPulseModules.length;
  let completedCount = 0;
  for (let i = 1; i <= totalModules; i++) {
    if (isModuleComplete(i)) completedCount++;
  }
  const completionPercentage = Math.round((completedCount / totalModules) * 100);

  // Markdown parsing helper
  const renderMarkdown = (text: string) => {
    // Strip "Why this matters" or "Why it matters" so it doesn't double render in the main text block
    const parts = text.split(/### Why (?:this|it) matters/i);
    const contentToParse = parts[0];
    return { __html: marked.parse(contentToParse) as string };
  };

  const extractWhyMatters = (text: string) => {
    const split = text.split(/### Why this matters/i);
    if (split.length > 1) return split[1].trim();
    const split2 = text.split(/### Why it matters/i);
    if (split2.length > 1) return split2[1].trim();
    return "Mastering this concept lays down foundation tiles for more complex API integrations.";
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-background">
      {/* App Header */}
      <header className="flex justify-between items-center bg-card border-b border-border px-6 py-3 shadow-lg z-50">
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-emerald-400" />
            DevPulse
          </h1>
          <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Elevate your skills. Master the Web.</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-4 min-w-[320px]">
          <div className="flex flex-col items-end text-xs font-semibold min-w-[80px]">
            <span className="text-slate-400">
              Complete: <span className="text-emerald-400 font-bold">{completedCount}/{totalModules} ({completionPercentage}%)</span>
            </span>
          </div>
          <div className="bg-background border border-border rounded-full h-2 w-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Curriculum Navigator */}
        <aside className="w-[300px] bg-card border-r border-border flex flex-col overflow-y-auto p-4 gap-6 select-none scrollbar-thin">
          {[
            { key: "html", label: "Stage 1 — HTML Foundations", color: "text-cyan-400" },
            { key: "css", label: "Stage 2 — CSS Essentials", color: "text-purple-400" },
            { key: "js-fundamentals", label: "Stage 3 — JS Fundamentals & DOM", color: "text-amber-400" },
            { key: "js-api", label: "Stage 4 — Advanced JS & API Mastery", color: "text-emerald-400" }
          ].map(stage => {
            const stageMods = DevPulseModules.filter(m => {
              if (stage.key === "html") return m.stage === "html";
              if (stage.key === "css") return m.stage === "css";
              if (stage.key === "js-fundamentals") return m.stage === "javascript" && m.id >= 11 && m.id <= 19;
              if (stage.key === "js-api") return m.stage === "javascript" && m.id >= 20;
              return false;
            });

            const completedStageCount = stageMods.filter(m => isModuleComplete(m.id)).length;
            const totalStageCount = stageMods.length;

            return (
              <div key={stage.key} className="flex flex-col gap-2 bg-accent/20 p-2.5 rounded-lg border border-border/40">
                <div className="flex justify-between items-center px-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${stage.color}`}>{stage.label}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-accent/60 px-2 py-0.5 rounded border border-border/30">
                    {completedStageCount}/{totalStageCount}
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {stageMods.map(mod => {
                    const isComplete = isModuleComplete(mod.id);
                    const isActive = mod.id === activeModuleId;

                    return (
                      <button
                        key={mod.id}
                        onClick={() => handleSelectModule(mod)}
                        className={`flex items-center text-left p-2.5 rounded-lg border transition-all gap-3 cursor-pointer ${
                          isActive 
                            ? "bg-accent/80 border-primary/20 shadow-inner font-semibold text-emerald-400" 
                            : "bg-transparent border-transparent hover:bg-accent/40 text-slate-300"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isActive ? "border-emerald-400" : "border-slate-500"
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? "bg-emerald-400" : "bg-slate-500"
                              }`} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] uppercase font-bold text-slate-500">Module {mod.id}</span>
                          <span className="text-xs truncate leading-tight">{mod.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        {/* Workspace Central Panels */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* Left panel instructions */}
          <section className="flex-1 max-w-[45%] border-r border-border flex flex-col bg-background overflow-hidden">
            
            {/* Header info */}
            <div className="p-6 border-b border-border flex flex-col gap-2 flex-shrink-0">
              <div className="flex gap-2">
                <span className={`badge uppercase text-[9px] font-bold px-2 py-0.5 rounded ${
                  activeModule.stage === "html" ? "bg-cyan-900/40 text-cyan-400" :
                  activeModule.stage === "css" ? "bg-purple-900/40 text-purple-400" :
                  activeModule.id >= 11 && activeModule.id <= 19 ? "bg-amber-900/40 text-amber-400" :
                  "bg-emerald-900/40 text-emerald-400"
                }`}>{
                  activeModule.stage === "html" ? "HTML" :
                  activeModule.stage === "css" ? "CSS" :
                  activeModule.id >= 11 && activeModule.id <= 19 ? "JS Fundamentals" :
                  "JS API"
                }</span>
                <span className={`badge uppercase text-[9px] font-bold px-2 py-0.5 rounded border ${
                  activeModule.difficulty === "beginner" ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/30" :
                  activeModule.difficulty === "intermediate" ? "bg-amber-950/20 text-amber-400 border-amber-900/30" :
                  "bg-rose-950/20 text-rose-400 border-rose-900/30"
                }`}>{activeModule.difficulty}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{activeModule.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{activeModule.description}</p>
            </div>

            {/* Tab switchers */}
            <nav className="flex bg-card border-b border-border p-1.5 gap-1.5 flex-shrink-0">
              <button
                onClick={() => handleTabChange("tutorial")}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all cursor-pointer ${
                  activeTab === "tutorial" ? "bg-accent text-emerald-400 border border-border/50 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-accent/20"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Tutorial
              </button>
              <button
                onClick={() => handleTabChange("activity")}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all cursor-pointer ${
                  activeTab === "activity" ? "bg-accent text-emerald-400 border border-border/50 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-accent/20"
                } ${progress[activeModule.id]?.activity ? "text-emerald-400 font-bold" : ""}`}
              >
                <ListTodo className="w-3.5 h-3.5" /> Activity
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                  progress[activeModule.id]?.activity 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-slate-900 text-slate-500 border-transparent"
                }`}>{progress[activeModule.id]?.activity ? "1" : "0"}</span>
              </button>
              <button
                onClick={() => handleTabChange("challenge")}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all cursor-pointer ${
                  activeTab === "challenge" ? "bg-accent text-emerald-400 border border-border/50 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-accent/20"
                } ${progress[activeModule.id]?.challenge ? "text-emerald-400 font-bold" : ""}`}
              >
                <Trophy className="w-3.5 h-3.5" /> Challenge
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                  progress[activeModule.id]?.challenge 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-slate-900 text-slate-500 border-transparent"
                }`}>{progress[activeModule.id]?.challenge ? "1" : "0"}</span>
              </button>
            </nav>

            {/* Instruction viewports */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {activeTab === "tutorial" && (
                <div className="tutorial-container tutorial-markdown prose prose-invert max-w-none text-slate-300">
                  <div dangerouslySetInnerHTML={renderMarkdown(activeModule.tutorial)} />
                  <div className="why-matters-box">
                    <h5 className="flex items-center gap-2">
                      <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      Why this matters
                    </h5>
                    <p>{extractWhyMatters(activeModule.tutorial)}</p>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="activity-container tutorial-markdown max-w-none">
                  <div dangerouslySetInnerHTML={renderMarkdown(activeModule.activityDescription)} />
                  
                  <div className="mt-6 border-t border-[#1e293b] pt-6">
                    <div className={`p-4 rounded-lg border flex items-center justify-between gap-4 transition-all duration-300 ${
                      progress[activeModule.id]?.activity
                        ? "bg-emerald-950/25 border-emerald-500/30 text-emerald-400"
                        : "bg-slate-900/40 border-[#1e293b] text-slate-400"
                    }`}>
                      <div className="flex items-center gap-3">
                        {progress[activeModule.id]?.activity ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-200">
                            {progress[activeModule.id]?.activity ? "Activity Complete!" : "Activity Status: In Progress"}
                          </div>
                          <div className="text-xs mt-0.5 text-slate-400">
                            {progress[activeModule.id]?.activity
                              ? "Excellent work! Your code successfully passed all assertion tests."
                              : "Complete the list of objectives above in the editor and click 'Run Code' to check."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "challenge" && (
                <div className="challenge-container tutorial-markdown max-w-none">
                  <div dangerouslySetInnerHTML={renderMarkdown(activeModule.challengeDescription)} />
                  
                  <div className="mt-6 border-t border-[#1e293b] pt-6">
                    <div className={`p-4 rounded-lg border flex items-center justify-between gap-4 transition-all duration-300 ${
                      progress[activeModule.id]?.challenge
                        ? "bg-emerald-950/25 border-emerald-500/30 text-emerald-400"
                        : "bg-slate-900/40 border-[#1e293b] text-slate-400"
                    }`}>
                      <div className="flex items-center gap-3">
                        {progress[activeModule.id]?.challenge ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-200">
                            {progress[activeModule.id]?.challenge ? "Challenge Complete!" : "Challenge Status: In Progress"}
                          </div>
                          <div className="text-xs mt-0.5 text-slate-400">
                            {progress[activeModule.id]?.challenge
                              ? "Incredible job! You have fully mastered this scenario."
                              : "Implement your solution in the editor and click 'Run Code' to validate."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right code editor panel */}
          <section className="flex-1 flex flex-col bg-card overflow-hidden">
            
            {/* Editor Action Controls */}
            <div className="h-12 border-b border-border flex justify-between items-center px-4 flex-shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-slate-500" />
                Workspace Editor
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={handleResetCode}
                  variant="secondary"
                  disabled={activeTab === "tutorial"}
                  className="h-8 text-xs font-semibold px-3 bg-accent border border-border text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset
                </Button>
                <Button
                  onClick={handleRunCode}
                  className="h-8 text-xs font-semibold px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md cursor-pointer transition-all"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  {activeTab === "tutorial" ? "Run Example" : "Run Code"}
                </Button>
              </div>
            </div>

            {/* Monaco Editor Wrapper */}
            <div className="flex-1 relative bg-slate-950">
              <Editor
                height="100%"
                language={activeModule.stage === "html" ? "html" : activeModule.stage === "css" ? "css" : activeModule.title.toLowerCase().includes("python") ? "python" : "javascript"}
                theme="vs-dark"
                value={editorCode}
                onChange={val => handleCodeChange(val || "")}
                options={{
                  readOnly: activeTab === "tutorial",
                  fontSize: 14,
                  fontFamily: "'Fira Code', monospace",
                  minimap: { enabled: false },
                  lineHeight: 20,
                  padding: { top: 12, bottom: 12 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Console Output Sandbox panel */}
            <div className="h-[280px] border-t border-border flex flex-col bg-black flex-shrink-0">
              
              <nav className="flex bg-background border-b border-border px-3">
                <button
                  onClick={() => setOutputTab("preview")}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 border-b-2 cursor-pointer ${
                    outputTab === "preview" ? "border-primary text-slate-100" : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Visual Preview
                </button>
                <button
                  onClick={() => setOutputTab("console")}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 border-b-2 cursor-pointer ${
                    outputTab === "console" ? "border-primary text-slate-100" : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" /> Terminal Console
                </button>
              </nav>

              <div className="flex-1 relative overflow-hidden">
                {/* Iframe View */}
                <div className={`w-full h-full ${outputTab === "preview" ? "block" : "hidden"}`}>
                  <iframe
                     ref={iframeRef}
                     id="sandbox-iframe"
                     title="DevPulse Sandbox"
                     className="w-full h-full border-none bg-white"
                     sandbox="allow-scripts allow-same-origin"
                  />
                </div>

                {/* Console Log view */}
                <div className={`w-full h-full overflow-y-auto p-4 bg-black ${outputTab === "console" ? "block" : "hidden"} scrollbar-thin`}>
                  <div className="terminal-console">
                    {consoleLogs.map((log, index) => (
                      <div key={index} className={`terminal-line ${log.type}`}>
                        {log.message}
                      </div>
                    ))}
                    {consoleLogs.length === 0 && (
                      <div className="terminal-line system text-slate-600">
                        Terminal logs will be displayed here during script execution.
                      </div>
                    )}
                    <div ref={consoleBottomRef} />
                  </div>
                </div>
              </div>

            </div>

          </section>

        </main>

      </div>

      {/* Locked warnings modal dialog */}
      <Dialog open={isLockModalOpen} onOpenChange={setIsLockModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border text-slate-100">
          <DialogHeader className="flex flex-col items-center gap-4 text-center">
            <Lock className="w-12 h-12 text-rose-500 animate-pulse" />
            <DialogTitle className="text-xl font-bold">Module {lockModalTargetId} is Locked!</DialogTitle>
            <DialogDescription className="text-slate-400">
              You need to complete both the <strong>Activity</strong> and the <strong>Mini Challenge</strong> of{" "}
              <strong>Module {(lockModalTargetId ?? 1) - 1}</strong> first to unlock this section.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setIsLockModalOpen(false)} className="bg-primary text-primary-foreground hover:bg-primary/95 cursor-pointer">
              <Check className="w-4 h-4 mr-1.5" /> Acknowledge
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
