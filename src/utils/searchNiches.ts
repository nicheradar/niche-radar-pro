import { nichesWithOpportunity, NicheWithOpportunity } from "@/data/niches";

export type SearchResults = {
  exactMatches: NicheWithOpportunity[];
  partialMatches: NicheWithOpportunity[];
  fallbackMatches: NicheWithOpportunity[];
};

const normalize = (value: string) => value.toLowerCase().trim();

const getSearchableText = (niche: NicheWithOpportunity) =>
  normalize(
    [
      niche.name,
      niche.category,
      niche.why,
      ...niche.keywords,
      ...niche.related,
      ...niche.videoIdeas,
      ...niche.hooks,
    ].join(" ")
  );

export function searchNiches(query: string): SearchResults {
  const cleanQuery = normalize(query);

  if (!cleanQuery) {
    return {
      exactMatches: [],
      partialMatches: [],
      fallbackMatches: [...nichesWithOpportunity]
        .sort((a, b) => b.opportunity - a.opportunity)
        .slice(0, 6),
    };
  }

  const queryWords = cleanQuery.split(/\s+/).filter(Boolean);

  const scored = nichesWithOpportunity.map((niche) => {
    const searchableText = getSearchableText(niche);

    let score = 0;

    if (normalize(niche.name) === cleanQuery) score += 100;
    if (normalize(niche.category) === cleanQuery) score += 80;

    if (niche.keywords.some((keyword) => normalize(keyword) === cleanQuery)) {
      score += 90;
    }

    if (niche.related.some((item) => normalize(item) === cleanQuery)) {
      score += 70;
    }

    if (searchableText.includes(cleanQuery)) {
      score += 40;
    }

    for (const word of queryWords) {
      if (normalize(niche.name).includes(word)) score += 20;
      if (normalize(niche.category).includes(word)) score += 15;
      if (niche.keywords.some((keyword) => normalize(keyword).includes(word))) score += 18;
      if (niche.related.some((item) => normalize(item).includes(word))) score += 12;
      if (searchableText.includes(word)) score += 6;
    }

    return { niche, score };
  });

  const exactMatches = scored
    .filter((item) => item.score >= 90)
    .sort((a, b) => b.score - a.score || b.niche.opportunity - a.niche.opportunity)
    .map((item) => item.niche);

  const partialMatches = scored
    .filter(
      (item) =>
        item.score >= 20 &&
        item.score < 90 &&
        !exactMatches.some((exact) => exact.id === item.niche.id)
    )
    .sort((a, b) => b.score - a.score || b.niche.opportunity - a.niche.opportunity)
    .map((item) => item.niche);

  const fallbackMatches = nichesWithOpportunity
    .filter(
      (niche) =>
        !exactMatches.some((exact) => exact.id === niche.id) &&
        !partialMatches.some((partial) => partial.id === niche.id)
    )
    .sort((a, b) => b.opportunity - a.opportunity)
    .slice(0, 6);

  return {
    exactMatches: exactMatches.slice(0, 6),
    partialMatches: partialMatches.slice(0, 6),
    fallbackMatches,
  };
}
