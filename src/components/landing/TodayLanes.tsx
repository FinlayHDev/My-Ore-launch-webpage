import { useEffect, useState } from "react";
import { Check, Pause, Play, Target, Users, Zap } from "lucide-react";
import { Hopper } from "./Hopper";
import { cn } from "@/lib/utils";

type Task = { id: number; title: string; tag: string; done: boolean };
type Lane = { key: string; label: string; icon: typeof Zap; hint: string; tasks: Task[] };

const INITIAL: Lane[] = [
  {
    key: "quick",
    label: "Quick wins",
    icon: Zap,
    hint: "under 5 min",
    tasks: [
      { id: 1, title: "Reply to supplier quote", tag: "#jobs", done: true },
      { id: 2, title: "Chase INV-0142", tag: "#money", done: false },
    ],
  },
  {
    key: "deep",
    label: "Deep focus",
    icon: Target,
    hint: "one at a time",
    tasks: [{ id: 3, title: "Price up the kitchen refit", tag: "#jobs", done: false }],
  },
  {
    key: "others",
    label: "With others",
    icon: Users,
    hint: "needs a reply",
    tasks: [
      { id: 4, title: "Call Jo at Harlow & Co", tag: "Jo", done: true },
      { id: 5, title: "Confirm Thursday site visit", tag: "#jobs", done: false },
    ],
  },
];

export function loadLabel(left: number) {
  if (left === 0) return "Clear. Go outside.";
  if (left <= 1) return "Nearly there";
  if (left <= 3) return "Comfortably full";
  return "A full cart";
}

const DAYS = [
  ["Mon", 19],
  ["Tue", 20],
  ["Wed", 21],
  ["Thu", 22],
  ["Fri", 23],
  ["Sat", 24],
  ["Sun", 25],
] as const;

export function TodayLanes() {
  const [lanes, setLanes] = useState(INITIAL);
  const [view, setView] = useState<"list" | "split">("list");
  // Demo timer: 25 "minutes" run at 1 per 0.2s so the Time's up moment is visible.
  const [timer, setTimer] = useState<{ id: number; left: number; running: boolean } | null>(null);
  useEffect(() => {
    if (!timer?.running || timer.left <= 0) return;
    const t = setTimeout(() => setTimer((x) => (x ? { ...x, left: x.left - 1 } : x)), 200);
    return () => clearTimeout(t);
  }, [timer]);
  const timedTask = timer ? lanes.flatMap((l) => l.tasks).find((t) => t.id === timer.id) : null;
  function startTimer(id: number) {
    setTimer((x) => (x?.id === id ? { ...x, running: !x.running } : { id, left: 25, running: true }));
  }
  const all = lanes.flatMap((l) => l.tasks);
  const doneCount = all.filter((t) => t.done).length;
  const left = all.length - doneCount;
  const pct = Math.round((doneCount / all.length) * 100);
  const R = 34;
  const C = 2 * Math.PI * R;

  function toggle(id: number) {
    setLanes((ls) =>
      ls.map((l) => ({
        ...l,
        tasks: l.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      })),
    );
  }

  return (
    <div className="rounded-[2rem] border border-night-line bg-night p-5 text-night-foreground shadow-float">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="label-mono text-primary">Today</p>
          <p className="mt-1 font-display text-3xl leading-none font-extrabold tracking-tight">
            Sunday
            <br />
            25 Oct
          </p>
          <p className="mt-2 text-sm text-night-muted">{loadLabel(left)}</p>
        </div>
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r={R} fill="none" strokeWidth="6" className="stroke-night-line" />
            <circle
              cx="40"
              cy="40"
              r={R}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
              strokeDasharray={C}
              strokeDashoffset={C - (C * pct) / 100}
            />
          </svg>
          <div className="absolute inset-3 grid place-items-center rounded-full bg-night-card">
            <Hopper
              tone="light"
              key={doneCount}
              className={cn("h-8 w-auto", doneCount > 0 && "animate-gulp")}
            />
          </div>
          <span className="absolute -bottom-1 right-0 rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
            {pct}%
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {DAYS.map(([d, n]) => (
          <div
            key={d}
            className={cn(
              "rounded-lg border py-1.5 text-center",
              n === 25
                ? "border-cream-card bg-cream-card text-ink"
                : "border-night-line bg-night-card",
            )}
          >
            <p className={cn("text-[10px]", n === 25 ? "text-ink-soft" : "text-night-muted")}>{d}</p>
            <p className="text-sm font-bold">{n}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 rounded-full bg-night-card p-1 text-sm font-bold">
        {(["list", "split"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "rounded-full py-1.5 capitalize transition-colors",
              view === v ? "bg-primary text-primary-foreground" : "text-night-muted",
            )}
          >
            {v === "split" ? "Split with Sam" : "List"}
          </button>
        ))}
      </div>

      {view === "split" ? (
        <SplitView />
      ) : (
      <div className="mt-5 space-y-4">
        {lanes.map((lane) => {
          const laneLeft = lane.tasks.filter((t) => !t.done).length;
          return (
            <div key={lane.key}>
              <div className="mb-2 flex items-center justify-between">
                <p className="flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                  <lane.icon className="h-3.5 w-3.5 text-primary" /> {lane.label}
                </p>
                <p className="text-xs text-night-muted">
                  {laneLeft === 0 ? "all done" : `${laneLeft} left · ${lane.hint}`}
                </p>
              </div>
              <ul className="divide-y divide-night-line overflow-hidden rounded-2xl bg-night-card">
                {lane.tasks.map((t) => (
                  <li key={t.id}>
                    <div className="flex items-center">
                    <button
                      onClick={() => toggle(t.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 py-3 pl-4 text-left transition-colors hover:bg-night-raised"
                      aria-pressed={t.done}
                    >
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-all",
                          t.done
                            ? "scale-110 border-primary bg-primary text-primary-foreground"
                            : "border-night-muted",
                        )}
                      >
                        {t.done && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-[15px] font-semibold transition-colors",
                          t.done && "text-night-muted line-through",
                        )}
                      >
                        {t.title}
                      </span>
                      <span className="shrink-0 text-xs text-night-muted">{t.tag}</span>
                    </button>
                    {!t.done && (
                      <button
                        onClick={() => startTimer(t.id)}
                        aria-label={`Start a 25 minute timer for ${t.title}`}
                        className={cn(
                          "mx-2 flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors",
                          timer?.id === t.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-night-raised text-night-muted hover:text-night-foreground",
                        )}
                      >
                        {timer?.id === t.id && timer.running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        {timer?.id === t.id ? `${timer.left}m` : "25m"}
                      </button>
                    )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      )}

      {timer && timedTask && !timedTask.done && (
        <div
          className={cn(
            "mt-5 rounded-2xl p-4 transition-colors",
            timer.left === 0 ? "bg-primary text-primary-foreground" : "bg-night-card",
          )}
        >
          <p className="label-mono">{timer.left === 0 ? "Time's up · 25 min" : "Focus timer"}</p>
          <div className="mt-2 flex items-center gap-3">
            <p className="min-w-0 flex-1 truncate font-semibold">{timedTask.title}</p>
            <p className="font-display text-xl font-bold tabular-nums">
              {String(timer.left).padStart(2, "0")}:00
            </p>
          </div>
          {timer.left === 0 && (
            <div className="mt-3 flex gap-2 text-sm font-bold">
              <button onClick={() => { toggle(timedTask.id); setTimer(null); }} className="flex-1 rounded-full bg-night py-2 text-night-foreground">
                Done
              </button>
              <button onClick={() => setTimer(null)} className="flex-1 rounded-full border border-current py-2">
                Not yet
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SPLIT = [
  { start: 9, end: 11, you: "Site visit · Bath", sam: "Busy" },
  { start: 12, end: 13, you: "Lunch with Sam", sam: "Lunch with you", shared: true },
  { start: 15, end: 16.5, you: null, sam: "Busy" },
];

function SplitView() {
  const top = 8, span = 9;
  return (
    <div className="mt-5">
      <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-2 text-xs">
        <span />
        <p className="font-bold">You <span className="font-normal text-night-muted">· free 5h</span></p>
        <p className="font-bold">Sam <span className="font-normal text-night-muted">· busy only</span></p>
      </div>
      <div className="relative mt-2 h-72 rounded-2xl bg-night-card">
        {[9, 11, 13, 15, 17].map((h) => (
          <div key={h} className="absolute inset-x-0 border-t border-night-line" style={{ top: `${((h - top) / span) * 100}%` }}>
            <span className="absolute left-2 -translate-y-1/2 bg-night-card px-1 text-[10px] text-night-muted">{h}:00</span>
          </div>
        ))}
        {SPLIT.map((b) => {
          const style = { top: `${((b.start - top) / span) * 100}%`, height: `${((b.end - b.start) / span) * 100}%` };
          return b.shared ? (
            <div key={b.start} style={style} className="absolute left-12 right-2 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
              Lunch with Sam · 12:00–13:00
            </div>
          ) : (
            <div key={b.start}>
              {b.you && (
                <div style={style} className="absolute left-12 w-[calc(50%-2.5rem)] rounded-xl bg-token-date-bg px-2 py-1.5 text-xs font-bold text-token-date">{b.you}</div>
              )}
              <div style={style} className="absolute right-2 w-[calc(50%-2.5rem)] rounded-xl border border-dashed border-night-muted px-2 py-1.5 text-xs text-night-muted">{b.sam}</div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-night-muted">Hopper finds the gaps you both share — Sam only shares when, not what.</p>
    </div>
  );
}
