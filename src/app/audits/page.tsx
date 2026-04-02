"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Search, Plus, Clipboard, Clock, PlayCircle, CheckCircle2,
    List, LayoutGrid, MoreHorizontal, Link2, Calendar, ChevronDown,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const AUDITS = [
    {
        id: "69CA672B",
        name: "test2",
        type: "Operational",
        status: "Draft",
        progress: 0,
        start: "Mar 30",
        end: "Apr 29",
        links: 0,
        team: [
            { init: "LA", color: "#6366f1" },
            { init: "JS", color: "#0ea5e9" },
            { init: "MR", color: "#10b981" },
        ],
        extraTeam: 3,
        risk: "Low",
    },
    {
        id: "69CA66F3",
        name: "test1",
        type: "Operational",
        status: "Draft",
        progress: 0,
        start: "Mar 30",
        end: "Apr 29",
        links: 0,
        team: [
            { init: "LA", color: "#6366f1" },
            { init: "JS", color: "#0ea5e9" },
            { init: "MR", color: "#10b981" },
            { init: "TK", color: "#f59e0b" },
        ],
        extraTeam: 4,
        risk: "Medium",
    },
    {
        id: "69CA637D",
        name: "Procurement & Vendor Management Audit",
        type: "Operational",
        status: "Fieldwork",
        progress: 50,
        start: "Mar 30",
        end: "Jun 30",
        links: 1,
        team: [
            { init: "LA", color: "#6366f1" },
            { init: "JS", color: "#0ea5e9" },
            { init: "MR", color: "#10b981" },
        ],
        extraTeam: 3,
        risk: "High",
    },
    {
        id: "69C7C8B4",
        name: "Employee Onboarding & Offboarding Process Audit — FY 2026",
        type: "Operational",
        status: "Fieldwork",
        progress: 50,
        start: "Mar 28",
        end: "Apr 30",
        links: 2,
        team: [{ init: "A", color: "#ec4899" }],
        extraTeam: 1,
        risk: "Medium",
    },
];

const SPARKLINE_POINTS = "0,28 12,22 24,26 36,14 48,18 60,8 72,12 84,4 96,8";

const STATUS_CONFIG = {
    Draft: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", text: "#d97706" },
    Fieldwork: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.28)", text: "#6366f1" },
    Planning: { bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.25)", text: "#0ea5e9" },
};
const RISK_CONFIG = {
    Low: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    Medium: { color: "#d97706", bg: "rgba(245,158,11,0.1)" },
    High: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ value, animate }: { value: number; animate: boolean }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setWidth(value), animate ? 250 : 0);
        return () => clearTimeout(t);
    }, [value, animate]);

    const accent =
        value === 0 ? "var(--ae-checkbox)" :
            value < 40 ? "#d97706" :
                value < 80 ? "#6366f1" : "#10b981";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 100 }}>
            <span style={{
                fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace",
                color: value === 0 ? "var(--ae-text-muted)" : accent,
            }}>
                {value}%
            </span>
            <div style={{ height: 4, background: "var(--ae-progress-track)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                    height: "100%",
                    width: `${width}%`,
                    background: value === 0 ? "transparent" : `linear-gradient(90deg, ${accent}88, ${accent})`,
                    borderRadius: 99,
                    transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: value > 0 ? `0 0 8px ${accent}55` : "none",
                }} />
            </div>
        </div>
    );
}

function TeamAvatar({ init, color }: { init: string; color: string }) {
    return (
        <div className="ae-avatar" style={{ background: `${color}20`, color }}>
            {init}
        </div>
    );
}

function StatCard({
    label, value, sub, subColor, icon, accent, sparkline, delay = 0,
}: {
    label: string; value: number; sub: string; subColor: string;
    icon: React.ReactNode; accent: string; sparkline: boolean; delay: number;
}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <div
            className="ae-stat-card"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)" }}
        >
            {/* coloured top-edge accent */}
            <div style={{
                position: "absolute", inset: "0 0 auto 0", height: 2,
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                opacity: 0.7,
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{
                        fontSize: 11, fontWeight: 700, color: "var(--ae-text-muted)",
                        letterSpacing: "0.09em", textTransform: "uppercase", margin: "0 0 12px",
                    }}>
                        {label}
                    </p>
                    <p style={{
                        fontSize: 36, fontWeight: 800, color: "var(--ae-text-primary)",
                        margin: 0, lineHeight: 1, letterSpacing: "-0.03em",
                    }}>
                        {value}
                    </p>
                    {sub && (
                        <p style={{ fontSize: 12, color: subColor || "var(--ae-text-muted)", margin: "6px 0 0" }}>
                            {sub}
                        </p>
                    )}
                </div>

                <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: `${accent}15`, border: `1px solid ${accent}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginLeft: 12,
                }}>
                    {icon}
                </div>
            </div>

            {sparkline && (
                <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none"
                    style={{ display: "block", marginTop: 14 }}>
                    <polyline points={SPARKLINE_POINTS} fill="none" stroke={accent}
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                </svg>
            )}
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

    const handleRowClick = useCallback((auditId: any, e: any) => {
        if (e.target.closest(".ae-icon-btn") || e.target.closest(".ae-links-badge")) return;
        router.push(`/audits/${auditId}`);
    }, [router]);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    const filtered = AUDITS.filter((a) => {
        const matchSearch =
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "All Statuses" || a.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Light ─────────────────────────────────────────────────── */
        :root {
          --ae-page-bg:          #f4f6fa;
          --ae-card:             #ffffff;
          --ae-surface:          #f9fafb;
          --ae-border:           rgba(0,0,0,0.08);
          --ae-border-subtle:    rgba(0,0,0,0.05);
          --ae-text-primary:     #0f172a;
          --ae-text-secondary:   #1e293b;
          --ae-text-muted:       #64748b;
          --ae-text-dim:         #94a3b8;
          --ae-thead-bg:         rgba(0,0,0,0.025);
          --ae-row-hover:        rgba(99,102,241,0.04);
          --ae-id-bg:            rgba(0,0,0,0.04);
          --ae-id-border:        rgba(0,0,0,0.07);
          --ae-id-color:         #94a3b8;
          --ae-progress-track:   rgba(0,0,0,0.07);
          --ae-links-border:     rgba(0,0,0,0.1);
          --ae-avatar-extra-bg:  #e2e8f0;
          --ae-avatar-border:    #ffffff;
          --ae-extra-color:      #64748b;
          --ae-filter-border:    rgba(0,0,0,0.09);
          --ae-filter-act-bg:    rgba(99,102,241,0.07);
          --ae-filter-act-bd:    rgba(99,102,241,0.28);
          --ae-filter-act-tx:    #4f46e5;
          --ae-toggle-bg:        #ffffff;
          --ae-toggle-act-bg:    rgba(99,102,241,0.1);
          --ae-toggle-act-tx:    #4f46e5;
          --ae-checkbox:         #cbd5e1;
          --ae-footer-border:    rgba(0,0,0,0.06);
          --ae-input-bg:         #ffffff;
          --ae-table-divider:    rgba(0,0,0,0.05);
          --ae-indigo:           #4f46e5;
          --ae-stat-bg:          linear-gradient(145deg,#ffffff 0%,#f8faff 100%);
          --ae-dot-shadow:       rgba(99,102,241,0.45);
        }

        /* ── Dark ────────────────────────────────────────────────── */
        .dark {
          --ae-page-bg:          #080e1c;
          --ae-card:             #111827;
          --ae-surface:          #0d1424;
          --ae-border:           rgba(255,255,255,0.07);
          --ae-border-subtle:    rgba(255,255,255,0.04);
          --ae-text-primary:     #f9fafb;
          --ae-text-secondary:   #e2e8f0;
          --ae-text-muted:       #64748b;
          --ae-text-dim:         #374151;
          --ae-thead-bg:         rgba(255,255,255,0.02);
          --ae-row-hover:        rgba(99,102,241,0.04);
          --ae-id-bg:            rgba(255,255,255,0.03);
          --ae-id-border:        rgba(255,255,255,0.05);
          --ae-id-color:         #374151;
          --ae-progress-track:   rgba(255,255,255,0.05);
          --ae-links-border:     rgba(255,255,255,0.08);
          --ae-avatar-extra-bg:  #1f2937;
          --ae-avatar-border:    #0d1424;
          --ae-extra-color:      #6b7280;
          --ae-filter-border:    rgba(255,255,255,0.07);
          --ae-filter-act-bg:    rgba(99,102,241,0.15);
          --ae-filter-act-bd:    rgba(99,102,241,0.4);
          --ae-filter-act-tx:    #818cf8;
          --ae-toggle-bg:        #111827;
          --ae-toggle-act-bg:    rgba(99,102,241,0.2);
          --ae-toggle-act-tx:    #818cf8;
          --ae-checkbox:         #374151;
          --ae-footer-border:    rgba(255,255,255,0.05);
          --ae-input-bg:         #111827;
          --ae-table-divider:    rgba(255,255,255,0.04);
          --ae-indigo:           #818cf8;
          --ae-stat-bg:          linear-gradient(145deg,#111827 0%,#0f1728 100%);
          --ae-dot-shadow:       rgba(129,140,248,0.6);
        }

        /* ── Base layout ─────────────────────────────────────────── */
        .ae-page {
          min-height: 100vh;
          /* FIX: prevent horizontal overflow at the page root */
          overflow-x: hidden;
          background: var(--ae-page-bg);
          font-family: 'DM Sans', sans-serif;
          color: var(--ae-text-secondary);
          padding-bottom: 80px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        /* ── Stat cards — responsive grid ────────────────────────── */
        .ae-stat-grid {
          display: grid;
          /* FIX: responsive columns — 1 on mobile, 2 on sm, 4 on lg */
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (min-width: 600px)  { .ae-stat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ae-stat-grid { grid-template-columns: repeat(4, 1fr); } }

        /* ── Stat card ────────────────────────────────────────────── */
        .ae-stat-card {
          background: var(--ae-stat-bg);
          border: 1px solid var(--ae-border);
          border-radius: 16px;
          padding: 20px 22px;
          position: relative;
          overflow: hidden;
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s ease;
        }

        /* ── Team avatar ─────────────────────────────────────────── */
        .ae-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          border: 2px solid var(--ae-avatar-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700;
          font-family: 'DM Sans', sans-serif; flex-shrink: 0;
        }

        /* ── Table wrapper — FIX: overflow-x scroll instead of hidden */
        .ae-table-wrap {
          background: var(--ae-surface);
          border: 1px solid var(--ae-border);
          border-radius: 16px;
          /* FIX: was "overflow: hidden" which clipped the 960px-wide table */
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          transition: background 0.2s ease;
        }
        /* Keep inner border-radius visible after overflow-x: auto */
        .ae-table-wrap > table { border-radius: inherit; }

        /* ── Table row ────────────────────────────────────────────── */
        .ae-row { transition: background 0.12s ease; cursor: pointer; }
        .ae-row:hover { background: var(--ae-row-hover); }
        .ae-row:hover .ae-row-accent  { opacity: 1 !important; }
        .ae-row:hover .ae-audit-name  { color: var(--ae-indigo) !important; }

        /* ── Buttons / controls ───────────────────────────────────── */
        .ae-btn-new {
          display: flex; align-items: center; gap: 8px;
          background: #6366f1; color: #fff; border: none;
          border-radius: 12px; padding: 10px 20px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .ae-btn-new:hover {
          background: #4f46e5;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.3);
        }

        .ae-filter-pill {
          border-radius: 8px; padding: 7px 14px; font-size: 13px;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.12s ease; white-space: nowrap;
          border: 1px solid var(--ae-filter-border);
          background: transparent; color: var(--ae-text-muted);
        }
        .ae-filter-pill.active {
          background: var(--ae-filter-act-bg);
          border-color: var(--ae-filter-act-bd);
          color: var(--ae-filter-act-tx);
          font-weight: 600;
        }
        .ae-filter-pill:not(.active):hover {
          border-color: var(--ae-filter-act-bd);
          color: var(--ae-text-secondary);
        }

        .ae-search {
          width: 100%; background: var(--ae-input-bg);
          border: 1px solid var(--ae-border); border-radius: 10px;
          padding: 9px 14px 9px 34px; font-size: 13px;
          color: var(--ae-text-secondary);
          font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color 0.2s;
        }
        .ae-search:focus  { border-color: rgba(99,102,241,0.45); }
        .ae-search::placeholder { color: var(--ae-text-muted); }

        .ae-view-toggle {
          display: flex; background: var(--ae-toggle-bg);
          border: 1px solid var(--ae-border);
          border-radius: 10px; padding: 3px;
        }
        .ae-view-btn {
          background: transparent; border: none; border-radius: 7px;
          padding: 6px 8px; color: var(--ae-text-muted);
          cursor: pointer; transition: all 0.12s;
          display: flex; align-items: center;
        }
        .ae-view-btn.active {
          background: var(--ae-toggle-act-bg);
          color: var(--ae-toggle-act-tx);
        }

        .ae-th {
          padding: 13px 16px; font-size: 11px; font-weight: 700;
          color: var(--ae-text-muted); text-transform: uppercase;
          letter-spacing: 0.08em; text-align: left;
          white-space: nowrap; font-family: 'DM Sans', sans-serif;
        }
        .ae-th-sort { cursor: pointer; }
        .ae-th-sort:hover { color: var(--ae-text-secondary); }

        .ae-icon-btn {
          background: transparent; border: none; border-radius: 7px;
          padding: 6px; color: var(--ae-text-dim); cursor: pointer;
          transition: all 0.12s;
        }
        .ae-icon-btn:hover {
          background: var(--ae-row-hover);
          color: var(--ae-text-primary);
        }

        .ae-links-badge {
          display: inline-flex; align-items: center; gap: 5px;
          border: 1px solid var(--ae-links-border);
          border-radius: 7px; padding: 4px 9px;
          cursor: pointer; background: transparent;
          transition: all 0.12s;
        }
        .ae-links-badge:hover {
          border-color: rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.06);
        }

        .ae-divider { width: 1px; height: 20px; background: var(--ae-border); flex-shrink: 0; }

        /* ── Filters bar — scrollable on small screens ────────────── */
        .ae-filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .ae-filters-right {
          display: flex;
          gap: 8px;
          align-items: center;
          /* FIX: allow horizontal scroll on very small screens instead of wrapping */
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          flex-shrink: 0;
          max-width: 100%;
          padding-bottom: 2px; /* room for scrollbar */
        }
        .ae-filters-right::-webkit-scrollbar { height: 0; }

        /* ── Page inner padding — responsive ─────────────────────── */
        .ae-inner {
          max-width: 1480px;
          margin: 0 auto;
          /* FIX: was "40px 32px" with no mobile breakpoint */
          padding: 24px 16px 80px;
        }
        @media (min-width: 640px)  { .ae-inner { padding: 32px 24px 80px; } }
        @media (min-width: 1024px) { .ae-inner { padding: 40px 32px 80px; } }

        /* ── Header row — stack on small screens ─────────────────── */
        .ae-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
          gap: 16px;
          flex-wrap: wrap;
        }
      `}</style>

            <div className="ae-page">
                <div className="ae-inner">

                    {/* ── Header ─────────────────────────────────────────────── */}
                    <div
                        className="ae-header-row"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transform: loaded ? "none" : "translateY(-8px)",
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                        }}
                    >
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: "50%",
                                    background: "var(--ae-indigo)",
                                    boxShadow: "0 0 8px var(--ae-dot-shadow)",
                                }} />
                                <span style={{
                                    fontSize: 12, color: "var(--ae-indigo)", fontWeight: 600,
                                    letterSpacing: "0.08em", textTransform: "uppercase",
                                }}>
                                    Audit Management
                                </span>
                            </div>
                            <h1 style={{
                                fontSize: 30, fontWeight: 800, color: "var(--ae-text-primary)",
                                margin: 0, letterSpacing: "-0.03em", lineHeight: 1.2,
                            }}>
                                Audit Execution
                            </h1>
                            <p style={{ fontSize: 13, color: "var(--ae-text-muted)", margin: "6px 0 0" }}>
                                Select methodology based on engagement type · {AUDITS.length} active audits
                            </p>
                        </div>
                        <button className="ae-btn-new">
                            <Plus size={16} />
                            New Audit
                        </button>
                    </div>

                    {/* ── Stat cards — now uses responsive .ae-stat-grid ─────── */}
                    <div className="ae-stat-grid">
                        <StatCard label="Total Audits" value={4} sub="↑ 2 this quarter" subColor="#10b981" accent="#6366f1" delay={100} icon={<Clipboard size={17} color="#6366f1" />} sparkline={false} />
                        <StatCard label="Planning" value={0} sub="Recent: N/A" subColor="#8b5cf6" accent="#8b5cf6" delay={180} icon={<Clock size={17} color="#8b5cf6" />} sparkline={false} />
                        <StatCard label="In Fieldwork" value={2} sub="50% avg. progress" subColor="#0ea5e9" accent="#0ea5e9" delay={260} icon={<PlayCircle size={17} color="#0ea5e9" />} sparkline={false} />
                        <StatCard label="Completed" value={0} sub="Efficiency: 98%" subColor="#10b981" accent="#10b981" delay={340} icon={<CheckCircle2 size={17} color="#10b981" />} sparkline={false} />
                    </div>

                    {/* ── Filters ────────────────────────────────────────────── */}
                    <div
                        className="ae-filters-bar"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transition: "opacity 0.5s ease 0.3s",
                        }}
                    >
                        {/* Search */}
                        <div style={{ position: "relative", width: "min(280px, 100%)", flexShrink: 0 }}>
                            <Search size={14} style={{
                                position: "absolute", left: 12, top: "50%",
                                transform: "translateY(-50%)", color: "var(--ae-text-muted)",
                            }} />
                            <input
                                className="ae-search"
                                type="text"
                                placeholder="Search by name or ID…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Pills + toggle — horizontally scrollable on mobile */}
                        <div className="ae-filters-right">
                            {["All Statuses", "Draft", "Fieldwork", "Planning"].map((s) => (
                                <button
                                    key={s}
                                    className={`ae-filter-pill ${filterStatus === s ? "active" : ""}`}
                                    onClick={() => setFilterStatus(s)}
                                >
                                    {s}
                                </button>
                            ))}

                            <div className="ae-divider" />

                            <div className="ae-view-toggle">
                                {[{ id: "list", Icon: List }, { id: "grid", Icon: LayoutGrid }].map(({ id, Icon }) => (
                                    <button
                                        key={id}
                                        className={`ae-view-btn ${activeView === id ? "active" : ""}`}
                                        onClick={() => setActiveView(id)}
                                    >
                                        <Icon size={15} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Table ──────────────────────────────────────────────── */}
                    <div
                        className="ae-table-wrap"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transform: loaded ? "none" : "translateY(16px)",
                            transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s",
                        }}
                    >
                        {/* FIX: table keeps min-width for content integrity; the wrapper now scrolls */}
                        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
                            <thead>
                                <tr style={{
                                    background: "var(--ae-thead-bg)",
                                    borderBottom: "1px solid var(--ae-border)",
                                }}>
                                    <th className="ae-th" style={{ width: 48, paddingLeft: 20 }}>
                                        <div style={{
                                            width: 16, height: 16, borderRadius: 4,
                                            border: "1.5px solid var(--ae-checkbox)",
                                        }} />
                                    </th>
                                    {["Audit", "Type", "Status", "Risk", "Progress", "Timeline", "Links", "Team"].map((h) => (
                                        <th
                                            key={h}
                                            className={`ae-th ${["Audit", "Status", "Timeline"].includes(h) ? "ae-th-sort" : ""}`}
                                        >
                                            {["Audit", "Status", "Timeline"].includes(h) ? (
                                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                    {h} <ChevronDown size={11} style={{ opacity: 0.4 }} />
                                                </span>
                                            ) : h}
                                        </th>
                                    ))}
                                    <th className="ae-th" style={{ width: 48 }} />
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((audit, idx) => {
                                    const sc = STATUS_CONFIG[audit.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.Draft;
                                    const rc = RISK_CONFIG[audit.risk as keyof typeof RISK_CONFIG] || RISK_CONFIG.Low;
                                    return (
                                        <tr
                                            key={audit.id}
                                            className="ae-row"
                                            title={`Open ${audit.name}`}
                                            onClick={(e) => handleRowClick(audit.id, e)}
                                            style={{
                                                borderBottom: idx < filtered.length - 1
                                                    ? "1px solid var(--ae-table-divider)" : "none",
                                                opacity: loaded ? 1 : 0,
                                                transition: `opacity 0.4s ease ${0.4 + idx * 0.07}s`,
                                            }}
                                        >
                                            {/* Checkbox + accent */}
                                            <td style={{ padding: "16px 16px 16px 20px", position: "relative" }}>
                                                <div
                                                    className="ae-row-accent"
                                                    style={{
                                                        position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
                                                        background: sc.text, borderRadius: "0 2px 2px 0",
                                                        opacity: 0, transition: "opacity 0.15s ease",
                                                    }}
                                                />
                                                <div style={{
                                                    width: 16, height: 16, borderRadius: 4,
                                                    border: "1.5px solid var(--ae-checkbox)",
                                                }} />
                                            </td>

                                            {/* Name + ID */}
                                            <td style={{ padding: "16px", maxWidth: 300 }}>
                                                <div
                                                    className="ae-audit-name"
                                                    style={{
                                                        fontWeight: 600, color: "var(--ae-text-secondary)",
                                                        fontSize: 14, marginBottom: 5, lineHeight: 1.3,
                                                        transition: "color 0.12s",
                                                    }}
                                                >
                                                    {audit.name}
                                                </div>
                                                <span style={{
                                                    fontFamily: "'DM Mono', monospace", fontSize: 11,
                                                    color: "var(--ae-id-color)",
                                                    background: "var(--ae-id-bg)",
                                                    border: "1px solid var(--ae-id-border)",
                                                    borderRadius: 5, padding: "2px 6px",
                                                    letterSpacing: "0.04em",
                                                }}>
                                                    #{audit.id}
                                                </span>
                                            </td>

                                            {/* Type */}
                                            <td style={{ padding: "16px" }}>
                                                <span style={{
                                                    display: "inline-flex", alignItems: "center", gap: 5,
                                                    background: "rgba(16,185,129,0.08)",
                                                    border: "1px solid rgba(16,185,129,0.2)",
                                                    color: "#10b981", borderRadius: 7,
                                                    padding: "4px 10px", fontSize: 12, fontWeight: 500,
                                                }}>
                                                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                                                    {audit.type}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td style={{ padding: "16px" }}>
                                                <span style={{
                                                    display: "inline-flex", alignItems: "center", gap: 6,
                                                    background: sc.bg, border: `1px solid ${sc.border}`,
                                                    color: sc.text, borderRadius: 7,
                                                    padding: "4px 10px", fontSize: 12, fontWeight: 600,
                                                }}>
                                                    {audit.status === "Draft"
                                                        ? <Clipboard size={11} />
                                                        : <PlayCircle size={11} />}
                                                    {audit.status}
                                                </span>
                                            </td>

                                            {/* Risk */}
                                            <td style={{ padding: "16px" }}>
                                                <span style={{
                                                    background: rc.bg, color: rc.color, borderRadius: 6,
                                                    padding: "3px 9px", fontSize: 11, fontWeight: 700,
                                                    letterSpacing: "0.05em", textTransform: "uppercase",
                                                }}>
                                                    {audit.risk}
                                                </span>
                                            </td>

                                            {/* Progress */}
                                            <td style={{ padding: "16px" }}>
                                                <ProgressBar value={audit.progress} animate={loaded} />
                                            </td>

                                            {/* Timeline */}
                                            <td style={{ padding: "16px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                    <Calendar size={13} style={{ color: "var(--ae-text-muted)", flexShrink: 0 }} />
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                        <span style={{ fontSize: 12, color: "var(--ae-text-secondary)", fontWeight: 500 }}>
                                                            {audit.start}
                                                        </span>
                                                        <span style={{ fontSize: 11, color: "var(--ae-text-muted)" }}>
                                                            → {audit.end}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Links */}
                                            <td style={{ padding: "16px" }}>
                                                <div className="ae-links-badge">
                                                    <Link2 size={12} style={{ color: "var(--ae-text-muted)" }} />
                                                    <span style={{
                                                        fontSize: 12, fontWeight: 600,
                                                        fontFamily: "'DM Mono', monospace",
                                                        color: audit.links > 0 ? "var(--ae-indigo)" : "var(--ae-text-muted)",
                                                    }}>
                                                        {audit.links}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Team */}
                                            <td style={{ padding: "16px" }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div style={{ display: "flex" }}>
                                                        {audit.team.slice(0, 3).map((m, i) => (
                                                            <div key={i} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i, position: "relative" }}>
                                                                <TeamAvatar init={m.init} color={m.color} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {audit.extraTeam > 1 && (
                                                        <div style={{
                                                            marginLeft: -6, width: 28, height: 28,
                                                            borderRadius: "50%",
                                                            background: "var(--ae-avatar-extra-bg)",
                                                            border: "2px solid var(--ae-avatar-border)",
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            fontSize: 10, fontWeight: 700, color: "var(--ae-extra-color)",
                                                        }}>
                                                            +{audit.extraTeam}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td style={{ padding: "16px", textAlign: "right" }}>
                                                <button
                                                    className="ae-icon-btn"
                                                    onClick={(e) => e.stopPropagation()}
                                                    title="More options"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={10} style={{ padding: "60px 24px", textAlign: "center" }}>
                                            <p style={{ color: "var(--ae-text-muted)", fontSize: 14, margin: "0 0 12px" }}>
                                                No audits match your current filters.
                                            </p>
                                            <button
                                                onClick={() => { setSearch(""); setFilterStatus("All Statuses"); }}
                                                style={{
                                                    background: "transparent",
                                                    border: "1px solid rgba(99,102,241,0.3)",
                                                    borderRadius: 8, padding: "7px 16px",
                                                    color: "var(--ae-indigo)", fontSize: 13,
                                                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                                }}
                                            >
                                                Clear filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Footer */}
                        <div style={{
                            borderTop: "1px solid var(--ae-footer-border)",
                            padding: "12px 20px",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}>
                            <span style={{
                                fontSize: 12, color: "var(--ae-text-muted)",
                                fontFamily: "'DM Mono', monospace",
                            }}>
                                {filtered.length} of {AUDITS.length} audits
                            </span>
                            <div style={{
                                width: 28, height: 28, borderRadius: 7,
                                background: "rgba(99,102,241,0.12)",
                                border: "1px solid rgba(99,102,241,0.28)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700, color: "var(--ae-indigo)",
                            }}>
                                1
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}