"use client";

import React, { useState, useEffect } from "react";
import {
    ArrowLeft, Clock, Download, Edit, Trash2, ArrowRight, CheckCircle2,
    XCircle, Target, Shield, AlertTriangle, TrendingUp, LayoutGrid,
    FileText, CheckSquare, Lock, Users, BarChart3, LucideIcon,
    ChevronRight, Calendar, Timer, Wallet,
} from "lucide-react";

// ─── Import shared design system ─────────────────────────────────────────────
const DESIGN_SYSTEM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ds-font:              'DM Sans', sans-serif;
  --ds-mono:              'DM Mono', monospace;
  --ds-bg:                #f4f6fa;
  --ds-surface:           #ffffff;
  --ds-surface-raised:    #f9fafb;
  --ds-border:            rgba(0,0,0,0.08);
  --ds-border-subtle:     rgba(0,0,0,0.05);
  --ds-text-primary:      #0f172a;
  --ds-text-secondary:    #1e293b;
  --ds-text-muted:        #64748b;
  --ds-text-dim:          #94a3b8;
  --ds-indigo:            #2E5599;
  --ds-indigo-hover:      #244580;
  --ds-indigo-light:      rgba(46,85,153,0.08);
  --ds-indigo-border:     rgba(46,85,153,0.28);
  --ds-indigo-dot-shadow: rgba(46,85,153,0.45);
  --ds-amber:             #d97706;
  --ds-amber-bg:          rgba(245,158,11,0.08);
  --ds-amber-border:      rgba(245,158,11,0.25);
  --ds-green:             #059669;
  --ds-green-bg:          rgba(16,185,129,0.08);
  --ds-green-border:      rgba(16,185,129,0.2);
  --ds-red:               #dc2626;
  --ds-red-bg:            rgba(239,68,68,0.08);
  --ds-progress-track:    rgba(0,0,0,0.07);
  --ds-checkbox:          #cbd5e1;
  --ds-avatar-border:     #ffffff;
  --ds-stat-bg:           linear-gradient(145deg,#ffffff 0%,#f8faff 100%);
  --ds-card-shadow:       0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --ds-id-bg:             rgba(0,0,0,0.04);
  --ds-id-border:         rgba(0,0,0,0.07);
  --ds-id-color:          #94a3b8;
}

.dark {
  --ds-bg:                #080e1c;
  --ds-surface:           #111827;
  --ds-surface-raised:    #0d1424;
  --ds-border:            rgba(255,255,255,0.07);
  --ds-border-subtle:     rgba(255,255,255,0.04);
  --ds-text-primary:      #f9fafb;
  --ds-text-secondary:    #e2e8f0;
  --ds-text-muted:        #64748b;
  --ds-text-dim:          #374151;
  --ds-indigo:            #7ba3e0;
  --ds-indigo-hover:      #4d7cc4;
  --ds-indigo-light:      rgba(46,85,153,0.15);
  --ds-indigo-border:     rgba(46,85,153,0.35);
  --ds-indigo-dot-shadow: rgba(123,163,224,0.55);
  --ds-amber:             #fbbf24;
  --ds-amber-bg:          rgba(245,158,11,0.12);
  --ds-amber-border:      rgba(245,158,11,0.28);
  --ds-green:             #34d399;
  --ds-green-bg:          rgba(16,185,129,0.12);
  --ds-green-border:      rgba(16,185,129,0.25);
  --ds-red:               #f87171;
  --ds-red-bg:            rgba(239,68,68,0.12);
  --ds-progress-track:    rgba(255,255,255,0.05);
  --ds-checkbox:          #374151;
  --ds-avatar-border:     #0d1424;
  --ds-stat-bg:           linear-gradient(145deg,#111827 0%,#0f1728 100%);
  --ds-card-shadow:       0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
  --ds-id-bg:             rgba(255,255,255,0.03);
  --ds-id-border:         rgba(255,255,255,0.05);
  --ds-id-color:          #374151;
}

body { font-family:var(--ds-font); background:var(--ds-bg); color:var(--ds-text-secondary); }
.hide-sb::-webkit-scrollbar { display:none; }
.hide-sb { -ms-overflow-style:none; scrollbar-width:none; }
@keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
.fade-up { animation:fadeUp 0.25s ease-out both; }
`;

// ─── cn helper ────────────────────────────────────────────────────────────────
function cn(...c: (string | false | undefined | null)[]) { return c.filter(Boolean).join(" "); }

// ─── Types ────────────────────────────────────────────────────────────────────
interface TeamMember { role: string; initials: string; dotColor: string; bgColor: string; textColor: string; }

const AUDIT = {
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
    objective: "To evaluate the effectiveness of the current IT security controls and identify potential vulnerabilities within the core infrastructure.",
    scope: "Review of access management protocols, firewall configurations, and incident response procedures across the North American data centers.",
    createdOn: "Mar 30, 2026",
    updatedOn: "Mar 30, 2026",
    createdBy: "Admin",
    lead: { name: "Sarah Jenkins", email: "s.jenkins@cpa-firm.com", initials: "SJ" },
    members: [
        { role: "Auditor", initials: "AU", dotColor: "#2E5599", bgColor: "rgba(46,85,153,0.12)", textColor: "#2E5599" },
        { role: "Process Owner", initials: "PO", dotColor: "#0ea5e9", bgColor: "rgba(14,165,233,0.12)", textColor: "#0ea5e9" },
        { role: "Control Owner", initials: "CO", dotColor: "#10b981", bgColor: "rgba(16,185,129,0.12)", textColor: "#10b981" },
    ] as TeamMember[],
};

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: "Planning", tag: "Draft", active: true },
    { id: 2, label: "Fieldwork", active: false },
    { id: 3, label: "Reporting", active: false },
    { id: 4, label: "Closed", active: false },
];

function Stepper() {
    return (
        <div className="hide-sb" style={{ display: "flex", alignItems: "center", overflowX: "auto", paddingBottom: 4 }}>
            {STEPS.map((step, i) => (
                <React.Fragment key={step.id}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0, minWidth: 100 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 700, border: "2px solid",
                            borderColor: step.active ? "var(--ds-indigo)" : "var(--ds-border)",
                            background: step.active ? "var(--ds-indigo)" : "var(--ds-surface-raised)",
                            color: step.active ? "#fff" : "var(--ds-text-muted)",
                            boxShadow: step.active ? "0 0 0 4px var(--ds-indigo-light)" : "none",
                            transition: "all 0.2s ease",
                        }}>
                            {!step.active ? <Lock size={13} strokeWidth={2.5} /> : step.id}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: step.active ? "var(--ds-text-primary)" : "var(--ds-text-muted)" }}>{step.label}</span>
                            {step.tag && (
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "var(--ds-amber-bg)", color: "var(--ds-amber)", border: "1px solid var(--ds-amber-border)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{step.tag}</span>
                            )}
                        </div>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div style={{ flex: 1, height: 1, background: "var(--ds-border)", minWidth: 16, marginBottom: 28, marginLeft: 2, marginRight: 2 }} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// ─── Button ───────────────────────────────────────────────────────────────────
type BtnVariant = "default" | "primary" | "danger" | "ghost";

function Btn({ icon: Icon, label, variant = "default", style: extraStyle, ...rest }: {
    icon?: LucideIcon; label?: string; variant?: BtnVariant;
    style?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const base: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 6, borderRadius: 10, fontSize: 13, fontWeight: 600,
        cursor: "pointer", border: "1px solid", transition: "all 0.15s ease",
        fontFamily: "var(--ds-font)", whiteSpace: "nowrap",
        padding: label ? "8px 14px" : "8px",
    };
    const variants: Record<BtnVariant, React.CSSProperties> = {
        default: { background: "var(--ds-surface)", borderColor: "var(--ds-border)", color: "var(--ds-text-secondary)", boxShadow: "var(--ds-card-shadow)" },
        primary: { background: "var(--ds-indigo)", borderColor: "var(--ds-indigo-hover)", color: "#fff", boxShadow: "0 2px 8px var(--ds-indigo-light)" },
        danger: { background: "var(--ds-surface)", borderColor: "var(--ds-border)", color: "var(--ds-red)", boxShadow: "var(--ds-card-shadow)" },
        ghost: { background: "transparent", borderColor: "transparent", color: "var(--ds-text-muted)" },
    };
    return (
        <button style={{ ...base, ...variants[variant], ...extraStyle }} {...rest}>
            {Icon && <Icon size={14} strokeWidth={2} />}
            {label && <span>{label}</span>}
        </button>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{ background: "var(--ds-surface)", border: "1px solid var(--ds-border)", borderRadius: 16, boxShadow: "var(--ds-card-shadow)", overflow: "hidden", ...style }}>
            {children}
        </div>
    );
}

function CardHead({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderBottom: "1px solid var(--ds-border-subtle)", ...style }}>
            {children}
        </div>
    );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string; icon: LucideIcon; accent: string }) {
    return (
        <div style={{ background: "var(--ds-stat-bg)", border: "1px solid var(--ds-border)", borderRadius: 16, padding: "16px 18px", position: "relative", overflow: "hidden", boxShadow: "var(--ds-card-shadow)", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ position: "absolute", inset: "0 0 auto 0", height: 2, background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: 0.7 }} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</p>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: `${accent}15`, border: `1px solid ${accent}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} strokeWidth={2.5} color={accent} />
                </div>
            </div>
            <p style={{ fontSize: 30, fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</p>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)` }} />
        </div>
    );
}

// ─── Nav item ─────────────────────────────────────────────────────────────────
function NavItem({ label, icon: Icon, active, locked }: { label: string; icon: LucideIcon; active?: boolean; locked?: boolean }) {
    return (
        <button disabled={locked} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", padding: "7px 12px", borderRadius: 9, border: "none",
            background: active ? "var(--ds-indigo-light)" : "transparent",
            color: active ? "var(--ds-indigo)" : locked ? "var(--ds-text-dim)" : "var(--ds-text-muted)",
            cursor: locked ? "not-allowed" : "pointer",
            fontSize: 13, fontWeight: active ? 600 : 500,
            fontFamily: "var(--ds-font)", transition: "all 0.12s ease",
            outline: "none",
        }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <Icon size={14} strokeWidth={2} color={active ? "var(--ds-indigo)" : locked ? "var(--ds-text-dim)" : "var(--ds-text-muted)"} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
            </span>
            {locked && <Lock size={11} color="var(--ds-text-dim)" />}
        </button>
    );
}

// ─── Detail item ─────────────────────────────────────────────────────────────
function DetailItem({ label, value }: { label: string; value?: React.ReactNode }) {
    const empty = !value || value === "—" || value === "0" || value === "0h";
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
            <dt style={{ fontSize: 10, fontWeight: 700, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</dt>
            <dd style={{ fontSize: 13, fontWeight: 600, color: empty ? "var(--ds-text-dim)" : "var(--ds-text-secondary)", fontStyle: empty ? "italic" : "normal", wordBreak: "break-word" }}>
                {empty ? "Not set" : value}
            </dd>
        </div>
    );
}

// ─── Gate row ─────────────────────────────────────────────────────────────────
function GateRow({ done, title, desc }: { done: boolean; title: string; desc: string }) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            {done
                ? <CheckCircle2 size={17} color="var(--ds-green)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                : <XCircle size={17} color="var(--ds-border)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
            }
            <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: done ? "var(--ds-text-secondary)" : "var(--ds-text-muted)", marginBottom: 2 }}>{title}</p>
                <p style={{ fontSize: 12, color: "var(--ds-text-muted)", lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}

// ─── Progress row ─────────────────────────────────────────────────────────────
function ProgressRow({ label, percent }: { label: string; percent: number }) {
    const color = percent === 100 ? "var(--ds-indigo)" : "var(--ds-border)";
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ds-text-secondary)" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--ds-mono)", color: "var(--ds-text-muted)" }}>{percent}%</span>
            </div>
            <div style={{ height: 4, background: "var(--ds-progress-track)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${percent}%`, background: percent === 100 ? `linear-gradient(90deg,var(--ds-indigo)88,var(--ds-indigo))` : color, borderRadius: 99, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)", boxShadow: percent > 0 ? "0 0 8px var(--ds-indigo-light)" : "none" }} />
            </div>
        </div>
    );
}

// ─── Nav groups ───────────────────────────────────────────────────────────────
const NAV = [
    { heading: "Engagement", items: [{ label: "Overview", icon: LayoutGrid, active: true }, { label: "Planning", icon: Target }, { label: "Risk Assessment", icon: Shield }] },
    { heading: "Execution", items: [{ label: "Walkthroughs", icon: CheckSquare, locked: true }, { label: "Testing", icon: FileText, locked: true }, { label: "Time Tracking", icon: Clock }] },
    { heading: "Reporting", items: [{ label: "Issues", icon: AlertTriangle, locked: true }, { label: "Report", icon: FileText, locked: true }, { label: "Closure", icon: Lock, locked: true }] },
];

type Tab = "general" | "scope" | "timeline";
const TAB_LABELS: Record<Tab, string> = { general: "General Details", scope: "Scope & Objectives", timeline: "Timeline & Budget" };

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.09em", padding: "0 12px", marginBottom: 6 }}>{children}</p>;
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function AuditDetailsPage() {
    const [mounted, setMounted] = useState(false);
    const [tab, setTab] = useState<Tab>("general");

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    // Fixed container: no overflow-x hidden, no isolation issues, solid background, lower z-index
    return (
        <>
            <style>{DESIGN_SYSTEM_CSS}{`
        /* No overflow-x hidden anywhere */
        .ad-page, .ad-inner, .ad-main, .ad-two-col {
          overflow-x: visible;
        }
        .ad-page {
          min-height: 100vh;
          background: var(--ds-bg);
          isolation: isolate;
        }
        @media(min-width:640px)  { .ad-inner { padding:32px 24px 80px !important; } }
        @media(min-width:1024px) { .ad-inner { padding:40px 32px 80px !important; } }

        .ad-kpi-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px;
        }
        @media(min-width:1024px) {
          .ad-kpi-grid { grid-template-columns: repeat(4,1fr); }
        }

        .ad-two-col {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .ad-sidebar {
          display: none;
        }
        @media(min-width:1024px) {
          .ad-sidebar {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 200px;
            flex-shrink: 0;
            position: sticky;
            top: 92px;
          }
        }
        .ad-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ad-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media(min-width:640px) {
          .ad-bottom-grid { grid-template-columns: 1fr 1fr; }
        }

        .ad-detail-grid {
          display: grid;
          grid-template-columns: repeat(1,1fr);
          gap: 20px 28px;
        }
        @media(min-width:480px)  { .ad-detail-grid { grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px) { .ad-detail-grid { grid-template-columns: repeat(3,1fr); } }

        .ad-scope-meta-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 16px;
        }
        @media(min-width:640px)  { .ad-scope-meta-grid { grid-template-columns: repeat(4,1fr); } }

        .ad-scope-text-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media(min-width:640px)  { .ad-scope-text-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

            <div className="ad-page">
                {/* ── HEADER (non‑sticky to avoid z‑index wars; use solid background) ── */}
                <header style={{
                    position: "relative",
                    background: "var(--ds-bg)",
                    borderBottom: "1px solid var(--ds-border)",
                }}>
                    <div style={{ maxWidth: 1480, margin: "0 auto", padding: "12px 16px" }}>
                        {/* Breadcrumb */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                            <button
                                onClick={() => window.history.back()}
                                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--ds-text-muted)", fontSize: 12, fontWeight: 600, fontFamily: "var(--ds-font)", padding: 0 }}
                            >
                                <ArrowLeft size={13} strokeWidth={2.5} />
                                Back to Audits
                            </button>
                        </div>
                        {/* Title row */}
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontFamily: "var(--ds-mono)", fontSize: 11, color: "var(--ds-id-color)", background: "var(--ds-id-bg)", border: "1px solid var(--ds-id-border)", borderRadius: 6, padding: "2px 8px", letterSpacing: "0.04em" }}>
                                        {AUDIT.id}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--ds-text-muted)", fontWeight: 500 }}>
                                        <Target size={12} strokeWidth={2} color="var(--ds-text-dim)" />
                                        {AUDIT.engagementType}
                                    </span>
                                </div>
                                <h1 style={{ fontSize: "clamp(1.125rem,2.5vw,1.5rem)", fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, wordBreak: "break-word" }}>
                                    {AUDIT.title}
                                </h1>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                                <Btn icon={Clock} variant="ghost" aria-label="History" />
                                <Btn icon={Download} label="Export" />
                                <Btn icon={Edit} label="Edit" variant="primary" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── PAGE BODY ──────────────────────────────────────────────────────── */}
                <div className="ad-inner" style={{ maxWidth: 1480, margin: "0 auto", padding: "24px 16px 80px" }}>

                    {/* Status + Stepper */}
                    <Card style={{ marginBottom: 16 }}>
                        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--ds-border-subtle)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--ds-text-muted)" }}>
                                    <Target size={13} strokeWidth={2} color="var(--ds-text-dim)" />
                                    {AUDIT.type}
                                    <span style={{ color: "var(--ds-border)" }}>·</span>
                                    <span style={{ fontSize: 12, fontWeight: 400 }}>{AUDIT.scopeText}</span>
                                </span>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "var(--ds-amber-bg)", color: "var(--ds-amber)", border: "1px solid var(--ds-amber-border)" }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-amber)", display: "inline-block" }} />
                                    {AUDIT.status}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <Btn icon={ArrowRight} label="Advance Phase" variant="primary" />
                                <Btn icon={Trash2} label="Delete" variant="danger" />
                            </div>
                        </div>
                        <div style={{ padding: "18px 20px" }}>
                            <Stepper />
                        </div>
                    </Card>

                    {/* Two-col layout */}
                    <div className="ad-two-col">

                        {/* Sidebar */}
                        <aside className="ad-sidebar">
                            {NAV.map(group => (
                                <div key={group.heading}>
                                    <SectionLabel>{group.heading}</SectionLabel>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {group.items.map(item => (
                                            <NavItem key={item.label} label={item.label} icon={item.icon as LucideIcon} active={(item as { active?: boolean }).active} locked={(item as { locked?: boolean }).locked} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </aside>

                        {/* Main */}
                        <main className="ad-main">

                            {/* KPI grid */}
                            <div className="ad-kpi-grid">
                                <StatCard label="Risks in Scope" value="0" icon={Shield} accent="#2E5599" />
                                <StatCard label="Checklist" value="0%" icon={CheckSquare} accent="#0ea5e9" />
                                <StatCard label="Issues Found" value="0" icon={AlertTriangle} accent="#d97706" />
                                <StatCard label="Progress" value="0%" icon={TrendingUp} accent="#10b981" />
                            </div>

                            {/* Gate requirements */}
                            <Card>
                                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--ds-border-subtle)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--ds-indigo-light)", border: "1px solid var(--ds-indigo-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <ChevronRight size={14} color="var(--ds-indigo)" strokeWidth={2.5} />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ds-text-primary)" }}>Gate Requirements: Planning → Fieldwork</span>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: "var(--ds-amber-bg)", color: "var(--ds-amber)", border: "1px solid var(--ds-amber-border)" }}>
                                        1 of 3 complete
                                    </span>
                                </div>
                                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                                    <GateRow done title="Audit scope defined" desc="Objective and scope have been clearly documented." />
                                    <div style={{ height: 1, background: "var(--ds-border-subtle)" }} />
                                    <GateRow done={false} title="Risk assigned" desc="At least one risk must be assigned to the audit framework." />
                                    <div style={{ height: 1, background: "var(--ds-border-subtle)" }} />
                                    <GateRow done={false} title="Control mapped to risk" desc="Assigned risks must have at least one mitigating control mapped." />
                                </div>
                            </Card>

                            {/* Detail tabs */}
                            <Card>
                                {/* Tab bar */}
                                <div className="hide-sb" style={{ display: "flex", alignItems: "flex-end", borderBottom: "1px solid var(--ds-border)", overflowX: "auto", padding: "0 20px" }}>
                                    {(["general", "scope", "timeline"] as Tab[]).map(t => (
                                        <button key={t} onClick={() => setTab(t)} style={{
                                            padding: "14px 16px 12px", fontSize: 13, fontWeight: 600, border: "none",
                                            borderBottom: `2px solid ${tab === t ? "var(--ds-indigo)" : "transparent"}`,
                                            background: "none", cursor: "pointer", whiteSpace: "nowrap",
                                            color: tab === t ? "var(--ds-indigo)" : "var(--ds-text-muted)",
                                            fontFamily: "var(--ds-font)", transition: "color 0.12s, border-color 0.12s",
                                            marginBottom: -1,
                                        }}>
                                            {TAB_LABELS[t]}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab content */}
                                <div className="fade-up" key={tab} style={{ padding: "20px 20px 22px" }}>
                                    {tab === "general" && (
                                        <dl className="ad-detail-grid">
                                            <DetailItem label="Audit Number" value={AUDIT.id} />
                                            <DetailItem label="Audit Type" value={AUDIT.type} />
                                            <DetailItem label="Execution Type" value="Operational" />
                                            <DetailItem label="Approval Status" value={AUDIT.approvalStatus} />
                                            <DetailItem label="Audit Source" value={AUDIT.auditSource} />
                                            <DetailItem label="Inherent Risk Rating" value={AUDIT.inherentRisk} />
                                            <DetailItem label="Auditable Entity" value={AUDIT.entity} />
                                            <DetailItem label="Entity Code" value={AUDIT.entityCode} />
                                            <DetailItem label="Department" value={AUDIT.department} />
                                        </dl>
                                    )}
                                    {tab === "scope" && (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                            <dl className="ad-scope-meta-grid" style={{ paddingBottom: 16, borderBottom: "1px solid var(--ds-border-subtle)" }}>
                                                <DetailItem label="Risk Score" value="0" />
                                                <DetailItem label="Total Findings" value="0" />
                                                <DetailItem label="Non-Conformities" value="0" />
                                                <DetailItem label="Observations" value="0" />
                                            </dl>
                                            <div className="ad-scope-text-grid">
                                                <div style={{ minWidth: 0 }}>
                                                    <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }}>Objective</p>
                                                    <p style={{ fontSize: 13, color: "var(--ds-text-secondary)", lineHeight: 1.7, wordBreak: "break-word" }}>{AUDIT.objective}</p>
                                                </div>
                                                <div style={{ minWidth: 0 }}>
                                                    <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }}>Scope</p>
                                                    <p style={{ fontSize: 13, color: "var(--ds-text-secondary)", lineHeight: 1.7, wordBreak: "break-word" }}>{AUDIT.scope}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {tab === "timeline" && (
                                        <dl className="ad-detail-grid">
                                            <DetailItem label="Planned Start Date" value={<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Calendar size={12} color="var(--ds-text-dim)" />{AUDIT.startDate}</span>} />
                                            <DetailItem label="Planned End Date" value={<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Calendar size={12} color="var(--ds-text-dim)" />{AUDIT.endDate}</span>} />
                                            <DetailItem label="Owner" value={AUDIT.owner} />
                                            <DetailItem label="Estimated Hours" value={<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Timer size={12} color="var(--ds-text-dim)" />{AUDIT.estHours}</span>} />
                                            <DetailItem label="Budget Hours" value={<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Wallet size={12} color="var(--ds-text-dim)" />{AUDIT.budgetHours}</span>} />
                                            <DetailItem label="Actual Hours" value={AUDIT.actualHours} />
                                            <DetailItem label="Budget Source" value={AUDIT.budgetSource} />
                                        </dl>
                                    )}
                                </div>

                                {/* Footer */}
                                <div style={{ padding: "10px 20px", borderTop: "1px solid var(--ds-border-subtle)", background: "var(--ds-surface-raised)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--ds-text-muted)" }}>
                                    <span>Created by <strong style={{ color: "var(--ds-text-secondary)", fontWeight: 700 }}>{AUDIT.createdBy}</strong> · {AUDIT.createdOn}</span>
                                    <span style={{ fontFamily: "var(--ds-mono)", fontSize: 11 }}>Updated {AUDIT.updatedOn}</span>
                                </div>
                            </Card>

                            {/* Team + Progress */}
                            <div className="ad-bottom-grid">

                                {/* Team card */}
                                <Card>
                                    <CardHead>
                                        <Users size={14} strokeWidth={2} color="var(--ds-text-muted)" />
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ds-text-secondary)" }}>Audit Team</span>
                                    </CardHead>
                                    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "var(--ds-surface-raised)", border: "1px solid var(--ds-border-subtle)" }}>
                                            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#2E5599,#4a7acc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                                                {AUDIT.lead.initials}
                                            </div>
                                            <div style={{ minWidth: 0 }}>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ds-text-primary)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{AUDIT.lead.name}</p>
                                                <p style={{ fontSize: 11, color: "var(--ds-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Lead Auditor · {AUDIT.lead.email}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }}>Members</p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                {AUDIT.members.map((m, i) => (
                                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 10px", borderRadius: 8, border: "1px solid var(--ds-border)", background: "var(--ds-surface)" }}>
                                                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: m.bgColor, color: m.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, flexShrink: 0 }}>{m.initials}</div>
                                                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ds-text-secondary)" }}>{m.role}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Progress card */}
                                <Card>
                                    <CardHead>
                                        <BarChart3 size={14} strokeWidth={2} color="var(--ds-text-muted)" />
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ds-text-secondary)" }}>Phase Progress</span>
                                    </CardHead>
                                    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                                        <ProgressRow label="Planning" percent={100} />
                                        <ProgressRow label="Fieldwork" percent={0} />
                                        <ProgressRow label="Reporting" percent={0} />
                                        <ProgressRow label="Closure" percent={0} />
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