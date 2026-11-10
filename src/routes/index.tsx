import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, CalendarDays, Gauge, Layers, Phone } from "lucide-react";
import { Hopper, Wordmark } from "@/components/landing/Hopper";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { ScratchpadDemo } from "@/components/landing/ScratchpadDemo";
import { SortDeck } from "@/components/landing/SortDeck";
import { TodayLanes } from "@/components/landing/TodayLanes";
import { Contours } from "@/components/landing/Contours";
import { AgentDesk } from "@/components/landing/AgentDesk";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Ore — the notes app with agents for your business" },
      {
        name: "description",
        content:
          "My Ore is a notes app for business owners. Hopper sorts your day while agents handle receipts, mileage, invoices and inbox admin. Waitlist open for Autumn 2026.",
      },
      { property: "og:title", content: "My Ore — Sort the noise. Keep the ore." },
      {
        property: "og:description",
        content:
          "Notes that sort themselves, plus agents for receipts, mileage and invoices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SNIPPETS = [
  "call the dentist thurs",
  "amy bday sat!!",
  "receipt — fuel £62",
  "chase harlow invoice",
  "miles to bath site",
  "book train fri am",
  "reply to landlord",
  "milk, eggs, the good bread",
  "VAT return due",
  "quote for priya fri",
];

function Index() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Upgrade />
        <HowItWorks />
        <Agents />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <a href="#top" aria-label="My Ore home" className="min-w-0">
          <Wordmark />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#notes" className="label-mono text-ink-soft hover:text-primary">
            Notes, upgraded
          </a>
          <a href="#sort" className="label-mono text-ink-soft hover:text-primary">
            How it works
          </a>
          <a href="#agents" className="label-mono text-ink-soft hover:text-primary">
            Agents
          </a>
        </nav>
        <div className="flex justify-end">
          <a
            href="#join"
            className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-primary"
          >
            Join waitlist <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="border-b border-ink">
      <div className="mx-auto grid max-w-7xl border-ink lg:grid-cols-[1.05fr_1fr] 2xl:border-x">
        <div className="flex flex-col justify-center px-5 py-14 md:px-8 lg:border-r lg:border-ink lg:py-24 lg:pr-14">
          <p className="label-mono flex items-center gap-3 text-ink-soft">
            <span className="h-2.5 w-2.5 rotate-45 bg-primary" /> First release · Autumn 2026
          </p>
          <h1 className="display-tight mt-7 text-[clamp(3.2rem,5.6vw,6.25rem)]">
            Sort the noise.
            <br />
            Keep the <span className="text-primary">ore.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            The notes app for people running a business. Empty your head into the scratchpad,
            Hopper sorts it into a day you can finish — and his agents quietly handle the
            receipts, mileage and invoice chasing.
          </p>
          <div className="mt-9 max-w-xl">
            <WaitlistForm />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
            <span className="label-mono mr-2 text-muted-foreground">Hopper reads</span>
            <span className="token-date rounded-md px-2 py-0.5 font-semibold">dates</span>
            <span className="token-action rounded-md px-2 py-0.5 font-semibold">actions</span>
            <span className="token-phone rounded-md px-2 py-0.5 font-semibold">numbers</span>
            <span className="token-person rounded-md px-2 py-0.5 font-semibold">people</span>
            <span className="token-time rounded-md px-2 py-0.5 font-semibold">effort</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-paper-deep px-5 pt-14 pb-16 md:px-10 lg:pt-20">
          <Contours className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 paper-grid opacity-70" aria-hidden />
          <p className="label-mono relative text-ink-soft">Fig. 01 / The scratchpad</p>
          <div className="absolute right-5 top-12 hidden border border-ink-soft/50 bg-paper/70 px-4 py-3 backdrop-blur sm:block md:right-8">
            <p className="label-mono flex items-center gap-3 text-ink-soft">
              <span className="h-0.5 w-6 bg-primary" /> Useful signal
            </p>
            <p className="label-mono mt-2 flex items-center gap-3 text-ink-soft">
              <span className="h-0.5 w-6 bg-paper-line" /> Everything else
            </p>
          </div>
          <div className="relative mt-16 sm:mt-20">
            <ScratchpadDemo />
          </div>
          <div className="relative mt-14 flex items-center gap-4 text-ink-soft">
            <span className="label-mono">Capture</span>
            <span className="h-px flex-1 bg-ink-soft/40" />
            <span className="label-mono">Choose</span>
            <span className="h-px flex-1 bg-ink-soft/40" />
            <span className="label-mono">Move</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...SNIPPETS, ...SNIPPETS];
  return (
    <div className="overflow-hidden border-b border-ink bg-ink py-4 text-paper" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-10">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-xl font-semibold tracking-tight">{s}</span>
            <span className="h-2 w-2 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Upgrade() {
  return (
    <section id="notes" className="scroll-mt-20 border-b border-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div>
            <p className="label-mono text-primary">02 / Notes, upgraded</p>
            <h2 className="display-tight mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)]">
              Other notes apps remember.
              <br />
              <span className="text-ink-soft">Hopper does something.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink-soft md:justify-self-end">
            Write the way you think — half-sentences, shorthand, three things on one line. You
            don't tidy it. Hopper does.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1.15fr] lg:items-stretch">
          {/* Plain notes */}
          <div className="relative flex flex-col border border-ink bg-card p-7">
            <p className="label-mono text-muted-foreground">Any notes app</p>
            <div className="mt-6 space-y-4 font-display text-xl leading-relaxed text-ink-soft">
              <p className="border-b border-paper-line pb-3">
                On Wednesday I need to call 07700 900123 about the lease
              </p>
              <p className="border-b border-paper-line pb-3">book a table for Friday</p>
              <p className="border-b border-paper-line pb-3">email amy back tomorrow!!</p>
            </div>
            <p className="mt-auto pt-8 text-sm text-muted-foreground">
              Saved. That's it. It'll be there in three weeks, still undone.
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-ink bg-primary shadow-ore">
              <Hopper className="h-10 w-auto" alt="Hopper" />
            </div>
          </div>

          {/* My Ore */}
          <div className="rounded-[1.75rem] bg-night p-7 text-night-foreground shadow-float">
            <p className="label-mono text-primary">My Ore</p>
            <p className="mt-6 font-display text-xl leading-[1.8] font-medium">
              On <span className="token token-date">Wednesday</span> I need to{" "}
              <span className="token token-action">call</span>{" "}
              <span className="token token-phone">07700 900123</span> about the lease{" "}
              <span className="token token-action">book</span> a table for{" "}
              <span className="token token-date">Friday</span>{" "}
              <span className="token token-action">email</span>{" "}
              <span className="token token-person">Amy</span> back{" "}
              <span className="token token-date">tomorrow</span>
            </p>
            <ul className="mt-6 space-y-2">
              {[
                ["Email Amy back", "Quick win", "Mon"],
                ["Call about the lease", "Tap to call", "Wed"],
                ["Book a table", "2 min", "Fri"],
              ].map(([t, m, w]) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl bg-night-card px-4 py-3"
                >
                  <span className="h-4 w-4 shrink-0 rounded-full border-2 border-night-muted" />
                  <span className="min-w-0 flex-1 truncate font-semibold">{t}</span>
                  <span className="hidden text-xs text-night-muted sm:inline">{m}</span>
                  <span className="rounded-full bg-token-date-bg px-2.5 py-1 text-[11px] font-bold text-token-date">
                    {w}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid border border-ink sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: CalendarDays,
              title: "Reads the when",
              body: "\"Friday\", \"tomorrow\", \"thurs 3pm\" — turned into real dates.",
            },
            {
              icon: Phone,
              title: "Spots the who",
              body: "Numbers become tap-to-call. Names know they're with others.",
            },
            {
              icon: Layers,
              title: "Sorts by effort",
              body: "Quick wins, deep focus, with others. Not one endless list.",
            },
            {
              icon: Gauge,
              title: "Knows when you're full",
              body: "Hopper watches the load, so today stays finishable.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="border-ink p-7 not-last:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:not-last:border-r"
            >
              <p className="label-mono text-muted-foreground">0{i + 1}</p>
              <f.icon className="mt-6 h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="sort" className="relative scroll-mt-20 overflow-hidden border-b border-ink bg-night-glow text-night-foreground">
      <div className="absolute inset-0 night-grid" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="label-mono text-primary">03 / Choose, then move</p>
        <h2 className="display-tight mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,4.5rem)]">
          Flick it where it belongs. Then just do the next thing.
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-8 max-w-md">
              <p className="label-mono text-night-muted">Fig. 02 / Sort</p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                One card at a time.
              </h3>
              <p className="mt-3 text-night-muted">
                Hopper hands you each note as a card. Push it toward how urgent it feels — no
                lists to wrangle, no guilt pile. Go on, try it.
              </p>
            </div>
            <div className="mx-auto max-w-md">
              <SortDeck />
            </div>
          </div>

          <div>
            <div className="mb-8 max-w-md">
              <p className="label-mono text-night-muted">Fig. 03 / Today</p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                A day sized to fit.
              </h3>
              <p className="mt-3 text-night-muted">
                Your day, grouped by the kind of effort it takes. Tick things off and watch
                Hopper's cart empty out.
              </p>
            </div>
            <div className="mx-auto max-w-md">
              <TodayLanes />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Agents() {
  return (
    <section id="agents" className="relative scroll-mt-20 overflow-hidden border-b border-ink bg-paper-deep">
      <div className="absolute inset-0 paper-grid opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div>
            <p className="label-mono text-primary">04 / Agents for business</p>
            <h2 className="display-tight mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)]">
              You run the business.
              <br />
              <span className="text-ink-soft">Hopper's crew does the admin.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink-soft md:justify-self-end">
            Receipts, mileage, overdue invoices, buried emails. Each agent reads what comes in,
            fills in the fields that matter and suggests the next step. Pick one and try it.
          </p>
        </div>
        <div className="mt-14">
          <AgentDesk />
        </div>
        <div className="mt-16 grid border border-ink bg-paper sm:grid-cols-3">
          {[
            ["Hours back", "The Sunday-night receipt shoebox, gone."],
            ["Tax-ready", "VAT, categories and mileage logged as you go."],
            ["Always asks", "Nothing is filed, sent or moved without your OK."],
          ].map(([t, b], i) => (
            <div key={t} className="border-ink p-7 not-last:border-b sm:not-last:border-r sm:border-b-0">
              <p className="label-mono text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{t}</h3>
              <p className="mt-2 text-ink-soft">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="join" className="relative scroll-mt-20 overflow-hidden border-b border-ink">
      <div className="absolute inset-0 paper-grid" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 pt-24 pb-10 text-center md:px-8">
        <p className="label-mono text-ink-soft">05 / Early access</p>
        <h2 className="display-tight mt-6 text-[clamp(3rem,8vw,6.5rem)]">
          Your head's full.
          <br />
          <span className="text-primary">Hopper isn't.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink-soft">
          My Ore lands on iPhone in Autumn 2026. Get on the list and hand Hopper the admin
          you never got into business to do.
        </p>
        <div className="mx-auto mt-10 max-w-xl text-left">
          <WaitlistForm />
        </div>
        <a
          href="#top"
          className="label-mono mt-10 inline-flex items-center gap-2 text-ink-soft hover:text-primary"
        >
          <ArrowDown className="h-3.5 w-3.5 rotate-180" /> Back to the top
        </a>
      </div>

      <div className="relative h-36">
        <div className="animate-ride absolute bottom-[14px] left-0 w-[160px]">
          <div className="animate-bob">
            <Hopper className="h-28 w-auto" alt="" />
          </div>
        </div>
        <div className="rail-track absolute inset-x-0 bottom-0" />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:items-center md:px-8">
        <Wordmark />
        <p className="label-mono text-ink-soft sm:text-center">Field notes for a finite day</p>
        <p className="label-mono text-ink-soft sm:text-right">© {2026} My Ore · MO — 001</p>
      </div>
    </footer>
  );
}
