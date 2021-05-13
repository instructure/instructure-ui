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
import path from 'path'
import which from 'which'
import execa from 'execa'
import rl from 'readline'
import chalk from 'chalk'

function info(...args: string[]) {
  console.info(chalk.blue(...args)) // eslint-disable-line no-console
}

function warn(...args: string[]) {
  console.warn(chalk.yellow('⚠️   ', ...args))
}

function error(...args: string[]) {
  console.error(chalk.red('⚠️   ', ...args))
}

class Command {
  constructor(bin: any, args: any[] = [], vars: any[] = []) {
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
  get bin(): any {
    return this.bin
  }
  get args(): any {
    return this.args
  }
  get vars(): any {
    return this.vars
  }
}

function getCommand(bin: any, args: any[] = [], vars: any[] = []) {
  return new Command(bin, args, vars)
}

function runCommandsConcurrently(commands: Record<string, any>) {
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
      commandList.forEach((command: any) => {
        args.push(
          `${command.toString()}${
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

function runCommandSync(
  bin: any,
  args: any[] = [],
  vars: any[] = [],
  opts: any = {}
) {
  const command = getCommand(bin, args, vars)
  const result = execa.sync(command.toString(), command.args, {
    stdio: 'inherit',
    ...opts
  })

  return { ...result, status: result.exitCode }
}

async function runCommandAsync(
  bin: any,
  args: any[] = [],
  vars: any[] = [],
  opts: any = {}
) {
  const command = getCommand(bin, args, vars)
  const result = await execa(command.toString(), command.args, {
    stdio: 'inherit',
    ...opts
  })
  return { ...result, status: result.exitCode }
}

function resolveBin(
  modName: any,
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
async function confirm(question: string): Promise<string> {
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
