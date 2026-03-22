import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const internalPath = path.join("/");
    const searchParams = req.nextUrl.searchParams.toString();

    // These environment variables should NOT have the NEXT_PUBLIC_ prefix
    // to ensure they are never leaked to the browser.
    const baseUrl =
      process.env.INTERNAL_API_URL || "https://portfolio-api.downormal.dev";
    const apiKey = process.env.PORTFOLIO_API_KEY || "";

    const apiUrl = `${baseUrl}/api/v1/${internalPath}${
      searchParams ? `?${searchParams}` : ""
    }`;

    console.log(`Proxying request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      // Ensure we don't cache stale data on the proxy level
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend responded with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in Proxy" },
      { status: 500 }
    );
  }
}
