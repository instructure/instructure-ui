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

const gulp = require('gulp')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const changed = require('gulp-changed')
const rename = require('gulp-rename')
const consolidate = require('gulp-consolidate')
const path = require('path')
const glob = require('glob')
const fs = require('fs')

const handleErrors = require('../../util/handle-errors')
const config = require('../../config')
const formatName = require('../../util/format-name')
const sketch = require('../../util/sketch')

const toComponentName = function (name, variant = '') {
  return name ? formatName(config.react.componentBaseName) + formatName(name) + formatName(variant) : null
}

gulp.task('generate-svgs-index', (cb) => {
  const glyphs = {}
  const destination = path.join(config.destination, 'svg/')
  const deprecated = config.deprecated || {}

  glob.sync(path.normalize(`${config.svg.destination}/**/*.svg`)).forEach((file) => {
    const baseName = path.basename(file, '.svg')
    const name = toComponentName(baseName)
    const variant = path.basename(path.dirname(file))

    glyphs[name] = glyphs[name] || {}

    glyphs[name][variant] = {
      glyphName: baseName,
      src: fs.readFileSync(file, 'utf8'),
      deprecated: !!deprecated[baseName]
    }
  })

  const glyphExports = Object.keys(glyphs)
    .map((glyph) => {
      return {
        name: glyph,
        variants: Object.keys(glyphs[glyph])
          .map((variant) => {
            const data = Object.assign({ variant }, glyphs[glyph][variant])
            return {
              name: variant,
              json: JSON.stringify(data, undefined, 2)
            }
          })
      }
    })

  return gulp.src(require.resolve('./index.ejs'))
    .pipe(
      consolidate('lodash', {
        glyphs: glyphExports,
        json: JSON.stringify(glyphs, undefined, 2)
      })
    )
    .pipe(rename({ basename: 'index', extname: '.js' }))
    .on('error', handleErrors)
    .pipe(gulp.dest(destination))
})

gulp.task('generate-svgs-from-sketch', () => {
  return gulp.src(config.svg.source)
    .pipe(changed(config.svg.destination))
    // export svgs from sketch source
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    // optimize svgs
    .pipe(svgmin({
      js2svg: { pretty: true },
      plugins: [
        { removeDimensions: true },
        { removeViewBox: false },
        { removeDesc: true },
        { removeTitle: true },
        { removeRasterImages: true },
        { cleanupNumericValues: false },
        { removeUnknownsAndDefaults: false },
        { removeUselessStrokeAndFill: false },
        { convertStyleToAttrs: true }
      ]
    }))
    // clean up fills
    .pipe(cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill')
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.svg.destination))
})

gulp.task('generate-svgs', gulp.series('generate-svgs-from-sketch', 'generate-svgs-index'))
