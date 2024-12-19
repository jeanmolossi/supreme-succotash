import NewCategoryForm from './form'
import { groupCategories } from './parsers'
import { fetchCategories } from '@/lib/api/fetchers/fetch-categories'

export default async function NewTransactionPage() {
	const categories = await fetchCategories()

	return (
		<div>
			<h1 className="text-lg font-semibold">
				Adicione uma nova categoria
			</h1>

			<NewCategoryForm categories={groupCategories(categories)} />
		</div>
	)
}
