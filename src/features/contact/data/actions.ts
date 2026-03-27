"use server";

import { fetchWithTimeout } from "@/lib/utils";

export async function sendMail(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const profileId = process.env.NEXT_PUBLIC_PROFILE_ID;

  if (!profileId) {
    console.error("Missing NEXT_PUBLIC_PROFILE_ID");
    return { success: false };
  }

  // We use the local proxy route to hit the backend API
  // This handles CORS and the API key on the server-side
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.downormal.dev"}/api/proxy/send-email`;

  try {
    const response = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
