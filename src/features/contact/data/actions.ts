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

  if (!profileId || !baseUrl) {
    console.error("Missing NEXT_PUBLIC_PROFILE_ID or NEXT_PUBLIC_API_BASE_URL");
    return { success: false };
  }

  const url = `${baseUrl}/api/v1/send-email`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["X-API-Key"] = apiKey;
    }

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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to send email:", response.status, errorData);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
