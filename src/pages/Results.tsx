import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FiltersBar, defaultFilters, type Filters } from "@/components/FiltersBar";
import { NicheCard } from "@/components/NicheCard";
import { NicheCardSkeleton } from "@/components/NicheCardSkeleton";
import { useNiches } from "@/hooks/useNiches";
import { searchNiches } from "@/utils/searchNiches";
import { generateDynamicNiches } from "@/utils/generateDynamicNiches";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

const Results = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase().trim() ?? "";
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(true);
  const { loading, error } = useNiches();

  const searchResults = useMemo(() => {
    return searchNiches(q);
  }, [q]);

  const dynamicResults = useMemo(() => {
    const hasExactDatabaseResults = searchResults.exactMatches.length > 0;

    if (!q || hasExactDatabaseResults) return [];

    return generateDynamicNiches(q);
  }, [q, searchResults]);

  const baseResults = useMemo(() => {
    const merged = [
      ...searchResults.exactMatches,
      ...searchResults.partialMatches,
      ...dynamicResults,
      ...searchResults.fallbackMatches,
    ];

    const uniqueResults = merged.filter(
      (niche, index, self) => index === self.findIndex((item) => item.id === niche.id)
    );

    return uniqueResults;
  }, [searchResults, dynamicResults]);

  const results = useMemo(() => {
    return baseResults
      .filter((n) => {
        if (filters.style !== "any" && n.style !== filters.style && n.style !== "both") return false;
        if (filters.format !== "any" && n.format !== filters.format && n.format !== "both") return false;
        if (filters.beginnerFriendly && !n.beginnerFriendly) return false;
        if (filters.lowCompetition && n.scores.competition >= 50) return false;
        if (filters.region !== "any" && n.region !== filters.region && n.region !== "global") return false;
        return true;
      })
      .sort((a, b) => b.opportunity - a.opportunity);
  }, [baseResults, filters]);

  const exactIds = new Set(searchResults.exactMatches.map((n) => n.id));
  const partialIds = new Set(searchResults.partialMatches.map((n) => n.id));
  const dynamicIds = new Set(dynamicResults.map((n) => n.id));

  const exactResults = results.filter((n) => exactIds.has(n.id));
  const relatedResults = results.filter((n) => partialIds.has(n.id));
  const generatedResults = results.filter((n) => dynamicIds.has(n.id));
  const fallbackResults = results.filter(
    (n) => !exactIds.has(n.id) && !partialIds.has(n.id) && !dynamicIds.has(n.id)
  );

  const hasQuery = q.length > 0;
  const hasExactMatches = exactResults.length > 0;
  const hasRelatedMatches = relatedResults.length > 0;
  const hasGeneratedMatches = generatedResults.length > 0;

  const trendingResults = [...results]
    .sort((a, b) => b.opportunity - a.opportunity)
    .slice(0, 9);

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
            {hasQuery ? (
              <>
                Niches matching{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">"{q}"</span>
              </>
            ) : (
              "Trending niches for you"
            )}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {hasQuery
              ? "Showing exact matches, related niches, and smart fallback recommendations."
              : "Sorted by opportunity score. Refine the filters to match your style."}
          </p>

          <div className="mt-6">
            <SearchBar size="md" />
          </div>
        </div>
      </section>

      <section className="container py-10 flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {loading ? (
              "Loading niches..."
            ) : (
              <>
                <span className="font-semibold text-foreground">{results.length}</span> niche
                {results.length !== 1 && "s"} found
              </>
            )}
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

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NicheCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-dashed border-destructive/40 bg-card p-12 text-center">
            <p className="font-display text-lg font-bold">Couldn't load niches</p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-display text-lg font-bold">No niches match your filters</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try loosening a filter or searching a different topic.
            </p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="mt-5 inline-flex items-center rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition-smooth"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {!hasQuery && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">🔥 Trending Niches</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {trendingResults.map((n) => (
                    <NicheCard key={n.id} niche={n} />
                  ))}
                </div>
              </div>
            )}

            {hasQuery && !hasExactMatches && hasRelatedMatches && (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                No exact niche match found for{" "}
                <span className="font-semibold text-foreground">"{q}"</span>, so we’re showing the
                closest related niche ideas.
              </div>
            )}

            {hasQuery && !hasExactMatches && hasGeneratedMatches && (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                We also generated extra niche ideas for{" "}
                <span className="font-semibold text-foreground">"{q}"</span> based on your search.
              </div>
            )}

            {hasQuery && !hasExactMatches && !hasRelatedMatches && !hasGeneratedMatches && (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                We couldn’t find a direct niche match for{" "}
                <span className="font-semibold text-foreground">"{q}"</span>, so we’re showing
                high-opportunity recommendations you can still explore.
              </div>
            )}

            {exactResults.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Best Matches</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {exactResults.map((n) => (
                    <NicheCard key={n.id} niche={n} />
                  ))}
                </div>
              </div>
            )}

            {relatedResults.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Related Niches</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {relatedResults.map((n) => (
                    <NicheCard key={n.id} niche={n} />
                  ))}
                </div>
              </div>
            )}

            {generatedResults.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Generated Ideas</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {generatedResults.map((n) => (
                    <NicheCard key={n.id} niche={n} />
                  ))}
                </div>
              </div>
            )}

            {fallbackResults.length > 0 && hasQuery && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">You May Also Explore</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {fallbackResults.map((n) => (
                    <NicheCard key={n.id} niche={n} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Results;
