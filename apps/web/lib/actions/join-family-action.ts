'use server'

import { z } from 'zod'
import { authActionClient } from './safe-action'
import { API_DOMAIN } from '@local/utils'
import { STATUS_NO_CONTENT } from '../api/codes'
import { authFetch } from '../api/fetchers/auth-fetch'

export const joinFamilyAction = authActionClient
	.schema(
		z.object({
			family_id: z.string().uuid(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx
		const { family_id } = parsedInput

		try {
			const body = new FormData()
			body.append('family_id', family_id)

			const error = await authFetch(
				`${API_DOMAIN}/users/${user.id}/join`,
				{
					method: 'PATCH',
					body,
				},
			).then(async res => {
				if (res.status !== STATUS_NO_CONTENT) {
					const result = await res.json()
					if ('error' in result) {
						throw new Error(result.error)
					}
				}

				return null
			})

			if (error) {
				throw error
			}
		} catch (error) {
			console.error('Failed to join into family', error)
			throw new Error('Failed to join into family')
		}

		return { success: true }
	})
