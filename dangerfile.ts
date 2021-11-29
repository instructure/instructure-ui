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

const { danger, markdown } = require('danger')
const { exec } = require('child_process')
const path = require('path')
const { esBuild, gzip } = require('./scripts/calculateBundleSize')

const META_FILE = path.resolve('./packages/ui/src/index.ts')
const SIZE_DIFF_THRESHOLD = process.env.SIZE_DIFF_THRESHOLD || 3

const git = async (command: string) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.info(`[git: ${command}]\n`)
    exec(`git ${command}`, (err: any, stdout: string) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}

const calculateSizes = async () => {
  const headCommitSha = danger.git.head
  const baseCommitSha = danger.git.base

  //We want to calculate the bundle size agains the base commit of the PR.
  //this will be the base agains we will calculate the bundle size changes.
  await git(`checkout -d ${baseCommitSha}`)

  const { outFile } = await esBuild(META_FILE, baseCommitSha)
  const baseStats = await gzip(outFile)

  await git(`checkout ${danger.github.pr.head.ref}`)

  const { outFile: outFile2, analysis } = await esBuild(
    META_FILE,
    headCommitSha
  )
  // instead of showing the analysis in the comment
  // just print it inside the job's console so we won't
  // send out huge emails with the bundle analysis in them
  // eslint-disable-next-line no-console
  console.log(analysis)

  const prHeadStats = await gzip(outFile2)

  markdown(`
  Description | Bundle size (gzipped) |
  ----------- | ----------- |
  **Target branch package bundle size.** (${
    danger.github.pr.base.ref
  }) <br/> Target branch base commit: <br/> [${danger.github.pr.base.ref}/${
    danger.github.pr.base.sha
  }](${danger.github.pr.base.repo.html_url}/commit/${
    danger.github.pr.base.sha
  }) | **${formatSize(baseStats.size)}**
  **Pull Request branch package bundle size.** (${
    danger.github.pr.head.ref
  }) <br /> HEAD commit at PR branch: <br /> [${danger.github.pr.head.ref}/${
    danger.github.pr.head.sha
  }](${danger.github.pr.head.repo.html_url}/commit/${
    danger.github.pr.head.sha
  }) | **${formatSize(prHeadStats.size)}**
  **${calculateSizeDiff({ base: baseStats.size, head: prHeadStats.size })}**
  `)
}

const formatSize = (sizeInBytes: number) => {
  return `${Math.round(sizeInBytes / 1024)} kB`
}
const calculateSizeDiff = ({ base, head }: { base: number; head: number }) => {
  if (base === head) {
    return 'Same bundle size.'
  }
  // this will give back us the diff between the packages in %
  const diff = Number((1 - base / head).toFixed(2)) * 100

  if (diff < 0) {
    return `:white_check_mark: ${diff}% decrease in bundle size.`
  } else if (diff >= SIZE_DIFF_THRESHOLD) {
    return `:warning: +${diff}% increase in bundle size.`
  }

  return `Bundle size difference is lower than the specified threshold (diff=${diff}%, threshold=${SIZE_DIFF_THRESHOLD}%).`
}

calculateSizes()

export {}
