import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    let variantClasses = ""
    switch (variant) {
      case "default": variantClasses = "bg-blue-600 text-white hover:bg-blue-700"; break;
      case "destructive": variantClasses = "bg-red-500 text-white hover:bg-red-600"; break;
      case "outline": variantClasses = "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900"; break;
      case "secondary": variantClasses = "bg-gray-100 text-gray-900 hover:bg-gray-200"; break;
      case "ghost": variantClasses = "hover:bg-gray-100 hover:text-gray-900 text-gray-600"; break;
      case "link": variantClasses = "text-blue-600 underline-offset-4 hover:underline"; break;
    }

    let sizeClasses = ""
    switch (size) {
      case "default": sizeClasses = "h-10 px-4 py-2"; break;
      case "sm": sizeClasses = "h-9 rounded-md px-3"; break;
      case "lg": sizeClasses = "h-11 rounded-md px-8"; break;
      case "icon": sizeClasses = "h-10 w-10"; break;
    }

    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50"
    
    return (
      <button
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
