'use server'

import { z } from 'zod'
import { authUserActionClient } from './safe-action'

export const addBankAccountAction = authUserActionClient
	.schema(
		z.object({
			accountName: z.string().min(1),
			initialValue: z.string().min(4),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { accountName, initialValue } = parsedInput

		try {
			console.log({ userID: ctx.user.id, accountName, initialValue })
		} catch (error) {
			throw new Error('Failed to add bank account')
		}

		return { success: true }
	})
