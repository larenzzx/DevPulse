import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DevPulse — Elevate your skills. Master the Web.",
  description: "Master HTML, CSS, JavaScript, and HTTP/REST APIs through an interactive, hands-on, sandbox-driven learning experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
