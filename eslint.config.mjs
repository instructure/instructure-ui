/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import notice from "eslint-plugin-notice"
import eslintConfigPrettier from "eslint-config-prettier"
import vitest from "@vitest/eslint-plugin"
import globals from 'globals'

const COPYRIGHT_NOTICE = "/*\n" +
  " * The MIT License (MIT)\n" +
  " *\n" +
  " * Copyright (c) 2015 - present Instructure, Inc.\n" +
  " *\n" +
  " * Permission is hereby granted, free of charge, to any person obtaining a copy\n" +
  " * of this software and associated documentation files (the \"Software\"), to deal\n" +
  " * in the Software without restriction, including without limitation the rights\n" +
  " * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n" +
  " * copies of the Software, and to permit persons to whom the Software is\n" +
  " * furnished to do so, subject to the following conditions:\n" +
  " *\n" +
  " * The above copyright notice and this permission notice shall be included in all\n" +
  " * copies or substantial portions of the Software.\n" +
  " *\n" +
  " * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n" +
  " * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n" +
  " * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n" +
  " * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n" +
  " * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n" +
  " * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n" +
  " * SOFTWARE.\n" +
  " */"

const NODE_PACKAGES = [
  'browserslist-config-instui',
  'ui-icons-build',
  'ui-babel-preset',
  'ui-codemods',
  'ui-karma-config',
  'ui-stylelint-config',
  'ui-scripts',
  'ui-webpack-config',
  'command-utils',
  'eslint-plugin-instructure-ui',
  'instui-cli',
  'babel-plugin-transform-imports',
  'pkg-utils'
].join("|")

const finalConfig = tseslint.config(
  {
    // ignoring is a mess in ESLint, if these are put here it will be ignored globally
    // https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
    ignores: [ // global ignores
      "**/node_modules/**",
      "**/types/**",
      "**/es/**",
      "packages/!(" + NODE_PACKAGES + ")/lib/**/*",
      "/regression-test/**",
      "/coverage/**",
      "**/stylelint.config.js",
      "**/babel.config.js",
      "karma.conf.js",
      "packages/console/src/macro.js"
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: "instUI-eslint-config",
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
    },
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      //'jsx-a11y', // TODO add this back if it supports ESLint v9
      notice,
      //'instructure-ui'
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...eslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      // value is 'off' or 'warn' or 'error'
      // https://eslint.org/docs/latest/use/configure/rules#rule-severities
      // overrides for typescript-eslint
      '@typescript-eslint/ban-ts-comment': ['error',
        { 'ts-ignore': 'allow-with-description' }
      ],
      '@typescript-eslint/no-require-imports': 'off', // https://typescript-eslint.io/rules/no-require-imports
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off', // https://typescript-eslint.io/rules/explicit-module-boundary-types
      // overrides for eslint-plugin-react
      'react/no-deprecated': 'warn',
      'react/display-name': 'error',
      'react/no-find-dom-node': 'warn',
      'react/forbid-foreign-prop-types': 'error',
      'react/no-danger': 'error',
      'react/prop-types': ['error', { skipUndeclared: true }],
      'react/require-default-props': 'error',
      'react/no-typos': 'error',
      'react/no-unknown-property': ['error', { ignore: ['css', 'componentRef'] }],
      // overrides for eslint-plugin-notice
      'notice/notice': ['error',
        {
          mustMatch: 'The MIT License',
          template: COPYRIGHT_NOTICE
        }
      ],
      // overrides for built-in rules
      'no-undef': 'off', // https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript
      'no-console': ['error', { allow: ['warn', 'error', 'time', 'timeEnd'] }],
      'no-unused-vars': ['warn', {args: 'none', ignoreRestSiblings: true}],
      'no-shadow-restricted-names': 'error',
      semi: ['error', 'never'],
      'semi-spacing': ['error', { before: false, after: true }],
      'no-trailing-spaces': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['*/src', '@instructure/ui-*/lib', '@instructure/ui-*/es']
        }
      ],
      'no-unused-expressions': [ // https://typescript-eslint.io/rules/no-unused-expressions
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
    },
    settings: {
      react: {
        version: process.env.REACT_VERSION || '18.2.0'
      }
    }
  },
  {
    // Vitest tests
    files: [
      '**/__new-tests__/**',
      'packages/ui-codemods/__tests__/*'
    ],
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/valid-title': 'warn',
      'vitest/no-commented-out-tests': 'warn'
    }
  },
  {// Node scripts
    files: [
      "packages/+(" + NODE_PACKAGES + ")/**/*",
      'packages/__docs__/*.js', // docs is a mess
      '!packages/**', // every file not in packages
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {// parts of the docs app that are not converted to TS
    // TODO convert docs app fully to TS to remove this part
    files: [
      'packages/__docs__/**/*.js',
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {// ui-codemods in Vitest TODO convert fully to TS to remove this part
    files: [
      'packages/ui-codemods/**/*.js',
    ],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  {
    // plain JS files anywhere
    files:['**/*.{js,mjs,cjs,jsx,mjsx}'],
    rules: { 'no-undef': 'error' }
  }
)

// code to print out the whole config
//import { inspect } from 'util'
//throw (new Error(inspect(tsEslint.configs.recommended)))

export default finalConfig
