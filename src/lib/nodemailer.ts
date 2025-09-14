import nodemailer from "nodemailer";

const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL;
const EMAIL_PASS = process.env.NEXT_PUBLIC_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("Email credentials are not set in environment variables.");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
