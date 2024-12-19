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

	if (!session?.id) {
		throw new Error('Unauthorized: Login required.')
	}

	return next({ ctx: { user: session } })
})

export const authActionClient = actionClient.use(async ({ next }) => {
	const user = await getSession()
	if (!user?.id) {
		throw new Error('Unauthorized: Login requred.')
	}

	return next({
		ctx: {
			user,
		},
	})
})
