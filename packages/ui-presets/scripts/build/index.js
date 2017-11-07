#!/usr/bin/env node

process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'production'

if (process.argv.includes('--bundle')) {
  require('./webpack')
} else if (process.argv.includes('--clean')) {
  require('./clean')
} else {
  require('./babel')
}
