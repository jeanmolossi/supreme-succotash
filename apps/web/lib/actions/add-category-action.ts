'use server'

import { z } from 'zod'
import { authActionClient } from './safe-action'
import { API_DOMAIN } from '@local/utils'

export const addCategoryAction = authActionClient
	.schema(
		z.object({
			parent_id: z.string().optional(),
			name: z.string().min(1, 'Fornceça uma descrição para a categoria'),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx
		const { name, parent_id } = parsedInput

		try {
			const body = new FormData()
			body.append('user_id', user.id)
			body.append('family_id', user.family_id)
			body.append('name', name)

			if (parent_id) {
				body.append('parent_id', parent_id)
			}

			const error = await fetch(`${API_DOMAIN}/categories`, {
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
			console.error('Failed to add a category', error)
			throw new Error('Failed to add a category')
		}

		return { success: true }
	})
