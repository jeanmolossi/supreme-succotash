'use server'

import { z } from 'zod'
import { authActionClient } from './safe-action'
import { bankAccounts } from '../drizzle/bank-account.schema'
import { createClient } from '../supabase/server'

export const addBankAccountAction = authActionClient
	.schema(
		z.object({
			accountName: z.string().min(1),
			initialValue: z.string().min(4),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { accountName, initialValue } = parsedInput
		const { user } = ctx

		const rawValue = parseFloat(
			initialValue
				.replace(/[^\d,.-]/g, '')
				.replace(/\./g, '')
				.replace(/,/g, '.'),
		)

		try {
			const supabase = await createClient()
			const { error } = await supabase
				.from('bank_accounts')
				.insert({
					userID: user.id,
					familyID: user.familyId,
					name: accountName,
					initialValue: rawValue,
				})
				.select()

			if (error) {
				console.error(error)
				throw error
			}
		} catch (error) {
			console.error('Failed to add bank account', error)
			throw new Error('Failed to add bank account')
		}

		return { success: true }
	})
