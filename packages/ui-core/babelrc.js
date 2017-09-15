const path = require('path')

const webpack = Boolean(process.env.WEBPACK)
const coverage = Boolean(process.env.COVERAGE)

module.exports = {
  presets: [[ require('@instructure/ui-config/babel/preset'), {
    themeable: !webpack,
    coverage
  }]]
}
