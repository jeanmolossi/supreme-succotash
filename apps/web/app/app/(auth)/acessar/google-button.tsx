'use client'

import GoogleIcon from '@/components/icons/google'
import { Button } from '@local/ui'

export default function GoogleButton() {
	const handleLogin = async () => {
		const authUrl = `/api/auth/v1/google?redir_to=/app/onboarding?welcome`
		window.location.assign(authUrl)
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
