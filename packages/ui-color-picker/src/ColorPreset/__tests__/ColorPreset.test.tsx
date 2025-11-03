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

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { ColorPreset } from '../'
import type { ColorPresetProps } from '../props'

const testValue = {
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
  ],
  onSelect: () => {}
}

const testColorMixerSettings: ColorPresetProps['colorMixerSettings'] = {
  addNewPresetButtonScreenReaderLabel: 'Add new preset button label',
  selectColorLabel: 'Select',
  removeColorLabel: 'Remove',
  onPresetChange: () => {},
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
}

describe('<ColorPreset />', () => {
  it('should provide aria-label through the colorScreenReaderLabel prop', async () => {
    const mockScreenReaderLabel = vi.fn((hexCode) => `${hexCode}, hex code`)
    const props = {
      ...testValue,
      colorScreenReaderLabel: mockScreenReaderLabel
    }

    render(<ColorPreset {...props} />)
    const buttons = screen.getAllByRole('button')

    buttons.forEach((button, index) => {
      const expectedColor = testValue.colors[index]
      expect(button).toHaveAttribute('aria-label', `${expectedColor}, hex code`)
    })
  })

  it('should default to using the hex code as aria-label when colorScreenReaderLabel is not provided ', async () => {
    render(<ColorPreset {...testValue} />)
    const buttons = screen.getAllByRole('button')

    buttons.forEach((button, index) => {
      const expectedColor = testValue.colors[index]
      expect(button).toHaveAttribute('aria-label', `${expectedColor}`)
    })
  })

  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        <ColorPreset {...testValue} elementRef={elementRef} />
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('label prop', () => {
    it('should display title', async () => {
      render(<ColorPreset {...testValue} label="This is a title" />)

      const title = screen.getByText('This is a title')

      expect(title).toBeInTheDocument()
    })
  })

  describe('colors prop', () => {
    it('should render tooltips for all colors', async () => {
      render(<ColorPreset colors={testValue.colors} onSelect={vi.fn()} />)

      const testColors = testValue.colors
      const indicators = screen.getAllByRole('button')
      const tooltips = screen.getAllByRole('tooltip')

      expect(indicators.length).toBe(testColors.length)
      expect(tooltips.length).toBe(testColors.length)

      testColors.forEach((testColor, index) => {
        const tooltip = tooltips[index]

        expect(tooltip).toHaveTextContent(testColor)
      })
    })

    it('should not render component when colors not provided and not modifiable', async () => {
      render(<ColorPreset colors={[]} onSelect={vi.fn()} />)

      const colorPreset = document.querySelector('span[class$="-colorPreset"]')

      expect(colorPreset).not.toBeInTheDocument()
    })
  })

  describe('onSelect prop', () => {
    it('should fire with color hex when indicator clicked', async () => {
      const onSelect = vi.fn()
      render(<ColorPreset {...testValue} onSelect={onSelect} />)

      const indicators = screen.getAllByRole('button')

      await userEvent.click(indicators[1])

      expect(onSelect).toHaveBeenCalledWith(testValue.colors[1])
    })

    it('should fire with color hex when transparent indicator clicked', async () => {
      const testColor = '#12345678'
      const onSelect = vi.fn()
      render(
        <ColorPreset selected={''} colors={[testColor]} onSelect={onSelect} />
      )
      const indicators = screen.getAllByRole('button')

      await userEvent.click(indicators[0])

      expect(onSelect).toHaveBeenCalledWith(testColor)
    })

    it('should not fire when disabled prop is set', async () => {
      const onSelect = vi.fn()
      render(<ColorPreset {...testValue} disabled onSelect={onSelect} />)

      const indicators = screen.getAllByRole('button')

      await userEvent.click(indicators[1])

      expect(onSelect).not.toHaveBeenCalled()
    })
  })

  describe('colorMixerSettings prop', () => {
    it('displays "new color" button', async () => {
      render(
        <ColorPreset
          {...testValue}
          colorMixerSettings={testColorMixerSettings}
        />
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveTextContent(
        testColorMixerSettings.addNewPresetButtonScreenReaderLabel
      )
    })

    it('renders color menus for all indicators', async () => {
      render(
        <ColorPreset
          {...testValue}
          colorMixerSettings={testColorMixerSettings}
        />
      )
      const menuTriggers = document.querySelectorAll(
        'button[data-position-target^="Drilldown-Trigger_"]'
      )

      expect(menuTriggers.length).toBe(testValue.colors.length)
    })
  })

  // The accessibility tests are ignored because the tooltips of the ColorIndicator, which are defined in the "aria-labelledby" attribute, are located out of the scope of the ColorPreset.
})
