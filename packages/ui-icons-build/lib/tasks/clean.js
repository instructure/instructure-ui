const gulp = require('gulp')
const del = require('del')
const paths = require('vinyl-paths')

const config = require('../config')

gulp.task('clean', () => {
  return gulp.src([config.destination], { read: false })
    .pipe(paths(del))
})
