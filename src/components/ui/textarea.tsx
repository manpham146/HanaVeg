import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-foreground/15 bg-surface px-4 py-2 font-sans text-sm shadow-xs transition-[color,box-shadow,border-color] outline-none placeholder:text-foreground/35 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 text-foreground resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
