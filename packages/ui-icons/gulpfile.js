const gulp = require('gulp')
const {
  exportFromSketch,
  buildSVGs,
  buildFonts,
  buildReact,
  buildAll
} = require('@instructure/ui-icons-build')

gulp.task('export', exportFromSketch)

gulp.task('build:svgs', buildSVGs)
gulp.task('build:fonts', buildFonts)
gulp.task('build:react', buildReact)
gulp.task('build', buildAll)

gulp.task('watch', () => {
  gulp.watch('./src/**/*.sketch', ['build'])
})

gulp.task('default', [ 'build:fonts', 'build:react', 'build:svgs' ])
