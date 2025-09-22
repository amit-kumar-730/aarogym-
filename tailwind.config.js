/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-custom': 'pulse-custom 2s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#059669',
          'secondary': '#0284c7',
          'accent': '#f59e0b',
          'neutral': '#374151',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          'success': '#10b981',
          'warning': '#f59e0b',
          'error': '#ef4444',
          'info': '#3b82f6',
        },
        dark: {
          'primary': '#34d399',
          'secondary': '#60a5fa',
          'accent': '#fbbf24',
          'neutral': '#d1d5db',
          'base-100': '#1f2937',
          'base-200': '#374151',
          'base-300': '#4b5563',
          'success': '#34d399',
          'warning': '#fbbf24',
          'error': '#f87171',
          'info': '#60a5fa',
        },
      },
    ],
  },
  darkMode: ['class', '[data-theme="dark"]'],
};
