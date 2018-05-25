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
    'plugin:instructure-ui/recommended'
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'mocha',
    'notice',
    'instructure-ui'
  ],
  env: {
    node: true,
    browser: true,
    mocha: true,
    es6: true
  },
  globals: {
    expect: true,
    sinon: true,
    Testbed: true
  },
  parser: 'babel-eslint',
  rules: {
    'react/no-deprecated': 0,
    'react/no-find-dom-node': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'semi': ['error', 'never'],
    'semi-spacing': ['error', { before: false, after: true }],
    'no-trailing-spaces': 'error',
    'no-param-reassign': ['error', { props: true }],
    'notice/notice': ['error', {
      mustMatch: 'The MIT License \\(MIT\\)',
      templateFile: require.resolve('./copyright.js')
    }],
    'import/no-extraneous-dependencies': 'error',
    'no-undefined': 'error'
  },
  overrides: [
    {
        files: '*.test.js',
        rules: {
          'mocha/no-exclusive-tests': 'error',
          'no-unused-expressions': 0
        }
    }
  ]
}
