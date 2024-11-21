'use client'

import { use } from 'react'
import { createClient } from '../supabase/client'

export default function useSession() {
	const supabase = createClient()
	const user = use(supabase.auth.getSession())

	return { user }
}
