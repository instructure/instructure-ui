const { runCommands, getCommand } = require('../utils')

process.exit(runCommands({
  clean: getCommand([], 'rimraf', [
    '__build__',
    'es',
    'dist',
    'lib',
    '.babel-cache'
  ])
}))
