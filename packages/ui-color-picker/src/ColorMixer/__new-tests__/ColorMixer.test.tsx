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

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { deepEqual } from '@instructure/ui-utils'
import conversions from '@instructure/ui-color-utils'

import { ColorMixer } from '../'
import ColorMixerExamples from '../__examples__/ColorMixer.examples'

const testValue = {
  value: '#09918B'
}

const edgeColorValues = {
  'Black, solid': '#000000FF',
  'White, solid': '#FFFFFFFF',
  'Black, transparent': '#00000000',
  'White, transparent': '#FFFFFF00'
}

const differentHexColorValues = {
  3: '#abc',
  4: '#abcd',
  6: '#abcdef',
  8: '#abcdefaa'
}

const testInputLabels = {
  rgbRedInputScreenReaderLabel: 'Input field for red',
  rgbGreenInputScreenReaderLabel: 'Input field for green',
  rgbBlueInputScreenReaderLabel: 'Input field for blue',
  rgbAlphaInputScreenReaderLabel: 'Input field for alpha'
}

const testScreenReaderLabels = {
  colorSliderNavigationExplanationScreenReaderLabel: `You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
  alphaSliderNavigationExplanationScreenReaderLabel: `You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
  colorPaletteNavigationExplanationScreenReaderLabel: `You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
}

describe('<ColorMixer />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
  })

  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
          elementRef={elementRef}
        />
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('labels are displayed:', () => {
    it('should render input labels', async () => {
      const { container } = render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          withAlpha
          onChange={vi.fn()}
        />
      )
      const labelElement = container.querySelectorAll(
        '[class*="-screenReaderContent"]'
      )
      expect(labelElement.length).toBe(4)

      Object.entries(testInputLabels).forEach(([_label, text], index) => {
        expect(labelElement[index]).toHaveTextContent(text)
      })
    })

    it('should render explanation labels', async () => {
      render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          withAlpha
          onChange={vi.fn()}
        />
      )
      const sliders = screen.getAllByRole('slider')
      const palette = screen.getByRole('button')

      expect(sliders[0]).toHaveAttribute(
        'aria-label',
        testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel
      )
      expect(sliders[1]).toHaveAttribute(
        'aria-label',
        testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
      )
      expect(palette).toHaveAttribute(
        'aria-label',
        testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel
      )
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    describe('with generated examples', () => {
      const generatedComponents = generateA11yTests(
        ColorMixer,
        ColorMixerExamples
      )

      it.each(generatedComponents)(
        'should be accessible with example: $description',
        async ({ content }) => {
          const { container } = render(content)
          const axeCheck = await runAxeCheck(container)
          expect(axeCheck).toBe(true)
        }
      )
    })
  })

  describe('edge cases for color value', () => {
    Object.entries(edgeColorValues).forEach(([label, color]) => {
      it(label, async () => {
        render(
          <ColorMixer
            value={color}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={vi.fn()}
          />
        )

        const inputs = screen.getAllByRole('textbox')
        const [r, g, b, a] = inputs.map((input) =>
          Number(input.getAttribute('value'))
        )
        const colorHex = conversions.colorToHex8({ r, g, b, a })
        expect(colorHex).toBe(color)
      })
    })

    Object.entries(differentHexColorValues).forEach(([length, color]) => {
      it(`mount with ${length}-character hex color`, async () => {
        const colorInput = color
        render(
          <ColorMixer
            value={colorInput}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={vi.fn()}
          />
        )

        const inputs = screen.getAllByRole('textbox')
        const [r, g, b, a] = inputs.map((input) =>
          Number(input.getAttribute('value'))
        )
        const rgba = conversions.colorToRGB(colorInput)
        rgba.a = Math.round(rgba.a * 100)
        expect(deepEqual(rgba, { r, g, b, a })).toBe(true)
      })
    })

    it('mount with invalid hex color', async () => {
      render(
        <ColorMixer
          value="#GGGGGGGG"
          {...testInputLabels}
          {...testScreenReaderLabels}
          withAlpha
          onChange={vi.fn()}
        />
      )

      const inputs = screen.getAllByRole('textbox')
      const [r, g, b, a] = inputs.map((input: any) =>
        Number(input.getAttribute('value'))
      )
      const colorHex = conversions.colorToHex8({ r, g, b, a })
      expect(colorHex).toBe('#000000FF')

      await waitFor(() => {
        expect(consoleWarningMock.mock.calls[0][0]).toEqual(
          expect.stringContaining(
            'Warning: [ColorMixer] The passed color value is not valid.'
          )
        )
      })
    })
  })

  describe('hue slider', () => {
    it('should not call onChange when the `tab` key is pressed', async () => {
      const onChange = vi.fn()
      render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const colorSlider = screen.getByRole('slider', {
        name: testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel
      })

      colorSlider.focus()
      await userEvent.tab()

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('onChange should not be call when component is disabled', async () => {
      const onChange = vi.fn()
      render(
        <ColorMixer
          disabled
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const colorSlider = screen.getByRole('slider', {
        name: testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel
      })

      await userEvent.type(colorSlider, '{arrowright}')

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('alpha slider', () => {
    it('should not call onChange when a `tab` key press is received', async () => {
      const onChange = vi.fn()
      render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = screen.getByRole('slider', {
        name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
      })

      alphaSlider.focus()
      await userEvent.tab()

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('should not call onChange when the component is disabled', async () => {
      const onChange = vi.fn()
      render(
        <ColorMixer
          withAlpha
          disabled
          value="#000"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const alphaSlider = screen.getByRole('slider', {
        name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
      })

      await userEvent.type(alphaSlider, '{arrowright}')

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('the alpha slider does not show when withAlpha is false', async () => {
      const onChange = vi.fn()

      render(
        <ColorMixer
          withAlpha={false}
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = screen.queryByRole('slider', {
        name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
      })

      expect(alphaSlider).not.toBeInTheDocument()
    })

    it('the alpha slider does not show when withAlpha is not set', async () => {
      const onChange = vi.fn()

      render(
        <ColorMixer
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = screen.queryByRole('slider', {
        name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
      })

      expect(alphaSlider).not.toBeInTheDocument()
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      const onChange = vi.fn()

      render(
        <ColorMixer
          withAlpha
          disabled
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = screen.queryByRole('slider', {
        name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
      })

      expect(alphaSlider).toHaveAttribute('disabled')
    })
  })

  describe('color palette', () => {
    it('should set the disabled attribute when `disabled` is set', async () => {
      const onChange = vi.fn()

      render(
        <ColorMixer
          withAlpha
          disabled
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const colorPalette = screen.queryByRole('button', {
        name: testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel
      })

      expect(colorPalette).toHaveAttribute('disabled')
    })
  })

  describe('color input', () => {
    it('the alpha input exsits when `withAlpha` is set', async () => {
      const { container } = render(
        <ColorMixer
          withAlpha
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const alphaInput = container.querySelector(
        'span[class$="-RGBAInput__aInput"]'
      )
      const alphaInputScreenReaderLabel = screen.getByText(
        testInputLabels.rgbAlphaInputScreenReaderLabel
      )

      expect(alphaInput).toBeInTheDocument()
      expect(alphaInputScreenReaderLabel).toBeInTheDocument()
    })

    it('the alpha input does not exsit when `withAlpha` is not set', async () => {
      const { container } = render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const alphaInput = container.querySelector(
        'span[class$="-RGBAInput__aInput"]'
      )
      const alphaInputScreenReaderLabel = screen.queryByText(
        testInputLabels.rgbAlphaInputScreenReaderLabel
      )

      expect(alphaInput).not.toBeInTheDocument()
      expect(alphaInputScreenReaderLabel).not.toBeInTheDocument()
    })

    it('should not call onChange when `disabled` is set and get the input', async () => {
      const fakeValue = '234234'
      const onChange = vi.fn()
      render(
        <ColorMixer
          disabled
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[0], fakeValue)
      await userEvent.type(inputs[1], fakeValue)
      await userEvent.type(inputs[2], fakeValue)
      await userEvent.type(inputs[3], fakeValue)

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('should set the disabled attribute when `disabled` and `withAlpha` is set', async () => {
      render(
        <ColorMixer
          disabled
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(4)

      inputs.forEach((input) => {
        expect(input).toHaveAttribute('disabled')
      })
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      render(
        <ColorMixer
          disabled
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(3)

      inputs.forEach((input) => {
        expect(input).toHaveAttribute('disabled')
      })
    })

    it('should not accept letter character', async () => {
      const invalidColor = 'adfafas'
      render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[0], invalidColor)
      await userEvent.type(inputs[1], invalidColor)
      await userEvent.type(inputs[2], invalidColor)
      await userEvent.type(inputs[3], invalidColor)

      await waitFor(() => {
        expect(inputs[0]).not.toHaveValue(invalidColor)
        expect(inputs[1]).not.toHaveValue(invalidColor)
        expect(inputs[2]).not.toHaveValue(invalidColor)
        expect(inputs[3]).not.toHaveValue(invalidColor)
      })
    })

    it('should not accept negative value', async () => {
      const invalidColor = '-10'
      render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[0], invalidColor)
      await userEvent.type(inputs[1], invalidColor)
      await userEvent.type(inputs[2], invalidColor)
      await userEvent.type(inputs[3], invalidColor)

      await waitFor(() => {
        expect(inputs[0]).not.toHaveValue(invalidColor)
        expect(inputs[1]).not.toHaveValue(invalidColor)
        expect(inputs[2]).not.toHaveValue(invalidColor)
        expect(inputs[3]).not.toHaveValue(invalidColor)
      })
    })

    it('should not accept value that bigger than 255', async () => {
      const invalidColor = '300'
      render(
        <ColorMixer
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(3)

      await userEvent.type(inputs[0], invalidColor)
      await userEvent.type(inputs[1], invalidColor)
      await userEvent.type(inputs[2], invalidColor)

      await waitFor(() => {
        expect(inputs[0]).not.toHaveValue(invalidColor)
        expect(inputs[1]).not.toHaveValue(invalidColor)
        expect(inputs[2]).not.toHaveValue(invalidColor)
      })
    })

    it('for alpha input, should not accept value that bigger than 100', async () => {
      const invalidColor = '101'
      render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[3], invalidColor)

      await waitFor(() => {
        expect(inputs[3]).not.toHaveValue(invalidColor)
      })
    })
  })
})
