import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 16px text below 768px so iOS doesn't zoom on focus
        "flex h-11 w-full min-w-0 rounded-md border border-input-border bg-input px-3 py-1 text-base text-foreground placeholder:text-foreground/60 transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:h-9 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
