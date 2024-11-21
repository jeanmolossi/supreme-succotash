import { withSession } from '@/lib/auth/session'
import { bankAccounts } from '@/lib/drizzle/bank-account.schema'
import { db } from '@/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = withSession(async ({ user }) => {
	const userBankAccounts = await db.query.bankAccounts.findMany({
		where: eq(bankAccounts.userID, user.id),
		columns: {
			id: true,
			name: true,
		},
	})

	const result = userBankAccounts.map(bankAccount => ({
		...bankAccount,
		_links: {
			self: `/api/bank-accounts/${bankAccount.id}`,
		},
	}))

	return NextResponse.json({
		result,
		meta: {
			total: userBankAccounts.length,
		},
	})
})
