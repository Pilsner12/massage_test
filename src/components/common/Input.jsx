import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        className={clsx(
          'w-full px-4 py-3 border rounded-lg transition-all text-base',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          error 
            ? 'border-error focus:ring-error' 
            : 'border-border',
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
