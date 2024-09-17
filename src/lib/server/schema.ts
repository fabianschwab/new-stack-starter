import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey()
});

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const Kudos = sqliteTable('kudos', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }).notNull(),
	from: text('from').notNull(),
	to: text('to').notNull(),
	message: text('message').notNull(),
	date: text('date')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull()
});
