'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function loginWithPassword(formData: FormData) {
	const supabase = await createClient()

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		redirect(`/acessar?error=${error.message}`)
	}

	revalidatePath('/', 'layout')
	redirect('/')
}
