const PORT = process.env.PORT || 3000
const PROXY_PORT = process.env.PROXY_PORT || 8080

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME

const IS_VERCEL_PROD_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
const IS_VERCEL_PREVIEW_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

export const SHORT_DOMAIN =
	process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN || `localhost:${PORT}`

export const HOME_DOMAIN =
	IS_VERCEL_PROD_ENV || IS_VERCEL_PREVIEW_ENV
		? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: `http://${process.env.NEXT_PUBLIC_APP_DOMAIN}`

export const APP_HOSTNAMES = new Set([
	`app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`app.localhost:${PORT}`,
])

export const APP_DOMAIN = IS_VERCEL_PROD_ENV
	? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
	: IS_VERCEL_PREVIEW_ENV
		? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: `http://localhost:${PROXY_PORT}`

export const API_HOSTNAMES = new Set([
	`api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`api-staging.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`api.${SHORT_DOMAIN}`,
	`api.localhost:${PORT}`,
])

export const API_DOMAIN = IS_VERCEL_PROD_ENV
	? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}/api`
	: IS_VERCEL_PREVIEW_ENV
		? `https://api-staging.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: `http://nginx:${PROXY_PORT}/api`

export const LP_HOSTNAMES = new Set([
	`lp.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`localhost:${PORT}`,
])

export const LP_DOMAIN = IS_VERCEL_PROD_ENV
	? `https://lp.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
	: IS_VERCEL_PREVIEW_ENV
		? `https://preview-lp.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: `http://localhost:${PORT}`
