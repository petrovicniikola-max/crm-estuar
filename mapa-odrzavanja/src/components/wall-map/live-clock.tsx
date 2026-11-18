"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return Date.now();
}

function getServerSnapshot() {
  return 0;
}

export function LiveClock() {
  const nowMs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = nowMs > 0;
  const now = ready ? new Date(nowMs) : null;

  const time = now
    ? new Intl.DateTimeFormat("sr-RS", {
        timeZone: "Europe/Belgrade",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--:--";

  const date = now
    ? new Intl.DateTimeFormat("sr-RS", {
        timeZone: "Europe/Belgrade",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : "";

  return (
    <div className="text-right leading-tight" suppressHydrationWarning>
      <div
        className="font-display text-3xl tracking-[0.08em] text-[var(--ink)] tabular-nums md:text-4xl"
        suppressHydrationWarning
      >
        {time}
      </div>
      <div
        className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)] capitalize"
        suppressHydrationWarning
      >
        {date}
      </div>
    </div>
  );
}
