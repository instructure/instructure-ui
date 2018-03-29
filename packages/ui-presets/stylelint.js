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

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [ 'stylelint-suitcss', 'stylelint-declaration-strict-value' ],
  rules: {
    'suitcss/custom-property-no-outside-root': true,
    'suitcss/root-no-standard-properties': true,
    'suitcss/selector-root-no-composition': true,

    'scale-unlimited/declaration-strict-value': [[ 'z-index' ]],

    'block-no-empty': null,
    'unit-blacklist': ['px'],
    'color-no-hex': true,
    'color-named': 'never',
    'declaration-no-important': true,
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'max-nesting-depth': [ 2, {
      ignore: ['blockless-at-rules']
    }],
    'number-max-precision': 4,
    'string-quotes': 'double',
    'time-min-milliseconds': 100,
    'no-unknown-animations': true,

    'selector-max-class': 2,
    'selector-max-id': 0,
    'selector-max-type': 0,
    'selector-max-universal': 0,
    'selector-no-vendor-prefix': true,
    'selector-class-pattern': '^[a-z]+[a-zA-Z0-9\\-]*[a-zA-Z0-9]*$'
  }
}
