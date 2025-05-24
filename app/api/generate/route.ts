// app/api/generate/route.ts (For Next.js 13+ App Router)
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 400 });
    }

    const response = await fetch(
      "https://api.api-ninjas.com/v1/passwordgenerator?length=16",
      {
        headers: { "X-Api-Key": 
            `q0ARP/qnOqXnSa1D3GO3YA==k34536jRrKLrd2WE `},
      }
    );

    if (!response.ok) throw new Error("Failed to generate password");

    const data = await response.json();
    return NextResponse.json({ password: data.random_password });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : err }, { status: 500 });
  }
}
