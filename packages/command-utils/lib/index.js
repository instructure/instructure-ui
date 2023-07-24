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

const fs = require('fs')
const path = require('path')
const which = require('which')
const rl = require('readline')
const chalk = require('chalk')
const childProcess = require('child_process')

function info(...args) {
  console.info(chalk.blue(...args)) // eslint-disable-line no-console
}

function warn(...args) {
  console.warn(chalk.yellow('⚠️   ', ...args))
}

function error(...args) {
  console.error(chalk.red('⚠️   ', ...args))
}

class Command {
  /**
   * the command binary, e.g. myScript.js or pwd
   */
  bin
  /*
   * The arguments to the command
   */
  args
  /*
   * environment variables
   */
  vars
  constructor(bin, args = [], vars = []) {
    this.vars = vars
    this.bin = resolveBin(bin)
    this.args = args
  }
}

function getCommand(bin, args = [], vars = []) {
  return new Command(bin, args, vars)
}

function runCommandsConcurrently(commands) {
  const args = [
    '--kill-others-on-fail',
    '--prefix',
    '[{name}]',
    '--names',
    Object.keys(commands).join(','),
    '--prefix-colors',
    'bgBlue.bold,bgMagenta.bold,bgGreen.bold',
    '--success',
    'all'
  ]

  Object.keys(commands).forEach((name) => {
    let commandList = commands[name]
    if (commandList) {
      commandList = Array.isArray(commandList) ? commandList : [commandList]
      commandList.forEach((command) => {
        args.push(
          `${command.bin}${
            command.args.length > 0 ? ` ${command.args.join(' ')} ` : ''
          }`
        )
      })
    }
  })

  let result = { status: 1 }

  try {
    result = runCommandSync(`${resolveBin('concurrently')}`, args)
  } catch (err) {
    error(err)
  }
  return result
}

function runCommandSync(bin, args = [], envVars = {}, opts = {}) {
  const result = childProcess.spawnSync(bin, args, {
    env: { ...process.env, ...envVars },
    stdio: 'inherit',
    windowsHide: true,
    ...opts
  })
  return result
}

async function runCommandAsync(bin, args = [], vars = [], opts = {}) {
  const result = await childProcess.spawn(bin, args, {
    stdio: 'inherit',
    ...opts
  })
  return result
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
    // TODO this might break in Node 18!
    // https://nodejs.dev/en/api/v18/packages/#main-entry-point-export
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

exports.confirm = confirm
exports.resolveBin = resolveBin
exports.runCommandAsync = runCommandAsync
exports.runCommandSync = runCommandSync
exports.runCommandsConcurrently = runCommandsConcurrently
exports.getCommand = getCommand
exports.error = error
exports.warn = warn
exports.info = info
