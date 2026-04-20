export async function generateAINiches(query: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a YouTube niche expert. Generate niche ideas with high viral potential. Keep answers structured and concise.",
          },
          {
            role: "user",
            content: `Give 5 YouTube niche ideas based on: ${query}.
Return in JSON format:
[
  {
    "name": "",
    "description": "",
    "audience": "",
    "virality": "High/Medium/Low"
  }
]`,
          },
        ],
      }),
    });

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content;

    return JSON.parse(text);
  } catch (err) {
    console.error("AI error:", err);
    return [];
  }
}
