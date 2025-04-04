'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@local/utils'

const labelVariants = cva(
	'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

interface LabelProps
	extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
		VariantProps<typeof labelVariants> {
	ref?: React.RefObject<React.ElementRef<typeof LabelPrimitive.Root>>
}

const Label = ({ className, ...props }: LabelProps) => (
	<LabelPrimitive.Root
		className={cn(labelVariants(), className)}
		{...props}
	/>
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
