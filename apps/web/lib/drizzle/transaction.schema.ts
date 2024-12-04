import { sql } from 'drizzle-orm'
import {
	decimal,
	index,
	pgEnum,
	pgTable,
	timestamp,
	varchar,
	check,
} from 'drizzle-orm/pg-core'
import { users } from './user.schema'
import { bankAccounts } from './bank-account.schema'
import { invoices } from './card.schema'

export const transactionTypes = pgEnum('transaction_types', [
	'income',
	'outcome',
	'credit',
])

export const transactions = pgTable(
	'transactions',
	{
		id: varchar('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`),
		txType: transactionTypes('txType').notNull().default('outcome'),
		value: decimal('value', { precision: 20, scale: 2 }).notNull(),
		userID: varchar('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		bankAccount: varchar('bank_acc_id').references(() => bankAccounts.id, {
			onDelete: 'set null',
		}),
		familyID: varchar('family_id').notNull(),
		invoiceID: varchar('invoice_id').references(() => invoices.id, {
			onDelete: 'set null',
		}),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		transactionedAt: timestamp('transactioned_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		dueAt: timestamp('due_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	table => {
		return {
			tx_group: index('tx_group').on(table.userID, table.familyID),
			tx_values: index('tx_values').on(table.value),
			tx_types: index('tx_types').on(table.txType.desc()).concurrently(),
			tx_created_at: index('tx_created_at')
				.on(table.createdAt.desc())
				.concurrently(),
		}
	},
)
