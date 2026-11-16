import { useState } from "react";
import { Briefcase, Check, Home, RotateCcw, ScanLine, User } from "lucide-react";
import { Hopper } from "./Hopper";
import { cn } from "@/lib/utils";

type Dest = "My hub" | "Home" | "Work";
type Item = {
  kind: string;
  title: string;
  sub: string;
  rows: [string, string][];
  action: string;
  suggest: Dest;
};

const ITEMS: Item[] = [
  { kind: "Receipt", title: "Pret A Manger", sub: "Paddington Station", rows: [["Total", "£14.80"], ["Date", "24 Oct 2026"], ["Category", "Food"]], action: "Add to expenses", suggest: "My hub" },
  { kind: "Invoice", title: "Northside Plumbing", sub: "INV-2087 · 1 page", rows: [["Amount due", "£186.00"], ["Due", "Fri 6 Nov"], ["From", "Northside Ltd"]], action: "Remind me Wed 4 Nov", suggest: "Home" },
  { kind: "Letter", title: "Council tax: new bill", sub: "Bristol City Council", rows: [["From", "Bristol City Council"], ["Dated", "21 Oct 2026"], ["Reply by", "Add a date"]], action: "Remind me to reply", suggest: "Home" },
];

const DESTS: { d: Dest; icon: typeof User; cls: string }[] = [
  { d: "My hub", icon: User, cls: "text-primary border-primary/50 bg-primary/10" },
  { d: "Home", icon: Home, cls: "text-token-time border-token-time/50 bg-token-time-bg" },
  { d: "Work", icon: Briefcase, cls: "text-token-person border-token-person/50 bg-token-person-bg" },
];

/** Demo of the Scan flow: scan → sort each page into a space → all sorted. */
export function ScanFlow() {
  const [step, setStep] = useState(-1); // -1 = scanned list, ITEMS.length = all sorted
  const [sorted, setSorted] = useState<Dest[]>([]);
  const [acted, setActed] = useState(false);
  const item = ITEMS[step];

  function send(d: Dest) {
    setSorted((s) => [...s, d]);
    setActed(false);
    setStep((s) => s + 1);
  }
  function undo() {
    setSorted((s) => s.slice(0, -1));
    setStep((s) => Math.max(-1, s - 1));
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-[1.75rem] bg-night p-5 text-night-foreground shadow-float">
      <div className="text-center">
        <p className="font-display font-bold">Thursday 12 Nov</p>
        <p className="text-xs text-night-muted">
          {step < 0 ? `${ITEMS.length} scanned · nothing filed yet` : step >= ITEMS.length ? "All sorted" : `Item ${step + 1} of ${ITEMS.length}`}
        </p>
        <div className="mt-3 flex gap-1.5">
          {ITEMS.map((_, i) => (
            <span key={i} className={cn("h-1 flex-1 rounded-full", i < sorted.length ? "bg-primary" : i === step ? "bg-night-foreground" : "bg-night-line")} />
          ))}
        </div>
      </div>

      <div className="mt-5 min-h-[330px]">
        {step < 0 && (
          <div className="space-y-2.5">
            {ITEMS.map((it) => (
              <div key={it.title} className="flex items-center gap-3 rounded-xl bg-night-card p-3">
                <Doc />
                <div className="min-w-0 flex-1">
                  <p className="label-mono flex items-center gap-1.5 text-primary"><Hopper tone="light" className="h-3 w-auto" /> {it.kind}</p>
                  <p className="truncate font-semibold">{it.title}</p>
                </div>
                <p className="font-mono text-sm">{it.rows[0]?.[1]}</p>
              </div>
            ))}
            <button onClick={() => setStep(0)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground">
              <ScanLine className="h-4 w-4" /> Sort {ITEMS.length} items
            </button>
          </div>
        )}

        {item && (
          <div className="grid grid-cols-[1fr_88px] gap-3">
            <div className="rounded-2xl border-l-2 border-primary bg-night-card p-4">
              <div className="flex gap-3">
                <Doc />
                <div className="min-w-0">
                  <p className="label-mono flex items-center gap-1.5 text-primary"><Hopper tone="light" className="h-3 w-auto" /> {item.kind}</p>
                  <p className="font-display font-bold leading-tight">{item.title}</p>
                  <p className="label-mono mt-0.5 text-night-muted">{item.sub}</p>
                </div>
              </div>
              <dl className="mt-4 divide-y divide-night-line text-sm">
                {item.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2">
                    <dt className="label-mono text-night-muted">{k}</dt>
                    <dd className={cn("font-semibold", v === "Add a date" && "text-primary")}>{v}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={() => setActed(true)} className={cn("mt-3 rounded-full border px-3 py-1.5 text-xs font-bold", acted ? "border-primary bg-primary/15 text-primary" : "border-night-line")}>
                {acted && <Check className="mr-1 inline h-3 w-3" />}{item.action}
              </button>
              <p className="mt-3 text-xs text-night-muted">Hopper suggests {item.suggest}</p>
            </div>
            <div className="flex flex-col gap-2">
              {DESTS.map(({ d, icon: I, cls }) => (
                <button key={d} onClick={() => send(d)} className={cn("flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border text-xs font-bold transition-transform hover:scale-105", cls, d === item.suggest ? "border-dashed" : "border-transparent")}>
                  <I className="h-4 w-4" /> {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= ITEMS.length && (
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-token-time-bg text-token-time"><Check className="h-6 w-6" /></span>
            <p className="mt-3 font-display text-xl font-bold">{ITEMS.length} items sorted</p>
            <ul className="mt-4 space-y-2 text-left text-sm">
              {ITEMS.map((it, i) => (
                <li key={it.title} className="flex justify-between rounded-full border border-night-line px-4 py-2">
                  <span><Check className="mr-2 inline h-3 w-3 text-token-time" />{it.title}</span>
                  <span className="font-bold text-primary">{sorted[i]}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => { setStep(-1); setSorted([]); }} className="mt-5 w-full rounded-full bg-primary py-3 font-bold text-primary-foreground">Scan again</button>
          </div>
        )}
      </div>

      {step >= 0 && step < ITEMS.length && (
        <button onClick={undo} className="mt-3 flex items-center gap-1.5 text-xs text-night-muted hover:text-night-foreground">
          <RotateCcw className="h-3 w-3" /> Undo
        </button>
      )}
    </div>
  );
}

function Doc() {
  return (
    <div className="flex h-12 w-10 shrink-0 flex-col gap-1 rounded-md bg-paper p-1.5">
      {[90, 70, 85, 50].map((w, i) => <span key={i} className="h-0.5 rounded bg-paper-line" style={{ width: `${w}%` }} />)}
    </div>
  );
}
