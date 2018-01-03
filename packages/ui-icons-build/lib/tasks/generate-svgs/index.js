const gulp = require('gulp')
const sketch = require('gulp-sketch')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const changed = require('gulp-changed')
const rename = require('gulp-rename')
const sequence = require('run-sequence')
const consolidate = require('gulp-consolidate')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const which = require('which')

const handleErrors = require('../../util/handle-errors')
const config = require('../../config')
const formatName = require('../../util/format-name')

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

  return gulp.src(require.resolve('./index.ejs'))
    .pipe(
      consolidate('lodash', { glyphs: JSON.stringify(glyphs, undefined, 2) })
    )
    .pipe(rename({ basename: 'index', extname: '.js' }))
    .on('error', handleErrors)
    .pipe(gulp.dest(destination))
})

gulp.task('generate-svgs-from-sketch', () => {
  try {
    which.sync('sketchtool')
  } catch (error) {
    handleErrors(error)
    return
  }

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

gulp.task('generate-svgs', (cb) => {
  sequence(['generate-svgs-from-sketch'], 'generate-svg-glyph-data', cb)
})
