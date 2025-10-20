import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  const base = process.env.API_BASE_URL?.replace(/\/$/, "");
  if (!base) return NextResponse.json({ error: "API_BASE_URL not set" }, { status: 500 });

  const r = await fetch(`${base}/openapi.json`, { cache: "no-store" });
  const text = await r.text();
  return new NextResponse(text, { status: r.status, headers: { "Content-Type": "application/json" } });
}
