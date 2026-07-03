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

const fs = require('fs')
const path = require('path')
const readPkgUp = require('read-pkg-up')

class Package {
  /**
   * @param pkg {Object} the parsed package.json contents
   * @param location {string} the directory containing the package.json
   */
  constructor(pkg, location) {
    this._pkg = pkg
    this._location = location
  }

  get name() {
    return this._pkg.name
  }

  get location() {
    return this._location
  }

  get private() {
    return Boolean(this._pkg.private)
  }

  get version() {
    return this._pkg.version
  }

  set version(version) {
    this._pkg.version = version
  }

  get manifestLocation() {
    return path.join(this._location, 'package.json')
  }

  /**
   * Write manifest changes back to disk
   * @returns {Promise<Package>} resolves when the write finishes
   */
  async serialize() {
    await fs.promises.writeFile(
      this.manifestLocation,
      JSON.stringify(this._pkg, null, 2) + '\n'
    )
    return this
  }
}

exports.Package = Package

/**
 * @param [options] {readPkgUp.NormalizeOptions}
 */
exports.getPackage = function getPackage(options) {
  const result = readPackage(options)
  return new Package(result.packageJson, path.dirname(result.path))
}

/**
 * Reads a package.json
 * @param [options] {readPkgUp.NormalizeOptions}
 * @returns {readPkgUp.NormalizedPackageJson}
 */
exports.getPackageJSON = function getPackageJSON(options) {
  return readPackage(options).packageJson
}

exports.getPackagePath = function getPackagePath(options) {
  return readPackage(options).path
}

/**
 * Returns the closest Node project in the path upward
 * @param options {readPkgUp.NormalizeOptions}
 * @returns {readPkgUp.NormalizedReadResult}
 */
function readPackage(options) {
  const opts = {
    cwd: process.cwd(),
    normalize: false,
    ...options
  }
  return readPkgUp.sync({
    cwd: fs.realpathSync(opts.cwd),
    normalize: opts.normalize
  })
}
exports.readPackage = readPackage
