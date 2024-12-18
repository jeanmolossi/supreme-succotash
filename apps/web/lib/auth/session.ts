import { getLoggedUser } from './helpers'
import { ApiError, handleAndReturnErrorResponse } from '@/lib/api/errors'
import { getSearchParams } from '@local/utils'
import { User } from '@/lib/types/entities/user'

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
		{ params: paramsPromise }: { params: Promise<Record<string, string>> },
	) => {
		const params = await paramsPromise

		try {
			let headers = {}
			const user = await getLoggedUser()

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
			return handleAndReturnErrorResponse(err)
		}
	}
}
