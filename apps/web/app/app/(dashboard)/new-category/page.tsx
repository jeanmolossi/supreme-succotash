import { API_DOMAIN } from '@local/utils'
import NewCategoryForm from './form'
import { getLoggedUser } from '@/lib/auth/helpers'
import { groupCategories } from './parsers'

async function getFamilyCategories(familyID: string) {
	return await fetch(`${API_DOMAIN}/categories?family_id=${familyID}`).then(
		res => res.json(),
	)
}

export default async function NewTransactionPage() {
	const user = await getLoggedUser()
	const categories = await getFamilyCategories(user.family_id)

	return (
		<div>
			<h1 className="text-lg font-semibold">
				Adicione uma nova categoria
			</h1>

			<NewCategoryForm categories={groupCategories(categories)} />
		</div>
	)
}
