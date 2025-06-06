import React from "react"

const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 ${className}`}
      {...props}
    />
  )
})

Label.displayName = "Label"

export { Label }
