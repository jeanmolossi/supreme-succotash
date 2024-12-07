'use server'

import { createClient } from '@/lib/supabase/server'
import { HOME_DOMAIN } from '@local/utils'
import { redirect } from 'next/navigation'
import { getUserByID } from '../middleware/helpers'

export const getSession = async () => {
	const supabase = await createClient()
	const { data, error } = await supabase.auth.getUser()

	if (error) {
		console.log('get session failed', error)
		return
	}

	return data
}

export const getLoggedUser = async () => {
	const session = await getSession()
	if (!session?.user) {
		redirect(HOME_DOMAIN)
	}

	const user = await getUserByID(session.user)
	if (!user) {
		redirect(HOME_DOMAIN)
	}

	return user
}
