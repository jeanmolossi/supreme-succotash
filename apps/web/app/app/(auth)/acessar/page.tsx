import { Button } from '@repo/ui'
import Link from 'next/link'
import LoginForm from './form'
import { AuthLayout } from '@/components/layout/auth-layout'

export default function Page() {
	return (
		<AuthLayout>
			<LoginForm />

			<p>
				Ainda não possui conta?{' '}
				<Button asChild variant="link" className="text-md">
					<Link href="/cadastro">Cadastre-se</Link>
				</Button>
			</p>
		</AuthLayout>
	)
}
