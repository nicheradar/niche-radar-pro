import { nichesWithOpportunity, NicheWithOpportunity } from "@/data/niches";

export type SearchResults = {
  exactMatches: NicheWithOpportunity[];
  partialMatches: NicheWithOpportunity[];
  fallbackMatches: NicheWithOpportunity[];
};

const normalize = (value: string) => value.toLowerCase().trim();

export function searchNiches(query: string): SearchResults {
  const cleanQuery = normalize(query);

  if (!cleanQuery) {
    return {
      exactMatches: [],
      partialMatches: [],
      fallbackMatches: nichesWithOpportunity.slice(0, 6),
    };
  }

  const exactMatches = nichesWithOpportunity.filter((niche) => {
    return (
      normalize(niche.name) === cleanQuery ||
      normalize(niche.category) === cleanQuery ||
      niche.keywords.some((keyword) => normalize(keyword) === cleanQuery)
    );
  });

  const partialMatches = nichesWithOpportunity.filter((niche) => {
    const alreadyExact = exactMatches.some((item) => item.id === niche.id);
    if (alreadyExact) return false;

    const matchesName = normalize(niche.name).includes(cleanQuery);
    const matchesCategory = normalize(niche.category).includes(cleanQuery);
    const matchesKeywords = niche.keywords.some((keyword) =>
      normalize(keyword).includes(cleanQuery)
    );
    const matchesRelated = niche.related.some((item) =>
      normalize(item).includes(cleanQuery)
    );
    const matchesWhy = normalize(niche.why).includes(cleanQuery);

    return (
      matchesName ||
      matchesCategory ||
      matchesKeywords ||
      matchesRelated ||
      matchesWhy
    );
  });

  const fallbackMatches = nichesWithOpportunity
    .filter((niche) => {
      const alreadyShown =
        exactMatches.some((item) => item.id === niche.id) ||
        partialMatches.some((item) => item.id === niche.id);

      return !alreadyShown;
    })
    .sort((a, b) => b.opportunity - a.opportunity)
    .slice(0, 6);

  return {
    exactMatches,
    partialMatches,
    fallbackMatches,
  };
}
