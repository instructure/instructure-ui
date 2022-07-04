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

import {
  expect,
  // generateA11yTests,
  mount,
  stub
} from '@instructure/ui-test-utils'
import { colorToRGB } from '@instructure/ui-color-utils'

import { ColorPreset } from '../'
import { ColorPresetLocator } from '../ColorPresetLocator'
// import ColorPresetExamples from '../__examples__/ColorPreset.examples'
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
  selected: '',
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
  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = stub()
      await mount(<ColorPreset {...testValue} elementRef={elementRef} />)

      const component = await ColorPresetLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  describe('label prop', () => {
    it('should display title', async () => {
      await mount(<ColorPreset {...testValue} label="This is a title" />)

      const component = await ColorPresetLocator.find()

      expect(await component.findWithText('This is a title')).to.be.visible()
    })
  })

  describe('colors prop', () => {
    it('should display color indicators for all colors', async () => {
      await mount(
        <ColorPreset colors={testValue.colors} onSelect={stub()} selected="" />
      )

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()

      expect(indicators.length).to.equal(9)

      indicators.forEach((indicator, idx) => {
        expect(indicator.getColorRGBA()).to.eql(
          colorToRGB(testValue.colors[idx])
        )
      })
    })

    it('should render tooltips for all colors', async () => {
      await mount(
        <ColorPreset colors={testValue.colors} onSelect={stub()} selected="" />
      )

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()
      const tooltips = await component.findAllColorTooltips()

      for (const idx in indicators) {
        const tooltipContent = await tooltips[idx].findContent()
        expect(indicators[idx].getColorRGBA()).to.eql(
          colorToRGB(tooltipContent.getTextContent())
        )
      }
    })
  })

  describe('selected prop', () => {
    it('empty string should leave all unselected', async () => {
      await mount(<ColorPreset {...testValue} selected="" />)

      const component = await ColorPresetLocator.find()
      const selected = await component.findSelectedIndicator({
        expectEmpty: true
      })
      const selectedIcon = await component.findSelectedIcon({
        expectEmpty: true
      })

      expect(selected).to.not.exist()
      expect(selectedIcon).to.not.exist()
    })

    it('should select proper color', async () => {
      const testableColor = testValue.colors[6]
      await mount(<ColorPreset {...testValue} selected={testableColor} />)

      const component = await ColorPresetLocator.find()
      const selected = await component.findSelectedIndicator()
      const selectedIcon = await component.findSelectedIcon()

      expect(selected?.getColorRGBA()).to.eql(colorToRGB(testableColor))
      expect(selected?.getParentNode()?.children[1]).to.equal(
        selectedIcon.getDOMNode()
      )
    })
  })

  describe('onSelect prop', () => {
    it('should fire with color hex when indicator clicked', async () => {
      const onSelect = stub()
      await mount(<ColorPreset {...testValue} onSelect={onSelect} />)

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()

      await indicators[1].click()

      expect(onSelect).to.have.been.calledWith(testValue.colors[1])
    })

    it('should fire with color hex when transparent indicator clicked', async () => {
      const testColor = '#12345678'
      const onSelect = stub()
      await mount(
        <ColorPreset selected={''} colors={[testColor]} onSelect={onSelect} />
      )

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()

      await indicators[0].click()

      expect(onSelect).to.have.been.calledWith(testColor)
    })

    it('should not fire when disabled prop is set', async () => {
      const onSelect = stub()
      await mount(<ColorPreset {...testValue} disabled onSelect={onSelect} />)

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()

      await indicators[1].click()

      expect(onSelect).to.not.have.been.called()
    })
  })

  describe('colorMixerSettings prop', () => {
    it('displays "new color" button', async () => {
      await mount(
        <ColorPreset
          {...testValue}
          colorMixerSettings={testColorMixerSettings}
        />
      )

      const component = await ColorPresetLocator.find()
      const button = await component.find('button[type="button"]')

      expect(button.getTextContent()).to.equal(
        testColorMixerSettings.addNewPresetButtonScreenReaderLabel
      )
    })

    it('renders color menus for all indicators', async () => {
      await mount(
        <ColorPreset
          {...testValue}
          colorMixerSettings={testColorMixerSettings}
        />
      )

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()
      const tooltips = await component.findAllColorTooltips()
      const menus = await component.findAllColorMenus()

      expect(menus.length).to.equal(indicators.length)
      expect(menus.length).to.equal(tooltips.length)
    })

    it('shows menu on indicator click', async () => {
      const testableIdx = 4
      await mount(
        <ColorPreset
          {...testValue}
          colorMixerSettings={testColorMixerSettings}
        />
      )

      const component = await ColorPresetLocator.find()
      const indicators = await component.findAllColorIndicators()
      const menus = await component.findAllColorMenus()

      await indicators[testableIdx].click()

      const openMenu = await menus[testableIdx].findPopoverContent()
      const title = await openMenu.findHeaderTitle()
      const options = await openMenu.findAllOptions()

      expect(title.getTextContent()).to.equal(testValue.colors[testableIdx])
      expect(options.length).to.equal(2)
      expect(options[0].getTextContent()).to.equal(
        testColorMixerSettings.selectColorLabel
      )
      expect(options[1].getTextContent()).to.equal(
        testColorMixerSettings.removeColorLabel
      )
    })
  })

  // TODO: this block throws a ton of errors, we should investigate
  // describe('should be accessible', () => {
  //   generateA11yTests(ColorPreset, ColorPresetExamples)
  //   it('a11y', async () => {
  //     await mount(<ColorPreset {...testValue} />)
  //     const subject = await ColorPresetLocator.find()
  //
  //     expect(await subject.accessible()).to.be.true()
  //   })
  // })
})
