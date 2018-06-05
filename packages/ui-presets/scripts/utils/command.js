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

function resolveBin (modName, {executable = modName, cwd = process.cwd()} = {}) {
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

exports.resolveCommand = function resolveCommand (command) {
  return resolveBin(command)
}

exports.getCommand = function getCommand (vars, command, args) {
  return `${resolveBin('cross-env')} ${vars.join(' ')} ${resolveBin(command)} ${args.join(' ')}`
}

exports.runCommand = function runCommand (command, args = []) {
  return spawn.sync(
    command,
    args,
    { stdio: 'inherit' }
  )
}

exports.runCommands = function runCommands (commands) {
  const args = [
    '--kill-others-on-fail',
    '--prefix', '[{name}]',
    '--names', Object.keys(commands).join(','),
    '--prefix-colors', 'bgBlue.bold,bgMagenta.bold,bgGreen.bold',
    '--success', 'all'
  ]

  Object.keys(commands).forEach((name) => {
    if (commands[name]) {
      args.push(JSON.stringify(commands[name]))
    }
  })

  return spawn.sync(
    `${resolveBin('concurrently')}`,
    args,
    { stdio: 'inherit' }
  )
}

exports.runCommandAsync = async function runCommandAsync (command) {
  const { stderr, stdout } = await exec(command)
  if (stderr) {
    error(stderr)
    return
  } else if (typeof stdout === 'string') {
    return stdout.trim()
  }
}
