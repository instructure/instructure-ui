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

import fs from 'fs'
import { createRequire } from 'module'
import path from 'path'
import which from 'which'
import rl from 'readline'
import chalk from 'chalk'
import { sync, spawn } from 'cross-spawn'

const require = createRequire(import.meta.url)

function info(...args) {
  console.info(chalk.blue(...args)) // eslint-disable-line no-console
}

function warn(...args) {
  console.warn(chalk.yellow('⚠️ ', ...args))
}

function error(...args) {
  console.error(chalk.red('⚠️ ', ...args))
}

class Command {
  /**
   * the command binary, e.g. `myScript.js` or `pwd`
   * @type {string}
   */
  bin
  /**
   * The arguments passed to the command
   * @type {string[]}
   */
  args
  /**
   * Environment variables in the form of key-value pairs
   * @type {Object.<string, string>}
   */
  envVars

  /**
   * @param bin {string}  The binary name, e.g. `pwd`
   * @param args {string[]} command arguments
   * @param envVars {Object.<string, string>} Environment variables
   */
  constructor(bin, args = [], envVars = {}) {
    this.bin = resolveBin(bin)
    this.args = args
    this.envVars = envVars
  }
}

/**
 * @param bin {string}  The binary name, e.g. `pwd`
 * @param args {string[]} command arguments
 * @param envVars {Object.<string, string>} Environment variables
 */
function getCommand(bin, args, envVars) {
  return new Command(bin, args, envVars)
}

/**
 * Runs all the given commands concurrently
 * @param {Object.<string, Command | Command[]>} commands Command objects.
 *  Their environment variables will be passed to every executable.
 * @returns Promise A Promise that completed if all the commands are completed
 */
async function runCommandsConcurrently(commands) {
  const promises = []
  for (const cl of Object.values(commands)) {
    const commandList = Array.isArray(cl) ? cl : [cl]
    for (const command of commandList) {
      promises.push(runCommandAsync(command.bin, command.args, command.envVars))
    }
  }
  return Promise.all(promises)
}

function runCommandSync(bin, args = [], envVars = {}, opts = {}) {
  return sync(bin, args, {
    env: { ...process.env, ...envVars },
    stdio: 'inherit',
    windowsHide: true,
    ...opts
  })
}

/**
 * Runs the given command asynchronously, returns a Promise that contains its
 * stdout and stderr as strings
 * @param bin path to the binary
 * @param args arguments in an array
 * @param envVars environment vars as key-value pairs
 * @param opts Options to `childProcess.spawn`
 * @returns {Promise<{stdout: string, stderr: string, code:number}>}
 */
async function runCommandAsync(bin, args = [], envVars = {}, opts = {}) {
  const result = spawn(bin, args, {
    env: { ...process.env, ...envVars },
    stdio: 'inherit',
    windowsHide: true,
    ...opts
  })
  let stdout = ''
  let stderr = ''
  if (result.stdout) {
    result.stdout.on('data', (data) => {
      stdout += data.toString()
    })
  }
  if (result.stderr) {
    result.stderr.on('data', (data) => {
      stderr += data.toString()
    })
  }
  const promise = new Promise((resolve, reject) => {
    result.on('error', (err) => {
      error(`runCommandAsync ${bin} ${args} error:\n${err}`)
      reject({ stdout: stdout, stderr: stderr, code: err.errno })
    })
    result.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout: stdout, stderr: stderr, code: code })
      } else {
        error(
          `runCommandAsync: child process ${bin} ${args} exited with code ${code}`
        )
        reject({ stdout: stdout, stderr: stderr, code: code })
      }
    })
  })
  promise.child = result
  return promise
}

function resolveBin(
  modName,
  { executable = modName, cwd = process.cwd() } = {}
) {
  let pathFromWhich
  try {
    pathFromWhich = fs.realpathSync(which.sync(executable))
  } catch (_error) {
    // ignore _error
  }
  try {
    // returns the full path to this package.json
    // TODO this might break in Node 18+ if a package uses "exports" field and
    // does not export its package.json
    // https://nodejs.org/api/packages.html#package-entry-points
    const modPkgPath = require.resolve(`${modName}/package.json`)
    const modPkgDir = path.dirname(modPkgPath)
    const { bin } = require(modPkgPath)
    const binPath = typeof bin === 'string' ? bin : bin[executable]
    const fullPathToBin = path.join(modPkgDir, binPath)
    if (fullPathToBin === pathFromWhich) {
      return executable
    }
    return fullPathToBin.replace(cwd, '.')
  } catch (error) {
    if (pathFromWhich) {
      return executable
    }
    throw error
  }
}
async function confirm(question) {
  return new Promise((resolve, reject) => {
    try {
      const dialog = rl.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      dialog.question(question, (reply) => {
        dialog.close()
        resolve(reply)
      })
    } catch (e) {
      reject(e)
    }
  })
}

export {
  confirm,
  resolveBin,
  runCommandAsync,
  runCommandSync,
  runCommandsConcurrently,
  getCommand,
  error,
  warn,
  info
}
