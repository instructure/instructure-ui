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
import generateIconFonts from './generate-icon-fonts.js'
import generateLegacyIconsData from './generate-legacy-icons-data.js'
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
    yargs.option('skipOptimization', {
      boolean: true,
      desc: 'skip SVGO optimization (temporary workaround)',
      default: false
    })
  },
  handler: async (argv) => {
    const configFile = path.join(process.cwd(), argv.config)
    const configFileURL = pathToFileURL(configFile)
    const config = await import(configFileURL)
    const svgSourceDir = path.join(process.cwd(), config.source)
    const svgoConfigFile =
      argv.svgoConfig && path.join(process.cwd(), argv.svgoConfig)
    const svgoConfigOption = svgoConfigFile ? ['--config', svgoConfigFile] : []

    // TODO: SVGO optimization temporarily skippable during pnpm migration
    // The build-icons script runs SVGO which modifies all 648 SVG files in-place,
    // causing massive git diffs. This is a pre-existing issue. The --skipOptimization
    // flag allows bootstrap to generate icon components without modifying source SVGs.
    // To re-enable: remove --skipOptimization flag and ensure all SVGs are optimized
    // in master first (separate PR).
    if (!argv.skipOptimization) {
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
    }

    // cleanup before generating output
    if (fs.existsSync(config.destination)) {
      fs.rmSync(config.destination, { recursive: true, force: true })
    }
    fs.mkdirSync(config.destination)

    // directories for icon fonts
    const fantasticonBaseDir = `${config.destination}icon-font`
    const fantasticonLineDir = fantasticonBaseDir + '/Line'
    const fantasticonSolidDir = fantasticonBaseDir + '/Solid'
    fs.mkdirSync(fantasticonBaseDir)
    fs.mkdirSync(fantasticonLineDir)
    fs.mkdirSync(fantasticonSolidDir)

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

    // generate icon fonts: Line
    generateIconFonts({
      inputDir: `${svgSourceDir}/Line`,
      outputDir: fantasticonLineDir,
      name: 'InstructureIcons-Line',
      prefix: 'icon-line'
    })

    // generate icon fonts: Solid
    generateIconFonts({
      inputDir: `${svgSourceDir}/Solid`,
      outputDir: fantasticonSolidDir,
      name: 'InstructureIcons-Solid',
      prefix: 'icon-solid'
    })

    // generate legacy icons data for documentation
    generateLegacyIconsData(process.cwd())
  }
}
