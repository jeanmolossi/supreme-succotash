import { Wordmark } from '@local/ui'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="relative flex flex-col items-center">
			<Wordmark className="mt-6 h-8" />

			<div className="mt-8 flex w-full flex-col items-center px-3 pb-16 md:mt-20 lg:px-8">
				<>{children}</>
			</div>
		</div>
	)
}
