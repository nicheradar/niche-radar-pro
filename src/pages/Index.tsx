import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { Sparkles, Target, Zap, TrendingUp, ShieldCheck, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="container relative pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for faceless YouTube creators
            </div>
<h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
  Find{" "}
  <span className="text-primary">
    low-competition
  </span>{" "}
  YouTube niches with viral potential
</h1>

            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover niche ideas, viral angles, and content strategies in seconds — so you can launch a faceless channel that actually grows.
            </p>

            <div className="mt-8">
              <SearchBar />
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              {["AI tools", "Weird history", "Stoic wisdom", "Finance shorts", "Mini documentaries"].map(
                (t) => (
                  <Link
                    key={t}
                    to={`/results?q=${encodeURIComponent(t)}`}
                    className="rounded-full border border-border bg-card px-3 py-1 hover:border-primary/40 hover:text-primary transition-smooth"
                  >
                    {t}
                  </Link>
                )
              )}
            </div>

            <div className="mt-10">
              <Link
                to="/results"
                className="inline-flex items-center gap-2 rounded-2xl bg-foreground text-background px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-smooth"
              >
                <Rocket className="h-4 w-4" />
                Explore trending niches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Stop guessing. Start ranking.
          </h2>
          <p className="mt-3 text-muted-foreground">
            NicheRadar scores every niche across 5 signals so you know exactly what to make next.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Opportunity score",
              desc: "A single number that blends competition, virality, monetization, ease and repeatability.",
            },
            {
              icon: Zap,
              title: "Ready-to-shoot ideas",
              desc: "Each niche comes with 5–10 video ideas and proven hook formulas you can use today.",
            },
            {
              icon: TrendingUp,
              title: "Viral angles",
              desc: "Understand why a niche works — not just that it works — so you can spin it your way.",
            },
            {
              icon: ShieldCheck,
              title: "Beginner friendly",
              desc: "Filter for niches that don't need a face, fancy gear, or a big budget to start.",
            },
            {
              icon: Sparkles,
              title: "Faceless first",
              desc: "Hand-picked formats that work great with stock footage, voiceover, and AI tools.",
            },
            {
              icon: Rocket,
              title: "Built for Shorts",
              desc: "Optimized for the algorithm that's exploding right now — YouTube Shorts.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-smooth"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-secondary/40 border-y border-border">
        <div className="container py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              From idea to upload in 3 steps
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Search a vibe", d: "Type a topic or pick from trending niches across tech, finance, history and more." },
              { n: "02", t: "Filter what fits", d: "Faceless or personal? Shorts or long-form? Pick your style and audience region." },
              { n: "03", t: "Get a launch plan", d: "Receive scored niches, video ideas and hook templates ready to record today." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl bg-card border border-border p-6 shadow-card">
                <span className="font-display text-4xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="container py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 sm:p-14 text-center shadow-elegant">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top_right,white,transparent_60%)]" />
          <h2 className="relative font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground">
            Your next viral channel is one search away
          </h2>
          <p className="relative mt-3 text-primary-foreground/80 max-w-xl mx-auto">
            Stop scrolling for hours looking for ideas. Let NicheRadar do the research.
          </p>
          <Link
            to="/results"
            className="relative mt-7 inline-flex items-center gap-2 rounded-2xl bg-background text-foreground px-7 py-3.5 text-sm font-semibold hover:scale-[1.02] transition-smooth"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Find my niche
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
