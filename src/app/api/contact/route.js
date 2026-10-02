import { sendMail } from "@/lib/mailer";
import { renderContactEmail } from "@/lib/emailTemplate";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 120, email: 180, phone: 40, message: 4000 };

function validate(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) errors.name = "Full name is required.";
  else if (name.length > MAX_LENGTHS.name) errors.name = "Full name is too long.";

  if (!email) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(email) || email.length > MAX_LENGTHS.email) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) errors.phone = "Phone number is required.";
  else if (phone.length > MAX_LENGTHS.phone) errors.phone = "Phone number is too long.";

  if (!message) errors.message = "Tell us what you need.";
  else if (message.length > MAX_LENGTHS.message) errors.message = "Message is too long.";

  return { errors, values: { name, email, phone, message } };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { errors, values } = validate(body ?? {});
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Please check the form and try again.", errors }, { status: 400 });
  }

  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  if (!receiver) {
    console.error("CONTACT_RECEIVER_EMAIL is not set.");
    return Response.json(
      { error: "The contact form isn't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const { html, text } = renderContactEmail(values);
    await sendMail({
      to: receiver,
      replyTo: values.email,
      subject: `New quote request from ${values.name}`,
      html,
      text,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return Response.json(
      { error: "We couldn't send your request. Please try again or contact us directly." },
      { status: 502 }
    );
  }

  return Response.json({ success: true });
}
