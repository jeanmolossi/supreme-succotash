'use server'

import { z } from 'zod'
import { authActionClient } from './safe-action'
import { API_DOMAIN } from '@local/utils'

export const addTransactionAction = authActionClient
	.schema(
		z.object({
			bank_account_id: z
				.string()
				.uuid('A conta selecionada deve ser válida'),
			type: z.enum(['outcome', 'income']),
			amount: z.string().min(7, 'Digite o valor da transação'),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx
		const { bank_account_id, type, amount } = parsedInput

		try {
			const categoryPromise = fetchFirstCategoryID(user.family_id)

			const rawValue = parseFloat(
				amount
					.replace(/[^\d,.-]/g, '')
					.replace(/\./g, '')
					.replace(/,/g, '.'),
			)

			const body = new FormData()
			body.append('user_id', user.id)
			body.append('family_id', user.family_id)
			body.append('bank_account_id', bank_account_id)
			body.append('type', type)
			body.append('amount', rawValue.toString())
			body.append('category_id', await categoryPromise)
			body.append('description', 'Primeira transação')

			const error = await fetch(`${API_DOMAIN}/transactions`, {
				method: 'POST',
				body,
			})
				.then(async res => {
					if (!res.ok) {
						const result = await res.json()
						if ('error' in result) {
							throw new Error(result.error)
						}

						throw new Error(JSON.stringify(result))
					}

					return null
				})
				.catch(err => err)

			if (error) {
				throw error
			}
		} catch (error) {
			console.error('Failed to add a transaction', error)
			throw new Error('Failed to add a transaction')
		}

		return { success: true }
	})

const fetchFirstCategoryID = async (familyID: string) => {
	return fetch(`${API_DOMAIN}/categories?family_id=${familyID}`)
		.then(res => res.json())
		.then(res => (Array.isArray(res) ? res.at(0) : null))
		.then(res => (!!res ? res.id : null))
}
