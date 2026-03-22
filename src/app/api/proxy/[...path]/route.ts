import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const internalPath = path.join("/");
    const searchParams = req.nextUrl.searchParams.toString();

    const baseUrl = process.env.INTERNAL_API_URL || "https://portfolio-api.downormal.dev";
    const apiKey = process.env.PORTFOLIO_API_KEY;

    const apiUrl = `${baseUrl}/api/v1/${internalPath}${
      searchParams ? `?${searchParams}` : ""
    }`;

    console.log(`[Proxy] Requesting: ${apiUrl}`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Only add the API key if it's actually defined and not empty
    if (apiKey && apiKey.trim() !== "") {
      headers["X-API-Key"] = apiKey;
      console.log(`[Proxy] API Key sent (Length: ${apiKey.length})`);
    } else {
      console.log(`[Proxy] No API Key sent`);
    }

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(`[Proxy] Backend error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Backend responded with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Proxy] Critical error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in Proxy" },
      { status: 500 }
    );
  }
}
