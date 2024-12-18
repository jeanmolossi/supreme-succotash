import serverAppConfig from '@/config/server-app-config'
import { createClient } from '@/lib/supabase/server'
import { APP_DOMAIN } from '@local/utils'
import { NextRequest, NextResponse } from 'next/server'

const X_FORWARDED_HOST = 'x-forwarded-host'
const AUTH_CODE_PAGE = '/app/auth/auth-code-error'

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')
	const redirTo = searchParams.get('redir_to') || '/app/dashboard' // next é a url de redirect (quando existe usamos ela)

	if (!code) {
		console.error('failed to retrieve code')
		return NextResponse.redirect(`${origin}${AUTH_CODE_PAGE}`)
	}

	const supabase = await createClient()
	const { error } = await supabase.auth.exchangeCodeForSession(code)
	if (error) {
		console.error('fail to exchange code session', error)
		return NextResponse.redirect(`${origin}${AUTH_CODE_PAGE}`)
	}

	const isLocal = serverAppConfig.NODE_ENV === 'development'

	if (isLocal) {
		return NextResponse.redirect(`${APP_DOMAIN}${redirTo}`) // local podemos ignorar qualquer validação de host
	}

	const forwardedHost = request.headers.get(X_FORWARDED_HOST)

	// redireciona para o host original
	if (forwardedHost) {
		return NextResponse.redirect(`https://${forwardedHost}${redirTo}`)
	}

	return NextResponse.redirect(`${origin}${redirTo}`)
}
