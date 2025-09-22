import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={`
            w-5 h-5 text-emerald-600 border-gray-300 rounded
            focus:ring-emerald-500 focus:ring-2 focus:ring-offset-2
            dark:border-gray-600 dark:bg-gray-700
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {props.checked && (
          <Check className="w-3 h-3 text-white absolute inset-0 m-auto pointer-events-none" />
        )}
      </div>
      
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;