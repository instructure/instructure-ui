const spawn = require('cross-spawn')
const { runCommands, getCommand } = require('../utils')

const commands = {
  eslint: getCommand([], 'eslint', process.argv.includes('--fix') ? ['.', '--fix'] : ['.'])
}

if (!process.argv.includes('--fix')) { // stylelint doesn't support fix
  commands.stylelint = getCommand([], 'stylelint', ['**/*.css'])
}

const result = runCommands(commands)

process.exit(result.status)
