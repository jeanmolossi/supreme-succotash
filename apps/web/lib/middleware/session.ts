import serverAppConfig from '@/config/server-app-config'
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const { ANON_KEY, SUPABASE_URL } = serverAppConfig

const LOGIN_PAGE = '/acessar'
const AUTH_BASE_PATH = '/dashboard'

export default async function AuthMiddleware(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request })

	const supabase = createServerClient(SUPABASE_URL!, ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll()
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value),
				)

				supabaseResponse = NextResponse.next({ request })
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options),
				)
			},
		},
	})

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const pathname = request.nextUrl.pathname

	const isLogin = pathname.startsWith(LOGIN_PAGE)
	const isAuth = pathname.startsWith(AUTH_BASE_PATH)

	if (!user && !isLogin && !isAuth) {
		const url = request.nextUrl.clone()
		url.pathname = LOGIN_PAGE
		return NextResponse.redirect(url)
	}

	return supabaseResponse
}
