import type { NextConfig } from 'next'

export default {
	reactStrictMode: false,
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Referrer-Policy',
						value: 'no-referrer-when-downgrade',
					},
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
				],
			},
		]
	},
} satisfies NextConfig
