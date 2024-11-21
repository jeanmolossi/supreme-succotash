import { Config, defineConfig } from 'drizzle-kit'
import serverAppConfig from './config/server-app-config'

const connectionString = serverAppConfig.DATABASE_URL

if (!connectionString) {
	console.log('🔴 Missing DATABASE_URL')
	process.exit(1)
}

export default defineConfig({
	schema: ['./lib/drizzle/*.schema.ts'],
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: connectionString,
	},
}) satisfies Config
