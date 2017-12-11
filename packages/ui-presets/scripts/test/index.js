#!/usr/bin/env node

process.env['NODE_ENV'] = 'test'

if (process.argv.includes('--lint')) {
  require('./lint')
} else if (process.argv.includes('--mocha')) {
  require('./mocha')
} else {
  require('./karma')
}
