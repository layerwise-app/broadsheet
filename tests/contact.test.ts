import { describe, expect, it } from 'vitest';
import {
  composeLetter,
  escapeHtml,
  parseContactInput,
  RATE_LIMIT,
  validateContact,
  windowStartOf
} from '~/lib/contact';

const letter = {
  name: 'Ada Reis',
  email: 'ada@example.com',
  message: 'A redesign, on the paper we have.',
  website: ''
};

describe('contact rules', () => {
  it('accepts a complete letter and tidies it', () => {
    const result = validateContact({ ...letter, name: '  Ada \n  Reis ' });
    expect(result).toEqual({
      ok: true,
      value: { name: 'Ada Reis', email: 'ada@example.com', message: letter.message }
    });
  });

  it('reports every missing field', () => {
    const result = validateContact({ name: '', email: '', message: '', website: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(['email', 'message', 'name']);
    }
  });

  it.each(['nope', 'a@b', 'a b@c.de', '@c.de'])('rejects the address %s', (email) => {
    expect(validateContact({ ...letter, email }).ok).toBe(false);
  });

  it('rejects letters that are too short or too long', () => {
    expect(validateContact({ ...letter, message: 'short' }).ok).toBe(false);
    expect(validateContact({ ...letter, message: 'x'.repeat(5001) }).ok).toBe(false);
  });

  it('turns anything the browser sends into strings', () => {
    expect(parseContactInput(null)).toEqual({ name: '', email: '', message: '', website: '' });
    expect(parseContactInput({ name: 42, website: 'bot' })).toMatchObject({ name: '', website: 'bot' });
  });

  it('escapes the sender’s text in the email', () => {
    const { html, subject } = composeLetter({
      name: 'Ada',
      email: 'ada@example.com',
      message: '<script>alert(1)</script>'
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain(escapeHtml('<script>'));
    expect(subject).not.toContain('\n');
  });

  it('keeps one window for a whole hour', () => {
    const start = windowStartOf(RATE_LIMIT.windowMs * 400 + 5);
    expect(windowStartOf(start + RATE_LIMIT.windowMs - 1)).toBe(start);
    expect(windowStartOf(start + RATE_LIMIT.windowMs)).toBe(start + RATE_LIMIT.windowMs);
  });
});
