"use client";

import dynamic from "next/dynamic";

const WallMap = dynamic(
  () =>
    import("@/components/wall-map/wall-map").then((mod) => mod.WallMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "100vh",
          background: "#e7eef0",
          color: "#163039",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 28,
        }}
      >
        Mapa održavanja…
      </div>
    ),
  },
);

/** Desktop mapa. TV browseri idu na /tv (server HTML, bez React-a). */
export function WallMapRoot() {
  return <WallMap />;
}
