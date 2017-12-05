const gutil = require('gulp-util')

module.exports = (errorObject) => {
  gutil.log(errorObject)
  // Keep gulp from hanging on this task
  if (this && typeof this.emit === 'function') this.emit('end')
}
