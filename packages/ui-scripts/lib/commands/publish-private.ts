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

import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import readline from 'node:readline/promises'

import { getPackages } from '../utils/pkg-utils/index.ts'
import { error, info, runCommandAsync } from '@instructure/command-utils'
import type { Argv } from 'yargs'

const PRIVATE_TAG = 'security'

export default {
  command: 'publish-private',
  desc: 'publishes ALL non-private packages to a private npm-compatible registry. Reads INSTUI_PRIVATE_REGISTRY and INSTUI_PRIVATE_REGISTRY_TOKEN from the environment.',
  builder: (yargs: Argv) => {
    yargs.option('yes', {
      type: 'boolean',
      describe: 'Skip the interactive registry-hostname confirmation prompt',
      default: false
    })
  },
  handler: async (argv: any) => {
    try {
      await publishPrivate({ skipConfirm: argv.yes })
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}

async function publishPrivate({ skipConfirm }: { skipConfirm: boolean }) {
  const registry = process.env.INSTUI_PRIVATE_REGISTRY
  const token = process.env.INSTUI_PRIVATE_REGISTRY_TOKEN

  if (!registry || !token) {
    error(
      'INSTUI_PRIVATE_REGISTRY and INSTUI_PRIVATE_REGISTRY_TOKEN must both be set in your environment.'
    )
    process.exit(1)
  }

  let registryUrl
  try {
    registryUrl = new URL(registry)
  } catch {
    error(`INSTUI_PRIVATE_REGISTRY is not a valid URL: ${registry}`)
    process.exit(1)
  }

  // Hard guard: this command must never publish to npmjs.
  if (/(^|\.)npmjs\.org$/i.test(registryUrl.hostname)) {
    error(
      `Refusing to publish-private to ${registryUrl.hostname}. Use \`pnpm run release\` for public npmjs releases.`
    )
    process.exit(1)
  }

  const packages = getPackages().filter((pkg: any) => !pkg.private)
  if (packages.length === 0) {
    error('No publishable (non-private) packages found.')
    process.exit(1)
  }

  const sampleVersion = packages[0].version

  info('')
  info('📦  Private (embargoed) publish')
  info(`    Registry: ${registryUrl.hostname}`)
  info(`    Tag:      ${PRIVATE_TAG}`)
  info(`    Packages: ${packages.length} packages at version ${sampleVersion}`)
  info('')

  if (!skipConfirm) {
    await confirmHostname(registryUrl.hostname)
  }

  const npmrcPath = writeTempNpmrc(registryUrl, token)

  try {
    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i]
      await publishPackage(pkg, npmrcPath)
      info(
        `📦  ${pkg.name}@${pkg.version} published to ${registryUrl.hostname}`
      )
      // Throttle to avoid registry rate-limiting on bulk publishes.
      if (i < packages.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }
  } finally {
    cleanupTempNpmrc(npmrcPath)
  }

  info('')
  info(
    `✅  Done. ${packages.length} packages published to ${registryUrl.hostname} under tag "${PRIVATE_TAG}".`
  )
}

async function confirmHostname(hostname: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  try {
    const answer = await rl.question(
      `Type the registry hostname to confirm (${hostname}): `
    )
    if (answer.trim() !== hostname) {
      error('Confirmation did not match. Aborting.')
      process.exit(1)
    }
  } finally {
    rl.close()
  }
}

function writeTempNpmrc(registryUrl: URL, token: string) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'instui-publish-private-'))
  const file = path.join(dir, '.npmrc')
  const authPath = registryUrl.pathname.endsWith('/')
    ? registryUrl.pathname
    : `${registryUrl.pathname}/`
  const authLine = `//${registryUrl.host}${authPath}:_authToken=${token}`
  const registryLine = `registry=${registryUrl.toString()}`
  fs.writeFileSync(file, `${registryLine}\n${authLine}\n`, { mode: 0o600 })
  return file
}

function cleanupTempNpmrc(npmrcPath: string) {
  try {
    fs.rmSync(path.dirname(npmrcPath), { recursive: true, force: true })
  } catch {
    // best effort — temp dir cleanup failure is not fatal
  }
}

async function publishPackage(pkg: any, npmrcPath: string) {
  const childEnv = { NPM_CONFIG_USERCONFIG: npmrcPath }

  // Skip if this version is already on the private registry.
  let versions: string[] = []
  try {
    const { stdout } = await runCommandAsync(
      'pnpm',
      ['info', pkg.name, '--json'],
      childEnv,
      { stdio: 'pipe' }
    )
    versions = JSON.parse(stdout).versions || []
  } catch {
    // Package not yet in the registry — fall through and publish.
  }

  if (versions.includes(pkg.version)) {
    throw new Error(
      `📦  ${pkg.name}@${pkg.version} is already published to the private registry.`
    )
  }

  await runCommandAsync(
    'pnpm',
    [
      'publish',
      pkg.location,
      '--tag',
      PRIVATE_TAG,
      '--no-git-checks'
      // Provenance is npmjs-only; omitted for non-npmjs registries.
      // Registry + auth come from the temp .npmrc via NPM_CONFIG_USERCONFIG.
    ],
    childEnv
  )
}
