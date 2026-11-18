export type SupportMode = "24/7" | "day" | "seasonal" | "callcenter";

export type MetricKind =
  | "pos"
  | "gates"
  | "lcm"
  | "fiscalBox"
  | "kiosk"
  | "users"
  | "distributors"
  | "devices"
  | "fiscalRegister";

export type Metric = {
  kind: MetricKind;
  label: string;
  value: number | string;
};

export type Site = {
  id: string;
  name: string;
  region: "srbija" | "crna-gora" | "callcentar";
  support: SupportMode;
  supportNote: string;
  summary: string;
  metrics: Metric[];
  /** Position on the wall map canvas, percentages */
  x: number;
  y: number;
  priority: "critical" | "standard" | "callcenter";
};

export const SITES: Site[] = [
  {
    id: "kopaonik",
    name: "Kopaonik",
    region: "srbija",
    support: "24/7",
    supportNote: "Neprekidna podrška",
    summary: "Skijalište — kapije, kiosci, prodaja i LCM po grupi kapija.",
    metrics: [
      { kind: "gates", label: "Kapije", value: 89 },
      { kind: "kiosk", label: "Kiosci", value: 39 },
      { kind: "pos", label: "Prodajna mesta", value: 23 },
      { kind: "lcm", label: "LCM", value: "po grupi kapija" },
    ],
    x: 52,
    y: 40,
    priority: "critical",
  },
  {
    id: "zlatibor",
    name: "Zlatibor",
    region: "srbija",
    support: "24/7",
    supportNote: "Neprekidna podrška",
    summary: "Skijalište — kapije, kiosci, prodaja i LCM po grupi kapija.",
    metrics: [
      { kind: "gates", label: "Kapije", value: 14 },
      { kind: "kiosk", label: "Kiosci", value: 1 },
      { kind: "pos", label: "Prodajna mesta", value: 5 },
      { kind: "lcm", label: "LCM", value: "po grupi kapija" },
    ],
    x: 28,
    y: 44,
    priority: "critical",
  },
  {
    id: "stara-planina",
    name: "Stara planina",
    region: "srbija",
    support: "24/7",
    supportNote: "Neprekidna podrška",
    summary: "Skijalište — kapije, prodaja i LCM; kiosci još nisu u radu.",
    metrics: [
      { kind: "gates", label: "Kapije", value: 14 },
      { kind: "kiosk", label: "Kiosci", value: 0 },
      { kind: "pos", label: "Prodajna mesta", value: 4 },
      { kind: "lcm", label: "LCM", value: "po grupi kapija" },
    ],
    x: 70,
    y: 46,
    priority: "critical",
  },
  {
    id: "aerodrom",
    name: "Aerodrom",
    region: "srbija",
    support: "24/7",
    supportNote: "Neprekidna podrška",
    summary: "Fiskalne kutije na aerodromskim tačkama.",
    metrics: [{ kind: "fiscalBox", label: "Fiscal Box", value: 36 }],
    x: 40,
    y: 12,
    priority: "critical",
  },
  {
    id: "srbijavoz",
    name: "SrbijaVoz",
    region: "srbija",
    support: "24/7",
    supportNote: "Neprekidna podrška",
    summary: "Fiscal Box uređaji i kompletan kiosk.",
    metrics: [
      { kind: "fiscalBox", label: "Fiscal Box", value: 64 },
      { kind: "kiosk", label: "Kiosk", value: "komplet" },
    ],
    x: 62,
    y: 14,
    priority: "critical",
  },
  {
    id: "webshop-skijalista",
    name: "Webshop — Skijališta",
    region: "srbija",
    support: "day",
    supportNote: "Tehnička podrška 8–16h, svaki dan",
    summary: "Online prodaja karata za skijališta — u radu.",
    metrics: [],
    x: 86,
    y: 36,
    priority: "standard",
  },
  {
    id: "webshop-kotor",
    name: "Webshop — Kotor Gondola",
    region: "crna-gora",
    support: "seasonal",
    supportNote: "Tokom letnje sezone, podrška 8–16h",
    summary: "Sezonska online prodaja za gondolu — u radu u sezoni.",
    metrics: [],
    x: 12,
    y: 68,
    priority: "standard",
  },
  {
    id: "kotorska-tvrdjava",
    name: "Kotorska tvrđava",
    region: "crna-gora",
    support: "day",
    supportNote: "Podrška 8–16h",
    summary: "Kiosci za prodaju ulaznica — u radu.",
    metrics: [{ kind: "kiosk", label: "Kiosci", value: 4 }],
    x: 10,
    y: 90,
    priority: "standard",
  },
  {
    id: "kotor-gondola",
    name: "Kotor Gondola",
    region: "crna-gora",
    support: "day",
    supportNote: "Podrška 8–16h · kapije, POS i kiosci",
    summary: "Kontrola pristupa, prodaja i kiosci na gondoli — u radu.",
    metrics: [
      { kind: "gates", label: "Kapije", value: 17 },
      { kind: "pos", label: "POS", value: 13 },
      { kind: "kiosk", label: "Kiosci", value: 6 },
    ],
    x: 30,
    y: 82,
    priority: "standard",
  },
  {
    id: "secam",
    name: "SECAM CCTV",
    region: "srbija",
    support: "day",
    supportNote: "Podrška 8–16h",
    summary: "Fiscal Box na SECAM tačkama — u radu.",
    metrics: [{ kind: "fiscalBox", label: "Fiscal Box", value: 15 }],
    x: 18,
    y: 26,
    priority: "standard",
  },
  {
    id: "lako-parkiraj",
    name: "Lako parkiraj",
    region: "srbija",
    support: "day",
    supportNote: "Podrška 8–16h",
    summary: "Fiskalne kutije na parking tačkama — u radu.",
    metrics: [{ kind: "fiscalBox", label: "Fiscal Box", value: 3 }],
    x: 18,
    y: 10,
    priority: "standard",
  },
  {
    id: "ada",
    name: "Ada",
    region: "srbija",
    support: "day",
    supportNote: "Podrška 8–16h",
    summary: "Fiscal Box i prodajna mesta — u radu.",
    metrics: [
      { kind: "fiscalBox", label: "Fiscal Box", value: 5 },
      { kind: "pos", label: "Prodajna mesta", value: 3 },
    ],
    x: 36,
    y: 28,
    priority: "standard",
  },
  {
    id: "goc",
    name: "Goč",
    region: "srbija",
    support: "day",
    supportNote: "Podrška 8–16h",
    summary: "Kapije i prodajno mesto — u radu.",
    metrics: [
      { kind: "gates", label: "Kapije", value: 2 },
      { kind: "pos", label: "Prodajno mesto", value: 1 },
    ],
    x: 46,
    y: 62,
    priority: "standard",
  },
  {
    id: "petnica",
    name: "Bazen Petnica",
    region: "srbija",
    support: "day",
    supportNote: "Podrška 8–16h",
    summary: "Kapije, kiosk i prodajno mesto — u radu.",
    metrics: [
      { kind: "gates", label: "Kapije", value: 2 },
      { kind: "kiosk", label: "Kiosk", value: 1 },
      { kind: "pos", label: "Prodajno mesto", value: 1 },
    ],
    x: 20,
    y: 52,
    priority: "standard",
  },
  {
    id: "lasta",
    name: "Lasta A.D.",
    region: "callcentar",
    support: "callcenter",
    supportNote: "Podrška preko call centra",
    summary: "Fiskalne kase koje opslužujemo preko call centra.",
    metrics: [
      { kind: "fiscalRegister", label: "Fiskalne kase", value: 150 },
    ],
    x: 88,
    y: 18,
    priority: "callcenter",
  },
  {
    id: "estuar",
    name: "Estuar korisnici",
    region: "callcentar",
    support: "callcenter",
    supportNote: "Podrška preko call centra",
    summary: "Korisnici Estuar kasa koje opslužujemo preko call centra.",
    metrics: [
      { kind: "users", label: "Korisnici", value: 900 },
      { kind: "devices", label: "Fiskalni uređaji", value: 900 },
    ],
    x: 88,
    y: 48,
    priority: "callcenter",
  },
  {
    id: "distributeri",
    name: "Distributeri Teron & Estuar",
    region: "callcentar",
    support: "callcenter",
    supportNote: "Podrška preko call centra",
    summary:
      "Distributeri i uređaji kod njihovih korisnika — podrška preko call centra.",
    metrics: [
      { kind: "distributors", label: "Distributeri", value: 100 },
      { kind: "devices", label: "Uređaji kod korisnika", value: 18000 },
    ],
    x: 88,
    y: 74,
    priority: "callcenter",
  },
];

export const SUPPORT_LABELS: Record<SupportMode, string> = {
  "24/7": "24/7",
  day: "8–16h",
  seasonal: "Sezona",
  callcenter: "Call centar",
};

export function formatMetricValue(value: number | string): string {
  if (typeof value === "string") return value;
  return new Intl.NumberFormat("sr-RS").format(value);
}

export function getTotals(sites: Site[] = SITES) {
  let fiscalBox = 0;
  let gates = 0;
  let pos = 0;
  let kiosks = 0;
  let fiscalRegisters = 0;
  let criticalSites = 0;

  for (const site of sites) {
    if (site.support === "24/7") criticalSites += 1;
    for (const metric of site.metrics) {
      if (typeof metric.value !== "number") continue;
      if (metric.kind === "fiscalBox") fiscalBox += metric.value;
      if (metric.kind === "gates") gates += metric.value;
      if (metric.kind === "pos") pos += metric.value;
      if (metric.kind === "kiosk") kiosks += metric.value;
      if (metric.kind === "fiscalRegister") fiscalRegisters += metric.value;
    }
  }

  return {
    sites: sites.filter((s) => s.priority !== "callcenter").length,
    criticalSites,
    fiscalBox,
    gates,
    pos,
    kiosks,
    fiscalRegisters,
    estuarUsers: 900,
    distributorDevices: 18000,
    distributors: 100,
  };
}
