import { fetchExpenses } from "@/lib/api/fetchers/fetch-categories"
import CategoryCircleChart from "./category-circle-chart"

export default async function ExpensesPage() {
	const { expenses, meta } = await fetchExpenses()

	return (
		<div>
			<CategoryCircleChart expenses={expenses} meta={meta} />
		</div>
	)
}
