import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  let variantClasses = ""
  switch (variant) {
    case "default": variantClasses = "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80"; break;
    case "secondary": variantClasses = "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80"; break;
    case "destructive": variantClasses = "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80"; break;
    case "success": variantClasses = "border-transparent bg-emerald-500 text-white hover:bg-emerald-500/80"; break;
    case "warning": variantClasses = "border-transparent bg-amber-500 text-white hover:bg-amber-500/80"; break;
    case "outline": variantClasses = "text-slate-950"; break;
  }
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${variantClasses} ${className}`} {...props} />
  )
}
export { Badge }
