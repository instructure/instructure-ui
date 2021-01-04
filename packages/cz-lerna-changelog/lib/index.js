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

const commitAnalyzer = require('@semantic-release/commit-analyzer')
const chalk = require('chalk')
const buildCommit = require('cz-customizable/buildCommit')
const autocomplete = require('inquirer-autocomplete-prompt')
const { getPackages, getChangedPackages } = require('@instructure/pkg-utils')
const makeDefaultQuestions = require('./make-default-questions')
const autocompleteQuestions = require('./autocomplete-questions')

function getCommitTypeMessage(type) {
  if (!type) {
    return 'This commit does not indicate any release'
  }
  return {
    patch: '🛠  This commit indicates a patch release (0.0.X)',
    minor: '✨  This commit indicates a minor release (0.X.0)',
    major: '💥  This commit indicates a major release (X.0.0)'
  }[type]
}

function makePrompter() {
  return function (cz, commit) {
    const scope = '@instructure'
    const allPackages = getPackages()
    const changedPackages = getChangedPackages(
      '--cached',
      allPackages
    ).map((pkg) => pkg.name.replace(`${scope}/`, ''))
    const packageNames = allPackages.map((pkg) =>
      pkg.name.replace(`${scope}/`, '')
    )
    const questions = makeDefaultQuestions(packageNames, changedPackages)

    // eslint-disable-next-line no-console
    console.info(
      '\n\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n'
    )

    cz.registerPrompt('autocomplete', autocomplete)

    cz.prompt(autocompleteQuestions(questions))
      .then((answers) => {
        const {
          body,
          testplan,
          visualChange,
          footer,
          breaking,
          scope,
          ...rest
        } = answers

        const testplanTxt = testplan ? `\nTEST PLAN:\n${testplan}\n\n` : ''

        const issues = footer ? `\n\nCloses: ${footer}\n\n` : ''

        const visualChangeTxt = visualChange
          ? `\n\nVISUAL CHANGE: ${visualChange}\n\n`
          : ''

        let scopeStr = '*'

        if (Array.isArray(scope)) {
          scopeStr = scope.join(',')
        }
        // To have part of a commit body appear in the changelog it needs to be after the "BREAKING CHANGE:" text.
        // see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular
        const message = buildCommit(
          {
            ...rest,
            body: issues + body + testplanTxt,
            breaking: breaking + visualChangeTxt,
            scope: scopeStr
          },
          { breaklineChar: '|' }
        )
        const cwd = process.cwd()

        commitAnalyzer
          .analyzeCommits(
            {},
            { cwd, commits: [{ hash: '', message }], logger: console }
          )
          .then((type) => {
            /* eslint-disable no-console */
            console.info(chalk.green(`\n${getCommitTypeMessage(type)}\n`))
            console.info('\n\nCommit message:')
            console.info(chalk.blue(`\n\n${message}\n`))
            /* eslint-enable no-console */
            commit(message)
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

module.exports = {
  prompter: makePrompter(),
  makePrompter: makePrompter
}
