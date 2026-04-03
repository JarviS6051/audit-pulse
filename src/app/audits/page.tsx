"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Plus, Clipboard, Clock, PlayCircle, CheckCircle2,
  List, LayoutGrid, MoreHorizontal, Link2, Calendar, ChevronDown,
} from "lucide-react";

// ─── Shared design-system CSS ────────────────────────────────────────────────
export const DESIGN_SYSTEM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Light tokens ───────────────────────────────────────────────── */
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

  --ds-thead-bg:          rgba(0,0,0,0.025);
  --ds-row-hover:         rgba(46,85,153,0.04);
  --ds-progress-track:    rgba(0,0,0,0.07);
  --ds-checkbox:          #cbd5e1;
  --ds-avatar-border:     #ffffff;
  --ds-avatar-extra-bg:   #e2e8f0;
  --ds-avatar-extra-tx:   #64748b;
  --ds-input-bg:          #ffffff;
  --ds-table-divider:     rgba(0,0,0,0.05);
  --ds-footer-border:     rgba(0,0,0,0.06);
  --ds-id-bg:             rgba(0,0,0,0.04);
  --ds-id-border:         rgba(0,0,0,0.07);
  --ds-id-color:          #94a3b8;
  --ds-links-border:      rgba(0,0,0,0.10);

  --ds-stat-bg:           linear-gradient(145deg,#ffffff 0%,#f8faff 100%);
  --ds-card-shadow:       0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
}

/* ── Dark tokens ────────────────────────────────────────────────── */
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

  --ds-thead-bg:          rgba(255,255,255,0.02);
  --ds-row-hover:         rgba(46,85,153,0.05);
  --ds-progress-track:    rgba(255,255,255,0.05);
  --ds-checkbox:          #374151;
  --ds-avatar-border:     #0d1424;
  --ds-avatar-extra-bg:   #1f2937;
  --ds-avatar-extra-tx:   #6b7280;
  --ds-input-bg:          #111827;
  --ds-table-divider:     rgba(255,255,255,0.04);
  --ds-footer-border:     rgba(255,255,255,0.05);
  --ds-id-bg:             rgba(255,255,255,0.03);
  --ds-id-border:         rgba(255,255,255,0.05);
  --ds-id-color:          #374151;
  --ds-links-border:      rgba(255,255,255,0.08);

  --ds-stat-bg:           linear-gradient(145deg,#111827 0%,#0f1728 100%);
  --ds-card-shadow:       0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
}

/* ── Base ────────────────────────────────────────────────────────── */
body { font-family: var(--ds-font); background: var(--ds-bg); color: var(--ds-text-secondary); }

/* ── Scrollbar hide util ──────────────────────────────────────────── */
.hide-sb::-webkit-scrollbar { display: none; }
.hide-sb { -ms-overflow-style: none; scrollbar-width: none; }

/* ── Fade-up animation util ─────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.25s ease-out both; }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const AUDITS = [
  { id: "69CA672B", name: "test2", type: "Operational", status: "Draft", progress: 0, start: "Mar 30", end: "Apr 29", links: 0, team: [{ init: "LA", color: "#2E5599" }, { init: "JS", color: "#0ea5e9" }, { init: "MR", color: "#10b981" }], extraTeam: 3, risk: "Low" },
  { id: "69CA66F3", name: "test1", type: "Operational", status: "Draft", progress: 0, start: "Mar 30", end: "Apr 29", links: 0, team: [{ init: "LA", color: "#2E5599" }, { init: "JS", color: "#0ea5e9" }, { init: "MR", color: "#10b981" }, { init: "TK", color: "#f59e0b" }], extraTeam: 4, risk: "Medium" },
  { id: "69CA637D", name: "Procurement & Vendor Management Audit", type: "Operational", status: "Fieldwork", progress: 50, start: "Mar 30", end: "Jun 30", links: 1, team: [{ init: "LA", color: "#2E5599" }, { init: "JS", color: "#0ea5e9" }, { init: "MR", color: "#10b981" }], extraTeam: 3, risk: "High" },
  { id: "69C7C8B4", name: "Employee Onboarding & Offboarding Process Audit — FY 2026", type: "Operational", status: "Fieldwork", progress: 50, start: "Mar 28", end: "Apr 30", links: 2, team: [{ init: "A", color: "#ec4899" }], extraTeam: 1, risk: "Medium" },
];

const STATUS_CFG: Record<string, { bg: string; border: string; text: string }> = {
  Draft: { bg: "var(--ds-amber-bg)", border: "var(--ds-amber-border)", text: "var(--ds-amber)" },
  Fieldwork: { bg: "var(--ds-indigo-light)", border: "var(--ds-indigo-border)", text: "var(--ds-indigo)" },
  Planning: { bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.25)", text: "#0ea5e9" },
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
  const color = value === 0 ? "var(--ds-checkbox)" : value < 40 ? "var(--ds-amber)" : value < 80 ? "var(--ds-indigo)" : "var(--ds-green)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 90 }}>
      <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--ds-mono)", color: value === 0 ? "var(--ds-text-muted)" : color }}>{value}%</span>
      <div style={{ height: 4, background: "var(--ds-progress-track)", borderRadius: 99, overflow: "hidden", width: 90 }}>
        <div style={{ height: "100%", width: `${w}%`, background: value === 0 ? "transparent" : `linear-gradient(90deg,${color}88,${color})`, borderRadius: 99, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)", boxShadow: value > 0 ? `0 0 8px ${color}55` : "none" }} />
      </div>
    </div>
  );
}

function Avatar({ init, color }: { init: string; color: string }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid var(--ds-avatar-border)", background: `${color}20`, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, fontFamily: "var(--ds-font)" }}>
      {init}
    </div>
  );
}

function StatCard({ label, value, sub, subColor, icon, accent, delay = 0 }: { label: string; value: number; sub: string; subColor: string; icon: React.ReactNode; accent: string; delay?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ background: "var(--ds-stat-bg)", border: "1px solid var(--ds-border)", borderRadius: 16, padding: "20px 22px", position: "relative", overflow: "hidden", transition: "opacity 0.5s ease, transform 0.5s ease", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", boxShadow: "var(--ds-card-shadow)" }}>
      {/* top accent line */}
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 2, background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: 0.7 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ds-text-muted)", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 12 }}>{label}</p>
          <p style={{ fontSize: 36, fontWeight: 800, color: "var(--ds-text-primary)", lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</p>
          {sub && <p style={{ fontSize: 12, color: subColor || "var(--ds-text-muted)", marginTop: 6 }}>{sub}</p>}
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: `${accent}15`, border: `1px solid ${accent}28`, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12 }}>
          {icon}
        </div>
      </div>
    </div>
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
      <style>{DESIGN_SYSTEM_CSS}{`
        .ae-page { min-height:100vh; overflow-x:hidden; background:var(--ds-bg); font-family:var(--ds-font); color:var(--ds-text-secondary); }
        .ae-inner { max-width:1480px; margin:0 auto; padding:24px 16px 80px; }
        @media(min-width:640px)  { .ae-inner { padding:32px 24px 80px; } }
        @media(min-width:1024px) { .ae-inner { padding:40px 32px 80px; } }

        .ae-stat-grid { display:grid; grid-template-columns:repeat(1,1fr); gap:16px; margin-bottom:28px; }
        @media(min-width:600px)  { .ae-stat-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px) { .ae-stat-grid { grid-template-columns:repeat(4,1fr); } }

        .ae-header-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:36px; gap:16px; flex-wrap:wrap; }

        .ae-filters-bar { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; gap:12px; flex-wrap:wrap; }
        .ae-filters-right { display:flex; gap:8px; align-items:center; overflow-x:auto; flex-shrink:0; max-width:100%; padding-bottom:2px; }
        .ae-filters-right::-webkit-scrollbar { height:0; }

        .ae-table-wrap { background:var(--ds-surface); border:1px solid var(--ds-border); border-radius:16px; overflow-x:auto; overflow-y:visible; -webkit-overflow-scrolling:touch; box-shadow:var(--ds-card-shadow); }

        .ae-row { transition:background 0.12s ease; cursor:pointer; }
        .ae-row:hover { background:var(--ds-row-hover); }
        .ae-row:hover .ae-row-accent { opacity:1 !important; }
        .ae-row:hover .ae-name { color:var(--ds-indigo) !important; }

        .ae-th { padding:13px 16px; font-size:11px; font-weight:700; color:var(--ds-text-muted); text-transform:uppercase; letter-spacing:0.08em; text-align:left; white-space:nowrap; }
        .ae-th-sort { cursor:pointer; }
        .ae-th-sort:hover { color:var(--ds-text-secondary); }

        .ae-btn-new { display:flex; align-items:center; gap:8px; background:var(--ds-indigo); color:#fff; border:none; border-radius:12px; padding:10px 20px; font-size:14px; font-weight:600; cursor:pointer; font-family:var(--ds-font); white-space:nowrap; transition:background 0.15s, transform 0.15s, box-shadow 0.15s; }
        .ae-btn-new:hover { background:var(--ds-indigo-hover); transform:translateY(-1px); box-shadow:0 8px 24px rgba(46,85,153,0.3); }

        .ae-pill { border-radius:8px; padding:7px 14px; font-size:13px; cursor:pointer; font-family:var(--ds-font); transition:all 0.12s ease; white-space:nowrap; border:1px solid var(--ds-border); background:transparent; color:var(--ds-text-muted); }
        .ae-pill.active { background:var(--ds-indigo-light); border-color:var(--ds-indigo-border); color:var(--ds-indigo); font-weight:600; }
        .ae-pill:not(.active):hover { border-color:var(--ds-indigo-border); color:var(--ds-text-secondary); }

        .ae-search { width:100%; background:var(--ds-input-bg); border:1px solid var(--ds-border); border-radius:10px; padding:9px 14px 9px 34px; font-size:13px; color:var(--ds-text-secondary); font-family:var(--ds-font); outline:none; transition:border-color 0.2s; }
        .ae-search:focus { border-color:var(--ds-indigo-border); }
        .ae-search::placeholder { color:var(--ds-text-muted); }

        .ae-view-toggle { display:flex; background:var(--ds-surface); border:1px solid var(--ds-border); border-radius:10px; padding:3px; }
        .ae-view-btn { background:transparent; border:none; border-radius:7px; padding:6px 8px; color:var(--ds-text-muted); cursor:pointer; transition:all 0.12s; display:flex; align-items:center; }
        .ae-view-btn.active { background:var(--ds-indigo-light); color:var(--ds-indigo); }

        .ae-icon-btn { background:transparent; border:none; border-radius:7px; padding:6px; color:var(--ds-text-dim); cursor:pointer; transition:all 0.12s; }
        .ae-icon-btn:hover { background:var(--ds-row-hover); color:var(--ds-text-primary); }

        .ae-links-badge { display:inline-flex; align-items:center; gap:5px; border:1px solid var(--ds-links-border); border-radius:7px; padding:4px 9px; cursor:pointer; background:transparent; transition:all 0.12s; }
        .ae-links-badge:hover { border-color:var(--ds-indigo-border); background:var(--ds-indigo-light); }

        .ae-divider { width:1px; height:20px; background:var(--ds-border); flex-shrink:0; }
      `}</style>

      <div className="ae-page">
        <div className="ae-inner">

          {/* Header */}
          <div className="ae-header-row" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(-8px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ds-indigo)", boxShadow: "0 0 8px var(--ds-indigo-dot-shadow)" }} />
                <span style={{ fontSize: 12, color: "var(--ds-indigo)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Audit Management</span>
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "var(--ds-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Audit Execution</h1>
              <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 6 }}>Select methodology based on engagement type · {AUDITS.length} active audits</p>
            </div>
            <button className="ae-btn-new"><Plus size={16} />New Audit</button>
          </div>

          {/* Stat cards */}
          <div className="ae-stat-grid">
            <StatCard label="Total Audits" value={4} sub="↑ 2 this quarter" subColor="var(--ds-green)" accent="#2E5599" delay={100} icon={<Clipboard size={17} color="#2E5599" />} />
            <StatCard label="Planning" value={0} sub="Recent: N/A" subColor="#8b5cf6" accent="#8b5cf6" delay={180} icon={<Clock size={17} color="#8b5cf6" />} />
            <StatCard label="In Fieldwork" value={2} sub="50% avg. progress" subColor="#0ea5e9" accent="#0ea5e9" delay={260} icon={<PlayCircle size={17} color="#0ea5e9" />} />
            <StatCard label="Completed" value={0} sub="Efficiency: 98%" subColor="var(--ds-green)" accent="#10b981" delay={340} icon={<CheckCircle2 size={17} color="#10b981" />} />
          </div>

          {/* Filters */}
          <div className="ae-filters-bar" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
            <div style={{ position: "relative", width: "min(280px,100%)", flexShrink: 0 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ds-text-muted)" }} />
              <input className="ae-search" type="text" placeholder="Search by name or ID…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="ae-filters-right hide-sb">
              {["All Statuses", "Draft", "Fieldwork", "Planning"].map(s => (
                <button key={s} className={`ae-pill${filterStatus === s ? " active" : ""}`} onClick={() => setFilterStatus(s)}>{s}</button>
              ))}
              <div className="ae-divider" />
              <div className="ae-view-toggle">
                {([{ id: "list", Icon: List }, { id: "grid", Icon: LayoutGrid }] as const).map(({ id, Icon }) => (
                  <button key={id} className={`ae-view-btn${activeView === id ? " active" : ""}`} onClick={() => setActiveView(id)}><Icon size={15} /></button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="ae-table-wrap" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
              <thead>
                <tr style={{ background: "var(--ds-thead-bg)", borderBottom: "1px solid var(--ds-border)" }}>
                  <th className="ae-th" style={{ width: 48, paddingLeft: 20 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--ds-checkbox)" }} />
                  </th>
                  {["Audit", "Type", "Status", "Risk", "Progress", "Timeline", "Links", "Team"].map(h => (
                    <th key={h} className={`ae-th${["Audit", "Status", "Timeline"].includes(h) ? " ae-th-sort" : ""}`}>
                      {["Audit", "Status", "Timeline"].includes(h)
                        ? <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{h} <ChevronDown size={11} style={{ opacity: 0.4 }} /></span>
                        : h}
                    </th>
                  ))}
                  <th className="ae-th" style={{ width: 48 }} />
                </tr>
              </thead>
              <tbody>
                {filtered.map((audit, idx) => {
                  const sc = STATUS_CFG[audit.status] ?? STATUS_CFG.Draft;
                  const rc = RISK_CFG[audit.risk] ?? RISK_CFG.Low;
                  return (
                    <tr
                      key={audit.id}
                      className="ae-row"
                      onClick={e => handleRowClick(audit.id, e)}
                      style={{ borderBottom: idx < filtered.length - 1 ? "1px solid var(--ds-table-divider)" : "none", opacity: loaded ? 1 : 0, transition: `opacity 0.4s ease ${0.4 + idx * 0.07}s` }}
                    >
                      {/* Checkbox + left accent */}
                      <td style={{ padding: "16px 16px 16px 20px", position: "relative" }}>
                        <div className="ae-row-accent" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: sc.text, borderRadius: "0 2px 2px 0", opacity: 0, transition: "opacity 0.15s ease" }} />
                        <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--ds-checkbox)" }} />
                      </td>
                      {/* Name + ID */}
                      <td style={{ padding: "16px", maxWidth: 300 }}>
                        <div className="ae-name" style={{ fontWeight: 600, color: "var(--ds-text-secondary)", fontSize: 14, marginBottom: 5, lineHeight: 1.3, transition: "color 0.12s" }}>{audit.name}</div>
                        <span style={{ fontFamily: "var(--ds-mono)", fontSize: 11, color: "var(--ds-id-color)", background: "var(--ds-id-bg)", border: "1px solid var(--ds-id-border)", borderRadius: 5, padding: "2px 6px", letterSpacing: "0.04em" }}>#{audit.id}</span>
                      </td>
                      {/* Type */}
                      <td style={{ padding: "16px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--ds-green-bg)", border: "1px solid var(--ds-green-border)", color: "var(--ds-green)", borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: 500 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ds-green)" }} />
                          {audit.type}
                        </span>
                      </td>
                      {/* Status */}
                      <td style={{ padding: "16px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                          {audit.status === "Draft" ? <Clipboard size={11} /> : <PlayCircle size={11} />}
                          {audit.status}
                        </span>
                      </td>
                      {/* Risk */}
                      <td style={{ padding: "16px" }}>
                        <span style={{ background: rc.bg, color: rc.color, borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{audit.risk}</span>
                      </td>
                      {/* Progress */}
                      <td style={{ padding: "16px" }}><ProgressBar value={audit.progress} animate={loaded} /></td>
                      {/* Timeline */}
                      <td style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <Calendar size={13} style={{ color: "var(--ds-text-muted)", flexShrink: 0 }} />
                          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontSize: 12, color: "var(--ds-text-secondary)", fontWeight: 500 }}>{audit.start}</span>
                            <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>→ {audit.end}</span>
                          </div>
                        </div>
                      </td>
                      {/* Links */}
                      <td style={{ padding: "16px" }}>
                        <div className="ae-links-badge no-nav">
                          <Link2 size={12} style={{ color: "var(--ds-text-muted)" }} />
                          <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--ds-mono)", color: audit.links > 0 ? "var(--ds-indigo)" : "var(--ds-text-muted)" }}>{audit.links}</span>
                        </div>
                      </td>
                      {/* Team */}
                      <td style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ display: "flex" }}>
                            {audit.team.slice(0, 3).map((m, i) => (
                              <div key={i} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i, position: "relative" }}>
                                <Avatar init={m.init} color={m.color} />
                              </div>
                            ))}
                          </div>
                          {audit.extraTeam > 1 && (
                            <div style={{ marginLeft: -6, width: 28, height: 28, borderRadius: "50%", background: "var(--ds-avatar-extra-bg)", border: "2px solid var(--ds-avatar-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--ds-avatar-extra-tx)" }}>+{audit.extraTeam}</div>
                          )}
                        </div>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button className="ae-icon-btn no-nav" onClick={e => e.stopPropagation()} title="More options"><MoreHorizontal size={16} /></button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ padding: "60px 24px", textAlign: "center" }}>
                      <p style={{ color: "var(--ds-text-muted)", fontSize: 14, marginBottom: 12 }}>No audits match your current filters.</p>
                      <button onClick={() => { setSearch(""); setFilterStatus("All Statuses"); }} style={{ background: "transparent", border: "1px solid var(--ds-indigo-border)", borderRadius: 8, padding: "7px 16px", color: "var(--ds-indigo)", fontSize: 13, cursor: "pointer", fontFamily: "var(--ds-font)" }}>Clear filters</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Footer */}
            <div style={{ borderTop: "1px solid var(--ds-footer-border)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--ds-text-muted)", fontFamily: "var(--ds-mono)" }}>{filtered.length} of {AUDITS.length} audits</span>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--ds-indigo-light)", border: "1px solid var(--ds-indigo-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--ds-indigo)" }}>1</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}