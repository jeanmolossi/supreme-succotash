import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex min-h-screen w-full justify-center">
			{children}
		</div>
	)
}
