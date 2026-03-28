"use server";

import { fetchWithTimeout } from "@/lib/utils";

export async function sendMail(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const profileId = process.env.NEXT_PUBLIC_PROFILE_ID;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.PORTFOLIO_API_KEY;

  console.log("[DEBUG] profileId:", profileId);
  console.log("[DEBUG] baseUrl:", baseUrl);
  console.log("[DEBUG] apiKey present:", !!apiKey);
  console.log("[DEBUG] apiKey value:", apiKey);

  if (!profileId || !baseUrl) {
    console.error("Missing NEXT_PUBLIC_PROFILE_ID or NEXT_PUBLIC_API_BASE_URL");
    return { success: false };
  }

  const url = `${baseUrl}/api/v1/send-email/`;
  console.log("[DEBUG] Full URL:", url);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Next.js/Server",
    };

    if (apiKey) {
      headers["X-API-Key"] = apiKey;
    }

    console.log("[DEBUG] Request headers:", headers);
    console.log(
      "[DEBUG] Request body:",
      JSON.stringify({
        profile_id: profileId,
        name,
        email,
        subject,
        message,
      }),
    );

    const response = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          profile_id: profileId,
          name,
          email,
          subject,
          message,
        }),
      },
      10000,
    );

    console.log("[DEBUG] Response status:", response.status);
    console.log("[DEBUG] Response statusText:", response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "[DEBUG] Failed to send email:",
        response.status,
        errorData,
      );
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
