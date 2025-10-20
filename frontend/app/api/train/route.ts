import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const apiUrl = process.env.API_BASE_URL
    if (!apiUrl) {
      return NextResponse.json({ error: "API base URL not configured" }, { status: 500 })
    }

    const response = await fetch(`${apiUrl}/train`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "Failed to train model" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Train API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
