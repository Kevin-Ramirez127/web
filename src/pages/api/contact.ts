import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Receives the contact form JSON. Needs RESEND_API_KEY + CONTACT_TO_EMAIL
// (see .env.example). Server-rendered (see astro.config.mjs adapter).
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const name = typeof data.name === 'string' ? data.name : '';
  const email = typeof data.email === 'string' ? data.email : '';
  const subject = typeof data.subject === 'string' ? data.subject : '';
  const message = typeof data.message === 'string' ? data.message : '';
  const website = typeof data.website === 'string' ? data.website : '';

  // Honeypot: bots fill it — fake success so they learn nothing.
  if (website) return Response.json({ ok: true });

  if (![name, email, subject, message].every((f) => f.trim() !== '')) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY as string | undefined;
  const to = import.meta.env.CONTACT_TO_EMAIL as string | undefined;
  const from = (import.meta.env.CONTACT_FROM_EMAIL as string | undefined) ?? 'portfolio@resend.dev';
  if (!apiKey || !to) {
    return Response.json({ error: 'Email not configured' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });
    if (error) return Response.json({ error: 'Send failed' }, { status: 500 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Send failed' }, { status: 500 });
  }
};
