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
const merge = require('merge-stream')
const consolidate = require('gulp-consolidate')
const rename = require('gulp-rename')
const cheerio = require('gulp-cheerio')
const path = require('path')
const svgtojsx = require('svg-to-jsx')

const formatName = require('../../util/format-name')
const handleErrors = require('../../util/handle-errors')
const readDirectories = require('../../util/read-directories')
const config = require('../../config')

const toComponentName = function (name, variant = '') {
  return name ? formatName(config.react.componentBaseName) + formatName(name) + formatName(variant) : null
}

let GLYPHS = {}

const createMainIndexTask = function () {
  const destination = config.react.destination

  const glyphs = Object.keys(GLYPHS)
    .map((name) => {
      const glyph = Object.assign({ name }, GLYPHS[name])
      glyph.variants = Object.keys(GLYPHS[name])
        .map((variant) => {
          return Object.assign(
            {},
            GLYPHS[name][variant],
            { name: variant, path: path.relative(destination, GLYPHS[name][variant].path) }
          )
        })
      return glyph
    })

  return gulp.src(require.resolve('./main.ejs'))
    .pipe(consolidate(
      'lodash',
      { glyphs }
    ))
    .pipe(rename({ basename: 'index', extname: '.js' }))
    .on('error', handleErrors)
    .pipe(gulp.dest(destination))
}

gulp.task('generate-react-index-files', () => {
  return createMainIndexTask()
})

gulp.task('generate-react-svg-data', () => {
  const tasks = readDirectories(config.react.source)
    .map((variant) => {
      const deprecated = config.deprecated || {}
      const bidirectional = config.bidirectional || []
      return gulp.src(`${path.join(config.react.source, variant)}/*.svg`)
        .pipe(cheerio({
          run: function ($, file) {
            const $svg = $('svg')
            const baseName = path.basename(file.path, '.svg')
            const name = toComponentName(baseName)

            GLYPHS[name] = GLYPHS[name] || {}

            GLYPHS[name][variant] = {
              glyphName: baseName,
              name,
              variant,
              deprecated: toComponentName(deprecated[baseName]),
              bidirectional: bidirectional.indexOf(baseName) !== -1,
              path: path.join(config.react.destination, name + variant),
              viewBox: $svg.attr('viewBox'), // we only care about the viewBox attr
              source: svgtojsx($svg.html())
            }
          },
          parserOptions: {
            xmlMode: true
          }
        }))
        .on('error', handleErrors)
    })

  return merge(...tasks)
})

gulp.task('generate-react-components', () => {
  const tasks = readDirectories(config.react.source)
    .map((variant) => {
      const tasks = []
      Object.keys(GLYPHS).forEach((name) => {
        Object.keys(GLYPHS[name])
          .forEach((variant) => {
            const data = GLYPHS[name][variant]
            tasks.push(
              gulp.src(require.resolve('./component.ejs'))
                .pipe(consolidate('lodash', data))
                .pipe(rename({ basename: data.name + data.variant, extname: '.js' }))
                .on('error', handleErrors)
                .pipe(gulp.dest(config.react.destination))
            )
          })
      })
      return tasks
    })

  return merge(...tasks)
})

gulp.task('generate-react', gulp.series('generate-react-svg-data', 'generate-react-components', 'generate-react-index-files'))
