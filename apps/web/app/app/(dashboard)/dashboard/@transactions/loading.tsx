import { LoaderCircle } from 'lucide-react'

export default function LoadingTransactions() {
	return (
		<div className="grid grid-cols-1 place-items-center w-full min-h-36 border rounded animate-slide-up-fade">
			<LoaderCircle className="animate-spin" />
		</div>
	)
}
