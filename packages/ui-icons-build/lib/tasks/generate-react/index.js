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
const sequence = require('run-sequence')
const consolidate = require('gulp-consolidate')
const rename = require('gulp-rename')
const cheerio = require('gulp-cheerio')
const path = require('path')
const babel = require('gulp-babel')
const svgtojsx = require('svg-to-jsx')

const formatName = require('../../util/format-name')
const handleErrors = require('../../util/handle-errors')
const readDirectories = require('../../util/read-directories')
const config = require('../../config')

const toComponentName = function (name, variant = '') {
  return name ? formatName(config.react.componentBaseName) + formatName(name) + formatName(variant) : null
}

let GLYPHS = {}

const createReactSvgDataTask = function (variant) {
  const key = `react-svg-data-${variant}`
  const deprecated = config.deprecated || {}

  gulp.task(key, () => {
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
            path: path.join(config.react.destination, variant, name),
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

  return key
}

const createReactComponentTask = function (data) {
  const key = `react-component-${data.name}--${data.variant}`

  gulp.task(key, () => {
    return gulp.src(require.resolve('./component.ejs'))
      .pipe(consolidate('lodash', data))
      .pipe(rename({ basename: data.name, extname: '.js' }))
      .on('error', handleErrors)
      .pipe(gulp.dest(path.join(config.react.tmp, data.variant)))
  })
  return key
}

const createReactComponentsTasks = function () {
  const tasks = []

  Object.keys(GLYPHS).forEach((name) => {
    Object.keys(GLYPHS[name])
      .forEach((variant) => {
        tasks.push(createReactComponentTask(GLYPHS[name][variant]))
      })
  })

  return tasks
}

const createMainIndexTask = function () {
  const key = 'react-index-main'
  const destination = config.react.destination

  const glyphs = Object.keys(GLYPHS)
    .map((name) => {
      const variants = Object.keys(GLYPHS[name])
        .map((variant) => {
          const glyph = GLYPHS[name][variant]
          return `${glyph.variant}: require('./${path.relative(destination, glyph.path)}').default`
        })
        .join(',\n  ')

      return `${name}: {\n  ${variants}\n}`
    })

  gulp.task(key, () => {
    return gulp.src(require.resolve('./index.ejs'))
      .pipe(consolidate(
        'lodash',
        { glyphs: glyphs.join(',\n') }
      ))
      .pipe(rename({ basename: 'index', extname: '.js' }))
      .on('error', handleErrors)
      .pipe(gulp.dest(destination))
  })

  return key
}

const createVariantIndexTask = function (variant) {
  const key = `react-index-${variant}`
  const destination = path.join(config.react.destination, variant)

  const glyphs = Object.keys(GLYPHS).map((name) => {
    const glyph = GLYPHS[name][variant]
    return `  ${glyph.name}: require('./${path.relative(destination, glyph.path)}').default`
  })

  gulp.task(key, () => {
    return gulp.src(require.resolve('./index.ejs'))
      .pipe(consolidate(
        'lodash',
        { glyphs: glyphs.join(',\n') }
      ))
      .pipe(rename({ basename: 'index', extname: '.js' }))
      .on('error', handleErrors)
      .pipe(gulp.dest(destination))
  })

  return key
}

const createReactTranspileTask = function () {
  const key = 'react-lib-transpile'

  gulp.task(key, () => {
    return gulp.src(`${config.react.tmp}**/*.js`)
      .pipe(babel())
      .pipe(gulp.dest(config.react.destination))
  })

  return key
}

gulp.task('generate-react-svg-data', (cb) => {
  const variants = readDirectories(config.react.source)
  const tasks = []

  GLYPHS = {} // clear the global glyphs object

  variants.forEach((variant) => {
    tasks.push(createReactSvgDataTask(variant))
  })

  sequence(tasks, cb)
})

gulp.task('generate-react', ['generate-react-svg-data'], (cb) => {
  const indexTasks = [createMainIndexTask()]
  const variants = readDirectories(config.react.source)

  variants.forEach((variant) => {
    indexTasks.push(createVariantIndexTask(variant))
  })

  sequence(
    createReactComponentsTasks(),
    [createReactTranspileTask()],
    indexTasks,
    cb
  )
})
