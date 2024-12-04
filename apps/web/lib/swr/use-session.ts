'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '../supabase/client'
import { API_DOMAIN } from '@local/utils'
import { User } from '@/lib/types/entities/user'

const supabase = createClient()

export default function useSession() {
	const [session, setSession] = useState<any>(null)
	const [user, setUser] = useState<User | null>(null)

	const fetchUser = useCallback(
		async (usrID?: string) => {
			console.log('FETCHING USER', session.user, usrID)
			if (!session?.user.id && !usrID) {
				return
			}

			const userID = session?.user.id || usrID

			if (!userID) {
				return
			}

			await fetch(`${API_DOMAIN}/users/${userID}`).then(async res => {
				if (res.ok) {
					setUser(await res.json())
					console.log('USER DEFINED!')
				}
			})
		},
		[session],
	)

	useEffect(() => {
		console.log('LISTENING SESSION')
		supabase.auth.getSession().then(async ({ data }) => {
			setSession(data?.session || null)
			await fetchUser(data?.session?.user.id)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			setSession(session)
			await fetchUser(session?.user.id)
		})

		return () => subscription.unsubscribe()
	}, [])

	return { user }
}
