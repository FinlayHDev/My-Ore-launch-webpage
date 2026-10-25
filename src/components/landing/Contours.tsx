/** Field-survey contour lines with one orange "useful signal" route. */
export function Contours({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      fill="none"
    >
      <g className="stroke-paper-line" strokeWidth="1.2">
        <path d="M0 120 C 160 90, 260 160, 420 130 S 700 90, 800 120" />
        <path d="M0 210 C 140 190, 300 250, 460 215 S 680 180, 800 220" />
        <path d="M0 520 C 180 490, 300 560, 480 520 S 690 480, 800 530" />
        <path d="M0 640 C 120 610, 320 690, 500 650 S 700 600, 800 660" />
        <path d="M0 740 C 200 720, 330 770, 520 745 S 720 715, 800 750" />
      </g>
      <path
        d="M-10 690 C 140 660, 220 600, 300 470 S 470 260, 560 230 S 720 120, 810 60"
        className="animate-draw stroke-primary"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M30 330 C 110 380, 160 520, 260 600 S 330 720, 360 800"
        className="stroke-primary/50"
        strokeWidth="2"
      />
      <circle cx="300" cy="470" r="7" className="fill-paper stroke-primary" strokeWidth="3" />
      <circle cx="560" cy="230" r="7" className="fill-paper stroke-primary" strokeWidth="3" />
    </svg>
  );
}
