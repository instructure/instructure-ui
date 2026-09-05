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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import { colorToRGB } from '@instructure/ui-color-utils'
import { ColorPreset } from '@instructure/ui-color-picker/latest'
import type { ColorPresetProps } from '@instructure/ui-color-picker/latest'

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

    await render(<ColorPreset {...props} />)
    const buttons = page.getByRole('button').elements()

    buttons.forEach((button, index) => {
      const expectedColor = testValue.colors[index]
      expect(button).toHaveAttribute('aria-label', `${expectedColor}, hex code`)
    })
  })

  it('should default to using the hex code as aria-label when colorScreenReaderLabel is not provided', async () => {
    await render(<ColorPreset {...testValue} />)
    const buttons = page.getByRole('button').elements()

    buttons.forEach((button, index) => {
      const expectedColor = testValue.colors[index]
      expect(button).toHaveAttribute('aria-label', `${expectedColor}`)
    })
  })

  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = vi.fn()
      const { container } = await render(
        <ColorPreset {...testValue} elementRef={elementRef} />
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('label prop', () => {
    it('should display title', async () => {
      await render(<ColorPreset {...testValue} label="This is a title" />)

      const title = page.getByText('This is a title').element()

      expect(title).toBeInTheDocument()
    })
  })

  describe('colors prop', () => {
    it('should render tooltips for all colors', async () => {
      await render(<ColorPreset colors={testValue.colors} onSelect={vi.fn()} />)

      const testColors = testValue.colors
      const indicators = page.getByRole('button').elements()
      // queried directly: hidden tooltips are not in the a11y tree
      const tooltips = document.querySelectorAll('[role="tooltip"]')

      expect(indicators.length).toBe(testColors.length)
      expect(tooltips.length).toBe(testColors.length)

      testColors.forEach((testColor, index) => {
        const tooltip = tooltips[index]

        expect(tooltip).toMatchTextContent(testColor)
      })
    })

    it('should not render component when colors not provided and not modifiable', async () => {
      await render(<ColorPreset colors={[]} onSelect={vi.fn()} />)

      const colorPreset = document.querySelector('span[class$="-colorPreset"]')

      expect(colorPreset).not.toBeInTheDocument()
    })
  })

  describe('onSelect prop', () => {
    it('should fire with color hex when indicator clicked', async () => {
      const onSelect = vi.fn()
      await render(<ColorPreset {...testValue} onSelect={onSelect} />)

      const indicators = page.getByRole('button').elements()

      await userEvent.click(indicators[1])

      await vi.waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith(testValue.colors[1])
      })
    })

    it('should fire with color hex when transparent indicator clicked', async () => {
      const testColor = '#12345678'
      const onSelect = vi.fn()
      await render(
        <ColorPreset selected={''} colors={[testColor]} onSelect={onSelect} />
      )
      const indicators = page.getByRole('button').elements()

      await userEvent.click(indicators[0])

      await vi.waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith(testColor)
      })
    })

    it('should not fire when disabled prop is set', async () => {
      const onSelect = vi.fn()
      await render(<ColorPreset {...testValue} disabled onSelect={onSelect} />)

      const indicators = page.getByRole('button').elements()

      // `force` because Playwright refuses to click disabled elements
      await userEvent.click(indicators[1], { force: true })

      await vi.waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })
  })

  describe('colorMixerSettings prop', () => {
    it('displays "new color" button', async () => {
      await render(
        <ColorPreset
          {...testValue}
          colorMixerSettings={testColorMixerSettings}
        />
      )
      const buttons = page.getByRole('button').elements()

      expect(buttons[0]).toMatchTextContent(
        testColorMixerSettings.addNewPresetButtonScreenReaderLabel
      )
    })

    it('renders color menus for all indicators', async () => {
      await render(
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

  it('should display color indicators for all colors', async () => {
    await render(<ColorPreset colors={testValue.colors} onSelect={vi.fn()} />)

    const indicators = document.querySelectorAll(
      'div[role="presentation"][class$="-colorIndicator"]'
    )

    expect(indicators.length).toBe(testValue.colors.length)

    indicators.forEach((indicator, index) => {
      const expectedColor = colorToRGB(testValue.colors[index])
      const boxShadow = getComputedStyle(indicator).boxShadow
      const colorValue = boxShadow.split(')')[0] + ')'

      expect(colorToRGB(colorValue)).toEqual(expectedColor)
    })
  })

  it('empty string should leave all unselected', async () => {
    await render(<ColorPreset {...testValue} selected="" />)

    expect(
      document.querySelector('button[aria-label="selected"]')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('div[class$="__selectedIndicator"]')
    ).not.toBeInTheDocument()
  })

  it('should select proper color', async () => {
    const testableColor = testValue.colors[6]
    await render(<ColorPreset {...testValue} selected={testableColor} />)

    const selectedButton = document
      .querySelector('[class*="selectedIndicator"]')!
      .closest('button')!
    const indicator = selectedButton.querySelector(
      'div[role="presentation"][class$="-colorIndicator"]'
    )!
    const boxShadow = getComputedStyle(indicator).boxShadow
    const colorValue = boxShadow.split(')')[0] + ')'

    expect(colorToRGB(colorValue)).toEqual(colorToRGB(testableColor))
  })

  it('shows menu on indicator click', async () => {
    await render(
      <ColorPreset {...testValue} colorMixerSettings={testColorMixerSettings} />
    )
    const indicators = document.querySelectorAll(
      'div[role="presentation"][class$="-colorIndicator"]'
    )

    // an earlier test may have left the pointer over another indicator, whose
    // tooltip would then cover the one we want to click
    await userEvent.unhover(indicators[0])
    await userEvent.click(indicators[5])

    await vi.waitFor(() => {
      expect(
        document.querySelector('div[id^=DrilldownHeader-Title]')
      ).toMatchTextContent(testValue.colors[5])
    })

    const menu = document.querySelector('div[role="menu"]')!

    expect(menu).toMatchTextContent(testColorMixerSettings!.selectColorLabel!)
    expect(menu).toMatchTextContent(testColorMixerSettings!.removeColorLabel!)
  })

  it('should allow adding presets', async () => {
    const onPresetChange = vi.fn()
    await render(
      <ColorPreset
        {...testValue}
        colorMixerSettings={{ ...testColorMixerSettings!, onPresetChange }}
      />
    )

    await userEvent.click(
      document.querySelector('div[class$="addNewPresetButton"]')!
    )

    const footer = document.querySelector('div[class$="popoverFooter"]')!
    const addButton = Array.from(footer.querySelectorAll('button')).find(
      (button) => button.textContent?.includes('Add')
    )!

    await userEvent.click(addButton)

    // Adding a preset calls onPresetChange with the new color prepended to the
    // existing colors array.
    await vi.waitFor(() => {
      expect(onPresetChange).toHaveBeenCalledTimes(1)
      expect(onPresetChange.mock.lastCall![0]).toHaveLength(
        testValue.colors.length + 1
      )
    })
  })

  it('should allow removing presets', async () => {
    const onPresetChange = vi.fn()
    await render(
      <ColorPreset
        {...testValue}
        colorMixerSettings={{ ...testColorMixerSettings!, onPresetChange }}
      />
    )
    const lastColorIndex = testValue.colors.length - 1
    const expectedColors = testValue.colors.slice(0, -1)
    const indicators = document.querySelectorAll(
      'div[role="presentation"][class$="-colorIndicator"]'
    )

    await userEvent.click(indicators[lastColorIndex])
    await userEvent.click(page.getByRole('menuitem', { name: 'Remove' }))

    await vi.waitFor(() => {
      expect(onPresetChange).toHaveBeenCalledWith(expectedColors)
    })
  })

  it('should allow selecting presets', async () => {
    const testableIdx = 3
    const onSelect = vi.fn()
    await render(
      <ColorPreset
        {...testValue}
        onSelect={onSelect}
        colorMixerSettings={testColorMixerSettings}
      />
    )
    const indicators = document.querySelectorAll(
      'div[role="presentation"][class$="-colorIndicator"]'
    )

    await userEvent.click(indicators[testableIdx])
    await userEvent.click(page.getByRole('menuitem', { name: 'Select' }))

    await vi.waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(testValue.colors[testableIdx])
    })
  })
})
