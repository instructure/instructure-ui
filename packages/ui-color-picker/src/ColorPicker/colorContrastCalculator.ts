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
const colorContrastCalculator = (color1: string, color2: string): number => {
  const relativeLuminance1 = calculateRelativeLuminance(color1)
  const relativeLuminance2 = calculateRelativeLuminance(color2)

  return Number(
    (relativeLuminance1 > relativeLuminance2
      ? (relativeLuminance1 + 0.05) / (relativeLuminance2 + 0.05)
      : (relativeLuminance2 + 0.05) / (relativeLuminance1 + 0.05)
    ).toFixed(2)
  )
}

const calculateRelativeLuminance = (color: string): number => {
  const hexValue = color[0] === '#' ? color.slice(1) : color
  const hexCharacters = hexValue.split('')
  const shortHex = hexValue.length === 3
  const calcLuminanceComponent = (normalizedSRGB: number) =>
    normalizedSRGB <= 0.03928
      ? normalizedSRGB / 12.92
      : ((normalizedSRGB + 0.055) / 1.055) ** 2.4

  const R = calcLuminanceComponent(
    parseInt(
      shortHex
        ? `${hexCharacters[0]}${hexCharacters[0]}`
        : `${hexCharacters[0]}${hexCharacters[1]}`,
      16
    ) / 255
  )
  const G = calcLuminanceComponent(
    parseInt(
      shortHex
        ? `${hexCharacters[1]}${hexCharacters[1]}`
        : `${hexCharacters[2]}${hexCharacters[3]}`,
      16
    ) / 255
  )
  const B = calcLuminanceComponent(
    parseInt(
      shortHex
        ? `${hexCharacters[2]}${hexCharacters[2]}`
        : `${hexCharacters[4]}${hexCharacters[5]}`,
      16
    ) / 255
  )

  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export default colorContrastCalculator
