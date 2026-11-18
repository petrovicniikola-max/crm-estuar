import { Suspense } from "react";
import { connection } from "next/server";
import {
  SITES,
  SUPPORT_LABELS,
  formatMetricValue,
  getTotals,
  type Site,
  type SupportMode,
} from "@/data/inventory";

const GROUPS: {
  title: string;
  color: string;
  match: (s: Site) => boolean;
}[] = [
  {
    title: "24/7",
    color: "#c2410c",
    match: (s) => s.support === "24/7",
  },
  {
    title: "8–16h / SEZONA",
    color: "#0f6e7a",
    match: (s) => s.support === "day" || s.support === "seasonal",
  },
  {
    title: "CALL CENTAR",
    color: "#1f3d63",
    match: (s) => s.support === "callcenter",
  },
];

function formatNow() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("sr-RS", {
    timeZone: "Europe/Belgrade",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const date = new Intl.DateTimeFormat("sr-RS", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(now);
  return { time, date };
}

export default function TvPage() {
  return (
    <Suspense fallback={<TvBoardBody time="--:--" date="Učitavanje…" />}>
      <TvBoardLive />
    </Suspense>
  );
}

async function TvBoardLive() {
  await connection();
  const { time, date } = formatNow();
  return <TvBoardBody time={time} date={date} />;
}

function TvBoardBody({ time, date }: { time: string; date: string }) {
  const totals = getTotals();
  const kpiItems = [
    { label: "Lokacije", value: totals.sites },
    { label: "24/7", value: totals.criticalSites },
    { label: "Kapije", value: totals.gates },
    { label: "Kiosci", value: totals.kiosks },
    { label: "Fiscal Box", value: totals.fiscalBox },
    {
      label: "Call centar",
      value: totals.estuarUsers + totals.fiscalRegisters,
    },
  ];

  return (
    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{
        background: "#dfe8eb",
        color: "#163039",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: "24px 28px 8px" }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td valign="bottom">
                    <div
                      style={{
                        fontSize: 16,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#5d737c",
                        marginBottom: 6,
                      }}
                    >
                      OPERATIVNI UVID · TV
                    </div>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: 52,
                        lineHeight: 1.05,
                        fontWeight: 700,
                      }}
                    >
                      Mapa održavanja
                    </h1>
                  </td>
                  <td valign="bottom" align="right" width={220}>
                    <div
                      style={{
                        fontSize: 44,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {time}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 18,
                        color: "#5d737c",
                        textTransform: "uppercase",
                      }}
                    >
                      {date}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td style={{ padding: "12px 28px 8px" }}>
            <table width="100%" cellPadding={0} cellSpacing={8}>
              <tbody>
                <tr>
                  {kpiItems.map((item) => (
                    <td
                      key={item.label}
                      style={{
                        background: "#ffffff",
                        border: "2px solid #b7c5cb",
                        borderRadius: 12,
                        padding: "12px 14px",
                        verticalAlign: "top",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#5d737c",
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>
                        {new Intl.NumberFormat("sr-RS").format(item.value)}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {GROUPS.map((group) => {
          const sites = SITES.filter(group.match);
          const rows: Site[][] = [];
          for (let i = 0; i < sites.length; i += 3) {
            rows.push(sites.slice(i, i + 3));
          }

          return (
            <tr key={group.title}>
              <td style={{ padding: "10px 28px 6px" }}>
                <h2
                  style={{
                    margin: "0 0 10px",
                    paddingLeft: 12,
                    borderLeft: `6px solid ${group.color}`,
                    color: group.color,
                    fontSize: 22,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {group.title}
                </h2>

                <table width="100%" cellPadding={0} cellSpacing={10}>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={`${group.title}-${rowIndex}`}>
                        {row.map((site) => (
                          <td
                            key={site.id}
                            width="33%"
                            valign="top"
                            style={{
                              background: "#ffffff",
                              border: "2px solid #b7c5cb",
                              borderTop: `6px solid ${group.color}`,
                              borderRadius: 14,
                              padding: "14px 16px 16px",
                            }}
                          >
                            <table width="100%" cellPadding={0} cellSpacing={0}>
                              <tbody>
                                <tr>
                                  <td>
                                    <h3
                                      style={{
                                        margin: 0,
                                        fontSize: 26,
                                        lineHeight: 1.15,
                                        fontWeight: 700,
                                      }}
                                    >
                                      {site.name}
                                    </h3>
                                  </td>
                                  <td align="right" width={90}>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        background: group.color,
                                        color: "#ffffff",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        padding: "6px 8px",
                                      }}
                                    >
                                      {SUPPORT_LABELS[site.support as SupportMode]}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <p
                              style={{
                                margin: "8px 0 12px",
                                fontSize: 16,
                                color: "#5d737c",
                              }}
                            >
                              {site.supportNote}
                            </p>

                            {site.metrics.length > 0 ? (
                              <table width="100%" cellPadding={0} cellSpacing={6}>
                                <tbody>
                                  {chunk(site.metrics, 2).map((pair, idx) => (
                                    <tr key={`${site.id}-m-${idx}`}>
                                      {pair.map((m) => (
                                        <td
                                          key={`${site.id}-${m.kind}-${m.label}`}
                                          width="50%"
                                          style={{
                                            background: "#f2f5f6",
                                            border: "1px solid #c9d4d9",
                                            padding: "8px 10px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontSize: 12,
                                              letterSpacing: "0.06em",
                                              textTransform: "uppercase",
                                              color: "#5d737c",
                                              marginBottom: 2,
                                            }}
                                          >
                                            {m.label}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: 24,
                                              lineHeight: 1,
                                              fontWeight: 700,
                                            }}
                                          >
                                            {formatMetricValue(m.value)}
                                          </div>
                                        </td>
                                      ))}
                                      {pair.length === 1 ? <td width="50%" /> : null}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p style={{ margin: 0, fontSize: 16, color: "#5d737c" }}>
                                Tehnička podrška servisa
                              </p>
                            )}
                          </td>
                        ))}
                        {row.length < 3
                          ? Array.from({ length: 3 - row.length }).map((_, i) => (
                              <td key={`empty-${rowIndex}-${i}`} width="33%" />
                            ))
                          : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          );
        })}

        <tr>
          <td style={{ padding: "8px 28px 24px", color: "#5d737c", fontSize: 14 }}>
            Automatsko osvežavanje svakih 60s · bookmark: /tv
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
