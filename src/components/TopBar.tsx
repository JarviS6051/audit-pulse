"use client";

import * as React from "react";
import Image from "next/image";
import {
  Bell,
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
import auditpulse from "@/assets/auditpulse.png";

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
      className={`relative flex items-center justify-center w-9 h-9 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${className}`}
    >
      {children}
    </button>
  );
}

export default function TopNav() {
  return (
    <>
      {/* Applied brand background color and removed standard theme borders/backgrounds */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-4 bg-[#2E5599] px-6 text-white">

        {/* LEFT — Logo + Breadcrumbs + Entity Picker */}
        <nav className="flex items-center gap-3 shrink-0 h-full" aria-label="Breadcrumb">

          {/* Logo */}
          <div className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity mr-1">
            <Image
              src={auditpulse}
              alt="AuditPulse Logo"
              width={130}
              height={32}
              className="object-contain"
              priority
            />
          </div>

          {/* Sleek Vertical Divider */}
          <div className="w-px h-5 bg-white/20 mx-1 hidden sm:block" />

          <span className="text-[14px] font-medium leading-none text-blue-100 cursor-pointer hover:text-white transition-colors hidden sm:block">
            CPA Firm
          </span>

          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-blue-200/50 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 h-9 px-2.5 rounded-lg hover:bg-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 group border border-transparent hover:border-white/20">
                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/15">
                  <Globe className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-[14px] font-medium leading-none whitespace-nowrap">
                  All Entities
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-200 group-data-[state=open]:rotate-180 transition-transform duration-200" />
              </button>
            </DropdownMenuTrigger>

            {/* Dropdown content retains light/dark mode support since it floats over the main UI */}
            <DropdownMenuContent className="w-80 rounded-xl p-1.5 shadow-xl border-border/50" align="start" sideOffset={8}>
              <DropdownMenuLabel className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-2">
                CPA Firm
              </DropdownMenuLabel>

              <DropdownMenuItem className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors focus:bg-accent/80">
                <span className="flex items-center justify-center w-9 h-9 rounded-md bg-[#2E5599]/10 dark:bg-[#5b83d1]/15 shrink-0">
                  <Globe className="w-[18px] h-[18px] text-[#2E5599] dark:text-[#5b83d1]" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-[#2E5599] dark:text-[#5b83d1] leading-none">
                    All Entities
                  </span>
                  <span className="text-[12px] text-muted-foreground mt-1.5 leading-none font-medium">
                    Organization Level
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 border-border/50" />

              <DropdownMenuLabel className="flex items-center justify-between text-[12px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-2">
                <span>Entities</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground text-[11px] font-mono normal-case tracking-normal">
                  {entities.length}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuGroup className="max-h-[320px] overflow-y-auto custom-scrollbar">
                {entities.map((entity, i) => (
                  <DropdownMenuItem key={i} className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors focus:bg-accent/80">
                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary/60 shrink-0">
                      <entity.icon className="w-4 h-4 text-muted-foreground" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium leading-none">{entity.name}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1.5 leading-none">
                        {entity.code}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1 border-border/50" />

              <DropdownMenuItem className="flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer text-[#2E5599] dark:text-[#5b83d1] focus:text-[#2E5599] dark:focus:text-[#5b83d1] focus:bg-[#2E5599]/5 dark:focus:bg-[#5b83d1]/10 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-[14px] font-semibold">Manage Entities</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* RIGHT — Actions + Avatar */}
        <div className="flex items-center gap-1.5 shrink-0 h-full">
          <IconBtn>
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full ring-2 ring-[#2E5599] bg-red-500" />
          </IconBtn>

          {/* Note: If your ModeToggle component forces dark icon colors, you may need to update its trigger button to text-blue-100 */}
          <ModeToggle />

          <IconBtn>
            <Settings className="w-[18px] h-[18px]" />
          </IconBtn>

          <div className="w-px h-6 bg-white/20 mx-2 shrink-0 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full ring-offset-[#2E5599] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 transition-all ml-1 flex items-center justify-center">
                <Avatar className="w-8 h-8 border border-white/20 hover:opacity-90 hover:ring-2 hover:ring-white/50 transition-all shadow-sm">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-white text-[#2E5599] text-[12px] font-bold flex items-center justify-center">
                    A
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 rounded-xl p-1.5 shadow-xl border-border/50" align="end" sideOffset={12}>
              <DropdownMenuLabel className="font-normal p-2.5">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-[14px] font-semibold leading-none text-foreground">Admin User</p>
                  <p className="text-[12px] leading-none text-muted-foreground font-medium">
                    admin@auditpulse.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 border-border/50" />
              <DropdownMenuItem className="cursor-pointer text-[14px] font-medium p-2.5 rounded-lg focus:bg-accent/80 transition-colors">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-[14px] font-medium p-2.5 rounded-lg focus:bg-accent/80 transition-colors">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-border/50" />
              <DropdownMenuItem className="cursor-pointer text-[14px] font-medium p-2.5 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </header>
    </>
  );
}