import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NicheCard } from "@/components/NicheCard";
import { NicheCardSkeleton } from "@/components/NicheCardSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useNiches } from "@/hooks/useNiches";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart, ArrowLeft } from "lucide-react";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: niches, loading: nichesLoading } = useNiches();
  const { ids, loading: favsLoading } = useFavorites();

  const saved = useMemo(
    () => niches.filter((n) => ids.has(String(n.id))).sort((a, b) => b.opportunity - a.opportunity),
    [niches, ids]
  );

  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  const loading = authLoading || nichesLoading || favsLoading;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="border-b border-border bg-gradient-hero">
        <div className="container py-10">
          <Link
            to="/results"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to results
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            Your saved niches
          </h1>
          <p className="mt-2 text-muted-foreground">
            All the niches you've bookmarked, sorted by opportunity score.
          </p>
        </div>
      </section>

      <section className="container py-10 flex-1">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <NicheCardSkeleton key={i} />
            ))}
          </div>
        ) : saved.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-display text-lg font-bold">No saved niches yet</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              Browse niches and tap the heart icon to save them here for later.
            </p>
            <Link
              to="/results"
              className="mt-5 inline-flex items-center rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition-smooth"
            >
              Explore niches
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {saved.map((n) => (
              <NicheCard key={n.id} niche={n} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
