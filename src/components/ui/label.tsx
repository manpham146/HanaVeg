"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

const labelVariants = cva(
  "flex items-center gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-sm leading-none font-medium",
        field: "text-[9px] tracking-[0.2em] font-sans uppercase text-secondary block mb-3 font-semibold"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface LabelProps 
  extends React.ComponentProps<typeof LabelPrimitive.Root>, 
    VariantProps<typeof labelVariants> {}

function Label({
  className,
  variant,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Label, labelVariants }
