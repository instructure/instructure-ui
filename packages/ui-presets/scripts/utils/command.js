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
const spawn = require('cross-spawn')
const { error } = require('./logger')
const cp = require('child_process')
const util = require('util')
const exec = util.promisify(cp.exec)

const resolveBin = exports.resolveBin = function resolveBin (modName, {executable = modName, cwd = process.cwd()} = {}) {
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

const getCommand = exports.getCommand = function getCommand(bin, args = [], vars = []) {
  return {
    bin: resolveBin(bin),
    args,
    vars
  }
}

exports.runCommandsConcurrently = function runCommandsConcurrently (commands) {
  const args = [
    '--kill-others-on-fail',
    '--prefix', '[{name}]',
    '--names', Object.keys(commands).join(','),
    '--prefix-colors', 'bgBlue.bold,bgMagenta.bold,bgGreen.bold',
    '--success', 'all'
  ]

  Object.keys(commands).forEach((name) => {
    const command = commands[name]
    if (command) {
      args.push(`${resolveBin('cross-env')} ${command.vars.join(' ')} ${command.bin} ${command.args.join(' ')}`)
    }
  })

  return spawn.sync(
    `${resolveBin('concurrently')}`,
    args,
    { stdio: 'inherit' }
  )
}

exports.runCommandSync = function runCommandSync (bin, args = [], vars = []) {
  const command = getCommand(bin, args, vars)
  return spawn.sync(command.bin, command.args, { stdio: 'inherit' })
}

exports.runCommandAsync = async function runCommandAsync (bin, args = [], vars = []) {
  const command = getCommand(bin, args, vars)

  const { stderr, stdout } = await exec(`${command.vars.join(' ')} ${command.bin} ${command.args.join(' ')}`)

  if (stderr) {
    error(stderr)
    throw new Error(stderr)
  } else {
    return stdout
  }
}
