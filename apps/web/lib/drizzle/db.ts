import serverAppConfig from '@/config/server-app-config'
import * as usersSchema from './user.schema'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = serverAppConfig.DATABASE_URL

if (!connectionString) {
	console.log('🔴 missing database url')
	process.exit(1)
}

const client = postgres(connectionString, { prepare: false, idle_timeout: 5 })

const schema = {
	...usersSchema,
}

export const db = drizzle(client, { schema })

// @ts-ignore
async function applySchema() {
	// @ts-ignore
	const { migrate } = await import('drizzle-orm/node-postgres/migrator')

	try {
		console.log('🔵 Applying migrations...')
		await migrate(db, { migrationsFolder: 'migrations' })
		console.log('🟢 Schema migration done!')
	} catch (error) {
		console.log('🔴 Error trying to migrate: ', error)
	}
}

applySchema()
