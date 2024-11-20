import { z } from 'zod'
import path from 'path'
import fs, { readFileSync } from 'fs'
import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import template from 'lodash.template'
import { handleError } from '@/utils/handle-error'
import { logger } from '@/utils/logger'
import { preFlight } from '@/utils/get-project-info'
import { ENV_TEMPLATE } from '@/templates/env.template'

const WEB_PATH = '/apps/web'

const initOptionsSchema = z.object({
	cwd: z.string(),
	yes: z.boolean(),
	defaults: z.boolean(),
})

export const init = new Command()
	.name('init')
	.description('initialize your configs')
	.option('-y, --yes', 'skip confirmation prompt', false)
	.option('-d, --defaults', 'use default configuration.', false)
	.option(
		'-c, --cwd <cwd>',
		'the working directory. default to the current directory',
		process.cwd(),
	)
	.action(async opts => {
		try {
			const options = initOptionsSchema.parse(opts)
			const cwd = path.resolve(options.cwd + WEB_PATH)

			// Ensure target directory exists.
			if (!fs.existsSync(cwd)) {
				logger.error(
					`The path ${cwd} does not exists. Please try again.`,
				)
				process.exit(1)
			}

			preFlight(cwd)

			await promptConfig(cwd, options.defaults)
		} catch (error) {
			handleError(error)
		}
	})

export async function promptConfig(cwd: string, defaults = false) {
	const highlight = (text: string) => chalk.cyan(text)
	const targetPath = path.resolve(cwd, '.env.development.local')

	if (fs.existsSync(targetPath)) {
		const option = await prompts([
			{
				type: 'confirm',
				name: 'override',
				message: `.env.development.local already exists, you want ${highlight('override')} it?`,
				initial: false,
			},
		])

		if (!option.override) {
			return
		}

		const spinner = ora(
			`Backuping current .env.development.local...`,
		).start()

		fs.copyFileSync(
			targetPath,
			path.resolve(cwd, `.env.develoment.local.${Date.now()}`),
		)

		spinner.succeed()
	}

	if (defaults) {
		// write to file
		logger.break()
		const spinner = ora(`Writing .env.development.local...`).start()
		const DEFAULT_ENV = readFileSync(
			path.resolve(cwd, '.env.example'),
			'utf8',
		)
		fs.writeFileSync(targetPath, DEFAULT_ENV, 'utf8')
		spinner.succeed()

		return
	}

	logger.break()
	const options = await prompts([
		{
			type: 'text',
			name: 'app_domain',
			message: 'What your app domain?',
			hint: 'example.com',
			initial: 'localhost:3000',
		},
		{
			type: 'text',
			name: 'app_name',
			message: 'What your app name?',
			hint: 'MyApp',
			initial: 'MyApp',
		},
		{
			type: 'text',
			name: 'app_short_domain',
			message: 'What your app short domain?',
			hint: 'eg.io',
			initial: '',
		},
		{
			type: 'text',
			name: 'supabase_url',
			message: 'What your supabase project url?',
			hint: 'https://{{ PROJECT_ID }}.supabase.co',
			initial: 'https://{{ PROJECT_ID }}.supabase.co',
		},
		{
			type: 'text',
			name: 'supabase_anon_key',
			message: 'What your supabase anon key?',
			hint: "It's public you can get it at supabase dashboard",
			initial: '',
		},
		{
			type: 'text',
			name: 'supabase_service_role',
			message: 'What your supabase service role?',
			hint: 'It seems like a token',
			initial: '',
		},
		{
			type: 'text',
			name: 'supabase_jwt_secret',
			message: 'What your supabase jwt secret?',
			hint: 'It a token',
			initial: '',
		},
		{
			type: 'text',
			name: 'database_url',
			message: 'What your postgresql dsn connection url?',
			hint: 'tcp://user:password@host:port',
			initial: '',
		},
		{
			type: 'text',
			name: 'redis_url',
			message: 'What your upstash url?',
			initial: '',
		},
		{
			type: 'text',
			name: 'redis_token',
			message: 'What your upstash token?',
			hint: 'It a token',
			initial: '',
		},
		{
			type: 'text',
			name: 'google_client_id',
			message: 'What your Google Provider Client ID?',
			initial: '',
		},
		{
			type: 'text',
			name: 'google_secret_key',
			message: 'What your Google Provider Secret Key?',
			initial: '',
		},
	])

	const spinner = ora(`Writing your env configs...`).start()
	const compiled = template(ENV_TEMPLATE)
	fs.writeFileSync(targetPath, compiled(options), 'utf8')
	spinner.succeed()
}
