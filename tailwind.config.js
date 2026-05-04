/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#0C0D0F',
        bg2:      '#131416',
        card:     '#1A1B1F',
        card2:    '#22242A',
        text:     '#EEEEF0',
        text2:    '#B0B2BA',
        accent:   '#C6F135',
        orange:   '#FF6B2B',
        blue:     '#4C9EFF',
        success:  '#1FD16A',
        danger:   '#FF4545',
        purple:   '#A78BFA',
        yellow:   '#F5C518',
      },
      fontFamily: {
        sans:       ['Barlow', 'sans-serif'],
        condensed:  ['Barlow Condensed', 'sans-serif'],
      },
      borderRadius: {
        sm:  '12px',
        md:  '18px',
        lg:  '24px',
      },
    },
  },
  plugins: [],
}
