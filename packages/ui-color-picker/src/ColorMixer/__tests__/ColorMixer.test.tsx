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
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { deepEqual } from '@instructure/ui-utils'
import conversions from '@instructure/ui-color-utils'

import { ColorMixer } from '@instructure/ui-color-picker/latest'

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
      const { container } = await render(
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
      const { container } = await render(
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
        expect(labelElement[index]).toMatchTextContent(text)
      })
    })

    it('should render explanation labels', async () => {
      await render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          withAlpha
          onChange={vi.fn()}
        />
      )
      const sliders = page.getByRole('slider').elements()
      const palette = page.getByRole('button').element()

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
      const { container } = await render(
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
  })

  describe('edge cases for color value', () => {
    Object.entries(edgeColorValues).forEach(([label, color]) => {
      it(label, async () => {
        await render(
          <ColorMixer
            value={color}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={vi.fn()}
          />
        )

        const inputs = page.getByRole('textbox').elements()
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
        await render(
          <ColorMixer
            value={colorInput}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={vi.fn()}
          />
        )

        const inputs = page.getByRole('textbox').elements()
        const [r, g, b, a] = inputs.map((input) =>
          Number(input.getAttribute('value'))
        )
        const rgba = conversions.colorToRGB(colorInput)
        rgba.a = Math.round(rgba.a * 100)
        expect(deepEqual(rgba, { r, g, b, a })).toBe(true)
      })
    })

    it('mount with invalid hex color', async () => {
      await render(
        <ColorMixer
          value="#GGGGGGGG"
          {...testInputLabels}
          {...testScreenReaderLabels}
          withAlpha
          onChange={vi.fn()}
        />
      )

      const inputs = page.getByRole('textbox').elements()
      const [r, g, b, a] = inputs.map((input: any) =>
        Number(input.getAttribute('value'))
      )
      const colorHex = conversions.colorToHex8({ r, g, b, a })
      expect(colorHex).toBe('#000000FF')

      await vi.waitFor(() => {
        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(
            'Warning: [ColorMixer] The passed color value is not valid.'
          ),
          expect.anything()
        )
      })
    })
  })

  describe('hue slider', () => {
    it('should not call onChange when the `tab` key is pressed', async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const colorSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel
        })
        .element()

      colorSlider.focus()
      await userEvent.tab()

      await vi.waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('onChange should not be call when component is disabled', async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          disabled
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const colorSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel
        })
        .element()

      await userEvent.type(colorSlider, '{arrowright}')

      await vi.waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('alpha slider', () => {
    it('should not call onChange when a `tab` key press is received', async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
        })
        .element()

      alphaSlider.focus()
      await userEvent.tab()

      await vi.waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('should not call onChange when the component is disabled', async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          withAlpha
          disabled
          value="#000"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const alphaSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
        })
        .element()

      await userEvent.type(alphaSlider, '{arrowright}')

      await vi.waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('the alpha slider does not show when withAlpha is false', async () => {
      const onChange = vi.fn()

      await render(
        <ColorMixer
          withAlpha={false}
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
        })
        .query()

      expect(alphaSlider).not.toBeInTheDocument()
    })

    it('the alpha slider does not show when withAlpha is not set', async () => {
      const onChange = vi.fn()

      await render(
        <ColorMixer
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
        })
        .query()

      expect(alphaSlider).not.toBeInTheDocument()
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      const onChange = vi.fn()

      await render(
        <ColorMixer
          withAlpha
          disabled
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const alphaSlider = page
        .getByRole('slider', {
          name: testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel
        })
        .query()

      expect(alphaSlider).toHaveAttribute('disabled')
    })
  })

  describe('color palette', () => {
    it('should set the disabled attribute when `disabled` is set', async () => {
      const onChange = vi.fn()

      await render(
        <ColorMixer
          withAlpha
          disabled
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const colorPalette = page
        .getByRole('button', {
          name: testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel
        })
        .query()

      expect(colorPalette).toHaveAttribute('disabled')
    })
  })

  describe('color input', () => {
    it('the alpha input exsits when `withAlpha` is set', async () => {
      const { container } = await render(
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
      const alphaInputScreenReaderLabel = page
        .getByText(testInputLabels.rgbAlphaInputScreenReaderLabel)
        .element()

      expect(alphaInput).toBeInTheDocument()
      expect(alphaInputScreenReaderLabel).toBeInTheDocument()
    })

    it('the alpha input does not exsit when `withAlpha` is not set', async () => {
      const { container } = await render(
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
      const alphaInputScreenReaderLabel = page
        .getByText(testInputLabels.rgbAlphaInputScreenReaderLabel)
        .query()

      expect(alphaInput).not.toBeInTheDocument()
      expect(alphaInputScreenReaderLabel).not.toBeInTheDocument()
    })

    it('should not call onChange when `disabled` is set and get the input', async () => {
      const fakeValue = '234234'
      const onChange = vi.fn()
      await render(
        <ColorMixer
          disabled
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[0], fakeValue)
      await userEvent.type(inputs[1], fakeValue)
      await userEvent.type(inputs[2], fakeValue)
      await userEvent.type(inputs[3], fakeValue)

      await vi.waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('should set the disabled attribute when `disabled` and `withAlpha` is set', async () => {
      await render(
        <ColorMixer
          disabled
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(4)

      inputs.forEach((input) => {
        expect(input).toHaveAttribute('disabled')
      })
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      await render(
        <ColorMixer
          disabled
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(3)

      inputs.forEach((input) => {
        expect(input).toHaveAttribute('disabled')
      })
    })

    it('should not accept letter character', async () => {
      const invalidColor = 'adfafas'
      await render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[0], invalidColor)
      await userEvent.type(inputs[1], invalidColor)
      await userEvent.type(inputs[2], invalidColor)
      await userEvent.type(inputs[3], invalidColor)

      await vi.waitFor(() => {
        expect(inputs[0]).not.toHaveValue(invalidColor)
        expect(inputs[1]).not.toHaveValue(invalidColor)
        expect(inputs[2]).not.toHaveValue(invalidColor)
        expect(inputs[3]).not.toHaveValue(invalidColor)
      })
    })

    it('should not accept negative value', async () => {
      const invalidColor = '-10'
      await render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[0], invalidColor)
      await userEvent.type(inputs[1], invalidColor)
      await userEvent.type(inputs[2], invalidColor)
      await userEvent.type(inputs[3], invalidColor)

      await vi.waitFor(() => {
        expect(inputs[0]).not.toHaveValue(invalidColor)
        expect(inputs[1]).not.toHaveValue(invalidColor)
        expect(inputs[2]).not.toHaveValue(invalidColor)
        expect(inputs[3]).not.toHaveValue(invalidColor)
      })
    })

    it('should not accept value that bigger than 255', async () => {
      const invalidColor = '300'
      await render(
        <ColorMixer
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(3)

      await userEvent.type(inputs[0], invalidColor)
      await userEvent.type(inputs[1], invalidColor)
      await userEvent.type(inputs[2], invalidColor)

      await vi.waitFor(() => {
        expect(inputs[0]).not.toHaveValue(invalidColor)
        expect(inputs[1]).not.toHaveValue(invalidColor)
        expect(inputs[2]).not.toHaveValue(invalidColor)
      })
    })

    it('for alpha input, should not accept value that bigger than 100', async () => {
      const invalidColor = '101'
      await render(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={vi.fn()}
        />
      )
      const inputs = page.getByRole('textbox').elements()
      expect(inputs.length).toBe(4)

      await userEvent.type(inputs[3], invalidColor)

      await vi.waitFor(() => {
        expect(inputs[3]).not.toHaveValue(invalidColor)
      })
    })
  })

  const hueSlider = () =>
    document.querySelector<HTMLElement>(
      `[role="slider"][aria-label="${testScreenReaderLabels.colorSliderNavigationExplanationScreenReaderLabel}"]`
    )!

  const alphaSlider = () =>
    document.querySelector<HTMLElement>(
      `[role="slider"][aria-label="${testScreenReaderLabels.alphaSliderNavigationExplanationScreenReaderLabel}"]`
    )!

  const palette = () =>
    document.querySelector<HTMLElement>(
      `[role="button"][aria-label="${testScreenReaderLabels.colorPaletteNavigationExplanationScreenReaderLabel}"]`
    )!

  const sliderIndicator = (slider: HTMLElement) =>
    slider.querySelector('[class*=-colorMixerSlider__indicator]')!

  const paletteIndicator = () =>
    palette().querySelector('[class*=-ColorPalette__indicator]')!

  // the component maps pointer coordinates against this inner element, so
  // clicks are positioned relative to it
  const paletteSurface = () =>
    document.querySelector<HTMLElement>('[class*=-ColorPalette__palette]')!

  it('should change hue value when click at the middle of the slider', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const slider = hueSlider()
    const rect = slider.getBoundingClientRect()

    await userEvent.click(slider, {
      position: { x: rect.width / 2, y: rect.height / 2 }
    })

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('should change hue value when click at the end of the slider', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const slider = hueSlider()
    const rect = slider.getBoundingClientRect()

    await userEvent.click(slider, {
      position: { x: rect.width - 1, y: rect.height / 2 }
    })

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  it('should change hue value when click at the beginning of the slider', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        value="#00FF00"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const slider = hueSlider()
    const rect = slider.getBoundingClientRect()

    await userEvent.click(slider, {
      position: { x: 1, y: rect.height / 2 }
    })

    // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })

  for (const key of ['a', 'd', '{ArrowLeft}', '{ArrowRight}']) {
    it(`should hue value change with '${key}' key pressed`, async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      hueSlider().focus()
      await userEvent.keyboard(key)

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(2)
      })
    })
  }

  it('the hue indicator move left', async () => {
    await render(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const slider = hueSlider()
    const indicator = sliderIndicator(slider)
    const pos1 = indicator.getBoundingClientRect().x

    slider.focus()
    await userEvent.keyboard('a')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toBeLessThan(pos1)

    await userEvent.keyboard('{ArrowLeft}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toBeLessThan(pos2)
  })

  it('the hue indicator move right', async () => {
    await render(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const slider = hueSlider()
    const indicator = sliderIndicator(slider)
    const pos1 = indicator.getBoundingClientRect().x

    slider.focus()
    await userEvent.keyboard('d')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toBeGreaterThan(pos1)

    await userEvent.keyboard('{ArrowRight}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toBeGreaterThan(pos2)
  })

  it('should not move the hue indicator when reach the left border', async () => {
    await render(
      <ColorMixer
        value={conversions.colorToHex8({ h: 0, s: 0.5, v: 0.5 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const slider = hueSlider()
    const indicator = sliderIndicator(slider)
    const pos1 = indicator.getBoundingClientRect().x

    slider.focus()
    await userEvent.keyboard('a')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toEqual(pos1)

    await userEvent.keyboard('{ArrowLeft}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toEqual(pos2)
  })

  it('should not move the hue indicator when reach the right border', async () => {
    await render(
      <ColorMixer
        value="#FF0001"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const slider = hueSlider()

    // Initial positioning to reach the right end of the slider
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{ArrowRight}')

    const indicator = sliderIndicator(slider)
    const pos1 = indicator.getBoundingClientRect().x

    slider.focus()
    await userEvent.keyboard('d')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toEqual(pos1)

    await userEvent.keyboard('{ArrowRight}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toEqual(pos2)
  })

  it('should change alpha value when click at the beginning of the bar', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        withAlpha
        value="#abcdefff"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const slider = alphaSlider()
    const rect = slider.getBoundingClientRect()

    await userEvent.click(slider, { position: { x: 1, y: rect.height / 2 } })

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })

  it('should change alpha value when click at the end of the bar', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        withAlpha
        value="#000000cc"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const slider = alphaSlider()
    const rect = slider.getBoundingClientRect()

    await userEvent.click(slider, {
      position: { x: rect.width - 1, y: rect.height / 2 }
    })

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })

  it('should change alpha value when click at the middle of the slider', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        withAlpha
        value="#00000000"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const slider = alphaSlider()
    const rect = slider.getBoundingClientRect()

    await userEvent.click(slider, {
      position: { x: rect.width / 2, y: rect.height / 2 }
    })

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })

  for (const key of ['{ArrowRight}', '{ArrowLeft}', 'a', 'd']) {
    it(`should alpha value change with '${key}' key pressed`, async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          withAlpha
          value="#000000AA"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      alphaSlider().focus()
      await userEvent.keyboard(key)

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(2)
      })
    })
  }

  it('should not move the alpha indicator when reach the left border', async () => {
    await render(
      <ColorMixer
        withAlpha
        value="#80404100"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const slider = alphaSlider()
    const indicator = sliderIndicator(slider)
    const pos1 = indicator.getBoundingClientRect().x

    slider.focus()
    await userEvent.keyboard('a')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toEqual(pos1)

    await userEvent.keyboard('{ArrowLeft}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toEqual(pos2)
  })

  it('should not move the alpha indicator when reach the right border', async () => {
    await render(
      <ColorMixer
        withAlpha
        value="#804041FF"
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const slider = alphaSlider()
    const indicator = sliderIndicator(slider)
    const pos1 = indicator.getBoundingClientRect().x

    slider.focus()
    await userEvent.keyboard('d')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toEqual(pos1)

    await userEvent.keyboard('{ArrowRight}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toEqual(pos2)
  })

  it('should palette change the color when mousedown event is received inside the palette', async () => {
    const onChange = vi.fn()
    await render(
      <ColorMixer
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={onChange}
      />
    )
    const surface = paletteSurface()
    const rect = surface.getBoundingClientRect()

    await userEvent.click(surface, {
      position: { x: rect.width / 2, y: rect.height / 2 }
    })

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('#783A3AFF')
    })
  })

  const paletteClickPositions: [
    string,
    (rect: DOMRect) => { x: number; y: number }
  ][] = [
    ['the top border', (rect) => ({ x: rect.width / 2, y: 1 })],
    [
      'the bottom border',
      (rect) => ({ x: rect.width / 2, y: rect.height - 4 })
    ],
    ['the left border', (rect) => ({ x: 1, y: rect.height / 2 })],
    ['the right border', (rect) => ({ x: rect.width - 2, y: rect.height / 2 })],
    ['the top left corner', () => ({ x: 1, y: 1 })],
    ['the top right corner', (rect) => ({ x: rect.width - 2, y: 1 })],
    [
      'the bottom right corner',
      (rect) => ({ x: rect.width - 4, y: rect.height - 4 })
    ],
    ['the bottom left corner', (rect) => ({ x: 2, y: rect.height - 2 })]
  ]

  for (const [name, getPosition] of paletteClickPositions) {
    it(`should palette change the color when mousedown event is received at ${name}`, async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const surface = paletteSurface()

      await userEvent.click(surface, {
        position: getPosition(surface.getBoundingClientRect())
      })

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })
  }

  for (const key of [
    'a',
    'w',
    's',
    'd',
    '{ArrowLeft}',
    '{ArrowRight}',
    '{ArrowUp}',
    '{ArrowDown}'
  ]) {
    it(`should onChange is call when the palette receive event from keyboard '${key}'`, async () => {
      const onChange = vi.fn()
      await render(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      palette().focus()
      await userEvent.keyboard(key)

      // use `toHaveBeenCalledTimes(2)` because it is called first time when passing `testValue` color
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(2)
      })
    })
  }

  it('should palette indicator moves up when receive the ArrowUp or w keyboard event', async () => {
    await render(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().y

    palette().focus()
    await userEvent.keyboard('w')
    const pos2 = indicator.getBoundingClientRect().y
    expect(pos2).toBeLessThan(pos1)

    await userEvent.keyboard('{ArrowUp}')
    const pos3 = indicator.getBoundingClientRect().y
    expect(pos3).toBeLessThan(pos2)
  })

  it('should palette indicator moves down when receive the ArrowDown or s keyboard event', async () => {
    await render(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().y

    palette().focus()
    await userEvent.keyboard('s')
    const pos2 = indicator.getBoundingClientRect().y
    expect(pos2).toBeGreaterThan(pos1)

    await userEvent.keyboard('{ArrowDown}')
    const pos3 = indicator.getBoundingClientRect().y
    expect(pos3).toBeGreaterThan(pos2)
  })

  it('should palette indicator moves left when receive the ArrowLeft or a keyboard event', async () => {
    await render(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().x

    palette().focus()
    await userEvent.keyboard('a')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toBeLessThan(pos1)

    await userEvent.keyboard('{ArrowLeft}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toBeLessThan(pos2)
  })

  it('should palette indicator moves right when receive the ArrowRight or d keyboard event', async () => {
    await render(
      <ColorMixer
        {...testValue}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().x

    palette().focus()
    await userEvent.keyboard('d')
    const pos2 = indicator.getBoundingClientRect().x
    expect(pos2).toBeGreaterThan(pos1)

    await userEvent.keyboard('{ArrowRight}')
    const pos3 = indicator.getBoundingClientRect().x
    expect(pos3).toBeGreaterThan(pos2)
  })

  it('should palette indicator does not move up when it reach the top border', async () => {
    await render(
      <ColorMixer
        value={conversions.colorToHex8({ h: 200, s: 0.5, v: 1, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().y

    palette().focus()
    await userEvent.keyboard('w')
    expect(indicator.getBoundingClientRect().y).toEqual(pos1)

    await userEvent.keyboard('{ArrowUp}')
    expect(indicator.getBoundingClientRect().y).toEqual(pos1)
  })

  it('should palette indicator does not move down when it reach the bottom border', async () => {
    await render(
      <ColorMixer
        value={conversions.colorToHex8({ h: 200, s: 0.5, v: 0, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().y

    palette().focus()
    await userEvent.keyboard('s')
    expect(indicator.getBoundingClientRect().y).toEqual(pos1)

    await userEvent.keyboard('{ArrowDown}')
    expect(indicator.getBoundingClientRect().y).toEqual(pos1)
  })

  it('should palette indicator does not move left when it reach the left border', async () => {
    await render(
      <ColorMixer
        value={conversions.colorToHex8({ h: 200, s: 0, v: 0.5, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().x

    palette().focus()
    await userEvent.keyboard('a')
    expect(indicator.getBoundingClientRect().x).toEqual(pos1)

    await userEvent.keyboard('{ArrowLeft}')
    expect(indicator.getBoundingClientRect().x).toEqual(pos1)
  })

  it('should palette indicator does not move right when it reach the right border', async () => {
    await render(
      <ColorMixer
        value={conversions.colorToHex8({ h: 200, s: 1, v: 0.5, a: 1 })}
        {...testInputLabels}
        {...testScreenReaderLabels}
        onChange={vi.fn()}
      />
    )
    const indicator = paletteIndicator()
    const pos1 = indicator.getBoundingClientRect().x

    palette().focus()
    await userEvent.keyboard('d')
    expect(indicator.getBoundingClientRect().x).toEqual(pos1)

    await userEvent.keyboard('{ArrowRight}')
    expect(indicator.getBoundingClientRect().x).toEqual(pos1)
  })
})
