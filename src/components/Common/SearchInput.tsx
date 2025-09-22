import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '../../utils/helpers';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onClear,
  debounceMs = 300,
  className = '',
  size = 'md',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = debounce(onChange, debounceMs);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    onClear?.();
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className={`${iconSizes[size]} text-gray-400`} />
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`
          w-full ${sizeClasses[size]} pl-10 pr-10
          border border-gray-300 dark:border-gray-600 
          rounded-lg 
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
          dark:bg-gray-700 dark:text-white 
          placeholder-gray-500 dark:placeholder-gray-400
          smooth-transition
        `}
      />
      
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className={iconSizes[size]} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;