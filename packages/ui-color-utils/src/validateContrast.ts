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

interface ValidatedContrasts {
  isValidNormalText: boolean
  isValidLargeText: boolean
  isValidGraphicsText: boolean
}

/**
 * ---
 * category: utilities/Color
 * ---
 * Decides if the given contrast is sufficient for different text sizes and situations.
 *
 * According to WCAG 2.2
 *
 * AA level (https://www.w3.org/TR/WCAG22/#contrast-minimum)
 * - text: 4.5:1
 * - large text: 3:1
 * - non-text: 3:1 (https://www.w3.org/TR/WCAG22/#non-text-contrast)
 *
 *
 * AAA level (https://www.w3.org/TR/WCAG22/#contrast-enhanced)
 * - text: 7:1
 * - large text: 4.5:1
 * - non-text: 3:1 (https://www.w3.org/TR/WCAG22/#non-text-contrast)
 *
 * @module validateContrast
 * @param contrast
 * @param validationLevel WCAG 2.2 validation level
 * @returns validation object
 */
const validateContrast = (
  contrast: number,
  validationLevel?: 'AA' | 'AAA'
): ValidatedContrasts => {
  return {
    isValidNormalText: contrast >= (validationLevel === 'AAA' ? 7 : 4.5),
    isValidLargeText: contrast >= (validationLevel === 'AAA' ? 4.5 : 3),
    isValidGraphicsText: contrast >= 3
  }
}

export { validateContrast }
