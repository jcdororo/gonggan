import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'sygnature-brown' : '#998373',
      },
      width: {
        '100' : '26rem',
        '104' : '28rem',
        '108' : '30rem',
        '112' : '32rem',
        '116' : '34rem',
        '120' : '36rem',
        '124' : '38rem',
        '128' : '40rem',
      }
    },
  },
  plugins: [],
}
export default config
