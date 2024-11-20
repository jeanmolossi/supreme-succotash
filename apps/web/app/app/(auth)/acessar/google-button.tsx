'use client'

import GoogleIcon from '@/components/icons/google'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@repo/ui'
import { APP_DOMAIN } from '@repo/utils'

export default function GoogleButton() {
	const handleLogin = async () => {
		const supabase = createClient()
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${APP_DOMAIN}/auth/callback`,
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
