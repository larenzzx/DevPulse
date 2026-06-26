# BUILD: WebFundamentals — Interactive Web Dev Learning Platform

## PHASE 0: CODEBASE SCAN & INVENTORY

Before writing a single line of code, scan the entire uploaded/provided codebase and do the following:

1. **Inventory all existing lesson content** — HTML files, CSS notes, JS files, markdown docs, or any structured text that contains tutorial content. Extract:

   - Topic name

   - Key concepts covered

   - Any code examples embedded in them

   - Estimated difficulty level (beginner / intermediate / advanced)

2. **Identify content gaps** — Based on what you find, flag what's missing or incomplete. For JavaScript specifically, the existing content includes REST API, Fetch API, and JSON. Flag these as present and identify what needs to be added.

3. **Generate a lesson map** — Produce a JSON-structured curriculum plan before any UI work begins. Format:

   {

     "module_id": 1,

     "title": "Module Title",

     "stage": "html | css | javascript",

     "status": "has_content | needs_content | partial",

     "source_file": "path/to/source.html or null",

     "concepts": ["concept1", "concept2"],

     "depends_on": [null | module_id]

   }

Output the full lesson map as a comment block at the top of a file called `CURRICULUM_MAP.json` before proceeding.

---

## APP OVERVIEW

**App Name: APIForge**

*Tagline: "Forge your skills. Master the Web."*

Build APIForge — a premium interactive learning platform that teaches HTML, CSS, and JavaScript (with a deep focus on APIs and HTTP) through a sequential, locked curriculum with a live in-browser code sandbox.

Stack: Vanilla HTML + CSS + JavaScript only. No frameworks. No build tools. Must run as a single HTML file or a small bundle of static files with zero backend.

---

## CURRICULUM STRUCTURE

Build exactly this module sequence based on the scanned content + gaps filled in:

### STAGE 1 — HTML Foundations (Modules 1–5)

Extract from scanned HTML lesson files. If partial, complete them.

- M1: HTML Document Structure & Boilerplate

- M2: Text, Headings, Lists, Links

- M3: Forms & Input Elements

- M4: Semantic HTML & Accessibility

- M5: Tables, Media, Embeds

### STAGE 2 — CSS Essentials (Modules 6–10)

Extract from scanned CSS lesson files.

- M6: Selectors, Properties, Cascade

- M7: Box Model & Layout Basics

- M8: Flexbox

- M9: CSS Grid

- M10: Responsive Design & Media Queries

### STAGE 3 — JavaScript & API Mastery (Modules 11–16)

Pull from existing JS files (REST API, Fetch API, JSON content already present).

Fill in missing modules with full lesson content:

- M11: JSON — Structure, Parse, Stringify

- M12: HTTP Fundamentals — Methods (GET, POST, PUT, DELETE, PATCH), Status Codes, Headers

- M13: Fetch API — Making Requests, Promises, async/await

- M14: REST API Concepts — Endpoints, Resources, RESTful Design

- M15: Authentication — API Keys, Bearer Tokens, Basic Auth, OAuth flow (conceptual)

- M16: Real-World API Project — Chain GET → POST → PUT → DELETE against a mock API (use jsonplaceholder.typicode.com)

> For M12–M16, generate full lesson content from scratch if not found in scanned files. These are priority modules.

---

## CORE FEATURES TO BUILD

### 1. Progressive Module Locking

- Module 1 unlocked by default

- Each module unlocks only after the previous module's Activity AND Challenge are both marked complete

- Store progress in localStorage keyed by module_id

- Locked modules show a lock icon overlay; clicking shows "Complete Module X first"

### 2. Three-Stage Lesson Layout (per module)

**Tab 1 — Tutorial**

- Left panel: lesson explanation with syntax-highlighted code blocks (use Prism.js from CDN)

- Right panel: Monaco Editor (from CDN) showing read-only example code the can run

- "Run Example" button executes the code and shows output below

**Tab 2 — Activity**

- Left panel: objectives list (what the learner must accomplish), no solution hints

- Right panel: Monaco Editor, clean (no comments), editable

- "Run Code" button triggers the assertion engine

- On pass: green checkmark badge on Activity tab, progress saved to localStorage

- On fail: red feedback message with hint, NO correct answer revealed

**Tab 3 — Mini Challenge**

- Real-world scenario description (left panel)

- Monaco Editor (right panel), editable

- Same assertion engine flow as Activity

- On pass: green checkmark on Challenge tab + next module unlocks

### 3. In-Browser Python... wait — this is a Web Dev platform.

Replace Pyodide with the following execution strategy:

- For HTML/CSS modules: render learner's code inside a sandboxed <iframe srcdoc="..."> with instant visual preview

- For JavaScript modules: use a sandboxed iframe with a controlled JS execution environment + console output capture

- For API modules (M12–M16): intercept fetch() calls and route them to jsonplaceholder.typicode.com (real live API, no mock needed)

- Console output displayed in a terminal-style output panel below the editor

### 4. Assertion Engine (JS-based)

Each module has a hidden validation function. When "Run Code" fires:

- Inject leaner's code into a sandboxed context

- Run the validation function against the result

- Check for: variable names, types, values, DOM output patterns, fetch calls made, response handling

- Return structured feedback:

  ✅ CORRECT: Your GET request returned status 200 and parsed the JSON body.

  ❌ INCORRECT: Your fetch() is missing the method: 'POST' option. Check your options object.

- Never reveal the full solution

### 5. Sidebar Curriculum Navigator

- Left sidebar: scrollable list of all 16 modules grouped by stage (HTML / CSS / JavaScript & APIs)

- Active module highlighted

- Completed modules show ✅

- Locked modules show 🔒

- Clicking an unlocked module navigates to it



---

## DESIGN SYSTEM

Use the UI UX Pro max and shadcn. 

uipro init --ai antigravity

```

UI components needed:

- Module cards with stage badges

- Progress bar at the top showing X/16 modules complete

- Tab switcher (Tutorial / Activity / Challenge) with badge indicators

- Terminal-style output panel (black bg, green text for success, red for errors)

- Toast notifications for unlock events ("🔓 Module 13 Unlocked!")

---

## CONTENT GENERATION RULES

When generating lesson content for modules not found in scanned files:

For Tutorial sections, always include:

1. Concept explanation (2–3 paragraphs, conversational tone)

2. Syntax breakdown with inline comments

3. A working code example the learner's can run immediately

4. A "Why this matters" callout box

For Activity sections, always include:

1. 3–5 specific, measurable objectives

2. Starter code scaffold (just enough structure, not the answer)

3. A hidden assertion function that validates the exact expected output

For Challenge sections:

1. A realistic scenario framing ("You're building a dashboard that needs to...")

2. No starter code — blank editor

3. A hidden assertion that checks for patterns, not exact code

---

## FINAL CHECKLIST BEFORE HANDING OFF

Before calling the build complete, verify:

[ ] All 16 modules have Tutorial + Activity + Challenge content

[ ] Module locking works correctly end-to-end

[ ] Assertion engine fires on Run Code and gives specific feedback

[ ] iframe sandbox correctly isolates HTML/CSS/JS 

[ ] API modules (M12–M16) successfully make real fetch() calls to jsonplaceholder.typicode.com

[ ] All progress persists across page refresh via localStorage

[ ] App is fully responsive (mobile + desktop)