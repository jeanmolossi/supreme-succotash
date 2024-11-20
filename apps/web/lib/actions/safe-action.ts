import { createSafeActionClient } from 'next-safe-action'
import { getSession } from '../auth/helpers'

export const actionClient = createSafeActionClient({
	handleServerError(error, utils) {
		if (error instanceof Error) {
			return {
				serverError: error.message,
			}
		}

		return {
			serverError: 'An unknown error occurred.',
		}
	},
})

export const authUserActionClient = actionClient.use(async ({ next }) => {
	const session = await getSession()

	if (!session?.user.id) {
		throw new Error('Unauthorized: Login required.')
	}

	return next({ ctx: { user: session.user } })
})
