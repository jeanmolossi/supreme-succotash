import { PropsWithChildren } from 'react'

export default function LandingLayout({ children }: PropsWithChildren) {
	return (
		<div className="w-full flex flex-col min-h-screen shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] bg-white/10 backdrop-blur">
			<>{children}</>
		</div>
	)
}
