'use server'

import { z } from 'zod'
import { authActionClient } from './safe-action'
import { API_DOMAIN } from '@local/utils'
import { STATUS_OK } from '../api/codes'

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
			const body = new FormData()
			body.append('user_id', user.id)
			body.append('family_id', user.family_id)
			body.append('name', accountName)
			body.append('initial_value', rawValue.toString())

			const error = await fetch(`${API_DOMAIN}/bank-accounts`, {
				method: 'POST',
				body,
			})
				.then(async res => {
					if (res.status !== STATUS_OK) {
						const result = await res.json()
						if ('error' in result) {
							throw new Error(result.error)
						}
					}

					return null
				})
				.catch(err => err)

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
