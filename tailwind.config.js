/*******************************************************************************
 *                                                                             *
 * Tailwindcss configuration.                                                  *
 *                                                                             *
 ******************************************************************************/

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      /* Typography */
      fontFamily: {
        body: [' "JetBrains Mono" '],
        title: [' "JetBrains Mono" '],
      }
    },
  },
  plugins: [],
};
