import { sql } from 'drizzle-orm'
import {
	boolean,
	check,
	decimal,
	index,
	pgEnum,
	pgTable,
	smallint,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { bankAccounts } from './bank-account.schema'
import { users } from './user.schema'

export const cardTypes = pgEnum('card_types', ['credit', 'debit'])

export const cards = pgTable(
	'cards',
	{
		id: varchar('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`),
		name: varchar('name'),
		familyID: varchar('family_id')
			.notNull()
			.references(() => users.familyID, { onDelete: 'cascade' }),
		cardType: cardTypes('card_type').notNull().default('debit'),
		limit: decimal('limit', { precision: 20, scale: 2 }),
		bankAccount: varchar('bank_acc_id')
			.notNull()
			.references(() => bankAccounts.id, { onDelete: 'cascade' }),
		invoice_close_day: smallint('invoice_close_day').notNull(),
	},
	table => {
		return {
			invoice_close_day_check: check(
				'invoice_close_day',
				sql`${table.invoice_close_day} BETWEEN 1 AND 31`,
			),
			card_family_idx: index('card_family_idx')
				.on(table.familyID)
				.concurrently(),
			card_bank_acc_idx: index('card_bank_acc_idx')
				.on(table.bankAccount)
				.concurrently(),
		}
	},
)

export const invoices = pgTable(
	'invoices',
	{
		id: varchar('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`),
		cardID: varchar('card_id')
			.notNull()
			.references(() => cards.id),
		familyID: varchar('family_id')
			.notNull()
			.references(() => users.familyID, { onDelete: 'cascade' }),
		closed: boolean('closed').notNull().default(false),
		invoiceOpenedAt: timestamp('invoice_opened_at', {
			withTimezone: true,
		}).notNull(),
		invoiceClosesAt: timestamp('invoice_closes_at', {
			withTimezone: true,
		}).notNull(),
	},
	table => {
		return {
			closed_invoices_idx: index('closed_invoices_idx')
				.on(table.closed.desc())
				.concurrently(),
			invoice_dates_idx: index('invoice_dates_idx')
				.on(table.invoiceOpenedAt.desc(), table.invoiceClosesAt.desc())
				.concurrently(),
			invoice_family_idx: index('invoice_family_idx')
				.on(table.familyID)
				.concurrently(),
		}
	},
)
