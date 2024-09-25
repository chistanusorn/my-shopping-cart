import React, { forwardRef } from 'react'

export const Input = forwardRef(({ 
  className = '', 
  label, 
  error, 
  fullWidth = false,
  ...props 
}, ref) => {
  const baseClasses = 'block px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  const errorClasses = error ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300'
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <div className={`${widthClass}`}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input 
        ref={ref}
        className={`${baseClasses} ${errorClasses} ${className}`} 
        {...props} 
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'