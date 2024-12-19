import { Button } from '@local/ui'
import { Home, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-1 relative">
			<div className="max-w-screen-xl mx-auto w-full p-2 lg:p-4">
				{children}
			</div>

			<div className="absolute bottom-0 w-full">
				<div className="mx-auto flex gap-2 justify-center py-4">
					<Button size="icon" asChild variant="outline">
						<Link href="/dashboard">
							<Home />
						</Link>
					</Button>

					<Button size="icon" asChild>
						<Link href="/transaction">
							<PlusCircle />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
