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

import {
  expect,
  generateA11yTests,
  mount,
  stub
} from '@instructure/ui-test-utils'
import { deepEqual } from '@instructure/ui-utils'
import { ColorMixer } from '../'
import { ColorMixerLocator } from '../ColorMixerLocator'
import { colorToHex8, colorToRGB } from '@instructure/ui-color-utils'
import { px } from '@instructure/ui-utils'
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

const paletteKeyboardEvents = [
  'a',
  'w',
  's',
  'd',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown'
]

const sliderKeyboardEvents = ['a', 'd', 'ArrowLeft', 'ArrowRight']

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
  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = stub()
      await mount(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
          elementRef={elementRef}
        />
      )

      const component = await ColorMixerLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  describe('labels are displayed:', () => {
    Object.entries(testInputLabels).forEach(([label, text]) => {
      it(label, async () => {
        await mount(
          <ColorMixer
            {...testValue}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={stub()}
          />
        )
        const component = await ColorMixerLocator.find()
        const labelElement = await component.findWithText(text)

        expect(labelElement.getDOMNode()).to.not.be.visible()
      })
    })
  })

  describe('labels are displayed:', () => {
    Object.entries(testScreenReaderLabels).forEach(([label, text]) => {
      it(label, async () => {
        await mount(
          <ColorMixer
            {...testValue}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={stub()}
          />
        )
        const component = await ColorMixerLocator.find()
        const labelElement = await component.findWithLabel(text)
        expect(labelElement.getDOMNode()).to.be.visible()
      })
    })
  })
  describe('should be accessible', () => {
    generateA11yTests(ColorMixer, ColorMixerExamples, ['aria-allowed-attr'])
    it('a11y', async () => {
      await mount(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const subject = await ColorMixerLocator.find()

      expect(
        await subject.accessible({ ignores: ['aria-allowed-attr'] })
      ).to.be.true()
    })
  })

  describe('edge cases for color value', () => {
    Object.entries(edgeColorValues).forEach(([label, color]) => {
      it(label, async () => {
        await mount(
          <ColorMixer
            value={color}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={stub()}
          />
        )

        const component = await ColorMixerLocator.find()
        const inputs = await component.findAll('input')
        const [r, g, b, a] = inputs.map((input) =>
          Number(input.getAttribute('value'))
        )
        const colorHex = colorToHex8({ r, g, b, a })
        expect(colorHex).to.be.eq(color)
      })
    })

    Object.entries(differentHexColorValues).forEach(([length, color]) => {
      it(`mount with ${length}-character hex color`, async () => {
        const colorInput = color
        await mount(
          <ColorMixer
            value={colorInput}
            {...testInputLabels}
            {...testScreenReaderLabels}
            withAlpha
            onChange={stub()}
          />
        )
        const component = await ColorMixerLocator.find()
        const inputs = await component.findAll('input')
        const [r, g, b, a] = inputs.map((input) =>
          Number(input.getAttribute('value'))
        )
        const rgba = colorToRGB(colorInput)
        rgba.a = Math.round(rgba.a * 100)
        expect(deepEqual(rgba, { r, g, b, a })).to.be.true()
      })
    })

    it('mount with invalid hex color', async () => {
      const consoleWarn = stub(console, 'warn')
      const warning =
        'Warning: [ColorMixer] The passed color value is not valid.'
      await mount(
        <ColorMixer
          value="#GGGGGGGG"
          {...testInputLabels}
          {...testScreenReaderLabels}
          withAlpha
          onChange={stub()}
        />
      )

      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input')
      const [r, g, b, a] = inputs.map((input) =>
        Number(input.getAttribute('value'))
      )
      const colorHex = colorToHex8({ r, g, b, a })
      expect(colorHex).to.be.eq('#000000FF')
      expect(consoleWarn).to.be.calledWith(warning)
    })
  })

  describe('hue slider', () => {
    it('should not call onChange when the `tab` key is pressed', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const hueSlider = await component.findColorSlider()
      await hueSlider.keyDown('tab')
      expect(onChange).to.not.have.been.called()
    })

    it('onChange should not be call when component is disabled', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          disabled
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const component = await ColorMixerLocator.find()
      const hueSlider = await component.findColorSlider()
      const x = hueSlider.getBoundingClientRect().x
      await hueSlider.mouseDown({ clientX: x + 10 })
      expect(onChange).to.have.not.been.called()
    })

    describe('hue value change when receive a mouse click event', async () => {
      it('click at the middle of the slider', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const hueSlider = await component.findColorSlider()
        const rect = hueSlider.getBoundingClientRect()
        await hueSlider.mouseDown({ clientX: rect.x + rect.width / 2 })
        expect(onChange).to.have.been.called()
      })
      it('click at the end of the slider', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const hueSlider = await component.findColorSlider()
        const rect = hueSlider.getBoundingClientRect()
        await hueSlider.mouseDown({ clientX: rect.x + rect.width })
        expect(onChange).to.have.been.called()
      })

      it('click at the beginning of the slider', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            value="#00FF00"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const hueSlider = await component.findColorSlider()
        const rect = hueSlider.getBoundingClientRect()
        await hueSlider.mouseDown({ clientX: rect.x })
        // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
        expect(onChange).to.have.been.calledTwice()
      })

      it('click at the outside of the slider to the left', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            value="#00FF00"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const hueSlider = await component.findColorSlider()
        const rect = hueSlider.getBoundingClientRect()
        await hueSlider.mouseDown({ clientX: rect.x - 100 })
        // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
        expect(onChange).to.have.been.calledTwice()
      })

      it('click at the outside of the slider to the right', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            value="#00FF00"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const hueSlider = await component.findColorSlider()
        const rect = hueSlider.getBoundingClientRect()
        await hueSlider.mouseDown({ clientX: rect.x + rect.width + 100 })
        // Because we already passed the `value` that different from the default value then the component changes their color once, so if we want to test with any action after that, `onChange` should be called twice.
        expect(onChange).to.have.been.calledTwice()
      })
    })

    sliderKeyboardEvents.forEach((keyboardEvent) => {
      it(`hue value change with '${keyboardEvent}' key pressed`, async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testValue}
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const hueSlider = await component.findColorSlider()
        await hueSlider.keyDown(keyboardEvent)
        expect(onChange).to.have.been.calledTwice()
      })
    })

    it('the hue indicator move left', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const hueSlider = await component.findColorSlider()
      const indicator = await hueSlider.find('[class*=__indicator]')
      const pos_1 = indicator.getBoundingClientRect()
      await hueSlider.keyDown('a')
      const pos_2 = indicator.getBoundingClientRect()
      expect(pos_2.x).to.be.lt(pos_1.x)
      await hueSlider.keyDown('ArrowLeft')
      const pos_3 = indicator.getBoundingClientRect()
      expect(pos_3.x).to.be.lt(pos_2.x)
    })

    it('the hue indicator move right', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const hueSlider = await component.findColorSlider()
      const indicator = await hueSlider.find('[class*=__indicator]')
      const pos_1 = indicator.getBoundingClientRect()
      await hueSlider.keyDown('ArrowRight')
      const pos_2 = indicator.getBoundingClientRect()
      expect(pos_2.x).to.be.gt(pos_1.x)
      await hueSlider.keyDown('d')
      const pos_3 = indicator.getBoundingClientRect()
      expect(pos_3.x).to.be.gt(pos_2.x)
    })

    it('the hue indicator does not move when reach the left border', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          value={colorToHex8({ h: 0, s: 0.5, v: 0.5 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const hueSlider = await component.findColorSlider()
      const indicator = await hueSlider.find('[class*=__indicator]')
      const pos_1 = indicator.getBoundingClientRect()
      await hueSlider.keyDown('ArrowLeft')
      const pos_2 = indicator.getBoundingClientRect()
      expect(pos_2.x).to.be.eq(pos_1.x)
      await hueSlider.keyDown('a')
      const pos_3 = indicator.getBoundingClientRect()
      expect(pos_3.x).to.be.eq(pos_1.x)
    })

    it('the hue indicator does not move when reach the right border', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          value={colorToHex8({ h: 359, s: 0.5, v: 0.5 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const hueSlider = await component.findColorSlider()
      const indicator = await hueSlider.find('[class*=__indicator]')
      await hueSlider.keyDown('ArrowRight')
      const pos_1 = indicator.getBoundingClientRect()
      await hueSlider.keyDown('ArrowRight')
      const pos_2 = indicator.getBoundingClientRect()
      expect(pos_2.x).to.be.eq(pos_1.x)
      await hueSlider.keyDown('d')
      const pos_3 = indicator.getBoundingClientRect()
      expect(pos_3.x).to.be.eq(pos_1.x)
    })
  })

  describe('alpha slider', () => {
    it('should not call onChange when a `tab` key press is received', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const alpharSlider = await component.findAlphaSlider()
      await alpharSlider.keyDown('tab')
      expect(onChange).to.not.have.been.called()
    })

    describe('alpha value should change when a mousedown event is received', () => {
      it('click at the begin of the bar', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            withAlpha
            value="#abcdefff"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const alphaSlider = await component.findAlphaSlider()
        const rect = alphaSlider.getBoundingClientRect()
        await alphaSlider.mouseDown({ clientX: rect.x })
        expect(onChange).to.have.been.calledTwice()
      })

      it('click at the end of the bar', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            withAlpha
            value="#000000cc"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const alphaSlider = await component.findAlphaSlider()
        const rect = alphaSlider.getBoundingClientRect()
        await alphaSlider.mouseDown({ clientX: rect.x + rect.width })
        expect(onChange).to.have.been.calledTwice()
      })

      it('click at the outside of the bar to the right', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            withAlpha
            value="#00000000"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const alphaSlider = await component.findAlphaSlider()
        const rect = alphaSlider.getBoundingClientRect()
        await alphaSlider.mouseDown({ clientX: rect.x + rect.width + 100 })
        expect(onChange).to.have.been.calledTwice()
      })

      it('click at the outside of the bar to the left', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            withAlpha
            value="#a000000f"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const alphaSlider = await component.findAlphaSlider()
        const rect = alphaSlider.getBoundingClientRect()
        await alphaSlider.mouseDown({ clientX: rect.x - 100 })
        expect(onChange).to.have.been.calledTwice()
      })

      it('click at the middle of the bar', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            withAlpha
            value="#00000000"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const alphaSlider = await component.findAlphaSlider()
        const rect = alphaSlider.getBoundingClientRect()
        await alphaSlider.mouseDown({ clientX: rect.x + rect.width / 2 })
        expect(onChange).to.have.been.calledTwice()
      })
    })

    it('should not call onChange when the component is disabled', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          withAlpha
          disabled
          value="#000"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const alphaSlider = await component.findAlphaSlider()
      const rect = alphaSlider.getBoundingClientRect()
      await alphaSlider.mouseDown({ clientX: rect.x + rect.width / 2 })
      expect(onChange).to.have.not.been.called()
    })

    sliderKeyboardEvents.forEach((keyboardEvent) => {
      it(`alpha value change with '${keyboardEvent}' key pressed`, async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            withAlpha
            value="#000000AA"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )

        const component = await ColorMixerLocator.find()
        const alpharSlider = await component.findAlphaSlider()
        await alpharSlider.keyDown(keyboardEvent)
        expect(onChange).to.have.been.calledTwice()
      })
    })

    it('the alpha indicator does not move right when it reachs the right border', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          withAlpha
          value="#804041FF"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const alphaSlider = await component.findAlphaSlider()
      const indicator = await alphaSlider.find('[class*=__indicator]')
      const pos_1 = indicator.getBoundingClientRect()
      await alphaSlider.keyDown('d')
      const pos_2 = indicator.getBoundingClientRect()
      expect(pos_2.x).to.be.eq(pos_1.x)
      await alphaSlider.keyDown('ArrowRight')
      const pos_3 = indicator.getBoundingClientRect()
      expect(pos_3.x).to.be.eq(pos_1.x)
      expect(onChange).to.have.been.calledOnce()
    })

    it('the alpha indicator does not move left when reach the left border', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          withAlpha
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const alphaSlider = await component.findAlphaSlider()
      const indicator = await alphaSlider.find('[class*=__indicator]')
      const pos_1 = indicator.getBoundingClientRect()
      await alphaSlider.keyDown('a')
      const pos_2 = indicator.getBoundingClientRect()
      expect(pos_2.x).to.be.eq(pos_1.x)
      await alphaSlider.keyDown('ArrowLeft')
      const pos_3 = indicator.getBoundingClientRect()
      expect(pos_3.x).to.be.eq(pos_1.x)
      expect(onChange).to.have.been.calledOnce()
    })

    it('the alpha slider does not show when withAlpha is false', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          withAlpha={false}
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      expect(
        await component.findAlphaSlider({ expectEmpty: true })
      ).to.not.exist()
    })

    it('the alpha slider does not show when withAlpha is not set', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      expect(
        await component.findAlphaSlider({ expectEmpty: true })
      ).to.not.exist()
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          withAlpha
          disabled
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const alpharSlider = await component.findAlphaSlider()
      expect(await alpharSlider.find('[disabled]')).to.exist()
    })
  })

  describe('color palette', () => {
    describe('should change the color when mousedown event is received', () => {
      it('inside the palette', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientX: rect.x + (rect.width - px('0.125rem')) / 2,
          clientY: rect.y + (rect.height - px('0.125rem')) / 2
        })

        expect(onChange).to.have.been.calledWith(
          colorToHex8({ h: 0, s: 0.5, v: 0.5, a: 1 })
        )
      })

      it('at the top border', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y,
          clientX: rect.x + rect.width / 2
        })
        expect(onChange).to.have.been.called()
      })

      it('at the bottom border', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y + rect.height,
          clientX: rect.x + rect.width / 2
        })
        expect(onChange).to.have.been.called()
      })

      it('at the left border', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y + rect.height / 2,
          clientX: rect.x
        })
        expect(onChange).to.have.been.called()
      })

      it('at the right border', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y + rect.height / 2,
          clientX: rect.x + rect.width
        })
        expect(onChange).to.have.been.called()
      })

      it('at the top left corner', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({ clientY: rect.y, clientX: rect.x })
        expect(onChange).to.have.been.called()
      })

      it('at the top right corner', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y,
          clientX: rect.x + rect.width
        })
        expect(onChange).to.have.been.called()
      })

      it('at the bottom right corner', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = await colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y + rect.height,
          clientX: rect.x + rect.width
        })
        expect(onChange).to.have.been.called()
      })

      it('at the bottom left corner', async () => {
        const onChange = stub()
        await mount(
          <ColorMixer
            value="#404040"
            {...testInputLabels}
            {...testScreenReaderLabels}
            onChange={onChange}
          />
        )
        const component = await ColorMixerLocator.find()
        const colorPalette = await component.findColorPalette()
        const rect = colorPalette.getBoundingClientRect()
        await colorPalette.mouseDown({
          clientY: rect.y + rect.height,
          clientX: rect.x
        })
        expect(onChange).to.have.been.calledTwice()
      })
    })
    it('should set the disabled attribute when `disabled` is set', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          withAlpha
          disabled
          value="#80404100"
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const colorPalette = await component.findColorPalette()
      expect(await colorPalette.find('[disabled]')).to.exist()
    })

    describe('onChange is call when the palette receive event from keyboard', () => {
      paletteKeyboardEvents.forEach((keyEvent) => {
        it(keyEvent, async () => {
          const onChange = stub()
          await mount(
            <ColorMixer
              {...testValue}
              {...testInputLabels}
              {...testScreenReaderLabels}
              onChange={onChange}
            />
          )

          const component = await ColorMixerLocator.find()
          const palette = await component.findColorPalette()
          await palette.keyDown(keyEvent)
          // use `calledTwice` because it is called first time when passing  `testValue` color
          expect(onChange).to.have.been.calledTwice()
        })
      })
    })

    it('the indicator moves up when receive the arrowup or w keyboard event', async () => {
      const onChange = stub()
      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0.5, v: 0.5, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowUp')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.y).to.be.lt(pos_1.y)
      expect(onChange).to.have.been.calledTwice()
      await palette.keyDown('w')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.y).to.be.lt(pos_2.y)
    })

    it('the indicator moves down when receive the arrowdown or `s` keyboard event', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0.5, v: 0.5, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowDown')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.y).to.be.gt(pos_1.y)
      expect(onChange).to.have.been.calledTwice()
      await palette.keyDown('s')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.y).to.be.gt(pos_2.y)
    })

    it(`the indicator moves left when receive the arrowleft or 'a' keyboard event`, async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0.5, v: 0.5, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowLeft')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.x).to.be.lt(pos_1.x)
      expect(onChange).to.have.been.calledTwice()
      await palette.keyDown('a')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.x).to.be.lt(pos_2.x)
    })

    it(`the indicator moves right when receive the arrowright or 'd' keyboard event`, async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0.5, v: 0.5, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowRight')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.x).to.be.gt(pos_1.x)
      expect(onChange).to.have.been.calledTwice()
      await palette.keyDown('d')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.x).to.be.gt(pos_2.x)
    })

    it('the indicator does not move up when it reach the top border', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0.5, v: 1, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowUp')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.y).to.be.eq(pos_1.y)
      await palette.keyDown('w')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.y).to.be.eq(pos_1.y)
    })

    it('the indicator does not move down when it reach the bottom border', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0.5, v: 0, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowDown')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.y).to.be.eq(pos_1.y)
      await palette.keyDown('s')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.y).to.be.eq(pos_1.y)
    })

    it('the indicator does not move left when it reach the left border', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 0, v: 0.5, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowLeft')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.x).to.be.eq(pos_1.x)
      await palette.keyDown('a')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.x).to.be.eq(pos_1.x)
    })

    it('the indicator does not move right when it reach the right border', async () => {
      const onChange = stub()

      await mount(
        <ColorMixer
          value={colorToHex8({ h: 200, s: 1, v: 0.5, a: 1 })}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )

      const component = await ColorMixerLocator.find()
      const palette = await component.findColorPalette()
      const indicatorRef = await palette.find(
        '[class*="ColorPalette__indicator"]'
      )
      const pos_1 = indicatorRef.getBoundingClientRect()
      await palette.keyDown('ArrowRight')
      const pos_2 = indicatorRef.getBoundingClientRect()
      expect(pos_2.x).to.be.eq(pos_1.x)
      await palette.keyDown('d')
      const pos_3 = indicatorRef.getBoundingClientRect()
      expect(pos_3.x).to.be.eq(pos_1.x)
    })
  })

  describe('color input', () => {
    it('the alpha input exsits when `withAlpha` is set', async () => {
      await mount(
        <ColorMixer
          withAlpha
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )

      const component = await ColorMixerLocator.find()
      const RGBAInput = await component.find('[class*="RGBAInput"]')
      const alphaInput = await RGBAInput.find('[class*="-RGBAInput__aInput"]')
      expect(alphaInput).to.exist()
    })

    it('the alpha input does not exsit when `withAlpha` is not set', async () => {
      await mount(
        <ColorMixer
          {...testValue}
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const RGBAInput = await component.find('[class*="RGBAInput"]')
      const alphaInput = await RGBAInput.find('[class*="-RGBAInput__aInput"]', {
        expectEmpty: true
      })
      expect(alphaInput).to.not.exist()
    })

    it('should not call onChange when `disabled` is set and get the input', async () => {
      const fakeValue = '234234'
      const onChange = stub()
      await mount(
        <ColorMixer
          disabled
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={onChange}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input[disabled]')
      inputs.forEach(async (input) => {
        input.change({ target: { value: fakeValue } })
      })
      expect(onChange).to.have.not.been.called()
    })

    it('should set the disabled attribute when `disabled` and `withAlpha` is set', async () => {
      await mount(
        <ColorMixer
          disabled
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input[disabled]')
      inputs.forEach(async (input) => {
        expect(input).to.be.disabled()
      })
      expect(inputs.length === 4)
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      await mount(
        <ColorMixer
          disabled
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input[disabled]')
      inputs.forEach(async (input) => {
        expect(input).to.be.disabled()
      })
      expect(inputs.length === 3)
    })

    it('should not accept letter character', async () => {
      const invalidColor = 'adfafas'
      await mount(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input')
      inputs.forEach(async (input) => {
        await input.change({ target: { value: invalidColor } })
        expect(input.value()).not.to.eq(invalidColor)
      })
    })

    it('should not accept negative value', async () => {
      const invalidColor = '-10'
      await mount(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input')
      inputs.forEach(async (input) => {
        await input.change({ target: { value: invalidColor } })
        expect(input.value()).not.to.eq(invalidColor)
      })
    })

    it('should not accept value that bigger than 255', async () => {
      const invalidColor = '300'
      await mount(
        <ColorMixer
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input')
      inputs.forEach(async (input) => {
        await input.change({ target: { value: invalidColor } })
        expect(input.value()).not.to.eq(invalidColor)
      })
    })

    it('for alpha input, should not accept value that bigger than 100', async () => {
      const invalidColor = '101'
      await mount(
        <ColorMixer
          withAlpha
          {...testInputLabels}
          {...testScreenReaderLabels}
          onChange={stub()}
        />
      )
      const component = await ColorMixerLocator.find()
      const inputs = await component.findAll('input')
      const alphaInput = await inputs[3]
      await alphaInput.change({ target: { value: invalidColor } })
      expect(alphaInput.value()).not.to.eq(invalidColor)
    })
  })
})
