import serverAppConfig from '@/config/server-app-config'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const X_FORWARDED_HOST = 'x-forwarded-host'

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')
	const redirTo = searchParams.get('redir_to') || '/' // next é a url de redirect (quando existe usamos ela)

	if (!code) {
		return NextResponse.redirect(`${origin}/auth/auth-code-error`)
	}

	const supabase = await createClient()
	const { error } = await supabase.auth.exchangeCodeForSession(code)
	if (error) {
		return NextResponse.redirect(`${origin}/auth/auth-code-error`)
	}

	const isLocal = serverAppConfig.NODE_ENV === 'development'

	if (isLocal) {
		return NextResponse.redirect(`${origin}${redirTo}`) // local podemos ignorar qualquer validação de host
	}

	const forwardedHost = request.headers.get(X_FORWARDED_HOST)

	// redireciona para o host original
	if (forwardedHost) {
		return NextResponse.redirect(`https://${forwardedHost}${redirTo}`)
	}

	return NextResponse.redirect(`${origin}${redirTo}`)
}
