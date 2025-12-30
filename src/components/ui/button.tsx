import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#003D82] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg active:scale-95",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border-2 border-emerald-500 bg-transparent text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors active:scale-95",
        secondary:
          "bg-white text-slate-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-slate-300",
        ghost:
          "text-slate-900 hover:bg-slate-100",
        link:
          "text-slate-900 underline-offset-4 hover:underline",
        premium:
          "bg-gradient-to-r from-slate-900 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 animate-gradient-x border-0",
        cta:
          "bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:-translate-y-1 active:translate-y-0 active:scale-95 duration-200",
      },
      size: {
        default: "h-10 px-6 py-2.5",
        sm: "h-8 rounded-lg gap-1.5 px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
