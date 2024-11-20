import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<div className="relative flex min-h-screen w-full justify-center">
			<>{children}</>
		</div>
	)
}
