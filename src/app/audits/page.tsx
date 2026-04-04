"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Plus, Clipboard, Clock, PlayCircle, CheckCircle2,
  List, LayoutGrid, MoreHorizontal, Link2, Calendar, ChevronDown,
  ShieldAlert, Activity
} from "lucide-react";

// ─── Shared design-system CSS ────────────────────────────────────────────────
export const DESIGN_SYSTEM_CSS = `
/* ── Light tokens ───────────────────────────────────────────────── */
:root {
  --ds-font:              'Inter', 'DM Sans', system-ui, -apple-system, sans-serif;
  --ds-mono:              'JetBrains Mono', 'DM Mono', ui-monospace, monospace;

  --ds-bg:                #f8fafc;
  --ds-surface:           #ffffff;
  --ds-surface-hover:     #f8fafc;
  --ds-border:            #e2e8f0;
  --ds-border-subtle:     #f1f5f9;
  --ds-ring:              rgba(46,85,153,0.15);

  --ds-text-primary:      #0f172a;
  --ds-text-secondary:    #334155;
  --ds-text-muted:        #64748b;
  --ds-text-dim:          #94a3b8;

  --ds-indigo:            #2E5599;
  --ds-indigo-hover:      #244580;
  --ds-indigo-bg:         rgba(46,85,153,0.06);
  --ds-indigo-border:     rgba(46,85,153,0.15);

  --ds-amber:             #d97706;
  --ds-amber-bg:          #fffbeb;
  --ds-amber-border:      #fde68a;
  
  --ds-green:             #059669;
  --ds-green-bg:          #ecfdf5;
  --ds-green-border:      #a7f3d0;
  
  --ds-red:               #dc2626;
  --ds-red-bg:            #fef2f2;
  --ds-red-border:        #fecaca;
  
  --ds-sky:               #0284c7;
  --ds-sky-bg:            #f0f9ff;
  --ds-sky-border:        #bae6fd;

  --ds-thead-bg:          #f8fafc;
  --ds-row-hover:         #f8fafc;
  --ds-progress-track:    #f1f5f9;
  --ds-checkbox:          #cbd5e1;
  --ds-avatar-border:     #ffffff;
  --ds-avatar-extra-bg:   #f1f5f9;
  --ds-avatar-extra-tx:   #475569;
  --ds-input-bg:          #ffffff;

  --ds-card-shadow:       0 1px 2px 0 rgb(0 0 0 / 0.05);
  --ds-hover-shadow:      0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --ds-btn-shadow:        0 1px 2px 0 rgba(46,85,153,0.2);
}

/* ── Dark tokens ────────────────────────────────────────────────── */
.dark {
  --ds-bg:                #0b1120;
  --ds-surface:           #111827;
  --ds-surface-hover:     #172033;
  --ds-border:            #1f2937;
  --ds-border-subtle:     #1e293b;
  --ds-ring:              rgba(123,163,224,0.15);

  --ds-text-primary:      #f8fafc;
  --ds-text-secondary:    #cbd5e1;
  --ds-text-muted:        #94a3b8;
  --ds-text-dim:          #475569;

  --ds-indigo:            #7ba3e0;
  --ds-indigo-hover:      #93b6eb;
  --ds-indigo-bg:         rgba(123,163,224,0.1);
  --ds-indigo-border:     rgba(123,163,224,0.2);

  --ds-amber:             #fbbf24;
  --ds-amber-bg:          rgba(245,158,11,0.1);
  --ds-amber-border:      rgba(245,158,11,0.2);
  
  --ds-green:             #34d399;
  --ds-green-bg:          rgba(16,185,129,0.1);
  --ds-green-border:      rgba(16,185,129,0.2);
  
  --ds-red:               #f87171;
  --ds-red-bg:            rgba(239,68,68,0.1);
  --ds-red-border:        rgba(239,68,68,0.2);

  --ds-sky:               #38bdf8;
  --ds-sky-bg:            rgba(14,165,233,0.1);
  --ds-sky-border:        rgba(14,165,233,0.2);

  --ds-thead-bg:          #0f172a;
  --ds-row-hover:         #172033;
  --ds-progress-track:    #1e293b;
  --ds-checkbox:          #334155;
  --ds-avatar-border:     #111827;
  --ds-avatar-extra-bg:   #1e293b;
  --ds-avatar-extra-tx:   #94a3b8;
  --ds-input-bg:          #0f172a;

  --ds-card-shadow:       0 1px 3px 0 rgb(0 0 0 / 0.4);
  --ds-hover-shadow:      0 4px 6px -1px rgb(0 0 0 / 0.4);
  --ds-btn-shadow:        0 1px 2px 0 rgba(0,0,0,0.5);
}

/* ── Base ────────────────────────────────────────────────────────── */
.hide-sb::-webkit-scrollbar { display: none; }
.hide-sb { -ms-overflow-style: none; scrollbar-width: none; }

/* ── Specific Component Styles ───────────────────────────────────── */
.ae-section { width: 100%; padding-bottom: 32px; font-family: var(--ds-font); }

.ae-stat-grid { display: grid; grid-template-columns: repeat(1,1fr); gap: 16px; margin-bottom: 32px; }
@media(min-width: 600px)  { .ae-stat-grid { grid-template-columns: repeat(2,1fr); } }
@media(min-width: 1024px) { .ae-stat-grid { grid-template-columns: repeat(4,1fr); } }

.ae-table-wrap { 
  background: var(--ds-surface); 
  border: 1px solid var(--ds-border); 
  border-radius: 12px; 
  overflow-x: auto; 
  box-shadow: var(--ds-card-shadow); 
}

.ae-row { transition: all 0.2s ease; cursor: pointer; }
.ae-row:hover { background: var(--ds-row-hover); }
.ae-row:hover .ae-name { color: var(--ds-indigo) !important; }

.ae-th { 
  padding: 14px 24px; 
  font-size: 12px; 
  font-weight: 600; 
  color: var(--ds-text-muted); 
  text-align: left; 
  white-space: nowrap; 
}
.ae-th-sort { cursor: pointer; transition: color 0.15s; }
.ae-th-sort:hover { color: var(--ds-text-primary); }

.ae-btn-new { 
  display: flex; align-items: center; gap: 8px; 
  background: var(--ds-indigo); color: #fff; 
  border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; 
  padding: 9px 18px; font-size: 14px; font-weight: 500; 
  cursor: pointer; box-shadow: var(--ds-btn-shadow);
  transition: all 0.2s ease; 
}
.ae-btn-new:hover { background: var(--ds-indigo-hover); transform: translateY(-1px); box-shadow: 0 4px 12px var(--ds-indigo-bg); }

.ae-pill { 
  border-radius: 999px; padding: 6px 14px; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s ease; white-space: nowrap; 
  border: 1px solid transparent; background: transparent; color: var(--ds-text-muted); 
}
.ae-pill.active { background: var(--ds-indigo-bg); color: var(--ds-indigo); font-weight: 600; }
.ae-pill:not(.active):hover { color: var(--ds-text-primary); background: var(--ds-surface-hover); }

.ae-search-wrap { position: relative; width: min(320px, 100%); flex-shrink: 0; }
.ae-search { 
  width: 100%; background: var(--ds-input-bg); 
  border: 1px solid var(--ds-border); border-radius: 8px; 
  padding: 10px 14px 10px 38px; font-size: 13px; color: var(--ds-text-primary); 
  outline: none; transition: all 0.2s; box-shadow: var(--ds-card-shadow);
}
.ae-search:focus { border-color: var(--ds-indigo); box-shadow: 0 0 0 3px var(--ds-ring); }
.ae-search::placeholder { color: var(--ds-text-dim); }

.ae-view-toggle { display: flex; background: var(--ds-input-bg); border: 1px solid var(--ds-border); border-radius: 8px; padding: 4px; box-shadow: var(--ds-card-shadow); }
.ae-view-btn { background: transparent; border: none; border-radius: 6px; padding: 6px; color: var(--ds-text-muted); cursor: pointer; transition: all 0.15s; }
.ae-view-btn.active { background: var(--ds-bg); color: var(--ds-text-primary); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

.ae-icon-btn { background: transparent; border: none; border-radius: 6px; padding: 6px; color: var(--ds-text-muted); cursor: pointer; transition: all 0.15s; }
.ae-icon-btn:hover { background: var(--ds-border-subtle); color: var(--ds-text-primary); }

.ae-badge {
  display: inline-flex; align-items: center; gap: 6px; 
  border-radius: 999px; padding: 4px 10px; 
  font-size: 12px; font-weight: 500; white-space: nowrap;
}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const AUDITS = [
  { id: "69CA672B", name: "Q1 Financial Controls Testing", type: "Operational", status: "Draft", progress: 0, start: "Mar 30", end: "Apr 29", links: 0, team: [{ init: "LA", color: "#2E5599" }, { init: "JS", color: "#0ea5e9" }, { init: "MR", color: "#10b981" }], extraTeam: 3, risk: "Low" },
  { id: "69CA66F3", name: "IT Security & Access Management", type: "Operational", status: "Planning", progress: 15, start: "Mar 30", end: "Apr 29", links: 0, team: [{ init: "LA", color: "#2E5599" }, { init: "JS", color: "#0ea5e9" }, { init: "MR", color: "#10b981" }, { init: "TK", color: "#f59e0b" }], extraTeam: 4, risk: "Medium" },
  { id: "69CA637D", name: "Procurement & Vendor Management Audit", type: "Operational", status: "Fieldwork", progress: 58, start: "Mar 30", end: "Jun 30", links: 1, team: [{ init: "LA", color: "#2E5599" }, { init: "JS", color: "#0ea5e9" }, { init: "MR", color: "#10b981" }], extraTeam: 3, risk: "High" },
  { id: "69C7C8B4", name: "Employee Onboarding & Offboarding — FY26", type: "Compliance", status: "Fieldwork", progress: 42, start: "Mar 28", end: "Apr 30", links: 2, team: [{ init: "A", color: "#ec4899" }], extraTeam: 0, risk: "Medium" },
];

const STATUS_CFG: Record<string, { bg: string; border: string; text: string; icon: React.ElementType }> = {
  Draft: { bg: "var(--ds-bg)", border: "var(--ds-border)", text: "var(--ds-text-secondary)", icon: Clipboard },
  Fieldwork: { bg: "var(--ds-sky-bg)", border: "var(--ds-sky-border)", text: "var(--ds-sky)", icon: PlayCircle },
  Planning: { bg: "var(--ds-amber-bg)", border: "var(--ds-amber-border)", text: "var(--ds-amber)", icon: Clock },
};

const RISK_CFG: Record<string, { color: string; bg: string }> = {
  Low: { color: "var(--ds-green)", bg: "var(--ds-green-bg)" },
  Medium: { color: "var(--ds-amber)", bg: "var(--ds-amber-bg)" },
  High: { color: "var(--ds-red)", bg: "var(--ds-red-bg)" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ value, animate }: { value: number; animate: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), animate ? 260 : 0); return () => clearTimeout(t); }, [value, animate]);
  const color = value === 0 ? "var(--ds-border)" : value < 40 ? "var(--ds-amber)" : value < 80 ? "var(--ds-sky)" : "var(--ds-green)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 120 }}>
      <div style={{ height: 6, background: "var(--ds-progress-track)", borderRadius: 99, overflow: "hidden", flex: 1 }}>
        <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: 99, transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--ds-mono)", color: value === 0 ? "var(--ds-text-dim)" : "var(--ds-text-secondary)", width: 32 }}>{value}%</span>
    </div>
  );
}

function Avatar({ init, color, index }: { init: string; color: string; index: number }) {
  return (
    <div style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid var(--ds-avatar-border)", background: `${color}15`, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0, zIndex: 10 - index, position: "relative", marginLeft: index > 0 ? -10 : 0 }}>
      {init}
    </div>
  );
}

function StatCard({ label, value, sub, subColor, icon, delay = 0 }: { label: string; value: number; sub: string; subColor: string; icon: React.ReactNode; delay?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      background: "var(--ds-surface)", border: "1px solid var(--ds-border)", borderRadius: 12, padding: "20px",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)",
      boxShadow: "var(--ds-card-shadow)", cursor: "default"
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--ds-hover-shadow)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--ds-card-shadow)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ds-text-muted)", marginBottom: 8 }}>{label}</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: "var(--ds-text-primary)", lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</p>
          {sub && <p style={{ fontSize: 13, fontWeight: 500, color: subColor || "var(--ds-text-muted)", marginTop: 10 }}>{sub}</p>}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: "var(--ds-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12 }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function Badge({ children, bg, border, color }: { children: React.ReactNode, bg: string, border: string, color: string }) {
  return (
    <span className="ae-badge" style={{ background: bg, border: `1px solid ${border}`, color: color }}>
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AuditExecutionPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("list");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const handleRowClick = useCallback((id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".no-nav")) return;
    router.push(`/audits/${id}`);
  }, [router]);

  const filtered = AUDITS.filter(a =>
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus === "All Statuses" || a.status === filterStatus)
  );

  return (
    <>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: DESIGN_SYSTEM_CSS }} />

      <section className="ae-section">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(-4px)", transition: "all 0.5s ease" }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--ds-text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Audit Execution</h1>
            <p style={{ fontSize: 14, color: "var(--ds-text-muted)", marginTop: 6 }}>Manage methodologies and fieldwork for {AUDITS.length} active engagements.</p>
          </div>
          <button className="ae-btn-new"><Plus size={18} strokeWidth={2} /> New Audit</button>
        </div>

        {/* Stat cards */}
        <div className="ae-stat-grid">
          <StatCard label="Total Audits" value={4} sub="↑ 2 this quarter" subColor="var(--ds-green)" delay={100} icon={<Clipboard size={20} strokeWidth={1.5} color="var(--ds-text-secondary)" />} />
          <StatCard label="In Planning" value={1} sub="Next stage due soon" subColor="var(--ds-amber)" delay={180} icon={<Clock size={20} strokeWidth={1.5} color="var(--ds-text-secondary)" />} />
          <StatCard label="In Fieldwork" value={2} sub="50% avg. progress" subColor="var(--ds-sky)" delay={260} icon={<PlayCircle size={20} strokeWidth={1.5} color="var(--ds-text-secondary)" />} />
          <StatCard label="Completed" value={0} sub="Efficiency: 98%" subColor="var(--ds-green)" delay={340} icon={<CheckCircle2 size={20} strokeWidth={1.5} color="var(--ds-text-secondary)" />} />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 16, flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
          <div className="ae-search-wrap">
            <Search size={16} strokeWidth={1.5} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ds-text-dim)" }} />
            <input className="ae-search" type="text" placeholder="Search by name or ID…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", overflowX: "auto", paddingBottom: 2 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {["All Statuses", "Draft", "Planning", "Fieldwork"].map(s => (
                <button key={s} className={`ae-pill${filterStatus === s ? " active" : ""}`} onClick={() => setFilterStatus(s)}>{s}</button>
              ))}
            </div>
            <div style={{ width: 1, height: 24, background: "var(--ds-border)", flexShrink: 0 }} />
            <div className="ae-view-toggle">
              {([{ id: "list", Icon: List }, { id: "grid", Icon: LayoutGrid }] as const).map(({ id, Icon }) => (
                <button key={id} className={`ae-view-btn${activeView === id ? " active" : ""}`} onClick={() => setActiveView(id)}><Icon size={16} strokeWidth={1.5} /></button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="ae-table-wrap" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
            <thead>
              <tr style={{ background: "var(--ds-thead-bg)", borderBottom: "1px solid var(--ds-border)" }}>
                <th className="ae-th" style={{ width: 48, paddingLeft: 24 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--ds-checkbox)", background: "var(--ds-surface)" }} />
                </th>
                {["Audit Name", "Type", "Status", "Risk", "Progress", "Timeline", "Team", " "].map(h => (
                  <th key={h} className={`ae-th${["Audit Name", "Status", "Timeline"].includes(h) ? " ae-th-sort" : ""}`}>
                    {["Audit Name", "Status", "Timeline"].includes(h)
                      ? <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{h} <ChevronDown size={14} strokeWidth={2} style={{ opacity: 0.5 }} /></span>
                      : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((audit, idx) => {
                const sc = STATUS_CFG[audit.status] ?? STATUS_CFG.Draft;
                const rc = RISK_CFG[audit.risk] ?? RISK_CFG.Low;
                const StatusIcon = sc.icon;

                return (
                  <tr
                    key={audit.id}
                    className="ae-row"
                    onClick={e => handleRowClick(audit.id, e)}
                    style={{ borderBottom: idx < filtered.length - 1 ? "1px solid var(--ds-border-subtle)" : "none" }}
                  >
                    {/* Checkbox */}
                    <td style={{ padding: "16px 16px 16px 24px" }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--ds-checkbox)", background: "var(--ds-surface)" }} />
                    </td>

                    {/* Name + ID */}
                    <td style={{ padding: "16px 24px" }}>
                      <div className="ae-name" style={{ fontWeight: 500, color: "var(--ds-text-primary)", fontSize: 14, marginBottom: 6, lineHeight: 1.3, transition: "color 0.15s" }}>{audit.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "var(--ds-mono)", fontSize: 12, color: "var(--ds-text-muted)" }}>{audit.id}</span>
                        {audit.links > 0 && (
                          <span className="no-nav" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--ds-text-muted)", background: "var(--ds-bg)", padding: "2px 6px", borderRadius: 4, border: "1px solid var(--ds-border-subtle)" }}>
                            <Link2 size={12} strokeWidth={2} /> {audit.links}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Type */}
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ds-text-secondary)" }}>
                        <ShieldAlert size={14} strokeWidth={1.5} color="var(--ds-text-muted)" />
                        {audit.type}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "16px 24px" }}>
                      <Badge bg={sc.bg} border={sc.border} color={sc.text}>
                        <StatusIcon size={12} strokeWidth={2.5} />
                        {audit.status}
                      </Badge>
                    </td>

                    {/* Risk */}
                    <td style={{ padding: "16px 24px" }}>
                      <Badge bg={rc.bg} border="transparent" color={rc.color}>
                        {audit.risk}
                      </Badge>
                    </td>

                    {/* Progress */}
                    <td style={{ padding: "16px 24px" }}><ProgressBar value={audit.progress} animate={loaded} /></td>

                    {/* Timeline */}
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Calendar size={14} strokeWidth={1.5} style={{ color: "var(--ds-text-dim)", flexShrink: 0 }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: 13, color: "var(--ds-text-primary)", fontWeight: 500 }}>{audit.start}</span>
                          <span style={{ fontSize: 12, color: "var(--ds-text-muted)" }}>End: {audit.end}</span>
                        </div>
                      </div>
                    </td>

                    {/* Team */}
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {audit.team.slice(0, 3).map((m, i) => (
                          <Avatar key={i} init={m.init} color={m.color} index={i} />
                        ))}
                        {audit.extraTeam > 0 && (
                          <div style={{
                            marginLeft: -10, width: 30, height: 30, borderRadius: "50%", zIndex: 0, position: "relative",
                            background: "var(--ds-avatar-extra-bg)", border: "2px solid var(--ds-avatar-border)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 600, color: "var(--ds-avatar-extra-tx)"
                          }}>
                            +{audit.extraTeam}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "16px 24px", textAlign: "right" }}>
                      <button className="ae-icon-btn no-nav" onClick={e => e.stopPropagation()} title="More options"><MoreHorizontal size={18} strokeWidth={1.5} /></button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} style={{ padding: "64px 24px", textAlign: "center" }}>
                    <p style={{ color: "var(--ds-text-muted)", fontSize: 14, marginBottom: 16 }}>No audits match your current filters.</p>
                    <button onClick={() => { setSearch(""); setFilterStatus("All Statuses"); }} style={{ background: "var(--ds-surface)", border: "1px solid var(--ds-border)", borderRadius: 8, padding: "8px 16px", color: "var(--ds-text-primary)", fontSize: 13, fontWeight: 500, cursor: "pointer", boxShadow: "var(--ds-card-shadow)", transition: "all 0.2s" }}>Clear filters</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div style={{ borderTop: "1px solid var(--ds-border)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--ds-thead-bg)" }}>
            <span style={{ fontSize: 13, color: "var(--ds-text-muted)" }}>Showing <strong style={{ color: "var(--ds-text-primary)", fontWeight: 500 }}>{filtered.length}</strong> of {AUDITS.length} engagements</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="ae-view-btn" disabled style={{ opacity: 0.5 }}>Prev</button>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--ds-surface)", border: "1px solid var(--ds-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: "var(--ds-text-primary)", boxShadow: "var(--ds-card-shadow)" }}>1</div>
              <button className="ae-view-btn" disabled style={{ opacity: 0.5 }}>Next</button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}