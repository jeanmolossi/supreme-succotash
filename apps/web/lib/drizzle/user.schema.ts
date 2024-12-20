import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const users = pgTable(
	'users',
	{
		id: varchar('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`),
		name: varchar('name'),
		email: varchar('email').unique(),
		emailVerified: timestamp('emailVerified'),
		image: text('image'),
		source: varchar('source'),
		familyID: varchar('familyId')
			.notNull()
			.default(sql`gen_random_uuid()`),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdateFn(() => new Date()),
	},
	table => {
		return {
			usersSourceIdx: index('users_source_idx').on(table.source),
			usersEmailIdx: index('users_email_idx').on(table.email),
			usersFamilyIdx: index('users_family_idx').on(table.familyID),
		}
	},
)

export const userRoles = pgEnum('user_roles', ['owner', 'member'])
