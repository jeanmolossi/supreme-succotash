import { Button } from '@local/ui'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function DashboardLayout({
	children,
	transactions,
	accounts,
}: {
	children: React.ReactNode
	transactions: React.ReactNode
	accounts: React.ReactNode
}) {
	return (
		<div className="relative space-y-3">
			<nav className="sticky shadow-black shadow-md rounded flex items-center gap-4">
				<Button asChild variant={'link'}>
					<Link href="/new-category">
						<PlusCircle /> Categoria
					</Link>
				</Button>
			</nav>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<div>{accounts}</div>
				<div>{transactions}</div>
				<div>{children}</div>
			</div>
		</div>
	)
}