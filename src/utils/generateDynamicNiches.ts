import { NicheWithOpportunity } from "@/data/niches";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const titleCase = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const detectCategory = (query: string) => {
  const q = query.toLowerCase();

  if (q.includes("ai") || q.includes("tech") || q.includes("software")) return "Tech";
  if (q.includes("money") || q.includes("finance") || q.includes("invest")) return "Finance";
  if (q.includes("gym") || q.includes("fitness") || q.includes("workout")) return "Fitness";
  if (q.includes("cat") || q.includes("dog") || q.includes("pet") || q.includes("animal")) return "Pets";
  if (q.includes("football") || q.includes("soccer") || q.includes("sports")) return "Sports";
  if (q.includes("history") || q.includes("science") || q.includes("facts")) return "Education";
  if (q.includes("horror") || q.includes("scary") || q.includes("ghost")) return "Entertainment";
  if (q.includes("islam") || q.includes("quran") || q.includes("dua")) return "Religion";
  if (q.includes("car") || q.includes("cars") || q.includes("supercar")) return "Automotive";
  if (q.includes("travel") || q.includes("country") || q.includes("place")) return "Travel";

  return "General";
};

export function generateDynamicNiches(query: string): NicheWithOpportunity[] {
  const cleanQuery = query.trim();

  if (!cleanQuery) return [];

  const keyword = titleCase(cleanQuery);
  const category = detectCategory(cleanQuery);
  const baseId = slugify(cleanQuery);

  const generated = [
    {
      id: `${baseId}-explained`,
      name: `${keyword} Explained Shorts`,
      emoji: "✨",
      category,
      format: "shorts" as const,
      style: "faceless" as const,
      beginnerFriendly: true,
      region: "global" as const,
      scores: {
        competition: 46,
        virality: 84,
        monetization: 68,
        ease: 82,
        repeatability: 90,
      },
      why: `A fast, faceless channel around ${cleanQuery} can work well because viewers love simplified, repeatable content with strong hooks and quick explanations.`,
      videoIdeas: [
        `${keyword} explained in 60 seconds`,
        `5 ${cleanQuery} facts most people don't know`,
        `The biggest mistakes people make in ${cleanQuery}`,
        `What makes ${cleanQuery} so interesting?`,
        `Beginner's guide to ${cleanQuery}`,
      ],
      hooks: [
        `You are looking at ${cleanQuery} the wrong way`,
        `This is why ${cleanQuery} is blowing up`,
        `Nobody explains ${cleanQuery} this simply`,
        `If you're into ${cleanQuery}, watch this`,
      ],
      keywords: [cleanQuery, `${cleanQuery} explained`, `${cleanQuery} facts`, `${cleanQuery} shorts`],
      related: [`${cleanQuery} content`, `${cleanQuery} niche`, `${cleanQuery} videos`],
      opportunity: 81,
    },
    {
      id: `${baseId}-facts`,
      name: `${keyword} Facts & Rankings`,
      emoji: "📌",
      category,
      format: "shorts" as const,
      style: "faceless" as const,
      beginnerFriendly: true,
      region: "global" as const,
      scores: {
        competition: 42,
        virality: 87,
        monetization: 64,
        ease: 85,
        repeatability: 93,
      },
      why: `${keyword} facts, lists, and rankings are naturally bingeable. This format is easy to repeat and tends to get strong retention.`,
      videoIdeas: [
        `Top 5 ${cleanQuery} facts`,
        `Best ${cleanQuery} moments ranked`,
        `Most underrated things in ${cleanQuery}`,
        `Worst mistakes in ${cleanQuery}`,
        `Things nobody tells you about ${cleanQuery}`,
      ],
      hooks: [
        `This ${cleanQuery} fact sounds fake`,
        `The #1 thing people miss about ${cleanQuery}`,
        `These ${cleanQuery} rankings will surprise you`,
        `One of the craziest ${cleanQuery} facts ever`,
      ],
      keywords: [cleanQuery, `${cleanQuery} facts`, `${cleanQuery} ranking`, `${cleanQuery} top 5`],
      related: [`viral ${cleanQuery}`, `${cleanQuery} ideas`, `${cleanQuery} trends`],
      opportunity: 84,
    },
    {
      id: `${baseId}-stories`,
      name: `${keyword} Stories & Deep Dives`,
      emoji: "🎯",
      category,
      format: "both" as const,
      style: "faceless" as const,
      beginnerFriendly: false,
      region: "global" as const,
      scores: {
        competition: 51,
        virality: 82,
        monetization: 72,
        ease: 70,
        repeatability: 86,
      },
      why: `Story-based ${cleanQuery} content can stand out because it feels more premium than basic clips and gives you room for both Shorts and longer videos.`,
      videoIdeas: [
        `The hidden story behind ${cleanQuery}`,
        `How ${cleanQuery} changed over time`,
        `The biggest controversy in ${cleanQuery}`,
        `A deep dive into ${cleanQuery}`,
        `What nobody says about ${cleanQuery}`,
      ],
      hooks: [
        `There is a deeper story behind ${cleanQuery}`,
        `This changed everything in ${cleanQuery}`,
        `Nobody talks about this side of ${cleanQuery}`,
        `Here is what really happened in ${cleanQuery}`,
      ],
      keywords: [cleanQuery, `${cleanQuery} story`, `${cleanQuery} deep dive`, `${cleanQuery} documentary`],
      related: [`${cleanQuery} explained`, `${cleanQuery} history`, `${cleanQuery} analysis`],
      opportunity: 78,
    },
  ];

  return generated;
}
