const fs = require('fs')
const path = require('path')
const which = require('which')
const spawn = require('cross-spawn')

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
    const { bin } = require(modPkgPath) // eslint-disable-line import/no-dynamic-require
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

function getCommand (vars, command, args) {
  return `${resolveBin('cross-env')} ${vars.join(' ')} ${resolveBin(command)} ${args.join(' ')}`
}

function runCommands (commands) {
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

exports.runCommands = runCommands
exports.getCommand = getCommand
