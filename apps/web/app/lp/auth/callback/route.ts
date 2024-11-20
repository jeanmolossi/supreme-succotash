import { APP_DOMAIN } from '@local/utils'
import { NextRequest, NextResponse } from 'next/server'

/**
 * That route is an workaround to forward subdomain redirects locally
 * */
export async function GET(request: NextRequest) {
	const url = new URL(request.url)

	const code = url.searchParams.get('code')
	const redirTo = url.searchParams.get('redir_to') || '/' // next é a url de redirect (quando existe usamos ela)

	console.log({ url, headers: request.headers })

	return NextResponse.redirect(
		`${APP_DOMAIN}/auth/callback?code=${code}&redir_to=${redirTo}`,
		{
			headers: request.headers,
		},
	)
}
