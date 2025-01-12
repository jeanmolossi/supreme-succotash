export function formatCurrency(value: string) {
	if (!value) {
		return ''
	}

	const raw = value.replace(/\D/g, '')

	const formatted = (parseInt(raw) / 100).toLocaleString('pt-BR', {
		currency: 'BRL',
		style: 'currency',
	})

	return formatted
}

export function currencyToFloat(value: string): number {
	if (!value) {
		return 0
	}

	const raw = value
		.replace(/\D/g, '')
		.replaceAll('.', '')
		.replaceAll(',', '.')

	return parseFloat(raw)
}

export function centsToIntBRL(value: number): number {
	return Math.floor(value / 100)
}
