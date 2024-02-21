const { join } = require('path');
const { generateColors } = require('@nextcss/color-tools')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/@team-lepisode/components/**/!(*.stories|*.spec).{ts,html}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E88E5',
          500: '#1E88E5'
        }
      }
    },
  },
  plugins: [],
}

