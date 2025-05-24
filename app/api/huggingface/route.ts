import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error("❌ Hugging Face API Key is missing!");
      return NextResponse.json({ error: "Hugging Face API Key missing" }, { status: 500 });
    }

    console.log("✅ Sending request to Hugging Face with prompt:", prompt);

    const response = await fetch( "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Hugging Face API Error:", errorText);
      return NextResponse.json({ error: `Hugging Face API Error: ${errorText}` }, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    console.log("✅ Hugging Face Response: Image Generated");

    return NextResponse.json({ imageUrl }, { status: 200 });

  } catch (error: unknown) {
    console.error("❌ API Route Error:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
