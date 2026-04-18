import { TrendingUp, DollarSign, Zap, Repeat, Shield, Lightbulb, Flame, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { NicheWithOpportunity } from "@/data/niches";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";

const ScoreRow = ({
  icon: Icon,
  label,
  value,
  invert = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  invert?: boolean;
}) => {
  const display = invert ? 100 - value : value;
  const tone =
    display >= 75 ? "bg-accent" : display >= 50 ? "bg-primary" : "bg-warning";
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-muted-foreground shrink-0">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold text-foreground tabular-nums">{display}</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full ${tone} rounded-full transition-smooth`}
            style={{ width: `${display}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const NicheCard = ({ niche }: { niche: NicheWithOpportunity }) => {
  const { scores, opportunity } = niche;
  const { user } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const navigate = useNavigate();
  const fav = isFavorite(String(niche.id));

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast("Sign in to save niches", {
        description: "Create a free account to bookmark niches.",
        action: { label: "Sign in", onClick: () => navigate("/auth") },
      });
      return;
    }
    const result = await toggle(String(niche.id));
    if (result === "added") toast.success(`Saved "${niche.name}"`);
    if (result === "removed") toast(`Removed "${niche.name}"`);
  };

  return (
    <article className="group relative rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-smooth flex flex-col">
      {/* Save button */}
      <button
        onClick={handleSave}
        aria-label={fav ? "Remove from favorites" : "Save to favorites"}
        className={`absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-smooth ${
          fav
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40"
        }`}
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-primary" : ""}`} />
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 pr-12">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-2xl shrink-0">
            {niche.emoji}
          </div>
          <div>
            <h3 className="font-display text-lg font-bold leading-tight">{niche.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {niche.category} · {niche.format === "both" ? "Shorts & Long-form" : niche.format === "shorts" ? "Shorts" : "Long-form"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground px-3 py-2 min-w-[72px] shadow-glow shrink-0">
          <span className="text-[10px] uppercase tracking-wider opacity-90">Opportunity</span>
          <span className="font-display text-2xl font-bold leading-none mt-0.5">{opportunity}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {niche.style !== "personal" && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">Faceless</span>
        )}
        {niche.beginnerFriendly && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent/15 text-accent">Beginner friendly</span>
        )}
        {scores.competition < 50 && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-warning/15 text-warning">Low competition</span>
        )}
      </div>

      {/* Scores */}
      <div className="grid gap-2.5 mb-5">
        <ScoreRow icon={Shield} label="Competition (lower is better)" value={scores.competition} invert />
        <ScoreRow icon={Flame} label="Virality" value={scores.virality} />
        <ScoreRow icon={DollarSign} label="Monetization" value={scores.monetization} />
        <ScoreRow icon={Zap} label="Ease" value={scores.ease} />
        <ScoreRow icon={Repeat} label="Repeatability" value={scores.repeatability} />
      </div>

      {/* Why */}
      <div className="rounded-2xl bg-secondary/60 p-4 mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why it works</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{niche.why}</p>
      </div>

      {/* Video ideas */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Video ideas ({niche.videoIdeas.length})
          </span>
        </div>
        <ul className="space-y-1.5">
          {niche.videoIdeas.slice(0, 5).map((v, i) => (
            <li key={i} className="text-sm text-foreground/85 flex gap-2">
              <span className="text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hooks */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="h-3.5 w-3.5 text-warning" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hook ideas
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {niche.hooks.slice(0, 4).map((h, i) => (
            <div
              key={i}
              className="text-sm rounded-xl border border-border bg-background px-3 py-2 text-foreground/85"
            >
              "{h}"
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
