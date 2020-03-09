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

import { functionalColors } from '@instructure/canvas-theme'

const defaultMappings = {
  brand: '#5FA635',
  link: '#5FA635',
  electric: '#3098FA',
  shamrock: '#5FA635',
  barney: '#9B51E0',
  crimson: '#EC0F06',
  fire: '#FE6106',
  licorice: '#333333',
  oxford: '#666666',
  ash: '#999999',
  slate: '#CCCCCC',
  tiara: '#DDDDDD',
  porcelain: '#F5F5F5',
  white: '#FFFFFF',
}

/**
 * The `electric` and `shamrock` colors meet the 3:1 contrast ratio requirement
 * for `backgroundLightest`, but not `backgroundLight`. The following "fully
 * accessible" values meet this additional requirement and should be used where
 * applicable.
 */
const fullyAccessibleBrand = '#589B31'
const fullyAccessibleInfo = '#1F90F9'

const webColors = {
  webColorOrange: '#CC6600',
  webColorRed: '#CC3300',
  webColorGreen: '#336600',
  webColorAqua: '#006666',
  webColorBlue: '#006699',
  webColorViolet: '#9933CC',
  webColorPurple: '#6600CC',
  webColorPink: '#CC00CC',
  webColorBrown: '#663300',
  webColorBurgundy: '#660000',
}

const masteryLevels = {
  masteryLevelExceedsMastery: defaultMappings.electric,
  masteryLevelMastery: defaultMappings.shamrock,
  masteryLevelNearMastery: '#FBB918',
  masteryLevelRemediation: defaultMappings.crimson,
}

let {
  values,
  text,
  background,
  border
} = functionalColors(defaultMappings)

values = {
  ...values,
  fullyAccessibleBrand,
  fullyAccessibleInfo,
  ...webColors,
  ...masteryLevels,
}

text = {
  ...text,
  textBrand: fullyAccessibleBrand,
  textDark: defaultMappings.oxford,
  textInfo: defaultMappings.electric,
}

background = {
  ...background,
  backgroundDark: defaultMappings.oxford,
  backgroundInfo: defaultMappings.electric,
}

border = {
  ...border,
  borderBrand: fullyAccessibleBrand,
  borderDark: '#888888',
  borderInfo: fullyAccessibleInfo,
  borderSuccess: fullyAccessibleBrand,
}

const colors = Object.freeze({
  ...values,
  ...text,
  ...background,
  ...border,
  values,
  text,
  background,
  border,
})

export default colors
export { colors }
