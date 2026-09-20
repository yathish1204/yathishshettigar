export interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AutoResponseEmailProps {
  name: string;
  subject: string;
}

export function buildContactEmailHtml({
  name,
  email,
  subject,
  message,
}: ContactEmailProps): string {
  const formattedMessage = message.replace(/\n/g, '<br/>');
  const now = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Portfolio Inquiry from ${name}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #09090b; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5; width: 100% !important;">

  <!-- Outer Full-Width Wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100% !important; min-width: 100%; background-color: #09090b; margin: 0; padding: 0;">
    <tr>
      <td align="center" style="width: 100%; padding: 0;">

        <!-- Main Full-Width Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100% !important; min-width: 100%; background-color: #09090b; margin: 0; padding: 0;">
          
          <!-- Glowing Top Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #b45309 0%, #d97706 50%, #fbbf24 100%); width: 100%;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 24px 16px; background-color: #121215; border-bottom: 1px solid #27272a; width: 100%;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                <tr>
                  <td style="text-align: left;">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 20px; font-size: 10px; font-weight: 700; color: #fbbf24; letter-spacing: 1px; text-transform: uppercase; font-family: monospace;">
                      &bull; PORTFOLIO INQUIRY
                    </span>
                    <h1 style="margin: 12px 0 4px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                      New Contact Message
                    </h1>
                    <p style="margin: 0; font-size: 12px; color: #a1a1aa; font-family: monospace;">
                      Received from your public portfolio website
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Section -->
          <tr>
            <td style="padding: 24px 16px; width: 100%;">

              <!-- Sender Name Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 16px; background-color: #18181b; border-radius: 14px; border: 1px solid #27272a; width: 100%;">
                    <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-family: monospace; display: block; margin-bottom: 4px;">
                      Sender Name
                    </span>
                    <strong style="font-size: 17px; color: #f4f4f5; font-weight: 700; display: block;">
                      ${name}
                    </strong>
                  </td>
                </tr>
              </table>

              <!-- Sender Email Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 16px; background-color: #18181b; border-radius: 14px; border: 1px solid #27272a; width: 100%;">
                    <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-family: monospace; display: block; margin-bottom: 4px;">
                      Sender Email Address
                    </span>
                    <a href="mailto:${email}" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600; word-break: break-all; display: inline-block;">
                      ${email} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Subject Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 16px; background-color: #18181b; border-radius: 14px; border: 1px solid #27272a; width: 100%;">
                    <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-family: monospace; display: block; margin-bottom: 4px;">
                      Inquiry Subject
                    </span>
                    <span style="font-size: 16px; color: #f4f4f5; font-weight: 600; display: block; word-break: break-word;">
                      ${subject}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Message Content Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px; background-color: #18181b; border-radius: 14px; border: 1px solid #27272a; border-left: 4px solid #fbbf24; width: 100%;">
                    <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-family: monospace; display: block; margin-bottom: 12px;">
                      Message Body
                    </span>
                    <div style="font-size: 16px; line-height: 1.75; color: #f4f4f5; font-weight: 400; word-break: break-word;">
                      ${formattedMessage}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Full-Width Reply CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                <tr>
                  <td style="width: 100%;">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display: block; width: 100%; text-align: center; padding: 16px 20px; background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%); color: #09090b; font-weight: 800; font-size: 15px; text-decoration: none; border-radius: 14px; box-sizing: border-box; letter-spacing: 0.5px; shadow: 0 10px 20px rgba(251, 191, 36, 0.25);">
                      REPLY DIRECT TO SENDER &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Metadata Section -->
          <tr>
            <td style="padding: 20px 16px; background-color: #121215; border-top: 1px solid #27272a; text-align: center; width: 100%;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #a1a1aa; font-family: monospace;">
                Sent via Yathish Shettigar Portfolio Website &bull; ${now}
              </p>
              <p style="margin: 0; font-size: 10px; color: #71717a; line-height: 1.4;">
                Confidentiality Notice: This email was automatically generated from a public submission on yathishshettigar.site.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export function buildAutoResponseEmailHtml({
  name,
  subject,
}: AutoResponseEmailProps): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You for Reaching Out!</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #09090b; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5; width: 100% !important;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100% !important; min-width: 100%; background-color: #09090b; margin: 0; padding: 0;">
    <tr>
      <td align="center" style="width: 100%; padding: 0;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100% !important; min-width: 100%; background-color: #09090b; margin: 0; padding: 0;">
          
          <!-- Glowing Top Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #b45309 0%, #d97706 50%, #fbbf24 100%); width: 100%;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 28px 20px; background-color: #121215; border-bottom: 1px solid #27272a; width: 100%;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                <tr>
                  <td style="text-align: left;">
                    <span style="display: inline-block; padding: 4px 12px; background-color: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 20px; font-size: 10px; font-weight: 700; color: #fbbf24; letter-spacing: 1px; text-transform: uppercase; font-family: monospace;">
                      &bull; MESSAGE CONFIRMATION
                    </span>
                    <h1 style="margin: 14px 0 6px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                      Thank You for Reaching Out!
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #a1a1aa; font-family: monospace;">
                      I have received your inquiry and will get back to you soon.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Section -->
          <tr>
            <td style="padding: 28px 20px; width: 100%;">

              <!-- Personal Greeting Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 24px; background-color: #18181b; border-radius: 16px; border: 1px solid #27272a; width: 100%;">
                    <p style="font-size: 17px; font-weight: 700; color: #ffffff; margin: 0 0 14px 0;">
                      Hi ${name},
                    </p>
                    <p style="font-size: 15px; line-height: 1.7; color: #d4d4d8; margin: 0 0 16px 0;">
                      Thank you for taking the time to write to me! I have received your message regarding <strong style="color: #fbbf24;">&ldquo;${subject}&rdquo;</strong> and will carefully review it.
                    </p>
                    <p style="font-size: 15px; line-height: 1.7; color: #d4d4d8; margin: 0;">
                      I typically respond within 24 hours. I look forward to connecting with you soon!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Keep Them Hooked Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; background-color: #121215; border-radius: 16px; border: 1px solid rgba(251, 191, 36, 0.25); border-left: 4px solid #fbbf24; width: 100%;">
                    <span style="font-size: 10px; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-family: monospace; display: block; margin-bottom: 8px;">
                      WHILE YOU WAIT
                    </span>
                    <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">
                      Explore Recent Case Studies &amp; Projects
                    </h2>
                    <p style="font-size: 14px; line-height: 1.65; color: #a1a1aa; margin: 0 0 18px 0;">
                      Feel free to check out my latest work in UX Engineering, Product Design, and Full Stack Web Development on my interactive portfolio.
                    </p>
                    <a href="https://yathishshettigar.site" style="display: inline-block; padding: 12px 22px; background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%); color: #09090b; font-weight: 800; font-size: 13px; text-decoration: none; border-radius: 10px; letter-spacing: 0.5px;">
                      EXPLORE PORTFOLIO &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                <tr>
                  <td style="padding: 0 4px;">
                    <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 4px 0;">
                      Warm regards,
                    </p>
                    <strong style="font-size: 16px; color: #ffffff; font-weight: 700; display: block;">
                      Yathish Shettigar
                    </strong>
                    <strong ><a href="tel:+918296302220" > +91 8296302220</a></strong>
                    <span style="font-size: 12px; color: #fbbf24; font-family: monospace; display: block; margin-top: 2px;">
                      Senior UX / Product Engineer &bull; yathish120420@gmail.com
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section with Automated Mail Notice -->
          <tr>
            <td style="padding: 20px 16px; background-color: #121215; border-top: 1px solid #27272a; text-align: center; width: 100%;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #fbbf24; font-family: monospace; font-weight: 600;">
                &bull; THIS IS AN AUTOMATED CONFIRMATION EMAIL &bull;
              </p>
              <p style="margin: 0; font-size: 10px; color: #71717a; line-height: 1.5;">
                This automated email confirms that your message was successfully received by Yathish Shettigar. Please do not reply directly to this automated notice.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

