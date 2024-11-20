import serverAppConfig from '@/config/server-app-config'

export async function sleep(ms: number): Promise<void> {
	if (serverAppConfig.NODE_ENV === 'production') return Promise.resolve()
	return new Promise(resolve => setTimeout(resolve, ms))
}
