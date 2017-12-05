const requireDir = require('require-dir')

requireDir('./tasks', { recurse: true })

const sequence = require('run-sequence')

const config = require('./config')

exports.buildAll = (cb) => {
  const tasks = []

  if (config.react) {
    tasks.push('generate-react')
  }

  if (config.fonts) {
    tasks.push('generate-fonts')
  }

  sequence(
     'generate-svgs',
     tasks,
     cb
   )
}

exports.exportFromSketch = (cb) => {
  sequence(
     'clean',
     'generate-svgs-from-sketch',
     cb
   )
}

exports.buildSVGs = (cb) => {
  sequence(
    'generate-svgs-index',
    cb
  )
}

exports.buildFonts = (cb) => {
  sequence(
     'generate-fonts',
     cb
   )
}

exports.buildReact = (cb) => {
  sequence(
     'generate-react',
     cb
   )
}
