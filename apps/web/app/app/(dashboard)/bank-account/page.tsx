import NewBankAccountForm from './form'

interface TransactionPageProps {
	searchParams: Promise<{
		id?: string
	}>
}

export default async function TransactionPage({
}: TransactionPageProps) {

	return (
		<div>
			<h1 className="text-lg font-semibold">
				Adicione uma nova conta
			</h1>

			<NewBankAccountForm />
		</div>
	)
}
