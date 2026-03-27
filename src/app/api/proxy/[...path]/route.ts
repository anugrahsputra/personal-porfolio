import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, params);
}

async function handleProxy(
  req: NextRequest,
  paramsPromise: Promise<{ path: string[] }>
) {
  try {
    const { path } = await paramsPromise;
    const internalPath = path.join("/");
    const searchParams = req.nextUrl.searchParams.toString();

    const baseUrl = process.env.INTERNAL_API_URL || "https://portfolio-api.downormal.dev";
    const apiKey = process.env.PORTFOLIO_API_KEY;

    const apiUrl = `${baseUrl}/api/v1/${internalPath}${
      searchParams ? `?${searchParams}` : ""
    }`;

    console.log(`[Proxy] ${req.method} Requesting: ${apiUrl}`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey && apiKey.trim() !== "") {
      headers["X-API-Key"] = apiKey;
    } else {
      console.log(`[Proxy] No API Key found in process.env.PORTFOLIO_API_KEY`);
    }

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      next: { revalidate: 0 },
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      const body = await req.json().catch(() => null);
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No error body");
      console.error(`[Proxy] Backend error: ${response.status} - Body: ${errorText}`);
      return NextResponse.json(
        { error: `Backend responded with ${response.status}`, details: errorText },
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
