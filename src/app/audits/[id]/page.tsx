"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Clock, Download, Edit, Trash2, ArrowRight, CheckCircle2,
  XCircle, Target, Shield, AlertTriangle, TrendingUp, LayoutGrid,
  FileText, CheckSquare, Lock, Users, BarChart3, LucideIcon, ChevronRight,
  Calendar, Timer, Wallet,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  role: string;
  initials: string;
  color: string;
}

interface AuditData {
  id: string;
  title: string;
  type: string;
  engagementType: string;
  status: string;
  scopeText: string;
  approvalStatus: string;
  auditSource: string;
  inherentRisk: string;
  entity: string;
  entityCode: string;
  department: string;
  owner: string;
  startDate: string;
  endDate: string;
  estHours: string;
  budgetHours: string;
  actualHours: string;
  budgetSource: string;
  objective: string;
  scope: string;
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  team: {
    lead: { name: string; email: string; initials: string };
    members: TeamMember[];
  };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const AUDIT: AuditData = {
  id: "AUD-2026-004",
  title: "Quarterly IT Security Assessment",
  type: "Operational",
  engagementType: "Operational Audit Engagement",
  status: "Draft",
  scopeText: "Flexible scope · 10–15 controls",
  approvalStatus: "Draft",
  auditSource: "AdHoc",
  inherentRisk: "—",
  entity: "Accenture",
  entityCode: "ACC-001",
  department: "—",
  owner: "Lead Auditor",
  startDate: "Mar 30, 2026",
  endDate: "Apr 29, 2026",
  estHours: "0h",
  budgetHours: "0h",
  actualHours: "0h",
  budgetSource: "Manual",
  objective:
    "To evaluate the effectiveness of the current IT security controls and identify potential vulnerabilities within the core infrastructure.",
  scope:
    "Review of access management protocols, firewall configurations, and incident response procedures across the North American data centers.",
  createdOn: "Mar 30, 2026",
  updatedOn: "Mar 30, 2026",
  createdBy: "Admin",
  team: {
    lead: { name: "Sarah Jenkins", email: "s.jenkins@cpa-firm.com", initials: "SJ" },
    members: [
      { role: "Auditor",       initials: "AU", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
      { role: "Process Owner", initials: "PO", color: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
      { role: "Control Owner", initials: "CO", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
    ],
  },
};

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Planning",  tag: "Draft", status: "active" as const },
  { id: 2, label: "Fieldwork", status: "locked" as const },
  { id: 3, label: "Reporting", status: "locked" as const },
  { id: 4, label: "Closed",    status: "locked" as const },
];

function Stepper() {
  return (
    <div className="flex items-center overflow-x-auto hide-scrollbar">
      {STEPS.map((step, i) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-2 shrink-0 min-w-[96px]">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all select-none",
                step.status === "active"
                  ? "bg-violet-600 border-violet-600 text-white ring-4 ring-violet-100 dark:ring-violet-900/40"
                  : "bg-neutral-50 border-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-500"
              )}
            >
              {step.status === "locked" ? <Lock size={12} strokeWidth={2.5} /> : step.id}
            </div>
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "text-xs font-semibold",
                  step.status === "active"
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 dark:text-neutral-500"
                )}
              >
                {step.label}
              </span>
              {step.tag && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
                  {step.tag}
                </span>
              )}
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700 min-w-[16px] mb-8 mx-0.5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

type BtnVariant = "default" | "primary" | "danger" | "ghost";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label?: string;
  variant?: BtnVariant;
}

function Btn({ icon: Icon, label, variant = "default", className, ...rest }: BtnProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors select-none whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950",
        "disabled:pointer-events-none disabled:opacity-50",
        label ? "px-3.5 py-2" : "p-2",
        variant === "default" &&
          "bg-white border border-neutral-200 text-neutral-700 shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700",
        variant === "primary" &&
          "bg-violet-600 border border-violet-700 text-white shadow-sm hover:bg-violet-700 dark:hover:bg-violet-500",
        variant === "danger" &&
          "bg-white border border-neutral-200 text-red-600 shadow-sm hover:bg-red-50 hover:border-red-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-400 dark:hover:bg-red-950/30",
        variant === "ghost" &&
          "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800",
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={15} strokeWidth={2} />}
      {label && <span>{label}</span>}
    </button>
  );
}

// ─── Card primitives ─────────────────────────────────────────────────────────

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm",
      // FIX: prevent card children from escaping the card boundary
      "overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800", className)}>
      {children}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

type Accent = "violet" | "sky" | "amber" | "emerald";

const ACCENT_ICON: Record<Accent, string> = {
  violet:  "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
  sky:     "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
  amber:   "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
};

const ACCENT_BAR: Record<Accent, string> = {
  violet:  "from-violet-500",
  sky:     "from-sky-500",
  amber:   "from-amber-500",
  emerald: "from-emerald-500",
};

function StatCard({ label, value, icon: Icon, accent }: {
  label: string; value: string; icon: LucideIcon; accent: Accent;
}) {
  return (
    <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm overflow-hidden flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 leading-tight">
          {label}
        </p>
        <div className={cn("p-1.5 rounded-lg shrink-0", ACCENT_ICON[accent])}>
          <Icon size={13} strokeWidth={2.5} />
        </div>
      </div>
      <p className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
        {value}
      </p>
      <div className={cn("absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r to-transparent", ACCENT_BAR[accent])} />
    </div>
  );
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({ label, icon: Icon, active, locked }: {
  label: string; icon: LucideIcon; active?: boolean; locked?: boolean;
}) {
  return (
    <button
      disabled={locked}
      className={cn(
        "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
        active
          ? "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
          : locked
          ? "cursor-not-allowed text-neutral-300 dark:text-neutral-600"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      )}
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <Icon
          size={15}
          strokeWidth={2}
          className={cn(
            "shrink-0 transition-colors",
            active   ? "text-violet-600 dark:text-violet-400" :
            locked   ? "text-neutral-300 dark:text-neutral-600" :
                       "text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300"
          )}
        />
        <span className="truncate">{label}</span>
      </span>
      {locked && <Lock size={11} className="shrink-0 text-neutral-300 dark:text-neutral-600" />}
    </button>
  );
}

// ─── Detail Item ──────────────────────────────────────────────────────────────

function DetailItem({ label, value }: { label: string; value?: React.ReactNode }) {
  const empty = !value || value === "—" || value === "0" || value === "0h";
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        {label}
      </dt>
      <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-200 break-words">
        {empty
          ? <span className="text-neutral-300 dark:text-neutral-600 font-normal italic">Not set</span>
          : value}
      </dd>
    </div>
  );
}

// ─── Gate Row ─────────────────────────────────────────────────────────────────

function GateRow({ done, title, desc }: { done: boolean; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      {done
        ? <CheckCircle2 size={17} className="text-emerald-500 mt-0.5 shrink-0" strokeWidth={2.5} />
        : <XCircle      size={17} className="text-neutral-300 dark:text-neutral-600 mt-0.5 shrink-0" strokeWidth={2} />}
      <div className="min-w-0">
        <p className={cn("text-sm font-semibold leading-tight", done ? "text-neutral-800 dark:text-neutral-200" : "text-neutral-600 dark:text-neutral-400")}>
          {title}
        </p>
        <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Progress Row ─────────────────────────────────────────────────────────────

function ProgressRow({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{label}</span>
        <span className="text-xs font-bold tabular-nums text-neutral-500 dark:text-neutral-500">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            percent === 100
              ? "bg-gradient-to-r from-violet-500 to-violet-400"
              : "bg-neutral-200 dark:bg-neutral-700"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// ─── Nav groups ───────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    heading: "Engagement",
    items: [
      { label: "Overview",        icon: LayoutGrid, active: true  },
      { label: "Planning",        icon: Target                    },
      { label: "Risk Assessment", icon: Shield                    },
    ],
  },
  {
    heading: "Execution",
    items: [
      { label: "Walkthroughs",  icon: CheckSquare, locked: true },
      { label: "Testing",       icon: FileText,    locked: true },
      { label: "Time Tracking", icon: Clock                     },
    ],
  },
  {
    heading: "Reporting",
    items: [
      { label: "Issues",  icon: AlertTriangle, locked: true },
      { label: "Report",  icon: FileText,      locked: true },
      { label: "Closure", icon: Lock,          locked: true },
    ],
  },
];

// ─── Tab helpers ──────────────────────────────────────────────────────────────

type Tab = "general" | "scope" | "timeline";

const TAB_LABELS: Record<Tab, string> = {
  general:  "General Details",
  scope:    "Scope & Objectives",
  timeline: "Timeline & Budget",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AuditDetailsPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>("general");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.25s ease-out both; }
      `}</style>

      {/*
        FIX: Added overflow-x: hidden at the root so nothing painted outside
        the viewport edge escapes and causes horizontal scroll.
      */}
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased overflow-x-hidden">

        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-40 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-3">

            {/* Breadcrumb */}
            <button
              onClick={() => window.history.back()}
              className="flex w-fit items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={13} strokeWidth={2.5} />
              Back to Audits
            </button>

            {/* Title row */}
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    {AUDIT.id}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    <Target size={12} strokeWidth={2} className="text-neutral-400 dark:text-neutral-500" />
                    {AUDIT.engagementType}
                  </span>
                </div>
                {/* FIX: added break-words so long titles don't overflow on mobile */}
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight break-words">
                  {AUDIT.title}
                </h1>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Btn icon={Clock}    variant="ghost" aria-label="History" />
                <Btn icon={Download} label="Export" />
                <Btn icon={Edit}     label="Edit" variant="primary" />
              </div>
            </div>

          </div>
        </header>

        {/* ══ PAGE BODY ════════════════════════════════════════════════════════ */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">

          {/* ── Status + Stepper ──────────────────────────────────────────────── */}
          <Card>
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                <span className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  <Target size={14} strokeWidth={2} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                  {AUDIT.type}
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-xs font-normal text-neutral-400 dark:text-neutral-500">{AUDIT.scopeText}</span>
                </span>
                {/* Status pill */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                  {AUDIT.status}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Btn icon={ArrowRight} label="Advance Phase" variant="primary" />
                <Btn icon={Trash2}     label="Delete"        variant="danger"  />
              </div>
            </div>
            {/* Stepper */}
            <div className="px-5 py-5">
              <Stepper />
            </div>
          </Card>

          {/* ── Two-col layout ────────────────────────────────────────────────── */}
          <div className="flex gap-5 items-start">

            {/* ── Sidebar ───────────────────────────────────────────────────── */}
            {/* FIX: sidebar is hidden on <lg and the main content fills full width */}
            <aside className="hidden lg:flex flex-col gap-5 w-48 shrink-0 sticky top-[108px]">
              {NAV_GROUPS.map((group) => (
                <div key={group.heading} className="flex flex-col gap-0.5">
                  <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
                    {group.heading}
                  </p>
                  {group.items.map((item) => (
                    <NavItem
                      key={item.label}
                      label={item.label}
                      icon={item.icon as LucideIcon}
                      active={(item as { active?: boolean }).active}
                      locked={(item as { locked?: boolean }).locked}
                    />
                  ))}
                </div>
              ))}
            </aside>

            {/* ── Main content ──────────────────────────────────────────────── */}
            {/* FIX: min-w-0 is critical — without it a flex child ignores its
                parent's width and can blow out the layout */}
            <main className="flex-1 min-w-0 flex flex-col gap-5">

              {/* KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard label="Risks in Scope" value="0"   icon={Shield}        accent="violet"  />
                <StatCard label="Checklist"       value="0%"  icon={CheckSquare}   accent="sky"     />
                <StatCard label="Issues Found"    value="0"   icon={AlertTriangle} accent="amber"   />
                <StatCard label="Progress"        value="0%"  icon={TrendingUp}    accent="emerald" />
              </div>

              {/* Gate requirements */}
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/40 shrink-0">
                      <ChevronRight size={14} className="text-violet-600 dark:text-violet-400" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Gate Requirements: Planning → Fieldwork
                    </span>
                  </div>
                  <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 shrink-0">
                    1 of 3 complete
                  </span>
                </div>
                <div className="px-5 py-4 flex flex-col gap-4">
                  <GateRow done  title="Audit scope defined"      desc="Objective and scope have been clearly documented." />
                  <div className="h-px bg-neutral-50 dark:bg-neutral-800/60" />
                  <GateRow done={false} title="Risk assigned"     desc="At least one risk must be assigned to the audit framework." />
                  <div className="h-px bg-neutral-50 dark:bg-neutral-800/60" />
                  <GateRow done={false} title="Control mapped to risk" desc="Assigned risks must have at least one mitigating control mapped." />
                </div>
              </Card>

              {/* Detail tabs */}
              {/* FIX: Card already has overflow-hidden; tab bar scrolls horizontally */}
              <Card>
                {/* Tab bar */}
                <div className="flex border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto hide-scrollbar px-1">
                  {(["general", "scope", "timeline"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={cn(
                        "px-4 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all -mb-px",
                        tab === t
                          ? "border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-400"
                          : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                      )}
                    >
                      {TAB_LABELS[t]}
                    </button>
                  ))}
                </div>

                {/* Tab body */}
                <div className="p-5 sm:p-6 fade-up" key={tab}>
                  {tab === "general" && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                      <DetailItem label="Audit Number"         value={AUDIT.id}             />
                      <DetailItem label="Audit Type"           value={AUDIT.type}           />
                      <DetailItem label="Execution Type"       value="Operational"          />
                      <DetailItem label="Approval Status"      value={AUDIT.approvalStatus} />
                      <DetailItem label="Audit Source"         value={AUDIT.auditSource}    />
                      <DetailItem label="Inherent Risk Rating" value={AUDIT.inherentRisk}   />
                      <DetailItem label="Auditable Entity"     value={AUDIT.entity}         />
                      <DetailItem label="Entity Code"          value={AUDIT.entityCode}     />
                      <DetailItem label="Department"           value={AUDIT.department}     />
                    </dl>
                  )}

                  {tab === "scope" && (
                    <div className="flex flex-col gap-6">
                      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
                        <DetailItem label="Risk Score"       value="0" />
                        <DetailItem label="Total Findings"   value="0" />
                        <DetailItem label="Non-Conformities" value="0" />
                        <DetailItem label="Observations"     value="0" />
                      </dl>
                      {/* FIX: stacks to single column on mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">Objective</h4>
                          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed break-words">{AUDIT.objective}</p>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">Scope</h4>
                          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed break-words">{AUDIT.scope}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "timeline" && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                      <DetailItem label="Planned Start Date" value={
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={13} className="text-neutral-400 shrink-0" />
                          {AUDIT.startDate}
                        </span>
                      } />
                      <DetailItem label="Planned End Date" value={
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={13} className="text-neutral-400 shrink-0" />
                          {AUDIT.endDate}
                        </span>
                      } />
                      <DetailItem label="Owner"            value={AUDIT.owner}       />
                      <DetailItem label="Estimated Hours"  value={
                        <span className="inline-flex items-center gap-1.5">
                          <Timer size={13} className="text-neutral-400 shrink-0" />
                          {AUDIT.estHours}
                        </span>
                      } />
                      <DetailItem label="Budget Hours" value={
                        <span className="inline-flex items-center gap-1.5">
                          <Wallet size={13} className="text-neutral-400 shrink-0" />
                          {AUDIT.budgetHours}
                        </span>
                      } />
                      <DetailItem label="Actual Hours"     value={AUDIT.actualHours}  />
                      <DetailItem label="Budget Source"    value={AUDIT.budgetSource} />
                    </dl>
                  )}
                </div>

                {/* Card footer */}
                <div className="px-5 sm:px-6 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                  <span>
                    Created by{" "}
                    <span className="text-neutral-600 dark:text-neutral-400 font-semibold">{AUDIT.createdBy}</span>
                    {" "}· {AUDIT.createdOn}
                  </span>
                  <span>Updated {AUDIT.updatedOn}</span>
                </div>
              </Card>

              {/* Team + Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Team Card */}
                <Card>
                  <CardHeader>
                    <Users size={14} strokeWidth={2} className="text-neutral-400 dark:text-neutral-500" />
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Audit Team</span>
                  </CardHeader>
                  <div className="p-4 flex flex-col gap-4">
                    {/* Lead */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-sm font-bold select-none">
                        {AUDIT.team.lead.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                          {AUDIT.team.lead.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                          Lead Auditor · {AUDIT.team.lead.email}
                        </p>
                      </div>
                    </div>
                    {/* Members */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2.5">
                        Members
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {AUDIT.team.members.map((m, i) => (
                          <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                            <span className={cn("w-5 h-5 flex items-center justify-center rounded-full text-[9px] font-black shrink-0 select-none", m.color)}>
                              {m.initials}
                            </span>
                            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                              {m.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Progress Card */}
                <Card>
                  <CardHeader>
                    <BarChart3 size={14} strokeWidth={2} className="text-neutral-400 dark:text-neutral-500" />
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Phase Progress</span>
                  </CardHeader>
                  <div className="p-4 flex flex-col gap-4">
                    <ProgressRow label="Planning"  percent={100} />
                    <ProgressRow label="Fieldwork" percent={0}   />
                    <ProgressRow label="Reporting" percent={0}   />
                    <ProgressRow label="Closure"   percent={0}   />
                  </div>
                </Card>

              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}