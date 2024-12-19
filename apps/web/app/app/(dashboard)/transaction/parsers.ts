import { Category } from '@/lib/types/entities/category'

export interface GroupedCategory extends Category {
	sub_categories: Category[]
}

export function groupCategories(categories: Category[]): GroupedCategory[] {
	const rootCategories: Category[] = []
	const descendantCategories = new Map<string, Category[]>([])

	for (let idx = 0; idx < categories.length; idx++) {
		const category = categories[idx]
		if (!category.parent_id) {
			rootCategories.push(category)
			continue
		}

		const currentCategories =
			descendantCategories.get(category.parent_id) || []

		currentCategories.push(category)

		descendantCategories.set(category.parent_id, currentCategories)
	}

	const groupedCategories = rootCategories.reduce((group, category) => {
		const descendants = descendantCategories.get(category.id) || []

		group.push({
			...category,
			sub_categories: descendants,
		})

		return group
	}, [] as GroupedCategory[])

	return groupedCategories
}
