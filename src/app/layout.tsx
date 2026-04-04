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
      {/* 1. Added `flex-col` here so the layout stacks vertically top-to-bottom */}
      <body className={`${geistSans.className} flex flex-col h-screen overflow-hidden antialiased bg-white dark:bg-[#0B1324] text-slate-900 dark:text-slate-50`}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>

            {/* 2. TopNav is now the first child of the body column, spanning 100% width */}
            <TopNav />

            {/* 3. This flex wrapper sits below TopNav and holds the Sidebar + Main Content side-by-side */}
            <div className="flex flex-1 min-h-0 w-full overflow-hidden">

              <Sidebar />

              {/* 4. Main content area takes the remaining width and handles its own vertical scrolling. 
                  (Moved your background colors to this main tag so they don't bleed under the sidebar) */}
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar bg-slate-50/50 dark:bg-[#050A14]">
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