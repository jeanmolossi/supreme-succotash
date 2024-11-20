import { getSession } from './helpers'
import { ApiError, handleApiError } from '@/lib/api/errors'
import { User } from '@/lib/drizzle/types'
import { db } from '@/lib/drizzle/db'
import { users } from '@/lib/drizzle/user.schema'
import { eq } from 'drizzle-orm'
import { getSearchParams } from '@repo/utils'

interface WithSessionHandler {
	({
		request,
		params,
		searchParams,
		user,
	}: {
		request: Request
		params: Record<string, string>
		searchParams: Record<string, string>
		user: User
	}): Promise<Response>
}

export function withSession(handler: WithSessionHandler) {
	return async (
		request: Request,
		{ params = {} }: { params: Record<string, string> | undefined },
	) => {
		try {
			let headers = {}
			const session = await getSession()

			if (!session?.user.id) {
				throw new ApiError({
					code: 'unauthorized',
					message: 'Unauthorized: Login required.',
				})
			}

			const userId = session.user.id

			const user = await db.query.users.findFirst({
				where: eq(users.id, userId),
			})

			if (!user) {
				throw new ApiError({
					code: 'unauthorized',
					message: 'Unauthorized: Login required.',
				})
			}

			// Thats a good idea add a ratelimit
			//
			// const { success, limit, reset, remaining } = await ratelimit(
			// 	10,
			// 	'10 s',
			// ).limit(user.id)
			//
			// headers = {
			// 	'Retry-After': reset.toString(),
			// 	'X-RateLimit-Limit': limit.toString(),
			// 	'X-RateLimit-Remaining': remaining.toString(),
			// 	'X-RateLimit-Reset': reset.toString(),
			// }
			//
			// if (!success) {
			// 	return new Response('Too many requests.', {
			// 		status: 429,
			// 		headers,
			// 	})
			// }

			const searchParams = getSearchParams(request.url)
			return await handler({ request, params, searchParams, user })
		} catch (err) {
			return handleApiError(err)
		}
	}
}
