import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Letters sent through the contact form. The owner reads them on the Database
 * page in Layerwise, in the `contact_messages` table.
 */
export const contactMessages = sqliteTable(
  'contact_messages',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date())
  },
  (table) => [index('contact_messages_created_at_idx').on(table.createdAt)]
);

/**
 * Fixed-window counters behind the contact form's rate limit. `key` is a hash
 * of the sender's IP address, so no address is ever stored.
 */
export const contactRateLimits = sqliteTable(
  'contact_rate_limits',
  {
    key: text('key').notNull().primaryKey(),
    windowStart: integer('window_start').notNull(),
    count: integer('count').notNull().default(0)
  },
  (table) => [index('contact_rate_limits_window_idx').on(table.windowStart)]
);
