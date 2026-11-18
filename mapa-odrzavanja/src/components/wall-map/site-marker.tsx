"use client";

import {
  formatMetricValue,
  SUPPORT_LABELS,
  type Metric,
  type Site,
} from "@/data/inventory";
import { cn } from "@/lib/utils";

type SiteMarkerProps = {
  site: Site;
  active: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
};

const toneBySupport = {
  "24/7": {
    ring: "border-[var(--signal)]",
    glow: "shadow-[0_0_0_6px_color-mix(in_oklab,var(--signal)_18%,transparent)]",
    badge: "bg-[var(--signal)] text-white",
    pulse: true,
  },
  day: {
    ring: "border-[var(--steel)]",
    glow: "shadow-[0_0_0_5px_color-mix(in_oklab,var(--steel)_14%,transparent)]",
    badge: "bg-[var(--steel)] text-white",
    pulse: false,
  },
  seasonal: {
    ring: "border-[var(--season)]",
    glow: "shadow-[0_0_0_5px_color-mix(in_oklab,var(--season)_16%,transparent)]",
    badge: "bg-[var(--season)] text-[var(--ink)]",
    pulse: false,
  },
  callcenter: {
    ring: "border-[var(--network)]",
    glow: "shadow-[0_0_0_5px_color-mix(in_oklab,var(--network)_14%,transparent)]",
    badge: "bg-[var(--network)] text-white",
    pulse: false,
  },
} as const;

function MetricChip({ metric }: { metric: Metric }) {
  return (
    <span className="flex min-w-0 flex-col rounded-lg bg-[var(--panel-soft)] px-1.5 py-1">
      <span className="truncate text-[0.58rem] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
        {metric.label}
      </span>
      <span className="font-display text-base leading-none tracking-tight text-[var(--ink)] tabular-nums">
        {formatMetricValue(metric.value)}
      </span>
    </span>
  );
}

export function SiteMarker({
  site,
  active,
  dimmed,
  onSelect,
}: SiteMarkerProps) {
  const tone = toneBySupport[site.support];
  const metrics = site.metrics;
  const showGrid = metrics.length >= 2;

  return (
    <button
      type="button"
      onClick={() => onSelect(site.id)}
      className={cn(
        "group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left transition-all duration-500 ease-out",
        dimmed && "opacity-35 grayscale-[0.35]",
        active && "z-20 scale-[1.03]",
      )}
      style={{ left: `${site.x}%`, top: `${site.y}%` }}
      aria-pressed={active}
      aria-label={`${site.name}, ${SUPPORT_LABELS[site.support]}`}
    >
      <span
        className={cn(
          "relative flex flex-col gap-1.5 rounded-[1.15rem] border-2 bg-[color-mix(in_oklab,white_88%,transparent)] px-3 py-2.5 backdrop-blur-md transition-transform duration-300",
          showGrid ? "min-w-[12rem] max-w-[13.5rem]" : "min-w-[9.5rem]",
          tone.ring,
          tone.glow,
          active && "bg-white",
          "hover:-translate-y-0.5",
        )}
      >
        {tone.pulse ? (
          <span className="pointer-events-none absolute -inset-1 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-[1.35rem] border border-[var(--signal)] opacity-0" />
        ) : null}

        <span className="flex items-center justify-between gap-2">
          <span className="font-display text-[0.95rem] leading-none tracking-wide text-[var(--ink)]">
            {site.name}
          </span>
          <span
            className={cn(
              "shrink-0 rounded-md px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em]",
              tone.badge,
            )}
          >
            {SUPPORT_LABELS[site.support]}
          </span>
        </span>

        {showGrid ? (
          <span className="grid grid-cols-2 gap-1">
            {metrics.map((metric) => (
              <MetricChip
                key={`${site.id}-${metric.kind}-${metric.label}`}
                metric={metric}
              />
            ))}
          </span>
        ) : metrics[0] ? (
          <span className="flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none tracking-tight text-[var(--ink)] tabular-nums">
              {formatMetricValue(metrics[0].value)}
            </span>
            <span className="max-w-[6.5rem] text-[0.68rem] leading-tight text-[var(--ink-muted)]">
              {metrics[0].label}
            </span>
          </span>
        ) : (
          <span className="text-[0.72rem] leading-snug text-[var(--ink-muted)]">
            {site.supportNote}
          </span>
        )}
      </span>
    </button>
  );
}
