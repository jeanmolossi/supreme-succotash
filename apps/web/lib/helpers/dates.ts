import { addMinutes, format } from 'date-fns'

export function formatDateInput(date: Date | string): string {
	return format(date, "yyyy-MM-dd'T'HH:mm")
}

export function formatDateInputWithTimezone(date: Date | string): string {
	const offset = new Date(date).getTimezoneOffset()
	return formatDateInput(addMinutes(date, offset))
}
