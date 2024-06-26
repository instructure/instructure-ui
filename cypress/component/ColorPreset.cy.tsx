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
import { ColorPreset } from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

import { colorToRGB } from '../../packages/ui-color-utils'

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

const testColorMixerSettings = {
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

describe('<ColorPreset/>', () => {
  it('should display color indicators for all colors', async () => {
    cy.mount(<ColorPreset colors={testValue.colors} onSelect={cy.spy()} />)

    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .should('have.length', testValue.colors.length)
      .each(($indicator, index) => {
        cy.wrap($indicator)
          .invoke('css', 'box-shadow')
          .then((boxShadow) => {
            const expectedColor = colorToRGB(testValue.colors[index])
            const colorValue = boxShadow.toString().split(')')[0] + ')'

            expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
          })
      })
  })

  it('empty string should leave all unselected', async () => {
    cy.mount(<ColorPreset {...testValue} selected="" />)

    cy.get('button[aria-label="selected"]').should('not.exist')
    cy.get('div[class$="__selectedIndicator"]').should('not.exist')
  })

  it('should select proper color', async () => {
    const testableColor = testValue.colors[6]
    cy.mount(<ColorPreset {...testValue} selected={testableColor} />)

    cy.get('button[aria-label="selected"]').within(() => {
      cy.get('div[role="presentation"][class$="-colorIndicator"]')
        .invoke('css', 'box-shadow')
        .then((boxShadow) => {
          const expectedColor = colorToRGB(testableColor)
          const colorValue = boxShadow.toString().split(')')[0] + ')'

          expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
        })
    })
  })

  it('shows menu on indicator click', async () => {
    cy.mount(
      <ColorPreset {...testValue} colorMixerSettings={testColorMixerSettings} />
    )
    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(5)
      .realClick()
    cy.get('div[id^=DrilldownHeader-Title]').should(
      'contain',
      testValue.colors[5]
    )
    cy.get('div[role="menu"]')
      .should('contain', testColorMixerSettings.selectColorLabel)
      .and('contain', testColorMixerSettings.removeColorLabel)
  })

  it('should allow adding presets', async () => {
    const onPresetChange = cy.spy()
    cy.mount(
      <ColorPreset
        {...testValue}
        colorMixerSettings={{ ...testColorMixerSettings, onPresetChange }}
      />
    )
    cy.get('div[class$="addNewPresetButton"]').realClick()

    cy.get('div[class$="secondColorPreview"] div[class$="pickedColorHex"]')
      .invoke('text')
      .then((expectedColor) => {
        cy.get('div[class$="popoverFooter"]')
          .contains('button', 'Add')
          .realClick()

        cy.wrap(onPresetChange).should('have.been.calledWithMatch', (args) => {
          return args[0] === expectedColor
        })
      })
  })

  it('should allow removing presets', async () => {
    const onPresetChange = cy.spy()
    cy.mount(
      <ColorPreset
        {...testValue}
        colorMixerSettings={{ ...testColorMixerSettings, onPresetChange }}
      />
    )
    const lastColorIndex = testValue.colors.length - 1
    const expectedColors = testValue.colors.slice(0, -1)

    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(lastColorIndex)
      .click()
    cy.contains('li', 'Remove').realClick()
    cy.wrap(onPresetChange).should('have.been.calledWithMatch', expectedColors)
  })

  it('should allow selecting presets', async () => {
    const testableIdx = 3
    const onSelect = cy.spy()
    cy.mount(
      <ColorPreset
        {...testValue}
        onSelect={onSelect}
        colorMixerSettings={testColorMixerSettings}
      />
    )
    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(testableIdx)
      .click()
    cy.contains('li', 'Select').realClick()
    cy.wrap(onSelect).should(
      'have.been.calledWith',
      testValue.colors[testableIdx]
    )
  })
})
