import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'

const jsRecommended = js.configs.recommended

export default [
  jsRecommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js: js,
    },
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
]
