import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { NicheWithOpportunity, Niche } from "@/data/niches";

// Row shape coming from Supabase "niches" table
type NicheRow = {
  id: string | number;
  niche_name: string;
  emoji?: string | null;
  category?: string | null;
  format?: Niche["format"] | null;
  style?: Niche["style"] | null;
  beginner_friendly?: boolean | null;
  region?: Niche["region"] | null;
  competition_score: number;
  virality_score: number;
  monetization_score: number;
  ease_score: number;
  repeatability_score: number;
  why_it_works: string;
  example_video_ideas: string[] | null;
  hook_ideas: string[] | null;
};

const calcOpportunity = (s: Niche["scores"]) =>
  Math.round(
    (100 - s.competition) * 0.25 +
      s.virality * 0.25 +
      s.monetization * 0.2 +
      s.ease * 0.15 +
      s.repeatability * 0.15
  );

const mapRow = (r: NicheRow): NicheWithOpportunity => {
  const scores = {
    competition: Number(r.competition_score) || 0,
    virality: Number(r.virality_score) || 0,
    monetization: Number(r.monetization_score) || 0,
    ease: Number(r.ease_score) || 0,
    repeatability: Number(r.repeatability_score) || 0,
  };
  return {
    id: String(r.id),
    name: r.niche_name,
    emoji: r.emoji ?? "✨",
    category: r.category ?? "General",
    format: (r.format ?? "shorts") as Niche["format"],
    style: (r.style ?? "faceless") as Niche["style"],
    beginnerFriendly: r.beginner_friendly ?? false,
    region: (r.region ?? "global") as Niche["region"],
    scores,
    why: r.why_it_works ?? "",
    videoIdeas: Array.isArray(r.example_video_ideas) ? r.example_video_ideas : [],
    hooks: Array.isArray(r.hook_ideas) ? r.hook_ideas : [],
    keywords: [],
    related: [],
    opportunity: calcOpportunity(scores),
  };
};

export const useNiches = () => {
  const [data, setData] = useState<NicheWithOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: rows, error } = await supabase.from("niches").select("*");
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setData([]);
      } else {
        setData((rows ?? []).map((r) => mapRow(r as NicheRow)));
        setError(null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
