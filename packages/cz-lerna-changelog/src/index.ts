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

// @ts-ignore not typed
import commitAnalyzer from '@semantic-release/commit-analyzer'
import chalk from 'chalk'
// @ts-ignore not typed
import buildCommit from 'cz-customizable/lib/build-commit'
// @ts-ignore not typed
import { getChangedPackages, getPackages } from '@instructure/pkg-utils'
import { makeDefaultQuestions } from './make-default-questions'
import type { Answers } from 'inquirer'
import inquirerModule from 'inquirer'
import { MaxLengthInputPrompt } from './MaxLengthInputPrompt'

type CommitType = 'patch' | 'minor' | 'major'

function scopeText(scopes: string[]) {
  if (scopes.length > 3) {
    return 'many'
  } else return scopes.join(',')
}

// note: Most of the code is from https://github.com/atlassian/cz-lerna-changelog/
function getCommitTypeMessage(type: CommitType) {
  if (!type) {
    return 'This commit does not indicate any release'
  }
  return {
    patch: '🛠  This commit indicates a patch release (0.0.X)',
    minor: '✨  This commit indicates a minor release (0.X.0)',
    major: '💥  This commit indicates a major release (X.0.0)'
  }[type]
}

const prompter = (
  inquirer: typeof inquirerModule,
  commit: (message: string) => void
) => {
  const scope = '@instructure'
  const allPackages = getPackages()
  const changedPackages: string[] = getChangedPackages(
    '--cached',
    allPackages
  ).map((pkg: any) => pkg.name.replace(`${scope}/`, ''))
  const packageNames: string[] = allPackages.map((pkg: any) =>
    pkg.name.replace(`${scope}/`, '')
  )
  const questions = makeDefaultQuestions(packageNames, changedPackages)

  inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
  inquirer
    .prompt<Answers>(questions)
    .then((answers) => {
      const { body, testplan, footer, breaking, scope, ...rest } = answers

      const testplanTxt = testplan ? `\nTEST PLAN:\n${testplan}\n\n` : ''
      const issues = footer ? `\n\nCloses: ${footer}\n\n` : ''
      // To have part of a commit body appear in the changelog it needs to be after the "BREAKING CHANGE:" text.
      // see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular
      const message = buildCommit(
        {
          ...rest,
          body: issues + body + testplanTxt,
          breaking: breaking,
          scope: scopeText(scope)
        },
        { breaklineChar: '|' }
      )
      const cwd = process.cwd()

      commitAnalyzer
        .analyzeCommits(
          {},
          { cwd, commits: [{ hash: '', message }], logger: console }
        )
        .then((type: CommitType) => {
          /* eslint-disable no-console */
          console.info(chalk.green(`\n${getCommitTypeMessage(type)}\n`))
          console.info('\n\nCommit message:')
          console.info(chalk.blue(`\n\n${message}\n`))
          /* eslint-enable no-console */
          commit(message)
        })
        .catch((error: any) => {
          console.error(error)
        })
    })
    .catch((error: any) => {
      console.error(error)
    })
}

export default { prompter }
export { scopeText }
