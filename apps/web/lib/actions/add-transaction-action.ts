'use server'

import { z } from 'zod'
import { authActionClient } from './safe-action'
import { API_DOMAIN } from '@local/utils'
import { parseISO } from 'date-fns'

export const addTransactionAction = authActionClient
	.schema(
		z.object({
			bank_account_id: z
				.string()
				.uuid('A conta selecionada deve ser válida'),
			type: z.enum(['outcome', 'income']),
			amount: z.string().min(7, 'Digite o valor da transação'),
			category_id: z.string().uuid('Selecione uma categoria válida'),
			transacted_at: z.string().length(16),
			description: z
				.string()
				.min(1, 'Fornceça uma descrição para a transação'),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx
		const {
			bank_account_id,
			type,
			amount,
			description,
			category_id,
			transacted_at,
		} = parsedInput

		try {
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
			body.append('category_id', category_id)
			body.append('description', description)
			body.append('transacted_at', parseISO(transacted_at).toISOString())

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
