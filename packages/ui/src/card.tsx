import { cn } from '@local/utils'
import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.RefObject<HTMLDivElement>
}

const Card = ({ className, ...props }: CardProps) => (
	<div
		className={cn(
			'rounded-lg border bg-card text-card-foreground shadow-sm',
			className,
		)}
		{...props}
	/>
)
Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.RefObject<HTMLDivElement>
}

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
	<div
		className={cn('flex flex-col space-y-1.5 p-6', className)}
		{...props}
	/>
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	ref?: React.RefObject<HTMLParagraphElement>
}

const CardTitle = ({ className, ...props }: CardTitleProps) => (
	<h3
		className={cn(
			'text-2xl font-semibold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
)
CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	ref?: React.RefObject<HTMLParagraphElement>
}

const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
	<p className={cn('text-sm text-muted-foreground', className)} {...props} />
)
CardDescription.displayName = 'CardDescription'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.RefObject<HTMLDivElement>
}

const CardContent = ({ className, ...props }: CardContentProps) => (
	<div className={cn('p-6 pt-0', className)} {...props} />
)
CardContent.displayName = 'CardContent'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.RefObject<HTMLDivElement>
}

const CardFooter = ({ className, ...props }: CardFooterProps) => (
	<div className={cn('flex items-center p-6 pt-0', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
