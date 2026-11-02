// The contact form's rules. Pure functions, so they run in tests without a
// database. The server function in `contact.functions.ts` applies them.

export const LIMITS = { name: 120, email: 254, message: 5000 };
export const MESSAGE_MIN = 10;

/** Accepted letters per sender, per window. */
export const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  /** The honeypot. People never see it; bots tend to fill it. */
  website: string;
};

export type ContactField = 'name' | 'email' | 'message';
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactResult =
  | { status: 'sent' }
  | { status: 'invalid'; errors: ContactErrors }
  | { status: 'rate-limited' };

const asText = (value: unknown) => (typeof value === 'string' ? value : '');

/** Accepts anything the browser sends and returns four strings. */
export function parseContactInput(input: unknown): ContactInput {
  const data = (input ?? {}) as Record<string, unknown>;
  return {
    name: asText(data.name),
    email: asText(data.email),
    message: asText(data.message),
    website: asText(data.website)
  };
}

export type CleanContact = { name: string; email: string; message: string };

export function validateContact(
  input: ContactInput
):
  | { ok: true; value: CleanContact }
  | { ok: false; errors: ContactErrors } {
  // Names and addresses are single lines; they end up in an email subject.
  const name = input.name.replace(/\s+/g, ' ').trim();
  const email = input.email.trim();
  const message = input.message.replace(/\r\n/g, '\n').trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = 'Please sign your letter.';
  else if (name.length > LIMITS.name)
    errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = 'An address is needed for the reply.';
  else if (
    email.length > LIMITS.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  )
    errors.email = 'That address does not look complete.';

  if (!message) errors.message = 'The letter is empty.';
  else if (message.length < MESSAGE_MIN)
    errors.message = `A letter needs at least ${MESSAGE_MIN} characters.`;
  else if (message.length > LIMITS.message)
    errors.message = `Letters run to ${LIMITS.message} characters at most.`;

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, value: { name, email, message } };
}

/** The start of the fixed window that `now` falls in. */
export function windowStartOf(now: number, windowMs = RATE_LIMIT.windowMs) {
  return Math.floor(now / windowMs) * windowMs;
}

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/** The email to the owner. Values are escaped for the HTML part. */
export function composeLetter({ name, email, message }: CleanContact) {
  return {
    subject: `Letter to the editor from ${name}`.slice(0, 200),
    text: `${name} <${email}> wrote:\n\n${message}\n\nReply to this email to answer them.\n`,
    html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt; wrote:</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>Reply to this email to answer them.</p>`
  };
}
