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
 * ---
 * category: utilities/themes
 * ---
 * Color utilities
 * @module color
 */
import Color from 'tinycolor2'

/**
 * Adjust the alpha transparency of a color
 * @param {String} color
 * @param {Number} percent
 * @returns {String} color as rgb string
 */
export function alpha (color, percent) {
  return Color(color).setAlpha(percent / 100).toRgbString()
}

/**
 * darken a color
 * @param {String} color
 * @param {Number} percent
 * @returns {String} color as rgb string
 */
export function darken (color, percent) {
  return Color(color).darken(percent).toRgbString()
}

/**
 * lighten a color
 * @param {String} color
 * @param {Number} percent
 * @returns {String} color as rgb string
 */
export function lighten (color, percent) {
  return Color(color).lighten(percent).toRgbString()
}

/**
 * check the contrast ratio of 2 colors
 * @param {String} color1
 * @param {String} color2
 * @returns {Number} color contrast ratio
 */
export function contrast (color1, color2) {
  return Color.readability(color1, color2)
}

/**
 * check if a string is a valid color
 * @param {String} color
 * @returns {Boolean} true if the string is a valid color
 */
export function isValid (color) {
  return Color(color).isValid()
}
