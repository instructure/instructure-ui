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

module.exports = (allPackages, changedPackages) => [
  {
    type: 'autocomplete',
    name: 'type',
    message: "Select the type of change that you're committing:",
    choices: [
      { value: 'WIP', name: 'WIP:      🚧  Work in progress' },
      {
        value: 'feat',
        name: 'feat:     🎉  A new feature (note: this will indicate a release)'
      },
      {
        value: 'fix',
        name: 'fix:      🐛  A bug fix (note: this will indicate a release)'
      },
      { value: 'docs', name: 'docs:     📖  Documentation only changes' },
      {
        value: 'chore',
        name:
          'chore:    🛠   Changes to the build process or auxiliary tools\n                and libraries such as documentation generation'
      },
      {
        value: 'style',
        name:
          'style:    💄  Changes that do not affect the meaning of the code\n                (white-space, formatting, missing semi-colons, etc)'
      },
      {
        value: 'refactor',
        name:
          'refactor: ✨  A code change that neither fixes a bug nor adds a feature'
      },
      { value: 'test', name: 'test:     ✅  Adding missing tests' },
      {
        value: 'perf',
        name: 'perf:     🚀  A code change that improves performance'
      },
      { value: 'revert', name: 'revert:   🙈  Revert to a commit' }
    ]
  },
  {
    type: 'checkbox',
    name: 'scope',
    default: changedPackages,
    choices: allPackages,
    message: `The packages that this commit has affected (${changedPackages.length} detected)\n`
  },
  {
    type: 'input',
    name: 'subject',
    message: 'Write a short, imperative tense description of the change:\n',
    filter: function (value) {
      return value.charAt(0).toLowerCase() + value.slice(1)
    },
    validate: function (value) {
      return !!value
    }
  },
  {
    type: 'input',
    name: 'body',
    message:
      'Provide a longer description of the change (optional). Use "|" to break new line:\n'
  },
  {
    type: 'input',
    name: 'testplan',
    message: 'Provide a test plan:\n'
  },
  {
    type: 'input',
    name: 'breaking',
    message: 'List any BREAKING CHANGES (if none, leave blank):\n'
  },
  {
    type: 'input',
    name: 'footer',
    message:
      'List any ISSUES CLOSED by this change. E.g.: PROJECT-123, PROJECT-456:\n'
  }
]
