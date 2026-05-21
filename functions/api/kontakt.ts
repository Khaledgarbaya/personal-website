interface Env {
  RESEND_API_KEY: string;
}

interface CFContext {
  request: Request;
  env: Env;
}

const RECIPIENT = "kontakt@khaledgarbaya.net";
const FROM = "Kontaktformular <kontakt@mail.khaledgarbaya.net>";

const BRANCHEN_LABELS: Record<string, string> = {
  handwerk: "Handwerk",
  gastronomie: "Gastronomie",
  verein: "Verein",
  andere: "Andere",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function redirect(to: string): Response {
  return new Response(null, { status: 303, headers: { Location: to } });
}

export const onRequestPost = async ({ request, env }: CFContext): Promise<Response> => {
  if (!env.RESEND_API_KEY) {
    return redirect("/de/kontakt?status=error");
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect("/de/kontakt?status=error");
  }

  // Honeypot: bots fill every field, humans never see this one.
  if (String(form.get("website") || "").trim() !== "") {
    return redirect("/de/kontakt?status=ok");
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const branche = String(form.get("branche") || "").trim();
  const nachricht = String(form.get("nachricht") || "").trim();

  if (name.length < 2 || name.length > 100) return redirect("/de/kontakt?status=error");
  if (!isValidEmail(email)) return redirect("/de/kontakt?status=error");
  if (nachricht.length < 10 || nachricht.length > 5000) return redirect("/de/kontakt?status=error");

  const brancheLabel = BRANCHEN_LABELS[branche] || "Unbekannt";

  const subject = `Neue Anfrage (${brancheLabel}) — ${name}`;

  const textBody =
    `Neue Anfrage über das Kontaktformular:\n\n` +
    `Name: ${name}\n` +
    `E-Mail: ${email}\n` +
    `Branche: ${brancheLabel}\n\n` +
    `Nachricht:\n${nachricht}\n`;

  const htmlBody = `
<p><strong>Neue Anfrage über das Kontaktformular</strong></p>
<p>
  <strong>Name:</strong> ${escapeHtml(name)}<br>
  <strong>E-Mail:</strong> ${escapeHtml(email)}<br>
  <strong>Branche:</strong> ${escapeHtml(brancheLabel)}
</p>
<p><strong>Nachricht:</strong></p>
<p>${escapeHtml(nachricht).replace(/\n/g, "<br>")}</p>
`.trim();

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: RECIPIENT,
      reply_to: email,
      subject,
      text: textBody,
      html: htmlBody,
    }),
  });

  if (!resendResponse.ok) {
    return redirect("/de/kontakt?status=error");
  }

  return redirect("/de/kontakt?status=ok");
};
