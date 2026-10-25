import { useState } from "react";
import { Check, Target, Users, Zap } from "lucide-react";
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
      { id: 1, title: "Reply to accommodation email", tag: "#uni", done: true },
      { id: 2, title: "Email Amy back", tag: "#home", done: false },
    ],
  },
  {
    key: "deep",
    label: "Deep focus",
    icon: Target,
    hint: "one at a time",
    tasks: [{ id: 3, title: "Review the project outline", tag: "#uni", done: false }],
  },
  {
    key: "others",
    label: "With others",
    icon: Users,
    hint: "needs a reply",
    tasks: [
      { id: 4, title: "Call Sam about the weekend", tag: "Sam", done: true },
      { id: 5, title: "Send progress update", tag: "#uni", done: false },
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
                    <button
                      onClick={() => toggle(t.id)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-night-raised"
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
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
