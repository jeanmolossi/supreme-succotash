import { Button } from '@local/ui'
import { Home, PlusCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid h-screen grid-cols-1 grid-rows-[1fr,auto] relative">
			<div className="w-full p-2 lg:p-4 overflow-y-auto">
				<div className='max-w-screen-xl mx-auto '>
					{children}
				</div>
			</div>

			<div className="w-full border-t">
				<div className="mx-auto flex gap-2 justify-center py-2">
					<Button size="icon" asChild variant="outline">
						<Link href="/dashboard">
							<Home />
						</Link>
					</Button>

					<Button size="icon" asChild variant="outline">
						<Link href="/key-results">
							<TrendingUp />
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
