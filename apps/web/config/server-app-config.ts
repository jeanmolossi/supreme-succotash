if (process.env.IS_NODE === '1') {
	const dotenv = require('dotenv')
	dotenv.config({ path: '.env.development.local' })
}

const serverAppConfig = {
	NODE_ENV: process.env.NODE_ENV || 'development',

	SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',

	DATABASE_URL: process.env.DATABASE_URL || '',

	REDIS_URL: process.env.REDIS_URL || '',
	REDIS_TOKEN: process.env.REDIS_TOKEN || '',
} as const

export type ServerAppConfig = typeof serverAppConfig
export default serverAppConfig
