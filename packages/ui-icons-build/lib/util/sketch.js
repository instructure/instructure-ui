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
const { spawn }     = require('child_process')
const through     = require('through2')
const fs          = require('fs')
const path        = require('path')
const temporary   = require('temporary')
const cleanSketch = require('clean-sketch')
const recursive   = require('recursive-readdir')
const rimraf      = require('rimraf')
const which = require('which')
const PluginError = require('plugin-error')
const Vinyl = require('vinyl')

const PLUGIN_NAME = '[ui-icons-build]'
const APP_PATH    = '/Applications/Sketch.app'
const TOOL_PATH   = `${ APP_PATH }/Contents/Resources/sketchtool/bin/sketchtool`

const yesOrNo = val => (val === true) || (val === 'Yes') || (val === 'yes') || (val === 'YES')

const checkSketchTool = (function() {
  let cmnd = '' // cache of path/to/sketchtool
  return function() {
    if (cmnd) { return Promise.resolve(cmnd) }
    return new Promise(function(resolve, reject) {
      // Check the tool bundled with Sketch.app (>= ver 3.5)
      return fs.access(TOOL_PATH, fs.F_OK, function(err) {
        if (!err) {
          resolve(TOOL_PATH)
          return
        }
        // Check the tool installed via install.sh
        return which('sketchtool', function(err2, pathTo) {
          if (err2) {
            return reject(new PluginError(PLUGIN_NAME, 'No sketchtool installed.'))
          } else {
            cmnd = pathTo
            return resolve(cmnd)
          }
        })
      })
    })
  }
})()

module.exports = function(options) {
  // build a command with arguments
  // eslint-disable-next-line
  if (options == null) { options = {} }
  const args = []
  if (options.export) {
    args.push('export')
    args.push(options.export)
  }
  if (options.trimmed) { args.push(`--trimmed=${options.trimmed}`) }
  if (options.compression) { args.push(`--compression=${options.compression}`) }
  if (options.scales) { args.push(`--scales=${options.scales}`) }
  if (options.formats) { args.push(`--formats=${options.formats}`) }
  if (options.item) { args.push(`--item=${options.item}`) }
  if (yesOrNo(options.progressive)) { args.push('--progressive') }
  if (yesOrNo(options.compact)) { args.push('--compact') }
  if (options.background) { args.push(`--background=${options.background}`) }
  if (yesOrNo(options.groupContentsOnly)) { args.push('--group-contents-only') }
  if (options.items) { args.push(`--items=${options.items}`) }
  if (yesOrNo(options.saveForWeb)) { args.push('--save-for-web') }
  if (options.bounds) { args.push(`--bounds=${options.bounds}`) }

  // eslint-disable-next-line
  options.clean = yesOrNo(options.clean)

  return through.obj(function(file, encoding, callback) {
    // stream?
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      return callback()
    }

    return checkSketchTool()
    .catch(function(err) {
      this.emit('error', err)
      return callback()}).then(cmnd => {
      // file_name.sketch is a directory (=3.0)
      // file_name.sketch is a file (>3.1)

      const src = file.path
      const tmp_dir = new temporary.Dir()

      // Output JSON
      if (options.outputJSON) {
        args.push(`--outputJSON=${tmp_dir.path}/${options.outputJSON}`)
      }

      // SketchTool
      const program = spawn(cmnd, args.concat(src, `--output=${tmp_dir.path}`))

      // Verbose Output
      program.stdout.on('data', function(data) {
        if (options.verbose) {
          // eslint-disable-next-line
          return console.log(data.toString())
        }
      })

      // return data
      return program.stdout.on('end', () => {
        return recursive(tmp_dir.path, (err, files) => {
          for (let abs_path of Array.from(files)) {
            const rel_path = path.relative(tmp_dir.path, abs_path)
            const f = new Vinyl({
              cwd: file.cwd,
              base: file.base,
              path: path.join(file.base, rel_path)
            })
            let b = fs.readFileSync(abs_path)
            if (options.clean && /\.svg$/.test(rel_path)) { b = new Buffer(cleanSketch(b.toString())) }
            f.contents = b
            this.push(f)
          }
          return rimraf(tmp_dir.path, () => callback())
        })
      })
    })
  })
}
