"use client";

import { useEffect, useState } from "react";
import { isTvBrowser } from "@/lib/tv-detect";
import { TvBoard } from "@/components/wall-map/tv-board";
import { WallMap } from "@/components/wall-map/wall-map";

export function WallMapRoot() {
  const [mode, setMode] = useState<"loading" | "tv" | "desktop">("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceTv = params.get("tv") === "1" || params.get("tv") === "true";
    const forceDesktop =
      params.get("tv") === "0" || params.get("desktop") === "1";

    if (forceDesktop) {
      setMode("desktop");
      document.documentElement.classList.remove("tv-mode");
      return;
    }

    if (forceTv || isTvBrowser(navigator.userAgent)) {
      setMode("tv");
      document.documentElement.classList.add("tv-mode");
      return;
    }

    setMode("desktop");
    document.documentElement.classList.remove("tv-mode");
  }, []);

  if (mode === "loading") {
    return (
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
    );
  }

  if (mode === "tv") return <TvBoard />;
  return <WallMap />;
}
