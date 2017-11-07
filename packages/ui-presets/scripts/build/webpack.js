const spawn = require('cross-spawn')
const { runCommands, getCommand } = require('../utils')

let result

if (process.argv.includes('--watch')) {
  result = runCommands({
    webpack: getCommand(['NODE_ENV=development'], 'webpack-dev-server', [])
  })
} else {
  result = runCommands({
    webpack: getCommand([`NODE_ENV=${process.env['NODE_ENV']}`], 'webpack', [])
  })
}

process.exit(result.status)
