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

'use client'
import React, { useState } from 'react'
import {
  ColorContrast as cc,
  ColorIndicator as ci,
  ColorMixer as cm,
  ColorPreset as cp,
  ColorPicker as cpk
} from '@instructure/ui/latest'

const ColorContrast = cc as any
const ColorIndicator = ci as any
const ColorMixer = cm as any
const ColorPreset = cp as any
const ColorPicker = cpk as any

export default function ColorPickerPage() {
  const value = '#328DCFC2'
  const [selected, setSelected] = useState('')
  const [pickerValue, setPickerValue] = useState('#FF0000')
  const [colors, setColors] = useState([
    '#ffffff',
    '#0CBF94',
    '#0C89BF00',
    '#BF0C6D',
    '#BF8D0C',
    '#ff0000',
    '#576A66',
    '#35423A',
    '#35423F'
  ])
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <ColorContrast
        firstColor="#FF0000"
        secondColor="#FFFF00"
        label="Color Contrast Ratio"
        successLabel="PASS"
        failureLabel="FAIL"
        normalTextLabel="Normal text"
        largeTextLabel="Large text"
        graphicsTextLabel="Graphics text"
        firstColorLabel="Background"
        secondColorLabel="Foreground"
      />
      <ColorContrast
        withoutColorPreview
        firstColor="#35423A"
        secondColor="#0CBF94"
        label="Contrast Ratio"
        successLabel="PASS"
        failureLabel="FAIL"
        normalTextLabel="Normal text"
        largeTextLabel="Large text"
        graphicsTextLabel="Graphics text"
        validationLevel="AA"
      />
      <span>ColorIndicator:</span>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ColorIndicator
          color="#FF0000"
          aria-label="Selected color: red"
          shape="rectangle"
        />
        <ColorIndicator
          color="rgba(12, 191, 148, 0.5)"
          aria-label="Selected color: teal with 50 percent opacity"
        />
        <ColorIndicator
          color="transparent"
          aria-label="Selected color: transparent"
        />
      </div>
      <div style={{ display: 'flex' }}>
        <ColorMixer
          withAlpha
          value="#328DCFC2"
          onChange={(val: string) => null}
          rgbRedInputScreenReaderLabel="Input field for red"
          rgbGreenInputScreenReaderLabel="Input field for green"
          rgbBlueInputScreenReaderLabel="Input field for blue"
          rgbAlphaInputScreenReaderLabel="Input field for alpha"
          colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
          alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
          colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
        />
        <div
          style={{
            width: '100px',
            height: '160px',
            borderRadius: '4px',
            backgroundColor: value,
            marginLeft: '25px',
            boxSizing: 'border-box',
            borderStyle: 'solid',
            borderColor: 'rgba(56, 74, 88, 0.6)'
          }}
        >
          {value}
        </div>
      </div>
      <ColorMixer
        disabled
        withAlpha
        value="#328DCFC2"
        onChange={() => {}}
        rgbRedInputScreenReaderLabel="Input field for red"
        rgbGreenInputScreenReaderLabel="Input field for green"
        rgbBlueInputScreenReaderLabel="Input field for blue"
        rgbAlphaInputScreenReaderLabel="Input field for alpha"
        colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
        alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
        colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
      />
      <ColorPreset
        label="Choose a color"
        colors={colors}
        selected={selected}
        onSelect={setSelected}
        colorScreenReaderLabel={(hexCode: string, isSelected: boolean) =>
          `color with hex code ${hexCode}${isSelected ? ' selected' : ''}`
        }
      />

      <ColorPreset
        colors={colors}
        selected={selected}
        onSelect={setSelected}
        colorMixerSettings={{
          addNewPresetButtonScreenReaderLabel: 'Add new preset button label',
          selectColorLabel: 'Select',
          removeColorLabel: 'Remove',
          onPresetChange: setColors,
          popoverAddButtonLabel: 'Add',
          popoverCloseButtonLabel: 'Cancel',
          colorMixer: {
            rgbRedInputScreenReaderLabel: 'Input field for red',
            rgbGreenInputScreenReaderLabel: 'Input field for green',
            rgbBlueInputScreenReaderLabel: 'Input field for blue',
            rgbAlphaInputScreenReaderLabel: 'Input field for alpha',
            colorSliderNavigationExplanationScreenReaderLabel: `You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
            alphaSliderNavigationExplanationScreenReaderLabel: `You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
            colorPaletteNavigationExplanationScreenReaderLabel: `You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
          },
          colorContrast: {
            firstColor: '#FF0000',
            label: 'Color Contrast Ratio',
            successLabel: 'PASS',
            failureLabel: 'FAIL',
            normalTextLabel: 'Normal text',
            largeTextLabel: 'Large text',
            graphicsTextLabel: 'Graphics text',
            firstColorLabel: 'Background',
            secondColorLabel: 'Foreground'
          }
        }}
        colorScreenReaderLabel={(hexCode: string, isSelected: boolean) =>
          `color with hex code ${hexCode}${isSelected ? ' selected' : ''}`
        }
      />

      <h2 data-test-id="colorpicker-scrollable-title">
        ColorPicker with Scrollable Popover
      </h2>
      <p>
        This ColorPicker has a tall popover with all three sections (ColorMixer,
        ColorPreset, and ColorContrast). When opened near the bottom of the
        viewport, the popover should be scrollable.
      </p>
      <div
        style={{ marginTop: '50vh' }}
        data-test-id="colorpicker-scrollable-container"
      >
        <ColorPicker
          label="Color"
          placeholderText="Enter HEX"
          value={pickerValue}
          onChange={(newValue: string) => setPickerValue(newValue)}
          popoverButtonScreenReaderLabel="View and choose color"
          popoverScreenReaderLabel="Color picker popup"
          colorMixerSettings={{
            popoverAddButtonLabel: 'Apply',
            popoverCloseButtonLabel: 'Cancel',
            colorMixer: {
              withAlpha: true,
              rgbRedInputScreenReaderLabel: 'Input field for red',
              rgbGreenInputScreenReaderLabel: 'Input field for green',
              rgbBlueInputScreenReaderLabel: 'Input field for blue',
              rgbAlphaInputScreenReaderLabel: 'Input field for alpha',
              colorSliderNavigationExplanationScreenReaderLabel: `You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              alphaSliderNavigationExplanationScreenReaderLabel: `You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              colorPaletteNavigationExplanationScreenReaderLabel: `You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
            },
            colorPreset: {
              label: 'Preset Colors',
              colors: [
                '#FF0000',
                '#00FF00',
                '#0000FF',
                '#FFFF00',
                '#FF00FF',
                '#00FFFF',
                '#000000',
                '#FFFFFF',
                '#808080'
              ]
            },
            colorContrast: {
              firstColor: '#FFFFFF',
              label: 'Color Contrast Ratio',
              successLabel: 'PASS',
              failureLabel: 'FAIL',
              normalTextLabel: 'Normal text',
              largeTextLabel: 'Large text',
              graphicsTextLabel: 'Graphics text',
              firstColorLabel: 'Background',
              secondColorLabel: 'Foreground'
            }
          }}
        />
      </div>
    </main>
  )
}
