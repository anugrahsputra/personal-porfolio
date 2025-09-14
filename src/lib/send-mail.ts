"use server";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL;
const EMAIL_PASS = process.env.NEXT_PUBLIC_PASS;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: EMAIL_USER,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.error();
  }
}
