const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{js,jsx,ts,tsx}',
    './client/*.html',
  ],
  safelist: [
    '-mx-1.5',
    '-my-1.5',
    'appearance-none',
    'bg-green-100',
    'bg-green-50',
    'bg-indigo-600',
    'bg-red-50',
    'bg-white',
    'block',
    'border',
    'border-gray-300',
    'border-transparent',
    'cursor-pointer',
    'flex',
    'focus:border-indigo-500',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-indigo-500',
    'focus:ring-offset-2',
    'focus:ring-offset-red-50',
    'focus:ring-red-600',
    'font-medium',
    'hover:bg-indigo-700',
    'hover:bg-red-100',
    'hover:text-indigo-500',
    'inline-flex',
    'justify-center',
    'justify-end',
    'ml-auto',
    'mt-0',
    'mt-1',
    'mt-8',
    'p-1.5',
    'p-4',
    'pl-3',
    'placeholder-gray-400',
    'px-3',
    'px-4',
    'py-2',
    'py-8',
    'ring-green-600',
    'ring-offset-green-50',
    'rounded-md',
    'shadow',
    'shadow-sm',
    'sm:max-w-md',
    'sm:mx-auto',
    'sm:px-10',
    'sm:rounded-lg',
    'sm:text-sm',
    'sm:w-full',
    'space-y-6',
    'sr-only',
    'text-gray-700',
    'text-green-500',
    'text-green-800',
    'text-indigo-600',
    'text-red-500',
    'text-red-800',
    'text-sm',
    'text-white',
    'w-full',
  ],
  mode: 'jit',
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        '3xl': '1920px',
      },
    },
    extend: {
      boxShadow: {
        lg: '0px 4px 6px 0px rgba(0, 0, 0, 0.05), 0px 10px 15px 0px rgba(0, 0, 0, 0.10);',
      },
      screens: {
        xxs: '330px',
        '3xl': '1920px',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
          '3xl': '1920px',
        },
      },
      fontFamily: {
        primary: 'Noto Serif, serif',
        secondary: 'Alice, serif',
      },
      colors: {
        border: 'hsl(220, 13%, 91%)',
        input: 'hsl(220, 13%, 91%)',
        ring: 'hsl(215, 20%, 65%)',
        background: 'hsl(210, 14%, 97%)',
        foreground: 'hsl(213, 58%, 8%)',
        primary: {
          DEFAULT: 'hsl(0, 65%, 40%)',
          foreground: 'hsl(210, 14%, 97%)',
          100: 'hsl(0, 67%, 94%)',
          200: 'hsl(0, 64%, 88%)',
          300: 'hsl(0, 65%, 82%)',
          400: 'hsl(0, 66%, 76%)',
          500: 'hsl(0, 65%, 70%)',
          600: 'hsl(0, 65%, 64%)',
          700: 'hsl(0, 65%, 58%)',
          800: 'hsl(0, 65%, 52%)',
          900: 'hsl(0, 65%, 46%)',
        },
        secondary: {
          DEFAULT: 'hsl(30, 68%, 53%)',
          foreground: 'hsl(213, 58%, 8%)',
          100: 'hsl(30, 68%, 91%)',
          200: 'hsl(30, 67%, 89%)',
          300: 'hsl(29, 68%, 83%)',
          400: 'hsl(30, 68%, 84%)',
          500: 'hsl(30, 68%, 79%)',
          600: 'hsl(30, 68%, 74%)',
          700: 'hsl(30, 68%, 69%)',
          800: 'hsl(30, 68%, 63%)',
          900: 'hsl(30, 68%, 58%)',
        },
        gray: {
          50: 'hsl(210, 14%, 97%)',
          100: 'hsl(180, 11%, 98%)',
          200: 'hsl(220, 13%, 96%)',
          300: 'hsl(223, 9%, 84%)',
          400: 'hsl(215, 17%, 63%)',
          500: 'hsl(217, 12%, 50%)',
          600: 'hsl(214, 24%, 24%)',
          700: 'hsl(210, 28%, 17%)',
          800: 'hsl(214, 28%, 15%)',
          900: 'hsl(211, 36%, 12%)',
          950: 'hsl(213, 58%, 8%)',
        },
        destructive: {
          DEFAULT: 'hsl(210, 14%, 97%)',
          foreground: 'hsl(213, 58%, 8%)',
        },
        muted: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(215 16% 46%)',
        },
        accent: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(213, 58%, 8%)',
        },
        popover: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(213, 58%, 8%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(213, 58%, 8%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      backgroundImage: {
        'primary-to-secondary':
          'linear-gradient(90deg, #a82424 25%, #d98736 89%);',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
