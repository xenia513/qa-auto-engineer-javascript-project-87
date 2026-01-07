import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import pkg from '@eslint/js'
const { defineConfig } = pkg

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: ["js"],
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
])