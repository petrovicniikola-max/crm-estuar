export function RegionBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="land" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d9e6df" />
          <stop offset="45%" stopColor="#e8eee6" />
          <stop offset="100%" stopColor="#d4e0ea" />
        </linearGradient>
        <linearGradient id="sea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b7cdd8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8fb0c2" stopOpacity="0.55" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#1f3a45"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </pattern>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect width="1000" height="700" fill="url(#land)" />
      <rect width="1000" height="700" fill="url(#grid)" />

      {/* Adriatic suggestion */}
      <ellipse cx="120" cy="560" rx="260" ry="180" fill="url(#sea)" />
      <ellipse
        cx="180"
        cy="620"
        rx="180"
        ry="90"
        fill="#7fa6b8"
        opacity="0.25"
        filter="url(#soft)"
      />

      {/* Stylized Serbia mass */}
      <path
        d="M430 70
           C510 55 590 80 640 130
           C690 180 720 250 705 320
           C690 390 650 450 610 510
           C570 560 520 600 470 620
           C410 645 350 630 320 570
           C290 510 300 440 310 380
           C320 310 340 240 360 180
           C380 120 390 85 430 70 Z"
        fill="#f4f7f2"
        stroke="#27424c"
        strokeWidth="2.5"
        strokeOpacity="0.35"
      />

      {/* Montenegro mass */}
      <path
        d="M300 560
           C340 540 380 555 410 590
           C440 625 445 665 410 690
           C370 715 320 705 285 670
           C255 640 260 590 300 560 Z"
        fill="#eef4f0"
        stroke="#27424c"
        strokeWidth="2.2"
        strokeOpacity="0.35"
      />

      {/* Mountain ridges */}
      <path
        d="M470 180 C500 220 520 260 535 310 C550 360 560 410 545 455"
        fill="none"
        stroke="#2f5a4a"
        strokeOpacity="0.18"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M420 250 C450 290 470 340 485 390 C500 430 505 470 490 510"
        fill="none"
        stroke="#2f5a4a"
        strokeOpacity="0.12"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M330 600 C350 620 370 640 385 665"
        fill="none"
        stroke="#2f5a4a"
        strokeOpacity="0.16"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Region labels */}
      <text
        x="520"
        y="120"
        fill="#1f3a45"
        fillOpacity="0.45"
        fontSize="28"
        fontFamily="var(--font-display)"
        letterSpacing="6"
      >
        SRBIJA
      </text>
      <text
        x="250"
        y="640"
        fill="#1f3a45"
        fillOpacity="0.4"
        fontSize="18"
        fontFamily="var(--font-display)"
        letterSpacing="4"
      >
        CRNA GORA
      </text>
    </svg>
  );
}
