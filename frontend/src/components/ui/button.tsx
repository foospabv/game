import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded font-medium transition-colors"
    const variants = {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
      ghost: "hover:bg-gray-100 text-gray-700"
    }
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
