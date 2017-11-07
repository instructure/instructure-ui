const { runCommands, getCommand } = require('../utils')

const vars = []
const args = ['src', '--ignore *.test.js']

if (process.argv.includes('--watch')) {
  vars.push('NODE_ENV=development')
  args.push('--watch')
} else {
  vars.push(`NODE_ENV=${process.env.NODE_ENV}`)
}

const result = runCommands({
  es: getCommand([...vars, 'ES_MODULES=1'], 'babel', [...args, '--out-dir es']),
  lib: getCommand(vars, 'babel', [...args, '--out-dir lib'])
})

process.exit(result.status)
