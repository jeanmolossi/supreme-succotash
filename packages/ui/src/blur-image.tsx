import { HOME_DOMAIN, cn } from '@local/utils'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

export function BlurImage(props: ImageProps) {
	const { src: propSrc, alt, className, ...imgProps } = props

	const [isLoading, setIsLoading] = useState(true)
	const [src, setSrc] = useState(propSrc)

	useEffect(() => setSrc(propSrc), [propSrc]) // atualiza a o state `src` quando a prop `src` sofrer alteracao

	const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		setIsLoading(false)
		const target = e.target as HTMLImageElement

		if (target.naturalWidth <= 16 && target.naturalHeight <= 16) {
			setSrc(`${HOME_DOMAIN}/${encodeURIComponent(alt)}`)
		}
	}

	const onError = () => {
		// se falhar pra carregar a imagem, usa o avatar default
		setSrc(`${HOME_DOMAIN}/${encodeURIComponent(alt)}`)
	}

	return (
		<Image
			{...imgProps}
			src={src}
			alt={alt}
			className={cn(isLoading ? 'blur-[2px]' : 'blur-0', className)}
			onLoad={onLoad}
			onError={onError}
			unoptimized
		/>
	)
}
