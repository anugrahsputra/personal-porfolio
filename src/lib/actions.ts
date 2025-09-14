"use server";

import { transporter } from "@/lib/nodemailer";

export async function sendMail(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} ${email} - ${subject}`,
      text: message,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false };
  }
}
