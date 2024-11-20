import clientAppConfig from '@/config/client-app-config'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
	const { URL, ANON_KEY } = clientAppConfig
	return createBrowserClient(URL, ANON_KEY)
}
