import { getTotals } from "@/data/inventory";

const totals = getTotals();

const items = [
  { label: "Lokacije", value: totals.sites },
  { label: "24/7 tačke", value: totals.criticalSites },
  { label: "Fiscal Box", value: totals.fiscalBox },
  { label: "Kapije", value: totals.gates },
  { label: "Kiosci", value: totals.kiosks },
  { label: "Prodajna mesta", value: totals.pos },
  { label: "Call centar kase", value: totals.estuarUsers + totals.fiscalRegisters },
];

export function KpiStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,white_72%,transparent)] px-3 py-2.5 backdrop-blur-sm"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
            {item.label}
          </div>
          <div className="mt-1 font-display text-2xl leading-none tracking-tight text-[var(--ink)] tabular-nums md:text-[1.7rem]">
            {new Intl.NumberFormat("sr-RS").format(item.value)}
          </div>
        </div>
      ))}
    </div>
  );
}
