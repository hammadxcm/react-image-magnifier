import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        nunito: ['var(--font-nunito)'],
      },

      colors: {
        primary: 'var(--tw-color-primary)',
        secondary: 'var(--tw-color-secondary)',
        orange: {
          100: 'var(--tw-color-orange-100)',
        },
        gray: {
          200: 'var(--tw-color-gray-200)',
          300: 'var(--tw-color-gray-300)',
          400: 'var(--tw-color-gray-400)',
        },
        white: 'var(--tw-color-white)',
        dark: 'var(--tw-color-dark)',
        'dark-300': 'var(--tw-color-dark-300)',

        'rich-dark': 'var(--tw-color-rich-dark)',
        'yellowish-brown': 'var(--tw-color-yellowish-brown)',
      },
      borderRadius: {
        '222xl-5': '241.5px',
        '180xl-5': '199.5px',
        '153xl-5': '172.5px',
        '325xl-5': '344.5px',
      },
      fontSize: {
        inherit: 'inherit',
        '2xs': '11px',
        smi: '13px',
        sm: '14px',
        base: '16px',
        'base-3': '16.3px',
        lg: '18px',
        xl: '20px',
        '8xl-3': '27.3px',
        '13xl': '32px',
        '13xl-6': '32.6px',
        '21xl': '40px',
        '45xl': '64px',
      },
      screens: {
        xxl: { min: '1400px', max: '1920px' },

        midlarge: { min: '1023px', max: '1400px' },
        smallLg: { min: '1023px', max: '1200px' },

        bannerMD: { min: '860px', max: '1275px' },
        bannerTab: { min: '768px', max: '1100px' },
        bannerLeftTitle: { min: '1023px', max: '1400px' },
        bannerLeftTitleSM: { min: '1023px', max: '1095px' },
        bannerLeftDes: { min: '768px', max: '930px' },
        bannerHidden: { min: '0px', max: '768px' },
        mobileBannerWatch: { min: '0px', max: '560px' },

        ...defaultTheme.screens,
        '5xs': '256px',
        '4xs': '320px',
        '3xs': '384px',
        '2xs': '448px',
        xs: '512px',
        sm: '576px',
      },
      corePlugins: {
        preflight: false,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
        },
      },
    },
  },
} as Config;
