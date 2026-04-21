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
  if (q.includes("money") || q.includes("finance") || q.includes("invest") || q.includes("crypto")) return "Finance";
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

const detectAudience = (query: string) => {
  const q = query.toLowerCase();

  if (q.includes("crypto") || q.includes("finance") || q.includes("money")) return "young adults and beginners interested in wealth";
  if (q.includes("ai") || q.includes("tech")) return "creators and tech-curious viewers";
  if (q.includes("fitness") || q.includes("gym")) return "health-conscious viewers and beginners";
  if (q.includes("cat") || q.includes("dog") || q.includes("animal")) return "pet lovers and casual entertainment viewers";
  if (q.includes("history") || q.includes("facts")) return "curious learners and documentary viewers";
  if (q.includes("horror") || q.includes("scary")) return "thrill-seeking short-form viewers";
  if (q.includes("islam") || q.includes("dua") || q.includes("quran")) return "faith-based educational audiences";
  if (q.includes("car")) return "car enthusiasts and luxury viewers";
  if (q.includes("travel")) return "aspirational viewers and travel fans";

  return "general short-form viewers";
};

const buildIdeas = (query: string): AINicheRaw[] => {
  const audience = detectAudience(query);
  const cleanQuery = query.trim();

  return [
    {
      name: `${cleanQuery} for beginners`,
      description: `A simple, easy-entry version of ${cleanQuery} content with broad appeal and strong repeat potential.`,
      audience,
      virality: "High",
    },
    {
      name: `${cleanQuery} facts and hidden truths`,
      description: `Short, curiosity-driven videos around surprising facts, myths, and overlooked angles in ${cleanQuery}.`,
      audience,
      virality: "High",
    },
    {
      name: `${cleanQuery} news and trends`,
      description: `Fast, consistent updates around fresh developments in ${cleanQuery}, ideal for repeat uploads.`,
      audience,
      virality: "Medium",
    },
    {
      name: `${cleanQuery} mistakes to avoid`,
      description: `Problem-solving content that performs well because it is practical, searchable, and beginner friendly.`,
      audience,
      virality: "Medium",
    },
    {
      name: `${cleanQuery} vs alternatives`,
      description: `Comparison-style content that creates strong hooks and keeps viewers watching to the end.`,
      audience,
      virality: "Medium",
    },
  ];
};

export async function generateAINiches(query: string) {
  try {
    const ideas: AINicheRaw[] = buildIdeas(query);
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
          competition: idea.virality === "High" ? 38 : 45,
          virality: viralityScore,
          monetization: category === "Finance" || category === "Tech" ? 78 : 68,
          ease: 82,
          repeatability: 90,
        },
        why: idea.description,
        videoIdeas: [
          `${idea.name} explained in 30 seconds`,
          `Top 5 ${idea.name} content ideas`,
          `Why ${idea.name} can grow fast on YouTube Shorts`,
          `${idea.name} angles no one is using properly`,
          `How to start ${idea.name} content as a beginner`,
        ],
        hooks: [
          `This ${query} angle is way more powerful than people think`,
          `Nobody is using this ${query} content idea properly`,
          `This is one of the easiest ${query} formats to grow`,
          `If I started a ${query} channel today, I’d use this angle`,
        ],
        keywords: [query, idea.name.toLowerCase(), `${query} niche`, `${query} shorts`],
        related: [idea.audience.toLowerCase(), `${query} content`, `${query} ideas`],
        opportunity: Math.round(
          (100 - (idea.virality === "High" ? 38 : 45)) * 0.25 +
            viralityScore * 0.25 +
            (category === "Finance" || category === "Tech" ? 78 : 68) * 0.2 +
            82 * 0.15 +
            90 * 0.15
        ),
      };
    });
  } catch (err) {
    console.error("Local niche generation error:", err);
    return [];
  }
}
