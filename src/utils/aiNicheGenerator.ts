type AINicheRaw = {
  name: string;
  description: string;
  audience: string;
  virality: "High" | "Medium" | "Low";
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

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

const viralityToScore = (value: string) => {
  if (value === "High") return 88;
  if (value === "Medium") return 74;
  return 60;
};

export async function generateAINiches(query: string) {
  try {
    const response = await fetch("/api/generate-niches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Secure AI API error:", data);
      return [];
    }

    const ideas: AINicheRaw[] = data.ideas || [];
    const category = detectCategory(query);

    return ideas.map((idea, index) => {
      const viralityScore = viralityToScore(idea.virality);

      return {
        id: `ai-${slugify(query)}-${index + 1}`,
        name: idea.name,
        emoji: "✨",
        category,
        format: "shorts" as const,
        style: "faceless" as const,
        beginnerFriendly: true,
        region: "global" as const,
        scores: {
          competition: 42,
          virality: viralityScore,
          monetization: 72,
          ease: 80,
          repeatability: 88,
        },
        why: idea.description,
        videoIdeas: [
          `${idea.name} explained in 60 seconds`,
          `Top facts about ${idea.name}`,
          `Why ${idea.name} can go viral`,
          `${idea.name} content ideas for beginners`,
          `Best short video angles for ${idea.name}`,
        ],
        hooks: [
          `This niche is more powerful than it looks`,
          `Nobody is talking enough about this niche`,
          `This content angle can explode fast`,
          `One of the smartest niche ideas right now`,
        ],
        keywords: [query, idea.name.toLowerCase(), `${query} niche`, `${query} shorts`],
        related: [idea.audience.toLowerCase(), `${query} content`, `${query} ideas`],
        opportunity: Math.round(
          (100 - 42) * 0.25 +
            viralityScore * 0.25 +
            72 * 0.2 +
            80 * 0.15 +
            88 * 0.15
        ),
      };
    });
  } catch (err) {
    console.error("AI error:", err);
    return [];
  }
}
