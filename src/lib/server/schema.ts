import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const Users = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').unique(),
	password_hash: text('password_hash')
});

export const Sessions = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => Users.id),
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
