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

import { warn } from '@instructure/console/macro'

/**
 * ---
 * category: utilities/themes
 * ---
 * Create an adapter function for mapping old theme variable names to updated ones.
 *
 * @param {Object} args
 * @param {Object} args.map an object mapping of old theme variable names to new theme variable names
 * @param {String} args.version a specified version in which the old theme variable will be removed
 * @returns {Function} an adapter function that takes an object with `theme` and `displayName` properties as an argument
 */
export const createThemeAdapter = ({ map = {}, version } = {}) => {
  return ({ theme = {}, displayName } = {}) => {
    return Object.entries(theme).reduce((result, [key, value]) => {
      if (map[key]) {
        warn(false, `[${displayName}] The theme variable \`${key}\` has been changed to \`${map[key]}\`.${version
          ? ` In version ${version}, \`${key}\` will no longer work as an override. Use \`${map[key]}\` instead.`
          : ''}`
        )

        return { ...result, [map[key]]: value }
      }

      return { ...result, [key]: value }
    }, {})
  }
}