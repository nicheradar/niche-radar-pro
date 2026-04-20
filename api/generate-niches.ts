type AINicheRaw = {
  name: string;
  description: string;
  audience: string;
  virality: "High" | "Medium" | "Low";
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body ?? {};

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a YouTube niche expert. Return only valid JSON. Generate 5 niche ideas with concise, practical details.",
          },
          {
            role: "user",
            content: `Based on the search query "${query}", generate 5 YouTube niche ideas.

Return JSON in this exact format:
{
  "ideas": [
    {
      "name": "string",
      "description": "string",
      "audience": "string",
      "virality": "High"
    }
  ]
}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "OpenAI request failed",
        details: data,
      });
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: "No AI content returned" });
    }

    const parsed = JSON.parse(content) as { ideas?: AINicheRaw[] };

    return res.status(200).json({
      ideas: parsed.ideas ?? [],
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Server error",
      details: error?.message || "Unknown error",
    });
  }
}
