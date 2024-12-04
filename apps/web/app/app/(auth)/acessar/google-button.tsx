'use client'

import GoogleIcon from '@/components/icons/google'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@local/ui'
import { HOME_DOMAIN } from '@local/utils'

export default function GoogleButton() {
	const handleLogin = async () => {
		const supabase = createClient()
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${HOME_DOMAIN}/app/auth/callback`,
			},
		})
	}

	return (
		<div>
			<Button
				type="button"
				variant="outline"
				className="p-4 text-md"
				size="lg"
				onClick={handleLogin}
			>
				<GoogleIcon width={24} />
				Acessar com Google
			</Button>
		</div>
	)
}
