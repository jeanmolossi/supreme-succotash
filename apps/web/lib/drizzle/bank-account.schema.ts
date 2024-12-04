import { sql } from 'drizzle-orm'
import {
	decimal,
	pgTable,
	timestamp,
	varchar,
	index,
	unique,
} from 'drizzle-orm/pg-core'
import { users } from './user.schema'

export const bankAccounts = pgTable(
	'bank_accounts',
	{
		id: varchar('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`),
		userID: varchar('userID')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		familyID: varchar('familyID').notNull(),
		name: varchar('name').notNull(),
		initialValue: decimal('initialValue', {
			precision: 20,
			scale: 2,
		})
			.notNull()
			.default('0'),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdateFn(() => new Date()),
		deletedAt: timestamp('deleted_at', { withTimezone: true }),
	},
	table => {
		return {
			bacc_family_idx: index('bacc_family_idx').on(table.familyID),
			bacc_user_idx: index('bacc_user_idx').on(table.userID),
			bacc_created_at_idx: index('bacc_created_at_idx')
				.on(table.createdAt.asc())
				.concurrently(),
			bacc_name_usr: unique('bacc_name_usr').on(table.userID, table.name),
		}
	},
)
