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
  rules: {
    'at-rule-empty-line-before': [
      'always', {
        except: ['first-nested', 'blockless-after-blockless']
      } ],
    'at-rule-no-vendor-prefix': true,

    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-space-before': 'always',

    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,

    'comment-empty-line-before': [ 'always', {
      except: ['first-nested'],
      ignore: ['stylelint-commands', 'after-comment']
    } ],
    'comment-whitespace-inside': 'always',

    'declaration-no-important': true,
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',

    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',

    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,

    'function-calc-no-unspaced-operator': true,
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',

    indentation: 2,

    'length-zero-no-unit': true,

    'max-line-length': [ 120, {
      ignore: 'non-comments'
    } ],

    'max-nesting-depth': 3,

    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',
    'media-feature-parentheses-space-inside': 'never',

    'no-eol-whitespace': true,

    'no-invalid-double-slash-comments': true,
    'no-missing-end-of-source-newline': true,
    'no-unknown-animations': true,

    'number-leading-zero': 'always',

    'number-max-precision': 4,

    'property-no-vendor-prefix': true,

    'rule-empty-line-before': [ 'always', { ignore: ['inside-block', 'after-comment'] } ],

    'selector-class-pattern': '^[a-z]+[a-zA-Z0-9\\-]*[a-zA-Z0-9]*$',

    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',

    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-space-before': 'never',

    'selector-max-id': 0,
    'selector-max-type': 0,
    'selector-max-universal': 0,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'double',

    'string-no-newline': true,
    'string-quotes': 'double',

    'time-min-milliseconds': 100,

    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-no-vendor-prefix': true
  }
}
