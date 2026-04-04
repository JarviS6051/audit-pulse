"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    ArrowLeft, Clock, Download, Trash2, CheckCircle2, FlaskConical,
    Target, Shield, AlertTriangle, FileText, CheckSquare, Zap, Search,
    Lock, CalendarDays, CalendarRange, Filter, ChevronDown, Circle,
    ArrowRight, Users, LayoutGrid, LucideIcon, MoreHorizontal, Settings2, SlidersHorizontal
} from "lucide-react";

// ─── Local Page Design System ────────────────────────────────────────────────
const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', Consolas, monospace;

  /* Premium Light Theme */
  --bg-page: #f8fafc; 
  --bg-surface: #ffffff;
  --bg-surface-hover: #f1f5f9;
  --bg-surface-active: #e2e8f0;
  
  --border-light: #f8fafc;
  --border-base: #e2e8f0;
  --border-strong: #cbd5e1;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --text-dim: #94a3b8;

  /* Brand Accent: Vibrant Indigo */
  --accent-brand: #4f46e5;
  --accent-brand-hover: #4338ca;
  --accent-brand-bg: #e0e7ff;
  --accent-brand-text: #3730a3;

  /* Semantic Colors */
  --success-bg: #ecfdf5;
  --success-text: #059669;
  --success-border: #a7f3d0;
  
  --danger-bg: #fef2f2;
  --danger-text: #dc2626;
  --danger-border: #fecaca;
  
  --warning-bg: #fffbeb;
  --warning-text: #d97706;
  --warning-border: #fde68a;

  --info-bg: #f0f9ff;
  --info-text: #0284c7;
  --info-border: #bae6fd;

  /* Shadows & Radii */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-pill: 9999px;
}

body { background-color: var(--bg-page); margin: 0; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }

.inner-page-container { display: flex; flex-direction: column; min-height: 100vh; font-family: var(--font-sans); }

/* Compact Header */
.top-header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-base);
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  position: relative;
}

/* Horizontal Navigation */
.horizontal-nav-bar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-base);
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 32px;
  position: sticky;
  top: 0;
  z-index: 15;
  box-shadow: var(--shadow-sm);
  overflow-x: auto;
}
.horizontal-nav-bar::-webkit-scrollbar { display: none; }

.nav-group {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}
.nav-group::after {
  content: '';
  position: absolute;
  right: -16px;
  height: 20px;
  width: 1px;
  background: var(--border-base);
}
.nav-group:last-child::after { display: none; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: none;
  border-top: none; border-left: none; border-right: none;
}
.nav-item:hover:not(:disabled) { color: var(--text-primary); }
.nav-item.active {
  color: var(--accent-brand);
  font-weight: 600;
  border-bottom-color: var(--accent-brand);
}
.nav-item:disabled { cursor: not-allowed; opacity: 0.5; }

/* Main Workspace */
.workspace-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Data Table Grid Setup */
.data-table-container {
  background: var(--bg-surface);
  border: 1px solid var(--border-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.data-grid-row {
  display: grid;
  /* Perfect alignment columns: Checkbox | ID | Control Name | Nature | Type | Status | Result | Actions */
  grid-template-columns: 40px 100px minmax(250px, 1fr) 110px 110px 120px 160px 48px;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-base);
  gap: 16px;
  transition: background 0.15s;
}
.data-grid-row:hover:not(.grid-header) { background: var(--bg-surface-hover); }
.data-grid-row:last-child { border-bottom: none; }

.grid-header {
  background: var(--bg-surface-hover);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 16px 20px;
}

.grid-group-header {
  background: var(--bg-page);
  border-bottom: 1px solid var(--border-base);
  padding: 12px 20px;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.search-input { 
  width: 100%; 
  padding: 10px 14px 10px 36px; 
  border: 1px solid var(--border-base); 
  border-radius: var(--radius-sm); 
  font-size: 14px; 
  outline: none; 
  transition: all 0.2s;
}
.search-input:focus { border-color: var(--accent-brand); box-shadow: 0 0 0 3px var(--accent-brand-bg); }
`;

// ─── TypeScript Interfaces ───────────────────────────────────────────────────
interface Step { id: number; label: string; status: "completed" | "active" | "upcoming"; subtitle?: string; }
interface NavItemType { id: string; label: string; icon: LucideIcon; locked?: boolean; }
interface NavGroup { heading: string; items: NavItemType[]; }
type BtnVariant = "default" | "primary" | "danger" | "ghost";
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon?: LucideIcon; label?: string; variant?: BtnVariant; }
interface ControlItem { id: string; name: string; nature: "Preventive" | "Detective"; type: "Manual" | "Automated"; status: "Completed" | "In Progress" | "Not Started"; result: "No Exception" | "Exception Noted" | "Pending"; }
interface ControlGroup { frequency: string; icon: LucideIcon; controls: ControlItem[]; }

// ─── Data ────────────────────────────────────────────────────────────────────
const AUDIT = { id: "GDPR-2026", title: "General Data Protection Regulation", type: "Compliance Audit", tag: "Framework-mapped" };

const HORIZONTAL_NAV: NavGroup[] = [
    { heading: "ENGAGEMENT", items: [{ id: "overview", label: "Overview", icon: LayoutGrid }, { id: "planning", label: "Planning", icon: Target }, { id: "risk", label: "Risks", icon: Shield }] },
    { heading: "EXECUTION", items: [{ id: "walkthroughs", label: "Walkthroughs", icon: CheckSquare }, { id: "testing", label: "Control Testing", icon: FlaskConical }, { id: "time", label: "Time", icon: Clock }] },
    { heading: "REPORTING", items: [{ id: "issues", label: "Issues", icon: AlertTriangle, locked: true }, { id: "report", label: "Report", icon: FileText, locked: true }, { id: "closure", label: "Closure", icon: Lock, locked: true }] },
];

const TESTING_DATA: ControlGroup[] = [
    {
        frequency: "Transaction Controls", icon: Zap,
        controls: [
            { id: "CM-01", name: "Change Authorization & CAB Approval", nature: "Preventive", type: "Manual", status: "Completed", result: "Exception Noted" },
            { id: "IT-02", name: "Emergency Change Management Process", nature: "Preventive", type: "Manual", status: "Completed", result: "No Exception" },
        ]
    },
    {
        frequency: "Monthly Controls", icon: CalendarRange,
        controls: [
            { id: "C1-VEN", name: "Vendor Onboarding & Approval Review", nature: "Preventive", type: "Manual", status: "Completed", result: "No Exception" },
            { id: "OPS-01", name: "Backup Monitoring & Restoration Tests", nature: "Detective", type: "Automated", status: "In Progress", result: "Pending" },
            { id: "OPS-03", name: "Incident & Problem Management Logs", nature: "Preventive", type: "Manual", status: "Completed", result: "Exception Noted" },
        ]
    },
    {
        frequency: "Quarterly Controls", icon: CalendarDays,
        controls: [
            { id: "AM-03", name: "Periodic Access Recertification (UAR)", nature: "Detective", type: "Manual", status: "Not Started", result: "Pending" },
        ]
    }
];

const STEPS: Step[] = [
    { id: 1, label: "Planning", status: "completed" },
    { id: 2, label: "Fieldwork", status: "active" },
    { id: 3, label: "Reporting", status: "upcoming" },
    { id: 4, label: "Closed", status: "upcoming" },
] as const;

// ─── Micro-Components ────────────────────────────────────────────────────────
function Badge({ variant, children }: { variant: string, children: React.ReactNode }) {
    const isBrand = variant === "brand";
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "4px 10px", borderRadius: "var(--radius-pill)",
            fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap",
            background: isBrand ? "var(--accent-brand-bg)" : `var(--${variant}-bg)`,
            color: isBrand ? "var(--accent-brand-text)" : `var(--${variant}-text)`,
            border: `1px solid ${isBrand ? "rgba(79, 70, 229, 0.2)" : `var(--${variant}-border)`}`
        }}>
            {children}
        </span>
    );
}

function Btn({ icon: Icon, label, variant = "default", style, ...rest }: BtnProps) {
    const base: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
        borderRadius: "var(--radius-sm)", fontSize: "13px", fontWeight: 600,
        cursor: "pointer", transition: "all 0.15s", padding: label ? "8px 14px" : "8px",
        outline: "none", border: "none"
    };

    const variants: Record<string, React.CSSProperties> = {
        default: { background: "var(--bg-surface)", border: "1px solid var(--border-base)", color: "var(--text-primary)", boxShadow: "var(--shadow-xs)" },
        primary: { background: "var(--accent-brand)", color: "#fff", boxShadow: "var(--shadow-sm)" },
        ghost: { background: "transparent", color: "var(--text-secondary)", padding: label ? "8px 12px" : "8px" },
    };

    return (
        <button
            style={{ ...base, ...(variants[variant] || variants.default), ...style }}
            onMouseEnter={(e) => {
                if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-brand-hover)';
                else if (variant === 'default') e.currentTarget.style.background = 'var(--bg-surface-hover)';
                else if (variant === 'ghost') { e.currentTarget.style.background = 'var(--bg-surface-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }
            }}
            onMouseLeave={(e) => {
                if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-brand)';
                else if (variant === 'default') e.currentTarget.style.background = 'var(--bg-surface)';
                else if (variant === 'ghost') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }
            }}
            {...rest}
        >
            {Icon && <Icon size={16} strokeWidth={2.5} />}
            {label && <span>{label}</span>}
        </button>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AuditWorkspace() {
    return (
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading workspace...</div>}>
            <AuditExecutionUI />
        </Suspense>
    );
}

function AuditExecutionUI() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeView = searchParams?.get("tab") || "testing";
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const handleNavClick = (tabId: string) => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("tab", tabId);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
            <div className="inner-page-container">

                {/* 1. Master Header */}
                <header className="top-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <button onClick={() => window.history.back()} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", borderRadius: "50%" }}>
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent-brand)" }}>{AUDIT.id}</span>
                                <Badge variant="warning">FIELDWORK</Badge>
                            </div>
                            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.01em" }}>
                                {AUDIT.title}
                            </h1>
                        </div>
                    </div>

                    {/* Compact Stepper */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-page)", padding: "4px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-base)" }}>
                            {STEPS.map((step, i) => {
                                const isCompleted = step.status === "completed";
                                const isActive = step.status === "active";
                                return (
                                    <React.Fragment key={step.id}>
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "var(--radius-pill)",
                                            background: isActive ? "var(--bg-surface)" : "transparent",
                                            boxShadow: isActive ? "var(--shadow-xs)" : "none",
                                            border: isActive ? "1px solid var(--border-base)" : "1px solid transparent"
                                        }}>
                                            {isCompleted ? <CheckCircle2 size={16} color="var(--success-text)" /> : isActive ? <Circle size={10} fill="var(--accent-brand)" color="var(--accent-brand)" /> : <Lock size={14} color="var(--text-dim)" />}
                                            <span style={{ fontSize: "13px", fontWeight: isActive ? 700 : 500, color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}>
                                                {step.label}
                                            </span>
                                        </div>
                                        {i < STEPS.length - 1 && <div style={{ width: "16px", height: "1px", background: "var(--border-strong)" }} />}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <Btn label="Advance" icon={ArrowRight} variant="primary" style={{ borderRadius: "var(--radius-pill)" }} />
                    </div>
                </header>

                {/* 2. Horizontal Navigation */}
                <nav className="horizontal-nav-bar">
                    {HORIZONTAL_NAV.map((group, gIdx) => (
                        <div key={gIdx} className="nav-group">
                            {/* Optional Group Label: <span style={{fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", marginRight: "8px"}}>{group.heading}</span> */}
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    disabled={item.locked}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                                >
                                    <item.icon size={16} strokeWidth={activeView === item.id ? 2.5 : 2} />
                                    {item.label}
                                    {item.locked && <Lock size={12} />}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* 3. Main Workspace Area */}
                <main className="workspace-container animate-fade-in">
                    {activeView === "testing" ? (
                        <>
                            {/* Toolbar */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                                    <div style={{ position: "relative", width: "320px" }}>
                                        <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                                        <input type="text" className="search-input" placeholder="Search controls by ID or name..." />
                                    </div>
                                    <Btn icon={SlidersHorizontal} label="Filters" variant="default" />
                                    <Btn icon={Users} label="Owners" variant="default" />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginRight: "8px" }}>
                                        Overall Progress: <span style={{ color: "var(--success-text)", fontWeight: 800 }}>66%</span> (4/6)
                                    </div>
                                    <Btn icon={Download} label="Export" variant="ghost" />
                                    <Btn icon={Settings2} variant="ghost" />
                                </div>
                            </div>

                            {/* Data Grid Table */}
                            <div className="data-table-container">
                                {/* Table Header */}
                                <div className="data-grid-row grid-header">
                                    <input type="checkbox" style={{ width: "16px", height: "16px", accentColor: "var(--accent-brand)" }} />
                                    <span>Control ID</span>
                                    <span>Description</span>
                                    <span>Nature</span>
                                    <span>Type</span>
                                    <span>Status</span>
                                    <span>Testing Result</span>
                                    <span style={{ textAlign: "center" }}>...</span>
                                </div>

                                {/* Table Body / Grouped Rows */}
                                {TESTING_DATA.map((group, gIdx) => (
                                    <React.Fragment key={gIdx}>
                                        <div className="grid-group-header">
                                            <group.icon size={16} color="var(--text-muted)" />
                                            {group.frequency}
                                            <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 500, marginLeft: "8px" }}>
                                                ({group.controls.length})
                                            </span>
                                        </div>

                                        {group.controls.map((control, cIdx) => (
                                            <div key={cIdx} className="data-grid-row">
                                                {/* Checkbox */}
                                                <input type="checkbox" style={{ width: "16px", height: "16px", accentColor: "var(--accent-brand)" }} />

                                                {/* ID */}
                                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
                                                    {control.id}
                                                </span>

                                                {/* Name */}
                                                <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {control.name}
                                                </span>

                                                {/* Nature */}
                                                <div><Badge variant="info">{control.nature}</Badge></div>

                                                {/* Type */}
                                                <div><Badge variant="brand">{control.type}</Badge></div>

                                                {/* Status */}
                                                <div>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: control.status === "Completed" ? "var(--success-text)" : control.status === "In Progress" ? "var(--warning-text)" : "var(--text-muted)" }}>
                                                        {control.status === "Completed" ? <CheckCircle2 size={14} /> : control.status === "In Progress" ? <Clock size={14} /> : <Circle size={14} />}
                                                        {control.status}
                                                    </span>
                                                </div>

                                                {/* Result */}
                                                <div>
                                                    {control.result === "Pending" ? (
                                                        <span style={{ fontSize: "13px", color: "var(--text-dim)", fontWeight: 500 }}>-</span>
                                                    ) : (
                                                        <Badge variant={control.result === "Exception Noted" ? "danger" : "success"}>{control.result}</Badge>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px", borderRadius: "4px" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-muted)"; }}
                                                    >
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: "100px 40px", textAlign: "center", background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--border-strong)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--bg-page)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <LayoutGrid size={28} color="var(--text-muted)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px 0", textTransform: "capitalize" }}>
                                    {activeView.replace("-", " ")}
                                </h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
                                    This module is currently pending integration. Navigate back to Control Testing to resume fieldwork.
                                </p>
                            </div>
                            <Btn label="Return to Testing" variant="primary" onClick={() => handleNavClick("testing")} style={{ marginTop: "16px" }} />
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}