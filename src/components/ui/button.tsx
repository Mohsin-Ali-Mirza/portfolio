import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-foreground text-background shadow hover:bg-primary hover:text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border border-zinc-700 bg-transparent text-foreground hover:bg-zinc-900 hover:border-zinc-500",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-zinc-900 text-muted-foreground hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline font-semibold",
    }

    const sizes = {
      default: "h-10 px-6 py-3",
      sm: "h-8 px-4 text-[10px]",
      lg: "h-12 px-8 py-4",
      icon: "h-10 w-10",
    }

    const classes = cn(
      base,
      variants[variant],
      sizes[size],
      className
    )

    if (asChild && props.children) {
      try {
        const child = React.Children.only(props.children) as React.ReactElement<any>
        return React.cloneElement(child, {
          className: cn(classes, child.props.className),
          ...props,
          children: child.props.children
        })
      } catch (e) {
        // Fallback if clone fails
      }
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
