import { User } from '@/lib/drizzle/types'
import { createClient } from '@/lib/supabase/server'

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

export async function getUserByID<T extends UserProvided>(
	userProvided: T | null,
): Promise<User | undefined> {
	if (!userProvided) {
		return
	}

	const supabase = await createClient()
	const { error, data } = await supabase
		.from('users')
		.select('*')
		.eq('id', userProvided.id)
		.limit(1)

	if (error) {
		console.log('get-user-by-id helpers fails', error)
		return
	}

	let user = data?.at(0)

	if (!user) {
		const {
			name,
			email,
			confirmed_at: confirmedAt,
			user_metadata: {
				email_confirmed_at: emailConfirmedAt,
				full_name: fullName,
				avatar_url: avatarUrl,
				picture,
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

		const { data, error } = await supabase
			.from('users')
			.insert({
				id: userProvided.id,
				name: name || fullName || 'Desconhecido',
				email,
				emailVerified,
				image: avatarUrl || picture,
			})
			.select()

		if (error) {
			console.log('get user by id fail to create', error)
			return
		}

		user = data.at(0)
	}

	return user
}
