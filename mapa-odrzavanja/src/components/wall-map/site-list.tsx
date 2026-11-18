"use client";

import {
  formatMetricValue,
  SUPPORT_LABELS,
  type Site,
} from "@/data/inventory";
import { cn } from "@/lib/utils";

type SiteListProps = {
  sites: Site[];
  selectedId: string;
  onSelect: (id: string) => void;
  isVisible: (site: Site) => boolean;
};

export function SiteList({
  sites,
  selectedId,
  onSelect,
  isVisible,
}: SiteListProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:hidden">
      {sites.map((site) => {
        const visible = isVisible(site);
        return (
          <button
            key={site.id}
            type="button"
            onClick={() => onSelect(site.id)}
            className={cn(
              "rounded-2xl border px-3.5 py-3 text-left transition-all",
              selectedId === site.id
                ? "border-[var(--ink)] bg-white"
                : "border-[var(--line)] bg-white/70",
              !visible && "opacity-40",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-lg text-[var(--ink)]">
                {site.name}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                {SUPPORT_LABELS[site.support]}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              {site.supportNote}
            </p>
            {site.metrics.length > 0 ? (
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {site.metrics.map((metric) => (
                  <div
                    key={`${site.id}-${metric.kind}-${metric.label}`}
                    className="rounded-lg bg-[var(--panel-soft)] px-2 py-1"
                  >
                    <div className="text-[0.58rem] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                      {metric.label}
                    </div>
                    <div className="font-display text-lg leading-none tabular-nums text-[var(--ink)]">
                      {formatMetricValue(metric.value)}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
