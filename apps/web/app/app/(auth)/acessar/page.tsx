import Link from 'next/link'
import { ArrowLeftCircle } from 'lucide-react'
import { HOME_DOMAIN } from '@local/utils'
import { Button } from '@local/ui'
import { AuthLayout } from '@/components/layout/auth-layout'
import LoginForm from './form'

export default function Page() {
	return (
		<AuthLayout>
			<LoginForm />

			<div className="flex flex-col gap-4 items-center mt-8">
				<p>Acesse, simple e rápido.</p>

				<Button asChild variant="link">
					<Link href={`${HOME_DOMAIN}`}>
						<ArrowLeftCircle />
						Ou, volte para a tela inicia
					</Link>
				</Button>
			</div>
		</AuthLayout>
	)
}
