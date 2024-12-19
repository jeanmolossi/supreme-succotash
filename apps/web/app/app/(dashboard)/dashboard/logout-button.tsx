import { Button } from '@local/ui'
import { HOME_DOMAIN } from '@local/utils'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Logout() {
	return (
		<Button asChild variant={'destructive'} className="m-2">
			<Link href={`${HOME_DOMAIN}/api/auth/v1/logout`}>
				<LogOut size={16} />
				Sair
			</Link>
		</Button>
	)
}
