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
import type { StoryConfig } from '@instructure/ui-test-utils'
import type { ColorPickerProps } from '../props'

export default {
  propValues: {
    colorMixerSettings: [
      undefined,
      {
        popoverAddButtonLabel: 'Add',
        popoverCloseButtonLabel: 'Cancel',
        colorMixer: {
          withAlpha: false,
          rgbRedInputScreenReaderLabel: 'Input field for red',
          rgbGreenInputScreenReaderLabel: 'Input field for green',
          rgbBlueInputScreenReaderLabel: 'Input field for blue',
          rgbAlphaInputScreenReaderLabel: 'Input field for alpha'
        },
        colorPreset: {
          label: 'Choose a nice color',
          colors: [
            '#ffffff',
            '#0CBF94',
            '#0C89BF00',
            '#BF0C6D',
            '#BF8D0C',
            '#ff0000',
            '#576A66',
            '#35423A',
            '#35423F'
          ]
        },
        colorContrast: {
          firstColor: '#FFFF00',
          label: 'Color Contrast Ratio',
          successLabel: 'PASS',
          failureLabel: 'FAIL',
          normalTextLabel: 'Normal text',
          largeTextLabel: 'Large text',
          graphicsTextLabel: 'Graphics text',
          firstColorLabel: 'Background',
          secondColorLabel: 'Foreground'
        }
      }
    ]
  },
  getComponentProps: () => {
    return {
      value: '#BF876F',
      onChange: () => {},
      label: 'Color Input',
      placeholderText: 'Enter HEX',
      tooltip: 'example',
      popoverButtonScreenReaderLabel: 'Open color mixer popover'
    }
  }
} as StoryConfig<ColorPickerProps>
