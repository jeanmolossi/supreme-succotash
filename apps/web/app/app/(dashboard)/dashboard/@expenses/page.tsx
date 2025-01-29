import {
	fetchCategories,
	fetchExpenses,
} from '@/lib/api/fetchers/fetch-categories'
import CategoryCircleChart from './category-circle-chart'
import DateRangePicker from './date-range-picker'
import { addMonths, endOfDay, setDate, startOfDay, subMonths } from 'date-fns'

interface ExpensesPageParams {
	searchParams: Promise<{
		category_id?: string
		from?: string
		until?: string
	}>
}

export default async function ExpensesPage({
	searchParams,
}: ExpensesPageParams) {
	let [{ category_id = '', from = '', until = '' }, categories] =
		await Promise.all([
			searchParams,
			fetchCategories({ root_categories: 1 }),
		])

	const turnMonthDate = 28

	const today = new Date()
	let fromDate: Date | undefined, untilDate: Date | undefined

	const nextMonth = today.getDate() >= turnMonthDate ? 1 : 0

	if (from) {
		fromDate = startOfDay(from)
	} else {
		fromDate = startOfDay(
			subMonths(setDate(today, turnMonthDate), 1 - nextMonth),
		)
	}

	if (until) {
		untilDate = endOfDay(until)
	} else {
		untilDate = addMonths(
			endOfDay(setDate(today, turnMonthDate)),
			nextMonth,
		)
	}

	const { expenses, meta } = await fetchExpenses({
		just_root_categories: category_id ? 0 : 1,
		category_id,
		from: fromDate,
		until: untilDate,
	})

	return (
		<div>
			<DateRangePicker
				from={fromDate.toISOString()}
				to={untilDate.toISOString()}
			/>
			<CategoryCircleChart
				expenses={expenses}
				meta={meta}
				categories={categories}
			/>
		</div>
	)
}
