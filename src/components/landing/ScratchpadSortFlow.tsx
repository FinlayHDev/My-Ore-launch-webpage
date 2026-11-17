import { useEffect, useState } from "react";
import { Archive, Briefcase, Check, Home, RotateCcw, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hopper } from "./Hopper";
import { cn } from "@/lib/utils";

export type ScratchpadItem = { title: string; meta: string; when: string; source: string; destination: "My hub" | "Home" | "Work" };
type Decision = { destination: string; reminder: boolean };
const DESTINATIONS = [
  { name: "My hub", icon: User, className: "border-primary/50 bg-primary/10 text-primary" },
  { name: "Home", icon: Home, className: "border-token-time/50 bg-token-time-bg text-token-time" },
  { name: "Work", icon: Briefcase, className: "border-token-action/50 bg-token-action-bg text-token-action" },
] as const;

export function ScratchpadSortFlow({ items, onRestart }: { items: ScratchpadItem[]; onRestart: () => void }) {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [automatic, setAutomatic] = useState(true);
  const [reminder, setReminder] = useState(false);
  const item = items[decisions.length];
  const complete = decisions.length === items.length;
  function send(destination: string, manual = true) {
    if (!item) return;
    if (manual) setAutomatic(false);
    setDecisions((current) => [...current, { destination, reminder }]);
    setReminder(false);
  }
  function undo() {
    setAutomatic(false);
    setDecisions((current) => current.slice(0, -1));
    setReminder(false);
  }
  useEffect(() => {
    if (!automatic || !item || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeout = window.setTimeout(() => {
      setDecisions((current) => [...current, { destination: item.destination, reminder: false }]);
      setReminder(false);
    }, 3400);
    return () => window.clearTimeout(timeout);
  }, [automatic, item]);

  return (
    <div aria-label="Sort scratchpad notes" className="flex min-h-[570px] flex-col rounded-[2rem] border border-night-line bg-night p-4 text-night-foreground shadow-float sm:p-5">
      <header className="text-center">
        <p className="text-sm font-bold">Sunday 25 Oct</p>
        <p className="mt-1 text-xs text-night-muted">{complete ? "All sorted" : `Item ${decisions.length + 1} of ${items.length}`}</p>
        <div className="mt-3 flex gap-1" aria-label="Sorting progress">
          {items.map((task, index) => <span key={task.title} className={cn("h-0.5 flex-1", index < decisions.length ? "bg-token-time" : index === decisions.length ? "bg-night-foreground" : "bg-night-line")} />)}
        </div>
      </header>
      <ul className="mt-3 space-y-1.5" aria-live="polite">
        {decisions.map((decision, index) => <li key={items[index]?.title} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-full border border-token-time/50 px-3 py-1.5 text-[10px]">
          <span className="flex min-w-0 items-center gap-1.5"><Check className="h-3 w-3 shrink-0 text-token-time" /><span className="truncate">{items[index]?.title}</span></span>
          <span className="font-bold text-token-time">{decision.destination}</span>
        </li>)}
      </ul>
      {item && <div className="mt-4 grid grid-cols-[minmax(0,1fr)_72px] items-start gap-2 sm:grid-cols-[minmax(0,1fr)_80px]">
        <article className="min-w-0 rounded-xl border-l-2 border-primary bg-night-card p-3 sm:p-4">
          <p className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-primary uppercase"><Hopper tone="light" className="h-3 w-auto" />Note</p>
          <h4 className="mt-2 text-base leading-snug font-bold">{item.title}</h4>
          <p className="mt-2 text-xs leading-relaxed text-night-muted">“{item.source}”</p>
          <dl className="mt-4 divide-y divide-night-line text-xs">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 py-2"><dt className="font-mono text-night-muted uppercase">When</dt><dd className="text-right font-semibold">{item.when}</dd></div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 py-2"><dt className="font-mono text-night-muted uppercase">Effort</dt><dd className="text-right font-semibold">{item.meta.split(" · ")[1]}</dd></div>
          </dl>
          <Button variant="ghost" onClick={() => { setAutomatic(false); setReminder(!reminder); }} aria-pressed={reminder} className={cn("mt-3 h-auto w-full justify-start whitespace-normal rounded-full border border-primary/50 px-2 py-2 text-left text-[11px] text-primary hover:bg-primary/10 hover:text-primary", reminder && "bg-primary/10")}>
            {reminder && <Check />}Remind me {item.when}
          </Button>
        </article>
        <div className="space-y-2 pt-10">
          {DESTINATIONS.map(({ name, icon: Icon, className }) => <Button key={name} variant="ghost" onClick={() => send(name)} className={cn("h-20 w-full flex-col rounded-xl border px-1 text-xs hover:bg-night-raised", className, name === item.destination && "border-dashed")}><Icon />{name}</Button>)}
        </div>
      </div>}
      {complete && <div className="my-7 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-token-time-bg text-token-time"><Check className="h-6 w-6" /></div>
        <h4 className="mt-3 text-xl font-bold">{items.length} items sorted</h4>
        <p className="mt-2 text-xs text-night-muted">{decisions.filter((decision) => decision.reminder).length} reminders set</p>
      </div>}
      <footer className="mt-auto pt-7">
        {item ? <>
          <p className="mb-3 text-xs text-night-muted">Hopper suggests {item.destination}</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="ghost" disabled={!decisions.length} onClick={undo} className="h-12 flex-col gap-1 border border-night-line bg-night-card text-[10px] hover:bg-night-raised"><RotateCcw />Undo</Button>
            <Button variant="ghost" onClick={() => send("Later")} className="h-12 flex-col gap-1 border border-night-line bg-night-card text-[10px] hover:bg-night-raised"><Archive />Later</Button>
            <Button variant="ghost" onClick={() => send("Deleted")} className="h-12 flex-col gap-1 border border-night-line bg-night-card text-[10px] text-destructive hover:bg-night-raised hover:text-destructive"><Trash2 />Delete</Button>
          </div>
        </> : <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
          <Button variant="ghost" onClick={undo} className="bg-night-card text-xs hover:bg-night-raised"><RotateCcw />Undo last</Button>
          <Button onClick={onRestart} className="text-xs">Back to Scratchpad</Button>
        </div>}
      </footer>
    </div>
  );
}