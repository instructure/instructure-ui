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

const { merge } = require('webpack-merge')
const baseConfig = require('@instructure/ui-webpack-config')

module.exports = ({ config }) => {
  // Storybook does not like thread-loader, see
  // https://github.com/storybookjs/storybook/issues/12864
  const rules = baseConfig.module.rules
  for (const rule of rules) {
    if (rule.use) {
      for (let i = 0; i < rule.use.length; i++) {
        if (
          rule.use[i].loader &&
          rule.use[i].loader.includes('thread-loader')
        ) {
          rule.use.splice(i, 1)
        }
      }
    }
  }
  rules.push({
    test: /\.stories\.[tj]sx?$/,
    use: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {} /* your sourceLoaderOptions here */
      }
    ],
    enforce: 'pre'
  })
  config = merge(config, baseConfig)

  // need to override this instead of merge for these...
  config.module.rules = baseConfig.module.rules
  config.optimization = baseConfig.optimization
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false
  }
  console.log(`Building Storybook...`, config.module)
  return config
}
