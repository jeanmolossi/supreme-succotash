import { format } from 'date-fns'

export function formatDateInput(date: Date | string): string {
	return format(date, "yyyy-MM-dd'T'HH:mm")
}
