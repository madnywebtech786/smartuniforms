/**
 * Plain inline-styled HTML (no Tailwind/external CSS — email clients strip
 * <style> blocks and class names unreliably). Colors are hardcoded from
 * globals.css's design tokens so this stays visually on-brand without
 * depending on the app's build pipeline:
 *   --stitch-black #14130f   --canvas #f8f5ee   --panel #ffffff
 *   --thread-gold #fbae47    --graphite #5c584f  --hairline #e3ddce
 */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e3ddce;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#5c584f;">
          ${escapeHtml(label)}
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#14130f;">
          ${escapeHtml(value)}
        </p>
      </td>
    </tr>`;
}

export function renderContactEmail({ name, company, email, phone, message }) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New quote request</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f8f5ee;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:4px;overflow:hidden;">
            <tr>
              <td style="background-color:#14130f;padding:28px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#fbae47;">
                  Smart Uniform
                </p>
                <p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#f8f5ee;">
                  New quote request
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Full name", name)}
                  ${row("Company name", company)}
                  ${row("Email address", email)}
                  ${row("Phone number", phone)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#5c584f;">
                  What they need
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#14130f;white-space:pre-wrap;">${escapeHtml(
                  message
                )}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f8f5ee;border-top:1px solid #e3ddce;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#5c584f;">
                  Submitted via the contact form at smartuniform.com.fj. Reply directly to this email to respond to ${escapeHtml(
                    name
                  )}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New quote request — Smart Uniform",
    "",
    `Full name: ${name}`,
    company ? `Company name: ${company}` : null,
    `Email address: ${email}`,
    phone ? `Phone number: ${phone}` : null,
    "",
    "What they need:",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { html, text };
}
