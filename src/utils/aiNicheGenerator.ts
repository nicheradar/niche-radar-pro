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

  if (q.includes("crypto") || q.includes("finance") || q.includes("money") || q.includes("invest")) {
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
    case "Sports":
      return { competitionHigh: 56, competitionMedium: 64, monetization: 67, ease: 74, repeatability: 85 };
    default:
      return { competitionHigh: 50, competitionMedium: 58, monetization: 68, ease: 80, repeatability: 84 };
  }
};

const buildVideoIdeas = (query: string, nicheName: string, category: string) => {
  const name = nicheName.toLowerCase();

  if (category === "Finance") {
    if (name.includes("explained")) {
      return [
        `${query} explained in 30 seconds`,
        `The simplest way to understand ${query}`,
        `What beginners get wrong about ${query}`,
        `${query} basics nobody explains properly`,
        `Start learning ${query} with this simple angle`,
      ];
    }

    if (name.includes("news") || name.includes("prediction")) {
      return [
        `Latest ${query} update creators should cover`,
        `What just happened in ${query}`,
        `Biggest ${query} trend this week`,
        `Why people are watching ${query} news again`,
        `How to turn ${query} updates into Shorts`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `3 ${query} mistakes beginners make`,
        `Why most people lose early in ${query}`,
        `Avoid these ${query} beginner traps`,
        `The worst way to start with ${query}`,
        `Mistakes that ruin ${query} progress fast`,
      ];
    }

    if (name.includes("traditional investing") || name.includes("vs")) {
      return [
        `${query} vs stocks in 30 seconds`,
        `Which is better: ${query} or traditional investing?`,
        `Why people compare ${query} with stocks`,
        `${query} vs real-world investing explained simply`,
        `Best comparison angle for ${query} content`,
      ];
    }

    if (name.includes("passive income")) {
      return [
        `Can ${query} really create passive income?`,
        `Best ${query} passive income angle for Shorts`,
        `How creators make ${query} content feel profitable`,
        `Passive income myths in ${query}`,
        `What beginners expect from ${query} income`,
      ];
    }
  }

  if (category === "Pets") {
    if (name.includes("funny")) {
      return [
        `Funniest ${query} moments caught on camera`,
        `Why funny ${query} Shorts keep getting rewatched`,
        `Best editing style for viral ${query} clips`,
        `How to make hilarious ${query} compilations`,
        `This type of ${query} humor always works`,
      ];
    }

    if (name.includes("facts")) {
      return [
        `5 facts about ${query} most people never knew`,
        `Strange ${query} behaviors explained simply`,
        `The most surprising truth about ${query}`,
        `Why ${query} do this weird thing`,
        `Hidden facts that make ${query} content addictive`,
      ];
    }

    if (name.includes("emotional") || name.includes("rescue")) {
      return [
        `The most emotional ${query} rescue story`,
        `Why rescue ${query} videos hit so hard`,
        `Before and after ${query} transformation story`,
        `How emotional ${query} clips go viral`,
        `Best storytelling angles for ${query} content`,
      ];
    }

    if (name.includes("care") || name.includes("training")) {
      return [
        `Best beginner tips for ${query} owners`,
        `How to train ${query} faster and easier`,
        `Common ${query} care mistakes`,
        `Things every new ${query} owner should know`,
        `Easy ${query} training ideas for Shorts`,
      ];
    }

    if (name.includes("vs")) {
      return [
        `${query} vs other pets: what people prefer`,
        `Why ${query} beat other pets in views`,
        `Best pet comparison angles using ${query}`,
        `${query} vs dogs/cats explained simply`,
        `Pet debate content ideas around ${query}`,
      ];
    }
  }

  if (category === "Tech") {
    if (name.includes("tools")) {
      return [
        `Top ${query} tools creators should try`,
        `Best ${query} tools for saving time`,
        `3 underrated ${query} tools`,
        `Which ${query} tool is actually worth it?`,
        `Fastest-growing ${query} tool content ideas`,
      ];
    }

    if (name.includes("side hustle")) {
      return [
        `How ${query} can become a side hustle`,
        `Best ${query} side hustle angles for Shorts`,
        `Can beginners make money with ${query}?`,
        `What makes ${query} side hustle content clickable`,
        `Easy money-focused ${query} content ideas`,
      ];
    }

    if (name.includes("tutorial")) {
      return [
        `${query} tutorial in 30 seconds`,
        `Beginner guide to ${query}`,
        `How to start using ${query} today`,
        `${query} basics no one explains clearly`,
        `Simple ${query} workflow for beginners`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `Common mistakes people make with ${query}`,
        `Why beginners fail with ${query}`,
        `Avoid these ${query} workflow mistakes`,
        `The wrong way to use ${query}`,
        `Fix these ${query} errors fast`,
      ];
    }

    if (name.includes("old methods") || name.includes("vs")) {
      return [
        `${query} vs old way of doing things`,
        `Why ${query} is replacing old methods`,
        `Old workflow vs ${query} workflow`,
        `Which is better: ${query} or manual work?`,
        `Comparison content ideas around ${query}`,
      ];
    }
  }

  if (category === "Fitness") {
    if (name.includes("beginners")) {
      return [
        `${query} beginner routine in 30 seconds`,
        `How to start ${query} without confusion`,
        `Best beginner angle for ${query} Shorts`,
        `What every ${query} beginner should know`,
        `Simple ${query} start plan for new viewers`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `The biggest ${query} mistakes slowing progress`,
        `Why most people fail at ${query} early`,
        `Avoid these ${query} beginner errors`,
        `Small ${query} mistakes with big consequences`,
        `Fix these ${query} problems fast`,
      ];
    }

    if (name.includes("transformations")) {
      return [
        `Best ${query} transformation story angles`,
        `Why transformation content in ${query} works`,
        `Before and after ${query} Shorts idea`,
        `How to make ${query} progress content addictive`,
        `The most inspiring ${query} turnaround format`,
      ];
    }

    if (name.includes("home")) {
      return [
        `Easy ${query} routine to do at home`,
        `Home-friendly ${query} content people love`,
        `No-equipment ${query} idea for beginners`,
        `How to make home ${query} Shorts go viral`,
        `Best at-home ${query} format for faceless channels`,
      ];
    }

    if (name.includes("myths")) {
      return [
        `${query} myths most people still believe`,
        `Truth vs myth in ${query}`,
        `Fake advice in ${query} explained`,
        `What’s actually true about ${query}`,
        `Myth-busting ${query} content ideas`,
      ];
    }
  }

  if (category === "Education") {
    if (name.includes("sound fake")) {
      return [
        `${query} facts that sound completely fake`,
        `5 unbelievable ${query} facts`,
        `This ${query} fact feels made up`,
        `Strange truths about ${query}`,
        `Why viewers love shocking ${query} facts`,
      ];
    }

    if (name.includes("30 seconds")) {
      return [
        `${query} explained in 30 seconds`,
        `The fastest way to understand ${query}`,
        `${query} summary for beginners`,
        `Simple ${query} breakdown for Shorts`,
        `Quick ${query} lesson idea`,
      ];
    }

    if (name.includes("hidden stories")) {
      return [
        `The hidden story behind ${query}`,
        `What nobody tells you about ${query}`,
        `Forgotten parts of ${query}`,
        `The untold side of ${query}`,
        `Story-based ${query} content ideas`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `The biggest mistakes in ${query}`,
        `How one mistake changed ${query}`,
        `Worst decisions in ${query}`,
        `Failure stories from ${query}`,
        `Mistake-based ${query} Shorts ideas`,
      ];
    }

    if (name.includes("then vs now")) {
      return [
        `${query} then vs now in 30 seconds`,
        `How ${query} changed over time`,
        `Old vs modern ${query}`,
        `What ${query} looked like before`,
        `Comparison-based ${query} storytelling ideas`,
      ];
    }
  }

  if (category === "Entertainment") {
    if (name.includes("true scary stories")) {
      return [
        `A true ${query} story that gets darker fast`,
        `Scary ${query} story with a twist ending`,
        `Best storytelling format for ${query} Shorts`,
        `Why true ${query} stories keep people watching`,
        `Short suspense idea around ${query}`,
      ];
    }

    if (name.includes("caught on camera")) {
      return [
        `${query} moments caught on camera`,
        `The creepiest ${query} footage online`,
        `Proof-style ${query} content that hooks fast`,
        `Why camera evidence ${query} clips go viral`,
        `Best visual format for ${query} Shorts`,
      ];
    }

    if (name.includes("myths") || name.includes("legends")) {
      return [
        `The scariest myth about ${query}`,
        `Legends around ${query} people still believe`,
        `Myth-based ${query} storytelling ideas`,
        `Famous ${query} legends explained`,
        `This ${query} myth sounds too real`,
      ];
    }

    if (name.includes("unexplained")) {
      return [
        `Unexplained ${query} facts that feel impossible`,
        `Nobody can explain these ${query} moments`,
        `Why ${query} mysteries hook viewers hard`,
        `The strangest ${query} cases ever`,
        `Mystery-style ${query} content angles`,
      ];
    }

    if (name.includes("top 5")) {
      return [
        `Top 5 scariest ${query} moments`,
        `Ranking the creepiest ${query} clips`,
        `Best list-style ${query} content idea`,
        `Why top 5 ${query} Shorts work well`,
        `Most viral countdown format for ${query}`,
      ];
    }
  }

  if (category === "Religion") {
    if (name.includes("daily reminders")) {
      return [
        `A short ${query} reminder for today`,
        `Powerful daily reminder around ${query}`,
        `Short faith-based ${query} content idea`,
        `Meaningful ${query} reminder for busy people`,
        `Why daily ${query} reminder Shorts work`,
      ];
    }

    if (name.includes("daily life")) {
      return [
        `Lessons from ${query} for everyday life`,
        `How ${query} applies to real situations`,
        `Daily life advice inspired by ${query}`,
        `Practical reflection content around ${query}`,
        `Useful ${query} lessons for modern life`,
      ];
    }

    if (name.includes("recitations") || name.includes("meanings")) {
      return [
        `Beautiful ${query} recitation with meaning`,
        `Short reflective content around ${query}`,
        `Why meaning-based ${query} videos connect deeply`,
        `Best peaceful format for ${query} Shorts`,
        `Emotional recitation-style ${query} idea`,
      ];
    }

    if (name.includes("misunderstandings")) {
      return [
        `Common misunderstandings about ${query}`,
        `What people often get wrong about ${query}`,
        `Clarifying ${query} in a simple way`,
        `Short educational content around ${query}`,
        `Best misconception-based ${query} format`,
      ];
    }

    if (name.includes("stories")) {
      return [
        `A short story with a lesson from ${query}`,
        `Story-based ${query} content that stays memorable`,
        `Powerful lesson from a ${query} story`,
        `Why stories around ${query} work so well`,
        `Simple storytelling format for ${query}`,
      ];
    }
  }

  if (category === "Automotive") {
    if (name.includes("facts") || name.includes("specs")) {
      return [
        `${query} facts most people never knew`,
        `Fastest specs breakdown for ${query}`,
        `Surprising truth about ${query}`,
        `Why ${query} specs content gets views`,
        `Best fact-based ${query} Shorts angle`,
      ];
    }

    if (name.includes("luxury comparisons")) {
      return [
        `${query} luxury comparison in 30 seconds`,
        `Which ${query} is actually better?`,
        `Why viewers love comparing ${query}`,
        `The best vs battle using ${query}`,
        `High-retention comparison format for ${query}`,
      ];
    }

    if (name.includes("hidden features")) {
      return [
        `Hidden ${query} features people miss`,
        `The coolest secret in ${query}`,
        `Feature-reveal ${query} content idea`,
        `Why hidden-feature ${query} clips work`,
        `Short showcase format around ${query}`,
      ];
    }

    if (name.includes("cheapest") || name.includes("expensive")) {
      return [
        `Cheapest vs most expensive ${query}`,
        `Price-based comparison around ${query}`,
        `How far apart ${query} prices really go`,
        `Best rich-vs-budget ${query} angle`,
        `This ${query} price gap is crazy`,
      ];
    }

    if (name.includes("dream garage")) {
      return [
        `Build a dream garage using ${query}`,
        `Most aspirational ${query} garage ideas`,
        `Why dream garage ${query} content performs`,
        `Best fantasy-style ${query} Shorts format`,
        `Garage ranking content around ${query}`,
      ];
    }
  }

  if (category === "Travel") {
    if (name.includes("must see")) {
      return [
        `${query} places you must see once`,
        `Why this ${query} destination deserves more attention`,
        `Best visual ${query} travel format for Shorts`,
        `Top must-see spots in ${query}`,
        `Aspirational ${query} content that performs well`,
      ];
    }

    if (name.includes("hidden gems")) {
      return [
        `Hidden gems in ${query} most tourists miss`,
        `The underrated side of ${query}`,
        `Secret places around ${query}`,
        `Why hidden-gem ${query} content works`,
        `Discovery-style ${query} Shorts ideas`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `Tourist mistakes people make in ${query}`,
        `Avoid these ${query} travel errors`,
        `What not to do in ${query}`,
        `Travel mistake content idea around ${query}`,
        `Best warning-style ${query} Shorts format`,
      ];
    }

    if (name.includes("budget") || name.includes("luxury")) {
      return [
        `${query} budget vs luxury in 30 seconds`,
        `Cheap vs expensive travel around ${query}`,
        `What ${query} looks like on different budgets`,
        `Comparison content idea for ${query} travel`,
        `Travel contrast videos around ${query}`,
      ];
    }

    if (name.includes("before you go")) {
      return [
        `What to know before visiting ${query}`,
        `Important facts before going to ${query}`,
        `Beginner travel advice around ${query}`,
        `Planning-based ${query} Shorts idea`,
        `Useful travel prep content for ${query}`,
      ];
    }
  }

  return [
    `${nicheName} explained in 30 seconds`,
    `Top 5 ${nicheName} content ideas`,
    `Why ${nicheName} can grow fast on YouTube Shorts`,
    `${nicheName} angles no one is using properly`,
    `How to start ${nicheName} content as a beginner`,
  ];
};

const buildHooks = (query: string, nicheName: string, category: string) => {
  const name = nicheName.toLowerCase();

  if (category === "Finance") {
    if (name.includes("explained")) {
      return [
        `Most people still don’t understand ${query} this simply`,
        `This is the easiest ${query} explanation you’ll hear today`,
        `If ${query} feels confusing, start here`,
        `Beginners keep overcomplicating ${query}`,
      ];
    }

    if (name.includes("news") || name.includes("prediction")) {
      return [
        `Something big just happened in ${query}`,
        `This ${query} update is getting attention fast`,
        `Most people will hear about this ${query} trend too late`,
        `This week could change the way people view ${query}`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `Beginners keep making this ${query} mistake`,
        `This small ${query} mistake can cost a lot`,
        `Most people start ${query} the wrong way`,
        `Avoid this if you’re new to ${query}`,
      ];
    }

    if (name.includes("traditional investing") || name.includes("vs")) {
      return [
        `People keep comparing ${query} to traditional investing for a reason`,
        `This ${query} comparison gets attention every time`,
        `Which side wins: ${query} or traditional investing?`,
        `Most viewers already have an opinion on this ${query} debate`,
      ];
    }

    if (name.includes("passive income")) {
      return [
        `Everyone wants passive income from ${query}, but almost nobody says this`,
        `This ${query} angle feels more profitable than people think`,
        `The idea of passive income in ${query} hooks instantly`,
        `Most people click on ${query} income content for one reason`,
      ];
    }
  }

  if (category === "Pets") {
    if (name.includes("funny")) {
      return [
        `This ${query} clip format is almost impossible not to watch`,
        `Funny ${query} content gets rewatched for a reason`,
        `This is one of the easiest viral angles for ${query}`,
        `Most pet creators ignore how powerful this ${query} format is`,
      ];
    }

    if (name.includes("facts")) {
      return [
        `Most people never knew this about ${query}`,
        `This weird ${query} fact makes people stop scrolling`,
        `Nobody talks enough about this side of ${query}`,
        `This ${query} truth sounds fake but it isn’t`,
      ];
    }

    if (name.includes("emotional") || name.includes("rescue")) {
      return [
        `This type of ${query} story hits emotionally every time`,
        `People don’t just watch ${query} rescue content — they feel it`,
        `This emotional ${query} angle gets strong engagement`,
        `It’s hard to ignore a story like this about ${query}`,
      ];
    }

    if (name.includes("care") || name.includes("training")) {
      return [
        `Most ${query} owners learn this too late`,
        `This ${query} tip saves beginners a lot of trouble`,
        `If you own ${query}, this matters more than you think`,
        `Simple ${query} advice like this performs really well`,
      ];
    }

    if (name.includes("vs")) {
      return [
        `This ${query} comparison instantly starts debate`,
        `People love arguing about ${query} vs other pets`,
        `This type of pet comparison content pulls comments fast`,
        `One side always wins in this ${query} debate`,
      ];
    }
  }

  if (category === "Tech") {
    if (name.includes("tools")) {
      return [
        `This ${query} tool angle feels unfairly good`,
        `Most creators still haven’t tried this side of ${query}`,
        `This ${query} tool content can hook viewers in seconds`,
        `People love discovering shortcuts like this in ${query}`,
      ];
    }

    if (name.includes("side hustle")) {
      return [
        `This ${query} side hustle angle gets attention fast`,
        `Most people click because they want this from ${query}`,
        `This is one of the strongest money angles inside ${query}`,
        `Beginners love ${query} when it sounds like this`,
      ];
    }

    if (name.includes("tutorial")) {
      return [
        `This ${query} tutorial format keeps things simple`,
        `Most people want ${query} explained this way`,
        `If ${query} feels hard, this is the easiest entry point`,
        `Beginner-friendly ${query} content performs for a reason`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `Most people use ${query} the wrong way at first`,
        `This ${query} mistake kills progress fast`,
        `Avoiding this one ${query} error changes everything`,
        `People keep repeating this bad habit in ${query}`,
      ];
    }

    if (name.includes("old methods") || name.includes("vs")) {
      return [
        `This ${query} comparison makes the value obvious`,
        `Once viewers see ${query} vs the old way, they get it`,
        `This is why ${query} feels so much faster`,
        `The before-vs-after angle in ${query} works every time`,
      ];
    }
  }

  if (category === "Fitness") {
    if (name.includes("beginners")) {
      return [
        `Most people start ${query} in the hardest way possible`,
        `This beginner ${query} angle removes the confusion`,
        `If ${query} feels overwhelming, start here`,
        `This simple ${query} format is perfect for new viewers`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `This ${query} mistake slows down progress more than people think`,
        `Most beginners ruin ${query} results with this habit`,
        `This is why many people quit ${query} too early`,
        `Avoid this if you want faster ${query} progress`,
      ];
    }

    if (name.includes("transformations")) {
      return [
        `Transformation content in ${query} hooks people instantly`,
        `People love seeing this side of ${query}`,
        `This ${query} progress format is hard to ignore`,
        `Few things stop the scroll like a ${query} transformation`,
      ];
    }

    if (name.includes("home")) {
      return [
        `This home ${query} angle works because it feels easy to start`,
        `People click when ${query} looks this accessible`,
        `This is one of the easiest entry points into ${query}`,
        `Home-friendly ${query} content has broad appeal`,
      ];
    }

    if (name.includes("myths")) {
      return [
        `Most people still believe this myth about ${query}`,
        `This common ${query} advice is more wrong than people think`,
        `Myth-busting ${query} content gets attention fast`,
        `People love finding out they were wrong about ${query}`,
      ];
    }
  }

  if (category === "Education") {
    if (name.includes("sound fake")) {
      return [
        `This ${query} fact sounds fake, but it’s real`,
        `People stop scrolling for facts like this about ${query}`,
        `This is the kind of ${query} fact that gets rewatched`,
        `Most viewers won’t believe this about ${query} at first`,
      ];
    }

    if (name.includes("30 seconds")) {
      return [
        `This is the fastest way to understand ${query}`,
        `Most people want ${query} explained this quickly`,
        `Quick explanation content like this works well for ${query}`,
        `This ${query} breakdown makes a hard topic feel simple`,
      ];
    }

    if (name.includes("hidden stories")) {
      return [
        `Nobody talks enough about this hidden side of ${query}`,
        `This forgotten story from ${query} deserves more attention`,
        `People love discovering the unknown part of ${query}`,
        `This untold ${query} angle feels fresh instantly`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `One mistake changed everything in ${query}`,
        `This failure story from ${query} is hard to ignore`,
        `People click fast on mistakes inside ${query}`,
        `The biggest wrong turn in ${query} makes a great hook`,
      ];
    }

    if (name.includes("then vs now")) {
      return [
        `This then-vs-now ${query} angle makes the difference obvious`,
        `People love seeing how much ${query} changed`,
        `This comparison makes ${query} instantly more interesting`,
        `Old vs modern ${query} is a strong scroll-stopper`,
      ];
    }
  }

  if (category === "Entertainment") {
    if (name.includes("true scary stories")) {
      return [
        `This ${query} story gets darker the longer it goes`,
        `People keep watching because they want the ending`,
        `This true ${query} format is built for retention`,
        `It’s hard to scroll away from suspense like this`,
      ];
    }

    if (name.includes("caught on camera")) {
      return [
        `This ${query} footage makes people look twice`,
        `Proof-style ${query} clips hook instantly`,
        `People stop scrolling when ${query} looks this real`,
        `This visual ${query} angle is made for Shorts`,
      ];
    }

    if (name.includes("myths") || name.includes("legends")) {
      return [
        `This ${query} legend still creeps people out`,
        `Myths like this keep viewers watching till the end`,
        `People love stories that blur the line in ${query}`,
        `This scary ${query} myth feels more real than it should`,
      ];
    }

    if (name.includes("unexplained")) {
      return [
        `Nobody can explain this ${query} case properly`,
        `This unexplained ${query} moment pulls people in fast`,
        `Mystery is what makes ${query} content so addictive`,
        `The less clear it is, the stronger this ${query} hook becomes`,
      ];
    }

    if (name.includes("top 5")) {
      return [
        `Ranked ${query} content keeps people waiting for number one`,
        `This top-5 ${query} structure works for a reason`,
        `Viewers love countdown-style ${query} videos`,
        `This ranking format makes ${query} more bingeable`,
      ];
    }
  }

  if (category === "Religion") {
    if (name.includes("daily reminders")) {
      return [
        `A reminder like this around ${query} can stop the scroll gently`,
        `Short ${query} reminders connect because they feel personal`,
        `This daily ${query} angle is simple but powerful`,
        `People often need exactly this kind of ${query} reminder`,
      ];
    }

    if (name.includes("daily life")) {
      return [
        `This is how ${query} connects to real life`,
        `People respond well when ${query} feels practical`,
        `This daily-life angle makes ${query} easier to reflect on`,
        `Short practical lessons around ${query} can work beautifully`,
      ];
    }

    if (name.includes("recitations") || name.includes("meanings")) {
      return [
        `This ${query} recitation format feels deeply calming`,
        `Meaning-based ${query} content connects more than people expect`,
        `There’s something powerful about short ${query} reflection videos`,
        `This style of ${query} content feels both peaceful and memorable`,
      ];
    }

    if (name.includes("misunderstandings")) {
      return [
        `Many people misunderstand this about ${query}`,
        `This simple clarification around ${query} matters`,
        `Educational ${query} content like this builds trust fast`,
        `People appreciate when ${query} is explained clearly`,
      ];
    }

    if (name.includes("stories")) {
      return [
        `Stories with lessons from ${query} stay with people longer`,
        `This storytelling angle makes ${query} more memorable`,
        `People connect deeply with lesson-based ${query} stories`,
        `A short story around ${query} can carry a strong message`,
      ];
    }
  }

  if (category === "Automotive") {
    if (name.includes("facts") || name.includes("specs")) {
      return [
        `This ${query} fact makes viewers stop fast`,
        `Specs like this make ${query} content instantly clickable`,
        `People love learning surprising details about ${query}`,
        `This is the kind of ${query} fact that gets replayed`,
      ];
    }

    if (name.includes("luxury comparisons")) {
      return [
        `Luxury comparisons around ${query} create debate instantly`,
        `People love choosing sides in ${query} matchups`,
        `This comparison format makes ${query} more addictive`,
        `One of these ${query} options always wins the comments`,
      ];
    }

    if (name.includes("hidden features")) {
      return [
        `This hidden ${query} feature is more impressive than people expect`,
        `Feature-reveal ${query} content hooks instantly`,
        `People love discovering secret details in ${query}`,
        `This kind of ${query} reveal keeps viewers watching`,
      ];
    }

    if (name.includes("cheapest") || name.includes("expensive")) {
      return [
        `The gap between cheap and expensive ${query} is wild`,
        `People can’t resist a price contrast like this in ${query}`,
        `Budget vs luxury makes ${query} content very clickable`,
        `This ${query} comparison feels extreme in the best way`,
      ];
    }

    if (name.includes("dream garage")) {
      return [
        `Dream garage ${query} content triggers pure aspiration`,
        `People love imagining their perfect ${query} lineup`,
        `This fantasy-style ${query} format feels instantly engaging`,
        `Aspirational ${query} content like this gets attention fast`,
      ];
    }
  }

  if (category === "Travel") {
    if (name.includes("must see")) {
      return [
        `This side of ${query} makes people want to travel instantly`,
        `Must-see ${query} content works because it sells a feeling`,
        `People save videos like this about ${query}`,
        `This travel angle makes ${query} look unforgettable`,
      ];
    }

    if (name.includes("hidden gems")) {
      return [
        `People love hidden-gem content around ${query}`,
        `This lesser-known side of ${query} feels more exciting`,
        `Discovery-style ${query} videos get attention for a reason`,
        `It feels special when ${query} looks unknown like this`,
      ];
    }

    if (name.includes("mistakes")) {
      return [
        `Most tourists make this mistake in ${query}`,
        `Warning-style content like this performs well for ${query}`,
        `People click fast when they want to avoid travel mistakes`,
        `This small ${query} mistake can ruin the experience`,
      ];
    }

    if (name.includes("budget") || name.includes("luxury")) {
      return [
        `Budget vs luxury makes ${query} instantly more watchable`,
        `People love seeing both sides of ${query}`,
        `This contrast-based ${query} angle creates curiosity fast`,
        `Travel comparison content like this works really well`,
      ];
    }

    if (name.includes("before you go")) {
      return [
        `People love useful advice before going to ${query}`,
        `This prep-style ${query} content feels practical and clickable`,
        `Travel tips around ${query} work because they reduce uncertainty`,
        `This is the kind of ${query} advice viewers actually save`,
      ];
    }
  }

  return [
    `This ${query} angle is way more powerful than people think`,
    `Nobody is using this ${query} content idea properly`,
    `This is one of the easiest ${query} formats to grow`,
    `If I started a ${query} channel today, I’d use this angle`,
  ];
};

export async function generateAINiches(query: string) {
  try {
    const cleanQuery = query.trim();
    const ideas: AINicheRaw[] = buildIdeas(cleanQuery);
    const category = detectCategory(cleanQuery);
    const benchmarks = getCategoryBenchmarks(category);

    return ideas.map((idea, index) => {
      const viralityScore = viralityToScore(idea.virality);
      const competition =
        idea.virality === "High" ? benchmarks.competitionHigh : benchmarks.competitionMedium;

      const monetization = benchmarks.monetization;
      const ease = benchmarks.ease;
      const repeatability = benchmarks.repeatability;

      return {
        id: `ai-${slugify(cleanQuery)}-${index + 1}`,
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
        videoIdeas: buildVideoIdeas(cleanQuery, idea.name, category),
        hooks: buildHooks(cleanQuery, idea.name, category),
        keywords: [
          cleanQuery,
          idea.name.toLowerCase(),
          `${cleanQuery} niche`,
          `${cleanQuery} shorts`,
        ],
        related: [
          idea.audience.toLowerCase(),
          `${cleanQuery} content`,
          `${cleanQuery} ideas`,
        ],
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
