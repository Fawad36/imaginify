import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error("❌ DeepSeek API Key is missing!");
      return NextResponse.json({ error: "DeepSeek API Key missing" }, { status: 500 });
    }

    console.log("✅ Sending request to DeepSeek with prompt:", prompt);

    const response = await fetch("https://api.deepseek.com/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ DeepSeek API Error:", errorText);
      return NextResponse.json({ error: `DeepSeek API Error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("✅ DeepSeek Response:", data);

    return NextResponse.json({ response: data.result }, { status: 200 });

  } catch (error: unknown) {
    console.error("❌ API Route Error:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}







