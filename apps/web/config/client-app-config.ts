import { APP_NAME } from '@repo/utils'

const clientAppConfig = {
	URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
	ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

	APP_NAME: APP_NAME,
} as const

export type ClientAppConfig = typeof clientAppConfig
export default clientAppConfig
