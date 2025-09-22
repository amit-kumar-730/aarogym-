import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children: React.ReactNode;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  children,
  variant = 'default',
  size = 'md',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const getTabClasses = (tab: Tab) => {
    const baseClasses = `
      inline-flex items-center space-x-2 font-medium smooth-transition
      ${sizeClasses[size]}
      ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-lg ${
          activeTab === tab.id
            ? 'bg-emerald-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`;
      case 'underline':
        return `${baseClasses} border-b-2 ${
          activeTab === tab.id
            ? 'border-emerald-500 text-emerald-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;
      default:
        return `${baseClasses} rounded-t-lg border-b-2 ${
          activeTab === tab.id
            ? 'bg-white dark:bg-gray-800 border-emerald-500 text-emerald-600'
            : 'bg-gray-50 dark:bg-gray-700 border-transparent text-gray-500 hover:text-gray-700'
        }`;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className={`flex space-x-1 ${variant === 'underline' ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={getTabClasses(tab)}
            disabled={tab.disabled}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && variant === 'pills' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-emerald-600 rounded-lg -z-10"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export default Tabs;