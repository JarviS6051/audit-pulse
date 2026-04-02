"use client";

import * as React from "react";
import {
  Bell,
  Search,
  Settings,
  ChevronRight,
  Globe,
  Building2,
  MapPin,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";

const BRAND_HEX = "#2E5599";

const entities = [
  { name: "CPA Firm", code: "CPA_FIRM • ORGANIZATION", icon: Building2 },
  { name: "Tata Consultancy Services", code: "TCS-001 • LEGAL ENTITY", icon: Building2 },
  { name: "Accenture", code: "ACC-001 • LEGAL ENTITY", icon: Building2 },
  { name: "Hyderabad", code: "ACC-HYD-001 • LOCATION", icon: MapPin },
  { name: "Bangalore", code: "ACC-BAN-001 • LOCATION", icon: MapPin },
];

function IconBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`relative flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      {children}
    </button>
  );
}

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 flex h-[68px] w-full items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">

      {/* LEFT — Breadcrumbs + Entity Picker */}
      <nav className="flex items-center gap-2 shrink-0" aria-label="Breadcrumb">
        <span className="text-base font-bold cursor-pointer hover:opacity-80 transition-opacity text-[#2E5599] dark:text-[#5b83d1] tracking-tight">
          AuditPulse
        </span>

        <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground/50" />

        <span className="text-[15px] font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          CPA Firm
        </span>

        <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground/50" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 h-10 px-3 rounded-lg hover:bg-accent text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#2E5599]/10 dark:bg-[#5b83d1]/15">
                <Globe className="w-4 h-4 text-[#2E5599] dark:text-[#5b83d1]" />
              </span>
              <span className="text-[15px] font-semibold whitespace-nowrap">
                All Entities
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-80 rounded-xl p-1.5" align="start" sideOffset={8}>
            <DropdownMenuLabel className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-2">
              CPA Firm
            </DropdownMenuLabel>

            <DropdownMenuItem className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer">
              <span className="flex items-center justify-center w-9 h-9 rounded-md bg-[#2E5599]/10 dark:bg-[#5b83d1]/15 shrink-0">
                <Globe className="w-[18px] h-[18px] text-[#2E5599] dark:text-[#5b83d1]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#2E5599] dark:text-[#5b83d1] leading-none">
                  All Entities
                </span>
                <span className="text-[13px] text-muted-foreground mt-1.5 leading-none font-medium">
                  Organization Level
                </span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuLabel className="flex items-center justify-between text-[13px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-2">
              <span>Entities</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[11px] font-mono normal-case tracking-normal">
                {entities.length}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuGroup className="max-h-[320px] overflow-y-auto scrollbar-thin">
              {entities.map((entity, i) => (
                <DropdownMenuItem key={i} className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer">
                  <span className="flex items-center justify-center w-9 h-9 rounded-md bg-secondary shrink-0">
                    <entity.icon className="w-4 h-4 text-muted-foreground" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-medium leading-none">{entity.name}</span>
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mt-1.5 leading-none">
                      {entity.code}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem className="flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer text-[#2E5599] dark:text-[#5b83d1] focus:text-[#2E5599] dark:focus:text-[#5b83d1]">
              <Plus className="w-4 h-4" />
              <span className="text-[15px] font-semibold">Manage Entities</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* CENTER — Command Palette Trigger */}
      <div className="flex-1 flex justify-center max-w-lg mx-6">
        <button className="flex w-full items-center gap-2.5 h-10 px-3.5 rounded-lg border border-input bg-muted/40 hover:bg-muted/80 hover:text-accent-foreground text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm">
          <Search className="w-[18px] h-[18px] shrink-0" />
          <span className="flex-1 text-left text-[15px] font-medium truncate">
            <span className="hidden sm:inline">Search audits, risks, controls...</span>
            <span className="sm:hidden">Search...</span>
          </span>
          <kbd className="pointer-events-none hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-background px-2 font-mono text-[11px] font-semibold text-muted-foreground opacity-100 shadow-sm">
            <span className="text-[13px]">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* RIGHT — Actions + Avatar */}
      <div className="flex items-center gap-1.5 shrink-0">
        <IconBtn>
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full ring-2 ring-background bg-[#2E5599] dark:bg-[#5b83d1]" />
        </IconBtn>

        <ModeToggle />

        <IconBtn>
          <Settings className="w-5 h-5" />
        </IconBtn>

        <div className="w-px h-7 bg-border mx-3 shrink-0" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all">
              <Avatar className="w-9 h-9 border border-border hover:opacity-90 transition-opacity shadow-sm">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-[#2E5599] text-white text-[13px] font-bold">
                  A
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 rounded-xl p-1.5" align="end" sideOffset={8}>
            <DropdownMenuLabel className="font-normal p-2.5">
              <div className="flex flex-col space-y-1.5">
                <p className="text-[15px] font-bold leading-none text-foreground">Admin User</p>
                <p className="text-[13px] leading-none text-muted-foreground font-medium">
                  admin@auditpulse.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="cursor-pointer text-[15px] p-2.5 rounded-lg">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-[15px] p-2.5 rounded-lg">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="cursor-pointer text-[15px] p-2.5 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </header>
  );
}