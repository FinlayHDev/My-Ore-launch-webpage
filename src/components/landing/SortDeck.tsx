import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Clock, RotateCcw } from "lucide-react";
import { Hopper } from "./Hopper";
import { cn } from "@/lib/utils";

type Dir = "up" | "right" | "left" | "down";

const BUCKETS: Record<Dir, string> = {
  up: "Do now",
  right: "Today",
  left: "This week",
  down: "Let go",
};

const CARDS = [
  {
    tag: "uni",
    title: "Reply to accommodation email",
    body: "Due Friday. A short reply clears it.",
    meta: "Email · 10 min",
  },
  {
    tag: "home",
    title: "Pick up parcel from Mum's",
    body: "She's in until six. Pair it with the shop run.",
    meta: "Errand · 25 min",
  },
  {
    tag: "work",
    title: "Follow up with Render about the invoice",
    body: "Third mention this week. Hopper noticed.",
    meta: "Email · 5 min",
  },
  {
    tag: "us",
    title: "Plan Saturday with Sam",
    body: "Something outside. Weather looks kind.",
    meta: "With others · 15 min",
  },
  {
    tag: "home",
    title: "Cancel the old gym membership",
    body: "You've written this down four times.",
    meta: "Admin · 10 min",
  },
];

const EXIT: Record<Dir, string> = {
  up: "translate(0, -140%) rotate(-4deg)",
  down: "translate(0, 140%) rotate(4deg)",
  left: "translate(-150%, 0) rotate(-18deg)",
  right: "translate(150%, 0) rotate(18deg)",
};

export function SortDeck() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState<Dir | null>(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [counts, setCounts] = useState<Record<Dir, number>>({ up: 0, right: 0, left: 0, down: 0 });
  const [last, setLast] = useState<Dir | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const done = index >= CARDS.length;

  function send(dir: Dir) {
    if (exiting || done) return;
    setExiting(dir);
    setLast(dir);
    window.setTimeout(() => {
      setCounts((c) => ({ ...c, [dir]: c[dir] + 1 }));
      setIndex((i) => i + 1);
      setExiting(null);
      setDrag({ x: 0, y: 0, active: false });
    }, 320);
  }

  function reset() {
    setIndex(0);
    setCounts({ up: 0, right: 0, left: 0, down: 0 });
    setLast(null);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (exiting) return;
    start.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ x: 0, y: 0, active: true });
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  }
  function onPointerUp() {
    if (!start.current) return;
    start.current = null;
    const { x, y } = drag;
    const ax = Math.abs(x);
    const ay = Math.abs(y);
    if (Math.max(ax, ay) > 90) {
      send(ax > ay ? (x > 0 ? "right" : "left") : y > 0 ? "down" : "up");
    } else {
      setDrag({ x: 0, y: 0, active: false });
    }
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const map: Record<string, Dir> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    const d = map[e.key];
    if (d) {
      e.preventDefault();
      send(d);
    }
  }

  const leaning: Dir | null =
    Math.max(Math.abs(drag.x), Math.abs(drag.y)) > 40
      ? Math.abs(drag.x) > Math.abs(drag.y)
        ? drag.x > 0
          ? "right"
          : "left"
        : drag.y > 0
          ? "down"
          : "up"
      : null;

  const sideBtn = (dir: Dir) =>
    cn(
      "flex items-center justify-center gap-2 rounded-full border border-night-line bg-night-card/70 text-sm font-bold text-night-foreground backdrop-blur transition-all hover:border-primary hover:text-primary disabled:opacity-40",
      (leaning === dir || exiting === dir) && "border-primary bg-primary text-primary-foreground hover:text-primary-foreground",
    );

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between text-night-muted">
        <div className="flex gap-1.5" aria-hidden>
          {CARDS.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 w-6 rounded-full transition-colors",
                i < index ? "bg-primary" : i === index ? "bg-night-foreground" : "bg-night-line",
              )}
            />
          ))}
        </div>
        <span className="label-mono">
          {Math.min(index + 1, CARDS.length)} of {CARDS.length}
        </span>
      </div>

      <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] grid-rows-[auto_minmax(0,1fr)_auto] gap-3">
        <div />
        <button className={cn(sideBtn("up"), "h-11")} onClick={() => send("up")} disabled={done}>
          <ArrowUp className="h-4 w-4" /> do now
        </button>
        <div />

        <button
          className={cn(sideBtn("left"), "h-full min-h-40 flex-col py-4 [writing-mode:vertical-rl] rotate-180")}
          onClick={() => send("left")}
          disabled={done}
        >
          <ArrowRight className="h-4 w-4 rotate-90" /> this week
        </button>

        <div
          className="relative h-[300px] touch-none outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[1.75rem]"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label="Task card. Use arrow keys to sort it."
        >
          {done ? (
            <div className="animate-slide-in flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-night-line p-6 text-center">
              <Hopper tone="light" className="animate-float h-16 w-auto" />
              <p className="mt-4 font-display text-2xl font-bold text-night-foreground">
                All sorted.
              </p>
              <p className="mt-1 text-sm text-night-muted">
                {counts.up + counts.right} for today, {counts.left} later, {counts.down} let go.
              </p>
              <button
                onClick={reset}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-night-line px-4 py-2 text-sm font-semibold text-night-foreground hover:border-primary hover:text-primary"
              >
                <RotateCcw className="h-4 w-4" /> Sort again
              </button>
            </div>
          ) : (
            CARDS.slice(index, index + 3)
              .reverse()
              .map((card, ri, arr) => {
                const depth = arr.length - 1 - ri;
                const isTop = depth === 0;
                const transform = isTop
                  ? exiting
                    ? EXIT[exiting]
                    : `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 18}deg)`
                  : `translateY(${depth * 12}px) scale(${1 - depth * 0.05})`;
                return (
                  <div
                    key={card.title}
                    onPointerDown={isTop ? onPointerDown : undefined}
                    onPointerMove={isTop ? onPointerMove : undefined}
                    onPointerUp={isTop ? onPointerUp : undefined}
                    onPointerCancel={isTop ? onPointerUp : undefined}
                    className={cn(
                      "absolute inset-0 flex flex-col rounded-[1.75rem] bg-cream-card p-6 text-ink shadow-float",
                      isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
                      !(isTop && drag.active && !exiting) &&
                        "transition-transform duration-300 ease-out",
                      isTop && exiting && "opacity-0 transition-[transform,opacity]",
                    )}
                    style={{ transform, zIndex: 10 - depth }}
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" /> {card.tag}
                    </p>
                    <h3 className="mt-3 font-display text-[28px] leading-[1.05] font-extrabold tracking-tight">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[15px] text-ink-soft">{card.body}</p>
                    <p className="mt-auto flex items-center gap-2 text-sm font-semibold text-ink-soft">
                      <Clock className="h-4 w-4" /> {card.meta}
                    </p>
                  </div>
                );
              })
          )}
        </div>

        <button
          className={cn(sideBtn("right"), "h-full min-h-40 flex-col py-4 [writing-mode:vertical-rl]")}
          onClick={() => send("right")}
          disabled={done}
        >
          <ArrowRight className="h-4 w-4 rotate-90" /> today
        </button>

        <div />
        <button className={cn(sideBtn("down"), "h-11")} onClick={() => send("down")} disabled={done}>
          <ArrowDown className="h-4 w-4" /> let go
        </button>
        <div />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {(Object.keys(BUCKETS) as Dir[]).map((d) => (
          <div
            key={d}
            className={cn(
              "rounded-xl border border-night-line bg-night-card/60 px-3 py-2.5 transition-colors",
              last === d && "border-primary",
            )}
          >
            <p className="label-mono text-[10px] text-night-muted">{BUCKETS[d]}</p>
            <p
              key={`${d}-${counts[d]}`}
              className={cn(
                "font-display text-2xl font-bold text-night-foreground",
                counts[d] > 0 && "animate-slide-in",
              )}
            >
              {counts[d]}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-night-muted">
        <ArrowLeft className="h-3.5 w-3.5" /> Drag the card, tap a side, or use your arrow keys.
      </p>
    </div>
  );
}
