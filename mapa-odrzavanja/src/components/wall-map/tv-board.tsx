"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SITES,
  SUPPORT_LABELS,
  formatMetricValue,
  getTotals,
  type Site,
  type SupportMode,
} from "@/data/inventory";

const GROUPS: { id: SupportMode | "day-season"; title: string; color: string; match: (s: Site) => boolean }[] = [
  {
    id: "24/7",
    title: "24/7",
    color: "#c2410c",
    match: (s) => s.support === "24/7",
  },
  {
    id: "day-season",
    title: "8–16h / SEZONA",
    color: "#0f6e7a",
    match: (s) => s.support === "day" || s.support === "seasonal",
  },
  {
    id: "callcenter",
    title: "CALL CENTAR",
    color: "#1f3d63",
    match: (s) => s.support === "callcenter",
  },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function TvBoard() {
  const now = useClock();
  const totals = useMemo(() => getTotals(), []);

  const time = new Intl.DateTimeFormat("sr-RS", {
    timeZone: "Europe/Belgrade",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const date = new Intl.DateTimeFormat("sr-RS", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(now);

  return (
    <div className="tv-board">
      <header className="tv-board__header">
        <div>
          <div className="tv-board__eyebrow">OPERATIVNI UVID</div>
          <h1 className="tv-board__title">Mapa održavanja</h1>
        </div>
        <div className="tv-board__clock">
          <div className="tv-board__time">{time}</div>
          <div className="tv-board__date">{date}</div>
        </div>
      </header>

      <div className="tv-board__kpis">
        <div className="tv-kpi">
          <span>Lokacije</span>
          <strong>{totals.sites}</strong>
        </div>
        <div className="tv-kpi">
          <span>24/7</span>
          <strong>{totals.criticalSites}</strong>
        </div>
        <div className="tv-kpi">
          <span>Kapije</span>
          <strong>{totals.gates}</strong>
        </div>
        <div className="tv-kpi">
          <span>Kiosci</span>
          <strong>{totals.kiosks}</strong>
        </div>
        <div className="tv-kpi">
          <span>Fiscal Box</span>
          <strong>{totals.fiscalBox}</strong>
        </div>
        <div className="tv-kpi">
          <span>Call centar</span>
          <strong>
            {new Intl.NumberFormat("sr-RS").format(
              totals.estuarUsers + totals.fiscalRegisters,
            )}
          </strong>
        </div>
      </div>

      <div className="tv-board__groups">
        {GROUPS.map((group) => {
          const sites = SITES.filter(group.match);
          return (
            <section key={group.id} className="tv-group">
              <h2 className="tv-group__title" style={{ borderColor: group.color, color: group.color }}>
                {group.title}
              </h2>
              <div className="tv-group__grid">
                {sites.map((site) => (
                  <article key={site.id} className="tv-card" style={{ borderTopColor: group.color }}>
                    <div className="tv-card__head">
                      <h3>{site.name}</h3>
                      <span style={{ background: group.color }}>
                        {SUPPORT_LABELS[site.support]}
                      </span>
                    </div>
                    <p className="tv-card__note">{site.supportNote}</p>
                    {site.metrics.length > 0 ? (
                      <div className="tv-card__metrics">
                        {site.metrics.map((m) => (
                          <div key={`${site.id}-${m.kind}-${m.label}`}>
                            <em>{m.label}</em>
                            <b>{formatMetricValue(m.value)}</b>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="tv-card__empty">Tehnička podrška servisa</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
