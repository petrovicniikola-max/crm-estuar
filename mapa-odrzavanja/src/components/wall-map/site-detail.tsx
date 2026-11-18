import {
  formatMetricValue,
  SUPPORT_LABELS,
  type Site,
} from "@/data/inventory";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type SiteDetailProps = {
  site: Site | null;
};

export function SiteDetail({ site }: SiteDetailProps) {
  if (!site) {
    return (
      <aside className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[var(--line)] bg-[color-mix(in_oklab,white_78%,transparent)] p-5 backdrop-blur-md">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
            Detalj lokacije
          </p>
          <h2 className="mt-3 font-display text-2xl text-[var(--ink)]">
            Izaberite tačku na mapi
          </h2>
          <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-[var(--ink-muted)]">
            Pregledajte uređaje, kapije, kioske i režim podrške za svaku
            lokaciju koju održavamo.
          </p>
        </div>
        <p className="text-xs text-[var(--ink-muted)]">
          Mapa je namenjena zidnom ekranu — čitljiva iz daljine.
        </p>
      </aside>
    );
  }

  return (
    <aside className="flex h-full flex-col rounded-[1.5rem] border border-[var(--line)] bg-[color-mix(in_oklab,white_86%,transparent)] p-5 backdrop-blur-md animate-in fade-in slide-in-from-right-2 duration-400">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
            {site.region === "crna-gora"
              ? "Crna Gora"
              : site.region === "callcentar"
                ? "Call centar"
                : "Srbija"}
          </p>
          <h2 className="mt-2 font-display text-3xl leading-none tracking-tight text-[var(--ink)]">
            {site.name}
          </h2>
        </div>
        <Badge
          variant="secondary"
          className="rounded-md border-0 bg-[var(--ink)] px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white"
        >
          {SUPPORT_LABELS[site.support]}
        </Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">
        {site.summary}
      </p>

      <div className="mt-4 rounded-xl bg-[var(--panel-soft)] px-3 py-2.5 text-sm text-[var(--ink)]">
        <span className="text-[var(--ink-muted)]">Podrška: </span>
        {site.supportNote}
      </div>

      <Separator className="my-5 bg-[var(--line)]" />

      {site.metrics.length > 0 ? (
        <ul className="space-y-3">
          {site.metrics.map((metric) => (
            <li
              key={`${site.id}-${metric.kind}-${metric.label}`}
              className="flex items-end justify-between gap-3 border-b border-[var(--line)] pb-3 last:border-0"
            >
              <span className="text-sm text-[var(--ink-muted)]">
                {metric.label}
              </span>
              <span
                className={
                  typeof metric.value === "number"
                    ? "font-display text-3xl leading-none tracking-tight text-[var(--ink)] tabular-nums"
                    : "max-w-[10rem] text-right text-sm font-medium leading-snug text-[var(--ink)]"
                }
              >
                {formatMetricValue(metric.value)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--ink-muted)]">
          Nema uređaja na terenu — fokus je na tehničkoj podršci servisa.
        </p>
      )}
    </aside>
  );
}
