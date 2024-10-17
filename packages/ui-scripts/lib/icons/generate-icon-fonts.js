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

import { generateFonts } from 'fantasticon'

const config = {
  // inputDir: './src/icons',  // Directory where SVG files are located
  // outputDir: './dist/fonts',  // Directory where fonts will be generated
  // prefix: 'icon',  // Prefix for icon CSS classes
  // name: 'my-icon-font',  // Name of the generated font
  fontTypes: ['woff2'], // Font formats to generate
  assetTypes: ['css'], // Additional assets like CSS, HTML preview
  normalize: true // Normalize SVG sizes
}

export default function generateIconFonts({
  inputDir,
  outputDir,
  prefix,
  name
}) {
  generateFonts({ ...config, inputDir, outputDir, prefix, name })
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log('Icon font generated:', result)
    })
    .catch((error) => {
      console.error('Error generating icon font:', error)
    })
}
