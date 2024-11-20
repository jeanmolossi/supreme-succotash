import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@local/ui'
import { APP_DOMAIN } from '@local/utils'
import Image from 'next/image'
import Link from 'next/link'
import type { JSX } from 'react'

const LOGIN_PAGE = `${APP_DOMAIN}/acessar`

export default function Page(): JSX.Element {
	return (
		<main
			className={
				'grid grid-cols-1 gap-4 place-content-center min-h-screen p-8 max-w-screen-sm mx-auto'
			}
		>
			<div className="col-span-2">
				<Image
					src="/logo.svg"
					width={160}
					height={32}
					alt="Your app logo"
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Gerencie as finanças da sua família</CardTitle>
					<CardDescription>
						Crie uma conta agora mesmo, convide seus familiares e
						controle suas finanças
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Button asChild>
						<Link href={LOGIN_PAGE}>Acessar agora!</Link>
					</Button>
				</CardContent>
			</Card>
		</main>
	)
}
