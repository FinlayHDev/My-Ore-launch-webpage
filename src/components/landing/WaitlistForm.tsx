import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistForm({ tone = "paper" }: { tone?: "paper" | "night" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const night = tone === "night";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value) || value.length > 255) {
      setError("That email doesn't look quite right.");
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <div
        className={cn(
          "animate-slide-in flex items-start gap-4 border p-5",
          night ? "border-night-line bg-night-card" : "border-ink bg-card",
        )}
        role="status"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className={cn("font-semibold", night && "text-night-foreground")}>
            You're on the list.
          </p>
          <p className={cn("mt-1 text-sm", night ? "text-night-muted" : "text-muted-foreground")}>
            Hopper will send one email to <span className="break-all">{email}</span> when the
            first release is ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div
        className={cn(
          "flex flex-col border sm:flex-row",
          night ? "border-night-line" : "border-ink",
          error && "border-destructive",
        )}
      >
        <label htmlFor={`email-${tone}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${tone}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          className={cn(
            "h-14 min-w-0 flex-1 px-5 text-base outline-none placeholder:opacity-60",
            night
              ? "bg-night-card text-night-foreground placeholder:text-night-muted"
              : "bg-card text-ink placeholder:text-muted-foreground",
          )}
        />
        <button
          type="submit"
          className={cn(
            "group inline-flex h-14 items-center justify-center gap-3 px-7 font-semibold transition-colors",
            night
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-ink text-paper hover:bg-primary",
          )}
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <p
        className={cn(
          "mt-3 flex items-center gap-2 text-sm",
          error ? "text-destructive" : night ? "text-night-muted" : "text-muted-foreground",
        )}
      >
        {!error && <Lock className="h-3.5 w-3.5 shrink-0" />}
        {error ?? "One useful email when the first release is ready. Nothing else."}
      </p>
    </form>
  );
}
