import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children?: React.ReactNode
  className?: string
  key?: React.Key
}

export function Badge({ className = '', variant = 'default', children, ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
  
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:opacity-90",
    secondary: "border-border bg-secondary text-foreground hover:bg-zinc-800",
    destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "text-foreground border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900",
  }

  return (
    <span
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
