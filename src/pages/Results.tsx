import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FiltersBar, defaultFilters, type Filters } from "@/components/FiltersBar";
import { NicheCard } from "@/components/NicheCard";
import { nichesWithOpportunity } from "@/data/niches";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

const Results = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(true);

  const results = useMemo(() => {
    return nichesWithOpportunity
      .filter((n) => {
        if (q && !(`${n.name} ${n.category} ${n.why}`.toLowerCase().includes(q))) return false;
        if (filters.style !== "any" && n.style !== filters.style && n.style !== "both") return false;
        if (filters.format !== "any" && n.format !== filters.format && n.format !== "both") return false;
        if (filters.beginnerFriendly && !n.beginnerFriendly) return false;
        if (filters.lowCompetition && n.scores.competition >= 50) return false;
        if (filters.region !== "any" && n.region !== filters.region && n.region !== "global") return false;
        return true;
      })
      .sort((a, b) => b.opportunity - a.opportunity);
  }, [q, filters]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="border-b border-border bg-gradient-hero">
        <div className="container py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {q ? <>Niches matching "<span className="bg-gradient-primary bg-clip-text text-transparent">{q}</span>"</> : "Trending niches for you"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sorted by opportunity score. Refine the filters to match your style.
          </p>
          <div className="mt-6">
            <SearchBar size="md" />
          </div>
        </div>
      </section>

      <section className="container py-10 flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{results.length}</span> niche{results.length !== 1 && "s"} found
          </p>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium hover:border-primary/40 transition-smooth"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide filters" : "Show filters"}
          </button>
        </div>

        {showFilters && (
          <div className="mb-8">
            <FiltersBar filters={filters} onChange={setFilters} />
          </div>
        )}

        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-display text-lg font-bold">No niches match your filters</p>
            <p className="mt-2 text-sm text-muted-foreground">Try loosening a filter or searching a different topic.</p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="mt-5 inline-flex items-center rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition-smooth"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((n) => (
              <NicheCard key={n.id} niche={n} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Results;
