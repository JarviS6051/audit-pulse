import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/ThemeProvider";
import TopNav from "../components/TopBar";
import Sidebar from "../components/SideBar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuditPulse Dashboard",
  description: "Enterprise GRC overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className={`${geistSans.className} flex h-screen overflow-hidden antialiased bg-white dark:bg-[#0B1324] text-slate-900 dark:text-slate-50`}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* TooltipProvider now wraps the ENTIRE layout. 
            This ensures the Sidebar tooltips and TopNav components work correctly.
          */}
          <TooltipProvider delayDuration={150}>

            {/* 1. Sidebar acts as a fixed flex item on the left */}
            <Sidebar />

            {/* 2. Main wrapper takes remaining width and establishes a vertical flex column */}
            <div className="flex flex-col flex-1 w-full overflow-hidden bg-slate-50/50 dark:bg-[#050A14]">

              {/* TopNav sits at the top of the column */}
              <TopNav />

              {/* 3. Main content area scrolls independently */}
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
                {/* Constrains ultra-wide screens to keep data readable */}
                <div className="mx-auto max-w-7xl w-full">
                  {children}
                </div>
              </main>

            </div>

          </TooltipProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}