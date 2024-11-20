// https://chatgpt.com/share/66f766de-7968-8002-b2e2-0d05459b6c89
export const validDomainRegex = new RegExp(
	/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i,
)

export const validSlugRegex = new RegExp(/^[a-zA-Z0-9\-]+$/)
