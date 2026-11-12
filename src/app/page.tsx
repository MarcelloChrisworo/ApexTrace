import { CalendarDays, ChevronDown, Flag, Gauge, Radio } from "lucide-react";

const pillars = [
  { label: "Schedule", value: "2026 calendar", icon: CalendarDays, accent: "text-cyan-300" },
  { label: "Next session", value: "Awaiting API data", icon: Radio, accent: "text-amber-300" },
  { label: "Race pace", value: "Debrief ready", icon: Gauge, accent: "text-emerald-300" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b12] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">ApexTrace</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">F1 race intelligence</h1>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <span>Season 2026</span>
            <ChevronDown size={16} />
          </button>
        </header>

        <section className="py-12">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-sm text-slate-400">
              <Flag size={16} className="text-cyan-300" />
              <span>Global schedule · Indonesian time support</span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              See the weekend.
              <span className="block text-slate-500">Understand the race.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
              ApexTrace brings localized Grand Prix sessions and post-race analysis into one focused workspace.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {pillars.map(({ label, value, icon: Icon, accent }) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Icon size={20} className={accent} />
              <p className="mt-8 text-sm text-slate-400">{label}</p>
              <p className="mt-1 font-medium">{value}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8">
          <p className="text-sm font-medium text-slate-300">Phase 1 setup</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            The application shell is ready. Next we will connect the schedule route handler, normalize Jolpica/OpenF1 responses,
            and render the five-session weekend cards with WIB, WITA, and WIT toggles.
          </p>
        </section>
      </div>
    </main>
  );
}
