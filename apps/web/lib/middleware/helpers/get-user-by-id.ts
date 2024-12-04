import { STATUS_CREATED, STATUS_CONFLICT } from '@/lib/api/codes'
import { CreateUser, User } from '@/lib/types/entities/user'
import { API_DOMAIN } from '@local/utils'

type UserProvided = {
	id: string
	name?: string
	email?: string
	confirmed_at?: string
	user_metadata: {
		avatar_url?: string
		full_name?: string
		email_confirmed_at?: string
		picture?: string
	}
}

async function fetchUserByID(
	userID: string,
): Promise<[User, null] | [null, Error]> {
	const response = await fetch(`${API_DOMAIN}/users/${userID}`, {
		next: {
			revalidate: 300,
		},
	})
		.then(async res => {
			const result = await res.json()
			if (!res.ok) {
				return null
			}
			return result
		})
		.then(res => [res, null] as [User, null])
		.catch(err => {
			console.error({
				error: err,
				message: 'failed to parse user response',
			})
			return [null, err] as [null, Error]
		})

	return response
}

async function createUser(
	user: CreateUser,
): Promise<[User, null] | [null, Error]> {
	const form = new FormData()
	Object.entries(user).forEach(([prop, value]: [string, any]) => {
		form.append(prop, value)
	})

	const response = await fetch(`${API_DOMAIN}/users`, {
		method: 'POST',
		body: form,
	})
		.then(async res => {
			if (![STATUS_CREATED, STATUS_CONFLICT].includes(res.status)) {
				const result = await res.json()
				if ('error' in result) {
					throw new Error(result.error)
				}
			}

			return res.json()
		})
		.then((res: User) => [res, null] as [User, null])
		.catch((err: Error) => {
			console.error({
				error: err,
				message: 'failed to create user',
			})
			return [null, err] as [null, Error]
		})

	return response
}

export async function getUserByID<T extends UserProvided>(
	userProvided: T | null,
): Promise<User | undefined> {
	if (!userProvided) {
		return
	}

	const [data, error] = await fetchUserByID(userProvided.id)
	if (error) {
		console.error('get-user-by-id helpers fails', error)
		return
	}

	let user = data

	if (!user) {
		const {
			name,
			email,
			confirmed_at: confirmedAt,
			user_metadata: {
				email_confirmed_at: emailConfirmedAt,
				full_name: fullName,
			},
		} = userProvided

		let emailVerified: Date | null = null
		if (emailConfirmedAt) {
			emailVerified = new Date(emailConfirmedAt)
		}

		if (!emailVerified && confirmedAt) {
			emailVerified = new Date(confirmedAt)
		}
		if (!email) {
			return
		}

		const [data, error] = await createUser({
			id: userProvided.id,
			name: name || fullName || 'Desconhecido',
			email,
			email_verified_at: emailVerified?.toISOString(),
			source: 'google_provider',
		})

		if (error) {
			return
		}

		user = data
	}

	return user
}
