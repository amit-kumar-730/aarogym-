import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  resize = 'vertical',
  className = '',
  ...props
}, ref) => {
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        className={`
          block w-full px-4 py-3 border rounded-lg
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          dark:bg-gray-700 dark:text-white dark:border-gray-600
          placeholder-gray-500 dark:placeholder-gray-400
          smooth-transition ${resizeClasses[resize]}
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;