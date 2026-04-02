"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Briefcase,
  Globe,
  CalendarDays,
  Users,
  ClipboardList,
  Activity,
  Scale,
  Landmark,
  AlertCircle,
  ShieldAlert,
  PieChart,
  Blocks,
  Layers,
  FileCheck,
  Files,
  FileCode2,
  BookText,
  Bot,
  Sparkles,
  Building2,
  Key,
  Settings,
  ChevronLeft,
  Lock,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import auditpulse from "@/assets/auditpulse.png";

const MENU_GROUPS = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { name: "My Work", icon: Briefcase, href: "/work" },
    ],
  },
  {
    title: "Enterprise Risk Management",
    items: [{ name: "Risk Universe", icon: Globe, href: "/risk-universe" }],
  },
  {
    title: "Audit Planning",
    items: [
      { name: "Annual Audit Plan", icon: CalendarDays, href: "/audit-plan" },
      { name: "Resource Planning", icon: Users, href: "/resources" },
    ],
  },
  {
    title: "Audit Execution",
    items: [
      { name: "All Audits", icon: ClipboardList, href: "/audits" },
      { name: "Operational", icon: Activity, href: "/audits/operational" },
      { name: "Compliance", icon: Scale, href: "/audits/compliance" },
      { name: "SOX", icon: Landmark, href: "/audits/sox" },
      { name: "Issue Management", icon: AlertCircle, href: "/issues" },
      { name: "Exception Management", icon: ShieldAlert, href: "/exceptions" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { name: "Compliance Dashboard", icon: PieChart, href: "/compliance" },
      { name: "Frameworks", icon: Blocks, href: "/frameworks" },
    ],
  },
  {
    title: "Libraries",
    items: [
      { name: "Risk Library", icon: Layers, href: "/libraries/risk" },
      { name: "Control Library", icon: FileCheck, href: "/libraries/control" },
      { name: "Evidence Library", icon: Files, href: "/libraries/evidence" },
      { name: "Control Templates", icon: FileCode2, href: "/libraries/templates" },
      { name: "Policy Library", icon: BookText, href: "/libraries/policy" },
    ],
  },
  {
    title: "AI Intelligence",
    items: [
      { name: "AI Assistant", icon: Bot, href: "/ai/assistant" },
      { name: "AI Analytics", icon: Sparkles, href: "/ai/analytics" },
    ],
  },
  {
    title: "Administration",
    items: [
      { name: "Entity Master", icon: Building2, href: "/admin/entities" },
      { name: "Permissions", icon: Key, href: "/admin/permissions" },
      { name: "Users", icon: Users, href: "/admin/users" },
      { name: "Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
];

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar() {
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "";

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside
      className={`
        flex flex-col h-screen
        shrink-0 select-none
        transition-all duration-300 ease-in-out
        relative z-20
        bg-[#2E5599] text-white border-r border-[#1e3b6d]
        ${isCollapsed ? "w-[72px]" : "w-[260px]"}
      `}
    >
      {/* ── HEADER ───────────────────────────────────────────────── */}
      <div
        className={`
          relative flex items-center h-16 shrink-0 overflow-hidden 
          border-b border-white/10 
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "px-0 justify-center" : "px-4"}
        `}
      >
        <div
          onClick={() => isCollapsed && setIsCollapsed(false)}
          title={isCollapsed ? "Click to expand sidebar" : ""}
          className={`
            overflow-hidden shrink-0
            transition-all duration-300 ease-in-out
            ${isCollapsed
              ? "w-[36px] cursor-pointer hover:opacity-80 hover:scale-105 active:scale-95"
              : "w-[152px]"
            }
          `}
        >
          {/* Note: Ensure 'auditpulse' image has white text/logo to show up on the blue background */}
          {mounted && (
            <Image
              src={auditpulse}
              alt="AuditPulse"
              width={152}
              height={36}
              className="object-left object-contain h-[36px] w-[152px] max-w-none brightness-0 invert"
              // Added 'brightness-0 invert' to turn your logo white temporarily. 
              // Remove those classes if your logo is already white/transparent.
              priority
            />
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(true)}
          aria-label="Collapse sidebar"
          className={`
            absolute flex items-center justify-center
            w-8 h-8 rounded-md
            border border-white/20
            text-blue-100
            hover:bg-white/10 hover:text-white
            bg-[#244580]
            shadow-sm z-10
            transition-all duration-300 ease-in-out
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
            right-4
            ${isCollapsed
              ? "opacity-0 scale-75 translate-x-4 pointer-events-none"
              : "opacity-100 scale-100 translate-x-0"
            }
          `}
        >
          <ChevronLeft className="w-[18px] h-[18px] transition-transform duration-300" />
        </button>
      </div>

      {/* ── SCROLLABLE NAV ───────────────────────────────────────── */}
      <nav
        className="
          flex-1 overflow-y-auto overflow-x-hidden
          pb-6 pt-2
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        <div className="flex flex-col space-y-1">
          {MENU_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className={`flex flex-col ${groupIdx > 0 ? "mt-5" : ""}`}
            >
              <div className="relative h-7 flex items-center px-4 mb-1">
                <h3
                  className={`
                    absolute left-5
                    text-[11px] font-bold
                    text-blue-200/70
                    uppercase tracking-[0.15em]
                    whitespace-nowrap
                    transition-all duration-300 ease-in-out origin-left
                    ${isCollapsed
                      ? "opacity-0 -translate-x-2 pointer-events-none"
                      : "opacity-100 translate-x-0"
                    }
                  `}
                >
                  {group.title}
                </h3>
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2
                    h-px bg-white/10
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? "w-8 opacity-100" : "w-0 opacity-0"}
                  `}
                />
              </div>

              <ul className="flex flex-col gap-0.5 px-3">
                {group.items.map((item, itemIdx) => {
                  const isActive = isNavItemActive(pathname, item.href);

                  const linkContent = (
                    <Link
                      href={item.href}
                      className={`
                        relative flex items-center h-[38px] rounded-lg
                        transition-colors duration-200 group
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                        overflow-hidden
                        ${isActive
                          ? "bg-white/15 text-white font-semibold shadow-sm"
                          : "text-blue-100/80 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      {/* Active marker */}
                      <div
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full
                          bg-white
                          transition-all duration-300 ease-out
                          ${isActive ? "h-5 opacity-100" : "h-0 opacity-0"}
                        `}
                      />

                      <div className="flex items-center justify-center w-[48px] h-full shrink-0">
                        <item.icon
                          strokeWidth={isActive ? 2.5 : 2}
                          className={`
                            w-[18px] h-[18px] transition-transform duration-300 ease-out
                            ${isActive
                              ? "text-white scale-110"
                              : "text-blue-200/70 group-hover:text-white group-hover:scale-110"
                            }
                          `}
                        />
                      </div>

                      <div
                        className={`
                          flex items-center overflow-hidden whitespace-nowrap
                          transition-all duration-300 ease-in-out
                          ${isCollapsed
                            ? "w-0 opacity-0 -translate-x-2 pointer-events-none"
                            : "w-[160px] opacity-100 translate-x-0"
                          }
                        `}
                      >
                        <span className="text-[14px]">{item.name}</span>
                      </div>
                    </Link>
                  );

                  return (
                    <li key={itemIdx}>
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent
                            side="right"
                            sideOffset={10}
                            className="font-medium bg-[#1e3b6d] text-white border-white/10"
                          >
                            {item.name}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        linkContent
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="shrink-0 mt-auto border-t border-white/10 bg-[#244580] transition-colors overflow-hidden">
        <div
          className={`
            flex items-center justify-center gap-1.5 px-4
            text-blue-200/70
            border-b border-white/5
            whitespace-nowrap overflow-hidden
            transition-all duration-300 ease-in-out
            ${isCollapsed
              ? "max-h-0 py-0 opacity-0 !border-transparent -translate-y-2"
              : "max-h-[45px] py-3 opacity-100 translate-y-0"
            }
          `}
        >
          <Lock className="w-2.5 h-2.5 shrink-0" />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            Role-Based Access • SOC 2
          </span>
        </div>

        <div className="flex items-center h-[68px] px-3 cursor-pointer hover:bg-white/5 transition-colors group">
          <div
            className={`
              relative flex items-center justify-center
              w-10 h-10 shrink-0
              transition-all duration-300 ease-in-out
              ${isCollapsed ? "mx-auto" : "mx-0"}
            `}
          >
            <Avatar className="w-9 h-9 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors shadow-sm bg-white/10">
              <AvatarFallback className="bg-transparent text-white text-sm font-bold rounded-lg transition-transform group-hover:scale-105">
                A
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#244580] rounded-full" />
          </div>

          <div
            className={`
              flex flex-col justify-center
              overflow-hidden whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${isCollapsed
                ? "w-0 opacity-0 -translate-x-2 ml-0"
                : "w-[120px] opacity-100 translate-x-0 ml-2"
              }
            `}
          >
            <span className="text-[14px] font-bold text-white leading-none mb-1 group-hover:text-blue-100 transition-colors">
              Admin User
            </span>
            <span className="text-[11px] font-semibold text-blue-200/70 uppercase tracking-wider leading-none">
              Super Admin
            </span>
          </div>

          <div
            className={`
              flex items-center justify-end gap-1
              overflow-hidden
              transition-all duration-300 ease-in-out
              ${isCollapsed
                ? "w-0 opacity-0 translate-x-2"
                : "w-[70px] opacity-100 translate-x-0 flex-1"
              }
            `}
          >
            {mounted && (
              <button
                aria-label="Toggle theme"
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                }}
                className="
                  flex items-center justify-center w-8 h-8 rounded-md
                  text-blue-200/70
                  hover:text-white
                  hover:bg-white/10
                  transition-all duration-200 hover:scale-105 active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                  shrink-0
                "
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              aria-label="Sign out"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="
                flex items-center justify-center w-8 h-8 rounded-md
                text-blue-200/70
                hover:text-red-300
                hover:bg-red-500/20
                transition-all duration-200 hover:scale-105 active:scale-95
                focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40
                shrink-0
              "
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}