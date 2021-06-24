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

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:instructure-ui/recommended',
    'plugin:compat/recommended',
    'prettier'
  ],
  plugins: ['react', 'jsx-a11y', 'mocha', 'notice', 'instructure-ui', 'ejs'],
  env: {
    node: true,
    browser: true,
    mocha: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {
    'react/no-deprecated': 0,
    'react/no-find-dom-node': 0,
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/require-default-props': 'error',
    'react/no-typos': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'no-shadow-restricted-names': 'error',
    semi: ['error', 'never'],
    'semi-spacing': ['error', { before: false, after: true }],
    'no-trailing-spaces': 'error',
    'no-param-reassign': ['error', { props: true }],
    'notice/notice': [
      'error',
      {
        mustMatch: 'The MIT License \\(MIT\\)',
        templateFile: require.resolve('./copyright.js')
      }
    ],
    'import/no-extraneous-dependencies': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['*/src', '@instructure/ui-*/lib', '@instructure/ui-*/es']
      }
    ],
    'jsx-a11y/label-has-for': 0,
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ]
  },
  overrides: [
    {
      files: '*.test.js',
      rules: {
        'mocha/no-exclusive-tests': 'error'
      }
    }
  ],
  settings: {
    react: {
      version: process.env.REACT_VERSION || '16.8.6'
    },
    polyfills:
      require('@instructure/browserslist-config-instui/polyfills').features ||
      []
  }
}
