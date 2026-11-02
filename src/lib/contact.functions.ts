import { env } from 'cloudflare:workers';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { lt, sql } from 'drizzle-orm';
import { db } from '~/db';
import { contactMessages, contactRateLimits } from '~/db/schema';
import {
  type CleanContact,
  type ContactResult,
  composeLetter,
  parseContactInput,
  RATE_LIMIT,
  validateContact,
  windowStartOf
} from '~/lib/contact';
import { ownerEmail } from '~/portfolio.config';

/** A one-way hash, so the database never holds a visitor's address. */
async function senderKey() {
  const ip =
    getRequestHeader('cf-connecting-ip') ??
    getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`contact:${ip}`)
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/** Counts this attempt and reports whether it is over the limit. */
async function overRateLimit(key: string) {
  const now = Date.now();
  const windowStart = windowStartOf(now);
  // One atomic statement, so simultaneous requests can't slip past the count.
  const [row] = await db
    .insert(contactRateLimits)
    .values({ key, windowStart, count: 1 })
    .onConflictDoUpdate({
      target: contactRateLimits.key,
      set: {
        count: sql`CASE WHEN ${contactRateLimits.windowStart} = ${windowStart} THEN ${contactRateLimits.count} + 1 ELSE 1 END`,
        windowStart
      }
    })
    .returning({ count: contactRateLimits.count });
  await db
    .delete(contactRateLimits)
    .where(lt(contactRateLimits.windowStart, windowStart));
  return (row?.count ?? 0) > RATE_LIMIT.max;
}

/** A failed email never fails the letter: it is already in the database. */
async function emailOwner(letter: CleanContact) {
  if (!ownerEmail) return;
  try {
    const { error } = await env.EMAIL.send({
      to: ownerEmail,
      replyTo: letter.email,
      ...composeLetter(letter)
    });
    if (error) console.warn(`[contact] email: ${error.code} ${error.message}`);
  } catch (error) {
    console.warn('[contact] email failed', error);
  }
}

export const sendLetter = createServerFn({ method: 'POST' })
  .validator(parseContactInput)
  .handler(async ({ data }): Promise<ContactResult> => {
    // A filled honeypot gets the same answer as a real letter, and goes nowhere.
    if (data.website) return { status: 'sent' };

    const checked = validateContact(data);
    if (!checked.ok) return { status: 'invalid', errors: checked.errors };

    if (await overRateLimit(await senderKey())) {
      return { status: 'rate-limited' };
    }

    await db.insert(contactMessages).values(checked.value);
    await emailOwner(checked.value);
    return { status: 'sent' };
  });
