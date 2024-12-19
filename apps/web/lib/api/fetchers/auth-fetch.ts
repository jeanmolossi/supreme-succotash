import { cookies } from 'next/headers'

export async function authFetch(
	input: string | URL | globalThis.Request,
	init?: RequestInit,
): Promise<Response> {
	const cookieStore = await cookies()

	return fetch(input, {
		...(init || {}),
		headers: {
			...(init?.headers || {}),
			Cookie: cookieStore.toString(),
		},
	})
}
