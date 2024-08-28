const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        gray: {
          50: 'hsl(var(--gray-50) / <alpha-value>)',
          100: 'hsl(var(--gray-100) / <alpha-value>)',
          200: 'hsl(var(--gray-200) / <alpha-value>)',
          300: 'hsl(var(--gray-300) / <alpha-value>)',
          400: 'hsl(var(--gray-400) / <alpha-value>)',
          500: 'hsl(var(--gray-500) / <alpha-value>)',
          600: 'hsl(var(--gray-600) / <alpha-value>)',
          700: 'hsl(var(--gray-700) / <alpha-value>)',
          800: 'hsl(var(--gray-800) / <alpha-value>)',
          900: 'hsl(var(--gray-900) / <alpha-value>)',
          950: 'hsl(var(--gray-950) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'primary-to-secondary':
          'linear-gradient(90deg, hsl(var(--primary)) 25%, hsl(var(--secondary)) 89%);',
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
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': {
      '--background': '210 14% 97%',
      '--foreground': '213 58% 8%',
      '--card': '0 0% 100%',
      '--card-foreground': '213 58% 8%',
      '--popover': '210 40% 96%',
      '--popover-foreground': '213 58% 8%',
      '--primary': '0 65% 40%',
      '--primary-foreground': '210 14% 97%',
      '--secondary': '30 68% 53%',
      '--secondary-foreground': '213 58% 8%',
      '--muted': '210 40% 96%',
      '--muted-foreground': '215 16% 46%',
      '--accent': '210 40% 96%',
      '--accent-foreground': '213 58% 8%',
      '--destructive': '210 14% 97%',
      '--destructive-foreground': '213 58% 8%',
      '--border': '220 13% 91%',
      '--input': '220 13% 91%',
      '--ring': '215 20% 65%',
      '--radius': '0.5rem',
      '--gray-50': '210 14% 97%',
      '--gray-100': '180 11% 98%',
      '--gray-200': '220 13% 96%',
      '--gray-300': '223 9% 84%',
      '--gray-400': '215 17% 63%',
      '--gray-500': '217 12% 50%',
      '--gray-600': '214 24% 24%',
      '--gray-700': '210 28% 17%',
      '--gray-800': '214 28% 15%',
      '--gray-900': '211 36% 12%',
      '--gray-950': '213 58% 8%',
      ...newVars,
    },
    '.dark': {
      '--background': '240 10% 3.9%',
      '--foreground': '0 0% 98%',
      '--card': '240 10% 3.9%',
      '--card-foreground': '0 0% 98%',
      '--popover': '240 10% 3.9%',
      '--popover-foreground': '0 0% 98%',
      '--primary': '0 0% 98%',
      '--primary-foreground': '240 5.9% 10%',
      '--secondary': '240 3.7% 15.9%',
      '--secondary-foreground': '0 0% 98%',
      '--muted': '240 3.7% 15.9%',
      '--muted-foreground': '240 5% 64.9%',
      '--accent': '240 3.7% 15.9%',
      '--accent-foreground': '0 0% 98%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '240 3.7% 15.9%',
      '--input': '240 3.7% 15.9%',
      '--ring': '240 4.9% 83.9%',
      // might want to adjust these values for dark mode
      '--gray-50': '210 14% 97%',
      '--gray-100': '180 11% 98%',
      '--gray-200': '220 13% 96%',
      '--gray-300': '223 9% 84%',
      '--gray-400': '215 17% 63%',
      '--gray-500': '217 12% 50%',
      '--gray-600': '214 24% 24%',
      '--gray-700': '210 28% 17%',
      '--gray-800': '214 28% 15%',
      '--gray-900': '211 36% 12%',
      '--gray-950': '213 58% 8%',
    },
  })
}
