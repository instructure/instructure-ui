const FirefoxTarget = require('happo-target-firefox')
// const S3Uploader = require('happo-uploader-s3')

module.exports = {
  resultSummaryFilename: 'screenshots.json',

  // A function that returns an "Uploader" interface for CI.
  // (default: null)
  // uploader: () => new S3Uploader(),

  snapshotsFolder: '__screenshots__',

  targets: [
    new FirefoxTarget({
      sourceFiles: ['.happo/__build__/config.js']
    })
  ]
}
