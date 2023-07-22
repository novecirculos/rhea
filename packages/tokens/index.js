module.exports = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      fontFamily: {
        primary: 'Noto Serif, serif',
        secondary: 'Alice, serif',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
          950: 'hsl(213, 48%, 8%)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
  ],
}
