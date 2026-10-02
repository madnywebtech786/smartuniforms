import nodemailer from "nodemailer";

let transporter;

/**
 * Lazily created singleton — avoids reconnecting on every request while
 * still only touching env vars (and throwing if they're missing) once
 * someone actually tries to send mail, not at module import time.
 */
function getTransporter() {
  if (transporter) return transporter;

  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables."
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

export async function sendMail({ to, subject, html, text, replyTo }) {
  const { GMAIL_USER } = process.env;

  await getTransporter().sendMail({
    from: `"Smart Uniform" <${GMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
    text,
  });
}
