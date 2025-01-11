import serverAppConfig from '@/config/server-app-config'

export async function sleep(ms: number): Promise<void> {
	if (serverAppConfig.NODE_ENV === 'production') return Promise.resolve()
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function someColor() {
	return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
}

export function toBRL(value: number) {
	return new Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
		style: 'currency'
	}).format(value)
}
