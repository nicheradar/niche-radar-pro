export async function generateAINiches(query: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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
