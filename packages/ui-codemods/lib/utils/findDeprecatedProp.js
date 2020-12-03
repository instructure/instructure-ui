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

/**
 * Find the deprecated prop for a component
 *
 * @param {object} config Deprecated property configuration
 * @param {string} comp Component name
 * @param {string} prop Property name
 * @return {object} Object if a match is found, otherwise null
 */
module.exports = function findDeprecatedProp(config, comp, prop) {
  if (config && comp && prop && config[comp]) {
    const component = config[comp]

    // Iterate versions
    const versions = Object.keys(component)
    for (let i = 0; i < versions.length; i++) {
      const props = component[versions[i]]

      // Iterate properties
      for (let j = 0; j < props.length; j++) {
        const match = props[j]

        if (prop === match.old) {
          return match
        }
      }
    }
  }

  return null
}
