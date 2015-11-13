/* eslint no-var: 0 */
'use strict'

module.exports = function config (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      './tests/tests.bundle.js'
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
          '--disable-translate'
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
