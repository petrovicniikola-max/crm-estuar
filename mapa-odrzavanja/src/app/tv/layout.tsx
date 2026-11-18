import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa održavanja · TV",
  description: "TV / kiosk pregled mape održavanja",
};

/** Bez Google fontova i bez client bundle-a — Hisense VIDAA. */
export default function TvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        background: "#dfe8eb",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
