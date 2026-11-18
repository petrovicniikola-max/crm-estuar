"use client";

import { useMemo, useState } from "react";
import { SITES, type Site } from "@/data/inventory";
import { KpiStrip } from "@/components/wall-map/kpi-strip";
import { LegendBar, type FilterMode } from "@/components/wall-map/legend-bar";
import { LiveClock } from "@/components/wall-map/live-clock";
import { RegionBackdrop } from "@/components/wall-map/region-backdrop";
import { SiteDetail } from "@/components/wall-map/site-detail";
import { SiteList } from "@/components/wall-map/site-list";
import { SiteMarker } from "@/components/wall-map/site-marker";

function matchesFilter(site: Site, filter: FilterMode): boolean {
  if (filter === "all") return true;
  if (filter === "24/7") return site.support === "24/7";
  if (filter === "callcenter") return site.support === "callcenter";
  return site.support === "day" || site.support === "seasonal";
}

export function WallMap() {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selectedId, setSelectedId] = useState<string>("kopaonik");

  const selected = useMemo(
    () => SITES.find((site) => site.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <div className="pointer-events-none absolute inset-0 map-atmosphere" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--signal)]/10 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[var(--steel)]/15 blur-3xl animate-drift-slow" />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1600px] flex-col gap-4 px-4 py-4 md:px-6 md:py-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--ink-muted)] animate-in fade-in duration-700">
              Operativni uvid · terensko održavanje
            </p>
            <h1 className="mt-2 font-display text-4xl leading-[0.92] tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-2 duration-700">
              Mapa održavanja
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-base">
              Zidni pregled svega što je u radu — 24/7 i 8–16h podrška na
              terenu, plus korisnike koje opslužujemo preko call centra.
            </p>
          </div>
          <LiveClock />
        </header>

        <KpiStrip />

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <LegendBar filter={filter} onFilterChange={setFilter} />
          <div
            className="pointer-events-none flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-[var(--ink-muted)]"
            aria-hidden
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--signal)]" />
              24/7
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--steel)]" />
              8–16h
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--season)]" />
              Sezona
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--network)]" />
              Call centar
            </span>
          </div>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[color-mix(in_oklab,white_45%,transparent)] shadow-[0_24px_60px_rgba(31,58,69,0.08)] lg:min-h-[860px]">
            <div className="pointer-events-none absolute inset-0 opacity-40 lg:opacity-100">
              <RegionBackdrop />
            </div>

            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ink-muted)] backdrop-blur">
              Srbija · Crna Gora · Call centar
            </div>

            {/* Soft connectors for 24/7 cluster */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M40 12 L52 40 L62 14 M28 44 L52 40 L70 46"
                fill="none"
                stroke="var(--signal)"
                strokeOpacity="0.22"
                strokeWidth="0.3"
                strokeDasharray="1.2 1.1"
                className="animate-dash"
              />
              <path
                d="M12 68 L30 82 L10 90"
                fill="none"
                stroke="var(--steel)"
                strokeOpacity="0.22"
                strokeWidth="0.28"
                strokeDasharray="1 1"
              />
              <path
                d="M88 18 L88 48 L88 74"
                fill="none"
                stroke="var(--network)"
                strokeOpacity="0.2"
                strokeWidth="0.28"
                strokeDasharray="1 1.2"
              />
            </svg>

            <div className="absolute inset-0 z-20 hidden lg:block">
              {SITES.map((site) => {
                const visible = matchesFilter(site, filter);
                return (
                  <SiteMarker
                    key={site.id}
                    site={site}
                    active={selectedId === site.id}
                    dimmed={!visible}
                    onSelect={setSelectedId}
                  />
                );
              })}
            </div>

            <div className="relative z-10 p-4 lg:hidden">
              <SiteList
                sites={SITES}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isVisible={(site) => matchesFilter(site, filter)}
              />
            </div>

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden flex-wrap gap-2 lg:flex md:bottom-5 md:left-5">
              <div className="rounded-2xl border border-[var(--signal)]/40 bg-[color-mix(in_oklab,var(--signal)_12%,white)] px-3 py-2 text-xs text-[var(--ink)] backdrop-blur">
                <span className="font-semibold uppercase tracking-[0.14em] text-[var(--signal)]">
                  24/7
                </span>
                <span className="ml-2 text-[var(--ink-muted)]">
                  Kopaonik · Zlatibor · Stara planina · Aerodrom · SrbijaVoz
                </span>
              </div>
              <div className="rounded-2xl border border-[var(--network)]/30 bg-white/80 px-3 py-2 text-xs text-[var(--ink)] backdrop-blur">
                <span className="font-semibold uppercase tracking-[0.14em] text-[var(--network)]">
                  Call centar
                </span>
                <span className="ml-2 text-[var(--ink-muted)]">
                  Estuar · Lasta · distributeri
                </span>
              </div>
            </div>
          </section>

          <div className="min-h-[280px]">
            <SiteDetail site={selected} />
          </div>
        </div>

        <footer className="grid gap-3 pb-1 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
              Kritični režim
            </div>
            <p className="mt-1 text-sm text-[var(--ink)]">
              Kopaonik, Zlatibor, Stara planina, Aerodrom i SrbijaVoz — 24/7.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
              U radu · 8–16h
            </div>
            <p className="mt-1 text-sm text-[var(--ink)]">
              Webshop, Petnica, Kotor, Ada, Goč i ostale tačke — podrška danju.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
              Call centar
            </div>
            <p className="mt-1 text-sm text-[var(--ink)]">
              Estuar (900), Lasta (~150 kasa) i ~18.000 uređaja preko distributera.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
