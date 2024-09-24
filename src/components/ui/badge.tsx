import React from 'react'

interface BadgeProps {
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode; // เพิ่มการกำหนดประเภทสำหรับ children
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', ...props }) => {
  return (
    <span className={`px-2 py-1 rounded bg-gray-200 text-gray-800 ${className}`} {...props}>
      {children}
    </span>
  )
}
