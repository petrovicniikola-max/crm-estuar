"use client";

import { cn } from "@/lib/utils";

export type FilterMode = "all" | "24/7" | "day" | "callcenter";

type LegendBarProps = {
  filter: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
};

const filters: { id: FilterMode; label: string; swatch?: string }[] = [
  { id: "all", label: "Sve" },
  { id: "24/7", label: "24/7", swatch: "var(--signal)" },
  { id: "day", label: "8–16h / sezona", swatch: "var(--steel)" },
  { id: "callcenter", label: "Call centar", swatch: "var(--network)" },
];

export function LegendBar({ filter, onFilterChange }: LegendBarProps) {
  return (
    <div
      className="relative z-20 flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filteri"
    >
      {filters.map((item) => {
        const active = filter === item.id;
        return (
          <button
            key={item.id}
            type="button"
            data-filter={item.id}
            onClick={() => onFilterChange(item.id)}
            aria-pressed={active}
            className={cn(
              "relative z-20 inline-flex min-h-10 min-w-[4.5rem] items-center justify-center rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors",
              active
                ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                : "border-[var(--line)] bg-white/70 text-[var(--ink)] hover:bg-white",
            )}
          >
            {item.swatch ? (
              <span
                className="mr-1.5 inline-block size-2 shrink-0 rounded-full"
                style={{ background: item.swatch }}
                aria-hidden
              />
            ) : null}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
