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
const iconfont = require('gulp-iconfont')
const consolidate = require('gulp-consolidate')
const rename = require('gulp-rename')
const path = require('path')

const formatName = require('../../util/format-name')
const readDirectories = require('../../util/read-directories')
const config = require('../../config')
const handleErrors = require('../../util/handle-errors')

const GLYPHS = {}

const toComponentName = function (name, variant = '') {
  return name ? formatName(config.react.componentBaseName) + formatName(name) + formatName(variant) : null
}

const createFontTask = function (variant) {
  const destination = path.normalize(config.fonts.destination + variant)
  const fontName = `${formatName(config.fonts.fontName)}-${formatName(variant)}`
  const formats = config.fonts.formats
  const variantClassName = `${config.fonts.className}-${variant.toLowerCase()}`
  const deprecated = config.deprecated || {}
  const bidirectional = config.bidirectional || []

  return gulp.src(`${config.fonts.source + variant}/*.svg`)
    // generate font
    .pipe(iconfont({
      svg: true,
      fontName,
      formats
    }))
    .on('glyphs', (glyphs) => {
      const options = {
        glyphs: glyphs.map((glyph) => {
          const codepoint = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
          const name = toComponentName(glyph.name)
          const glyphClassName = `${config.fonts.className}-${glyph.name}`

          const classes = [variantClassName, glyphClassName]

          GLYPHS[name] = GLYPHS[name] || {}

          GLYPHS[name][variant] = {
            glyphName: glyph.name,
            cssFile: `${fontName}.css`,
            codepoint,
            className: glyphClassName,
            classes: classes,
            bidirectional: bidirectional.includes(glyph.name),
            deprecated: !!deprecated[glyph.name]
          }

          return GLYPHS[name][variant]
        }),
        variant: variant.toLowerCase(),
        fontName,
        className: variantClassName
      }
      // build css
      gulp.src(require.resolve('./css.ejs'))
        .pipe(consolidate('lodash', options))
        .on('error', handleErrors)
        .pipe(rename({ basename: fontName, extname: '.css' }))
        .pipe(gulp.dest(destination))
      // build sass map with icon names and font unicode characters
      gulp.src(require.resolve('./scss.ejs'))
        .pipe(consolidate('lodash', options))
        .on('error', handleErrors)
        .pipe(rename({ basename: `${fontName}_icon-map`, extname: '.scss' }))
        .pipe(gulp.dest(destination))
    })
    .on('error', handleErrors)
    .pipe(gulp.dest(destination))
}

gulp.task('generate-font-index-files', (cb) => {
  const glyphs = Object.keys(GLYPHS)
    .map((glyph) => {
      return {
        name: glyph,
        variants: Object.keys(GLYPHS[glyph])
          .map((variant) => {
            const data = Object.assign({ variant }, GLYPHS[glyph][variant])
            return {
              name: variant,
              json: JSON.stringify(data, undefined, 2)
            }
          })
      }
    })
  return gulp.src(require.resolve('./index.ejs'))
    .pipe(consolidate('lodash', { glyphs: glyphs, json: JSON.stringify(GLYPHS, undefined, 2) }))
    .pipe(rename({ basename: 'index', extname: '.js' }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.fonts.destination))
})

gulp.task('generate-font-files', () => {
  const tasks = readDirectories(config.fonts.source)
    .map((variant) => {
      return createFontTask(variant)
    })

  return merge(...tasks)
})

gulp.task('generate-fonts', gulp.series('generate-font-files', 'generate-font-index-files'))
