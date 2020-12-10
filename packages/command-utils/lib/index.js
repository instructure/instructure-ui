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
const execa = require('execa')
const rl = require('readline')
const chalk = require('chalk')

function info(...args) {
  console.info(chalk.blue(...args)) // eslint-disable-line no-console
}
exports.info = info

function warn(...args) {
  console.warn(chalk.yellow('⚠️   ', ...args))
}
exports.warn = warn

function error(...args) {
  console.error(chalk.red('⚠️   ', ...args))
}
exports.error = error

class Command {
  constructor(bin, args = [], vars = []) {
    Object.defineProperties(this, {
      vars: {
        value: vars
      },
      bin: {
        value: resolveBin(bin)
      },
      args: {
        value: args
      }
    })
  }
  toString() {
    return `${this.vars.length > 0 ? `${this.vars.join(' ')} ` : ''}${this.bin}`
  }
  get bin() {
    return this.bin
  }
  get args() {
    return this.args
  }
  get vars() {
    return this.vars
  }
}

function getCommand(bin, args = [], vars = []) {
  return new Command(bin, args, vars)
}
exports.getCommand = getCommand

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
    const command = commands[name]
    if (command) {
      args.push(
        `${command.toString()}${
          command.args.length > 0 ? ` ${command.args.join(' ')} ` : ''
        }`
      )
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
exports.runCommandsConcurrently = runCommandsConcurrently

function runCommandSync(bin, args = [], vars = [], opts = {}) {
  const command = getCommand(bin, args, vars)
  const result = execa.sync(command.toString(), command.args, {
    stdio: 'inherit',
    ...opts
  })
  result.status = result.status || result.code
  return result
}
exports.runCommandSync = runCommandSync

async function runCommandAsync(bin, args = [], vars = [], opts = {}) {
  const command = getCommand(bin, args, vars)
  const result = await execa(command.toString(), command.args, {
    stdio: 'inherit',
    ...opts
  })
  result.status = result.status || result.code
  return result
}
exports.runCommandAsync = runCommandAsync

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
exports.resolveBin = resolveBin

exports.confirm = async function confirm(question) {
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
