import React, { ReactNode } from 'react'; // นำเข้า ReactNode

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline'; // ประเภทของปุ่ม
  className?: string;
  onClick?: () => void; // ฟังก์ชันการคลิก
  children: ReactNode; // children สำหรับเนื้อหาภายในปุ่ม
  size?: 'small' | 'medium' | 'large'; // เพิ่ม size ที่นี่
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  onClick, 
  children,
  size = 'medium' // กำหนดค่าเริ่มต้นให้กับ size
}) => {
  // กำหนด className ตาม size
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`rounded ${sizeClasses[size]} ${variant === 'outline' ? 'border border-gray-400' : ''} ${className}`}
      onClick={onClick}
    >
      {children} {/* แสดง children ที่นี่ */}
    </button>
  );
};
