/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  // js/built is excluded on purpose: it's the old Babel output, not source.
  content: ['./*.html', './js/*.js', './js/src/**/*.jsx'],
  theme: { extend: {} },
  plugins: [],
};
