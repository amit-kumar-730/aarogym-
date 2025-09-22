import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'md',
  onClick,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl',
  };

  const Component = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-2xl ${shadowClasses[shadow]} 
        ${paddingClasses[padding]} ${hover ? 'hover:shadow-xl smooth-transition cursor-pointer' : ''} 
        ${onClick ? 'cursor-pointer' : ''} ${className}
      `}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Card;