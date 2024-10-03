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
import { runCommandSync } from '@instructure/command-utils'
import path from 'path'
import fs from 'fs'
import process from 'process'
import getGlyphData from './get-glyph-data.js'
import generateReactComponents from './generate-react-components.js'
import generateSvgIndex from './generate-svg-index.js'
import { pathToFileURL } from 'url'

export default {
  command: 'build-icons',
  desc: 'build icons',
  builder: (yargs) => {
    yargs.option('config', {
      string: true,
      desc: 'icon config file',
      demandOption: true
    })
    yargs.option('svgoConfig', { string: true, desc: 'svgo config file' })
  },
  handler: async (argv) => {
    const configFile = path.join(process.cwd(), argv.config)
    const configFileURL = pathToFileURL(configFile)
    const config = await import(configFileURL)
    const svgSourceDir = path.join(process.cwd(), config.source)
    const svgoConfigFile =
      argv.svgoConfig && path.join(process.cwd(), argv.svgoConfig)
    const svgoConfigOption = svgoConfigFile ? ['--config', svgoConfigFile] : []

    // optimize svgs in place
    runCommandSync('svgo', [
      '--quiet',
      '--recursive',
      '--folder',
      svgSourceDir,
      '--output',
      svgSourceDir,
      ...svgoConfigOption
    ])

    // cleanup before generating output
    if (fs.existsSync(config.destination)) {
      fs.rmSync(config.destination, { recursive: true, force: true })
    }
    fs.mkdirSync(config.destination)

    const glyphs = getGlyphData(
      svgSourceDir,
      config.deprecated,
      config.bidirectional,
      config.react.componentBaseName
    )

    // generate svg index
    generateSvgIndex(glyphs, config.destination)
    //    - output: ui-icons/__build__/svg/index.js
    //    - fields: variant, glyphName, src (svg), deprecated

    // generate react components
    generateReactComponents(glyphs, config.destination)
  }
}
