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
import { ColorMixer } from '@instructure/ui'
import { useState } from 'react'

const COLOR_MIXER_IUI = () => {
  const [value, setValue] = useState('#ff0')
  return (
    <ColorMixer
      withAlpha
      value={value}
      onChange={(value) => setValue(value)}
      rgbRedInputScreenReaderLabel="Input field for red"
      rgbGreenInputScreenReaderLabel="Input field for green"
      rgbBlueInputScreenReaderLabel="Input field for blue"
      rgbAlphaInputScreenReaderLabel="Input field for alpha"
      colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
      alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
      colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
    />
  )
}

export default COLOR_MIXER_IUI
