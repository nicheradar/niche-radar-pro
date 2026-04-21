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

  if (q.includes("crypto") || q.includes("finance") || q.includes("money")) {
    return "young adults and beginners interested in wealth";
  }

  if (q.includes("ai") || q.includes("tech") || q.includes("software")) {
    return "creators, side hustlers, and tech-curious viewers";
  }

  if (q.includes("fitness") || q.includes("gym") || q.includes("workout")) {
    return "health-conscious viewers and transformation-focused beginners";
  }

  if (q.includes("cat") || q.includes("dog") || q.includes("animal") || q.includes("pet")) {
    return "pet lovers and casual entertainment viewers";
  }

  if (q.includes("history") || q.includes("facts") || q.includes("science")) {
    return "curious learners and documentary-style viewers";
  }

  if (q.includes("horror") || q.includes("scary") || q.includes("ghost")) {
    return "thrill-seeking short-form viewers";
  }

  if (q.includes("islam") || q.includes("dua") || q.includes("quran")) {
    return "faith-based educational audiences";
  }

  if (q.includes("car") || q.includes("cars") || q.includes("supercar")) {
    return "car enthusiasts and luxury-content viewers";
  }

  if (q.includes("travel") || q.includes("country") || q.includes("place")) {
    return "aspirational viewers and travel fans";
  }

  return "general short-form viewers";
};

const buildIdeas = (query: string): AINicheRaw[] => {
  const audience = detectAudience(query);
  const q = query.toLowerCase();

  if (q.includes("cat") || q.includes("dog") || q.includes("animal") || q.includes("pet")) {
    return [
      {
        name: `${query} funny moments`,
        description: `Highly shareable pet content that performs well because it triggers emotion, humor, and repeat views.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} facts you didn’t know`,
        description: `Curiosity-based content with strong retention because viewers want to discover surprising pet behavior and traits.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} emotional rescue stories`,
        description: `Story-driven content that builds audience connection and often gets strong engagement.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} care and training tips`,
        description: `Useful evergreen content that remains searchable and beginner friendly for pet owners.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} vs other pets`,
        description: `Comparison videos create instant hooks and help viewers stay longer to see the outcome.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("crypto") || q.includes("money") || q.includes("finance") || q.includes("invest")) {
    return [
      {
        name: `${query} explained simply`,
        description: `Beginner-friendly content that simplifies confusing topics and pulls in a broad audience.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} news and predictions`,
        description: `Fast-moving trend content with strong repeat potential if posted consistently.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} mistakes beginners make`,
        description: `Problem-solving content that is highly clickable because it promises to save viewers money or time.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} vs traditional investing`,
        description: `Comparison content creates curiosity and encourages comments and debate.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} passive income angles`,
        description: `High-interest finance content with strong monetization appeal and broad curiosity.`,
        audience,
        virality: "High",
      },
    ];
  }

  if (q.includes("ai") || q.includes("tech") || q.includes("software")) {
    return [
      {
        name: `${query} tools that save time`,
        description: `Practical tool-based content performs well because viewers instantly see utility and want quick wins.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} side hustle ideas`,
        description: `Monetization-focused content with high interest from beginners and creators.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} beginner tutorials`,
        description: `Easy-entry educational content that works well for viewers trying to learn fast.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} mistakes to avoid`,
        description: `Problem-avoidance hooks tend to perform well in tech because viewers want to skip frustration.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} vs old methods`,
        description: `Before-vs-after style comparisons make the value obvious and boost retention.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("fitness") || q.includes("gym") || q.includes("workout")) {
    return [
      {
        name: `${query} for beginners`,
        description: `Simple beginner-focused content performs well because it removes confusion and fear.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} mistakes killing progress`,
        description: `Mistake-based hooks grab attention because viewers want faster results.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} transformations`,
        description: `Transformation content is emotional, visual, and highly engaging on Shorts.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} home-friendly routines`,
        description: `Accessible routines widen the audience and make the niche easier to repeat.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} myths vs truth`,
        description: `Myth-busting content keeps retention strong by challenging what viewers think they know.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("history") || q.includes("science") || q.includes("facts")) {
    return [
      {
        name: `${query} facts that sound fake`,
        description: `Shock-and-curiosity content works well because viewers are pulled in by disbelief.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} in 30 seconds`,
        description: `Compressed explainer content is ideal for Shorts and easy to repeat.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} hidden stories`,
        description: `Unknown-angle storytelling helps content stand out from generic fact pages.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} biggest mistakes in history`,
        description: `Mistake and failure stories trigger curiosity and strong watch time.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} then vs now`,
        description: `Comparison storytelling gives a clear structure and strong visual potential.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("horror") || q.includes("scary") || q.includes("ghost")) {
    return [
      {
        name: `${query} true scary stories`,
        description: `Narrative suspense content performs well because viewers stay for the payoff.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} caught on camera`,
        description: `Visual proof-style hooks are highly clickable and strong for Shorts.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} myths and legends`,
        description: `Folklore and unexplained stories create repeatable content with strong curiosity.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} unexplained facts`,
        description: `Mystery-driven content keeps people watching because they want answers.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} top 5 moments`,
        description: `Ranked suspense content gives structure and boosts completion rate.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("islam") || q.includes("quran") || q.includes("dua")) {
    return [
      {
        name: `${query} daily reminders`,
        description: `Short reminder content is easy to consume, repeat, and share with faith-based audiences.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} lessons for daily life`,
        description: `Practical spiritual content helps viewers connect teachings to real situations.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} beautiful recitations and meanings`,
        description: `Emotionally resonant content that blends spirituality with reflection.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} common misunderstandings`,
        description: `Clarification-style content creates value and encourages engagement.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} stories with lessons`,
        description: `Story-based formats are memorable, repeatable, and beginner friendly.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("car") || q.includes("cars") || q.includes("supercar")) {
    return [
      {
        name: `${query} facts and specs`,
        description: `Fast car facts perform well because they combine speed, visuals, and curiosity.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} luxury comparisons`,
        description: `Comparison content works well in automotive because viewers love ranking and debate.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} hidden features`,
        description: `Feature-reveal content is easy to watch and keeps curiosity high.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} cheapest vs most expensive`,
        description: `Price contrast creates a strong hook and clear story angle.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} dream garage ideas`,
        description: `Aspirational automotive content has good emotional and share value.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  if (q.includes("travel") || q.includes("country") || q.includes("place")) {
    return [
      {
        name: `${query} places you must see`,
        description: `Bucket-list travel content performs well because it is visual and aspirational.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} hidden gems`,
        description: `Discovery-style content gives viewers something they feel others do not know.`,
        audience,
        virality: "High",
      },
      {
        name: `${query} mistakes tourists make`,
        description: `Problem-avoidance travel content is useful and highly clickable.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} budget vs luxury`,
        description: `Contrast-based travel content creates built-in curiosity and wider appeal.`,
        audience,
        virality: "Medium",
      },
      {
        name: `${query} facts before you go`,
        description: `Preparation-style content is useful, evergreen, and easy to repeat.`,
        audience,
        virality: "Medium",
      },
    ];
  }

  return [
    {
      name: `${query} for beginners`,
      description: `Simple entry-level content with broad appeal and low friction for new viewers.`,
      audience,
      virality: "High",
    },
    {
      name: `${query} hidden facts`,
      description: `Curiosity-based content that improves retention by making viewers want the next reveal.`,
      audience,
      virality: "High",
    },
    {
      name: `${query} trends`,
      description: `Timely content with strong repeat potential if posted consistently.`,
      audience,
      virality: "Medium",
    },
    {
      name: `${query} mistakes`,
      description: `Problem-solving content that tends to be clickable and beginner friendly.`,
      audience,
      virality: "Medium",
    },
    {
      name: `${query} comparisons`,
      description: `Comparison-style videos create natural hooks and help hold attention.`,
      audience,
      virality: "Medium",
    },
  ];
};

const getCategoryBenchmarks = (category: string) => {
  switch (category) {
    case "Finance":
      return { competitionHigh: 58, competitionMedium: 66, monetization: 88, ease: 68, repeatability: 86 };
    case "Tech":
      return { competitionHigh: 52, competitionMedium: 60, monetization: 82, ease: 74, repeatability: 88 };
    case "Fitness":
      return { competitionHigh: 54, competitionMedium: 63, monetization: 72, ease: 76, repeatability: 84 };
    case "Pets":
      return { competitionHigh: 62, competitionMedium: 69, monetization: 68, ease: 82, repeatability: 90 };
    case "Education":
      return { competitionHigh: 48, competitionMedium: 57, monetization: 66, ease: 78, repeatability: 85 };
    case "Entertainment":
      return { competitionHigh: 57, competitionMedium: 65, monetization: 64, ease: 80, repeatability: 87 };
    case "Religion":
      return { competitionHigh: 44, competitionMedium: 52, monetization: 58, ease: 79, repeatability: 83 };
    case "Automotive":
      return { competitionHigh: 55, competitionMedium: 63, monetization: 76, ease: 70, repeatability: 80 };
    case "Travel":
      return { competitionHigh: 50, competitionMedium: 59, monetization: 70, ease: 75, repeatability: 81 };
    default:
      return { competitionHigh: 50, competitionMedium: 58, monetization: 68, ease: 80, repeatability: 84 };
  }
};

const buildVideoIdeas = (query: string, nicheName: string, category: string) => {
  switch (category) {
    case "Pets":
      return [
        `Funniest ${query} moments that got millions of views`,
        `5 things people never knew about ${query}`,
        `The most emotional ${query} story you’ll hear today`,
        `How creators make viral ${query} Shorts`,
        `Best ${query} content angles for new channels`,
      ];
    case "Finance":
      return [
        `${nicheName} explained in 30 seconds`,
        `3 ${query} mistakes beginners make`,
        `Why ${query} content gets high CPM`,
        `Best ${query} Shorts angles for fast growth`,
        `What makes ${query} videos go viral`,
      ];
    case "Tech":
      return [
        `Top ${query} tools beginners should try`,
        `How ${query} saves creators hours every week`,
        `Best ${query} content ideas for Shorts`,
        `${query} mistakes slowing people down`,
        `Why ${query} is exploding right now`,
      ];
    case "Religion":
      return [
        `Powerful ${query} reminder for daily life`,
        `Lessons from ${query} everyone should know`,
        `Common misunderstandings about ${query}`,
        `Beautiful short content ideas around ${query}`,
        `How to make meaningful ${query} reminder videos`,
      ];
    default:
      return [
        `${nicheName} explained in 30 seconds`,
        `Top 5 ${nicheName} content ideas`,
        `Why ${nicheName} can grow fast on YouTube Shorts`,
        `${nicheName} angles no one is using properly`,
        `How to start ${nicheName} content as a beginner`,
      ];
  }
};

const buildHooks = (query: string, category: string) => {
  switch (category) {
    case "Pets":
      return [
        `This ${query} video idea is almost impossible to ignore`,
        `Pet content like this gets shared crazy fast`,
        `Most creators are missing this emotional ${query} angle`,
        `This is one of the easiest pet niches to grow right now`,
      ];
    case "Finance":
      return [
        `This ${query} angle gets attention fast`,
        `Most people still don’t understand this part of ${query}`,
        `This finance niche can hook viewers in seconds`,
        `If I started a ${query} channel today, I’d use this`,
      ];
    case "Tech":
      return [
        `This ${query} content angle feels unfairly good`,
        `Nobody is using this ${query} format properly`,
        `This is one of the smartest tech niches right now`,
        `This ${query} idea can grow even without a big audience`,
      ];
    default:
      return [
        `This ${query} angle is way more powerful than people think`,
        `Nobody is using this ${query} content idea properly`,
        `This is one of the easiest ${query} formats to grow`,
        `If I started a ${query} channel today, I’d use this angle`,
      ];
  }
};

export async function generateAINiches(query: string) {
  try {
    const ideas: AINicheRaw[] = buildIdeas(query);
    const category = detectCategory(query);
    const benchmarks = getCategoryBenchmarks(category);

    return ideas.map((idea, index) => {
      const viralityScore = viralityToScore(idea.virality);
      const competition =
        idea.virality === "High" ? benchmarks.competitionHigh : benchmarks.competitionMedium;

      const monetization =
        category === "Finance" || category === "Tech"
          ? benchmarks.monetization
          : benchmarks.monetization;

      const ease = benchmarks.ease;
      const repeatability = benchmarks.repeatability;

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
          competition,
          virality: viralityScore,
          monetization,
          ease,
          repeatability,
        },
        why: idea.description,
        videoIdeas: buildVideoIdeas(query, idea.name, category),
        hooks: buildHooks(query, category),
        keywords: [query, idea.name.toLowerCase(), `${query} niche`, `${query} shorts`],
        related: [idea.audience.toLowerCase(), `${query} content`, `${query} ideas`],
        opportunity: Math.round(
          (100 - competition) * 0.25 +
            viralityScore * 0.25 +
            monetization * 0.2 +
            ease * 0.15 +
            repeatability * 0.15
        ),
      };
    });
  } catch (err) {
    console.error("Local niche generation error:", err);
    return [];
  }
}
