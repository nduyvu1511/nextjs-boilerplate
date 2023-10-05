import type { Config } from 'tailwindcss'

export const TailwindConfigColors = {
  bg: '#f0f0f0',
  primary: '#2E41B6',
  primary75: '#2e41b6bf',
  primary50: '#2e41b680',
  primary25: '#2e41b640',
  primaryBg: '#DAE2FD',
  white: '#FFFFFF',
  text: '#212121',
  gray10: '#F0F0F0',
  gray20: '#BFBFBF',
  gray30: '#595959',
  gray40: '#373737',
  gray50: '#858585',
  gray60: '#9D9D9D',
  gray70: '#767676',
  gray80: '#4E4E4E',
  gray90: '#595959',
  transparent: 'transparent',

  // borders
  border01: '#C8C8C8',
  border02: '#D7D7D7',
  border03: 'rgba(0, 32, 51, 0.26)',

  // Colors
  green: '#008F5D',
  red: '#F44336',
  pink: '#E91E63',
  black: '#000000',
  purple: '#9C27B0',
  black70: 'rgba(0, 0, 0, 0.7)',
  black60: 'rgba(0, 0, 0, 0.6)',
  black50: 'rgba(0, 0, 0, 0.5)',
  black40: 'rgba(0, 0, 0, 0.4)',
  black30: 'rgba(0, 0, 0, 0.3)',
  black20: 'rgba(0, 0, 0, 0.2)',
  black10: 'rgba(0, 0, 0, 0.1)',
  black09: 'rgba(0, 0, 0, 0.09)',
  black08: 'rgba(0, 0, 0, 0.08)',
  black07: 'rgba(0, 0, 0, 0.07)',
  black06: 'rgba(0, 0, 0, 0.06)',
  black05: 'rgba(0, 0, 0, 0.05)',
  black04: 'rgba(0, 0, 0, 0.04)',
  black03: 'rgba(0, 0, 0, 0.03)',
  black02: 'rgba(0, 0, 0, 0.02)',
  black01: 'rgba(0, 0, 0, 0.01)',

  // Status
  warning: '#FACC15',
  danger: '#F44336',
  info: '#246BFD',
  active: '#4096ff',
  active25: '#4096ff40',
  active50: '#4096ff80',
  error: '#F75555',
  success: '#4ADE80',
  warningBg: '#EFD88F',
  errorBg: '#FFDBDB',
  disabled: '#D8D8D8',
  successBg: '#DCFDD9',
  orangeBg: 'rgba(238, 84, 47, 0.3)',
  orange50: '#EE542F',
  orange05: '#FFF8F2',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        default: '8px',
      },
      boxShadow: {
        modal:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        shadow1:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        tabbarMobile: '48px',
        tabbarDesktop: '58px',
        inputHeight: '44px',
      },
    },

    colors: TailwindConfigColors,
  },
  plugins: [],
}
export default config
