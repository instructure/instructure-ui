/* eslint no-var: 0 */
'use strict'

module.exports = function config (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      './test/tests.bundle.js'
    ],

    preprocessors: {
      '**/*.bundle.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['chrome_without_security', 'Firefox'],

    customLaunchers: {
      chrome_without_security: {
        base: 'Chrome',
        flags: [
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate',

          // This is necessary in order to get useful error messages that
          // happen outside of the test suites (e.g, script load errors).
          //
          // Without this flag, we get the dreaded "Script Error." message with
          // no explanation, and that is due to the cross-origin policies (since
          // karma loads our tests files using socket.io from another "origin").
          //
          // Additional reading:
          //
          //   - https://github.com/karma-runner/karma/issues/543
          //   - https://bugs.webkit.org/show_bug.cgi?id=70574
          //   - https://groups.google.com/forum/#!topic/angular/VeqlVgUa6Wo
          //
          '--disable-web-security',
          '--no-sandbox'
        ]
      }
    },

    captureTimeout: 60000,

    singleRun: false,

    webpack: require('./webpack/test.config'),

    webpackServer: {
      progress: false,
      stats:  {
        hash: false,            // the hash of the compilation
        version: false,         // webpack version info
        timings: true,          // timing info
        assets: true,           // assets info
        chunks: false,          // chunk info
        colors: true,           // with console colors
        chunkModules: false,    // built modules info to chunk info
        modules: false,         // built modules info
        cached: false,          // also info about cached (not built) modules
        reasons: false,         // info about the reasons modules are included
        source: false,          // the source code of modules
        errorDetails: true,     // details to errors (like resolving log)
        chunkOrigins: false,    // the origins of chunks and chunk merging info
        modulesSort: '',        // (string) sort the modules by that field
        chunksSort: '',         // (string) sort the chunks by that field
        assetsSort: ''          // (string) sort the assets by that field
      },
      debug: true,
      noInfo: true,
      quiet: false
    }
  })
}
