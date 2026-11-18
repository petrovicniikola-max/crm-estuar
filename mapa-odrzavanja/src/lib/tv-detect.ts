/** Hisense VIDAA i slični TV browseri slabo podnose moderni CSS. */
export function isTvBrowser(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return (
    ua.includes("vidaa") ||
    ua.includes("hisense") ||
    ua.includes("smart-tv") ||
    ua.includes("smarttv") ||
    ua.includes("tizen") ||
    ua.includes("webos") ||
    ua.includes("hbbtv") ||
    ua.includes("netcast") ||
    ua.includes("appletv") ||
    ua.includes("googletv") ||
    ua.includes("aft") || // Fire TV
    ua.includes("bravia")
  );
}
