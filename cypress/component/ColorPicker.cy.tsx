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
  ColorPicker,
  ColorMixer,
  ColorPreset,
  ColorContrast,
  Button
} from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

import { colorToRGB, color2hex } from '../../packages/ui-color-utils'

const colorPreset = [
  '#ffffff',
  '#0CBF94',
  '#0C89BF',
  '#BF0C6D',
  '#BF8D0C',
  '#ff0000',
  '#576A66',
  '#35423A',
  '#35423F'
]

const SimpleExample = (props) => {
  return (
    <ColorPicker
      onChange={props.onChange}
      value={props.value}
      placeholderText="Enter HEX"
      label="Color Input"
      {...props}
    />
  )
}

describe('<ColorPicker/>', () => {
  it('should display the color which was typed in simple input mode', async () => {
    const testColor = '0CBF2D'
    const expectedColor = colorToRGB(testColor)

    cy.mount(<SimpleExample />)

    cy.get('input[id^="TextInput_"]').type(testColor)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .invoke('css', 'box-shadow')
      .then((boxShadow) => {
        const colorValue = boxShadow.toString().split(')')[0] + ')'

        expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
      })
  })

  it('should display the color in the trigger button in complex mode', async () => {
    const testColor = '0374B5'
    const expectedColor = colorToRGB(testColor)

    cy.mount(
      <SimpleExample
        colorMixerSettings={{
          popoverAddButtonLabel: 'add',
          popoverCloseButtonLabel: 'close',
          colorMixer: {
            withAlpha: false,
            rgbRedInputScreenReaderLabel: 'Red input',
            rgbBlueInputScreenReaderLabel: 'Blue input',
            colorSliderNavigationExplanationScreenReaderLabel: '',
            colorPaletteNavigationExplanationScreenReaderLabel: '',
            rgbAlphaInputScreenReaderLabel: '',
            alphaSliderNavigationExplanationScreenReaderLabel: '',
            rgbGreenInputScreenReaderLabel: 'Green input'
          }
        }}
      />
    )
    cy.get('input[id^="TextInput_"]').type(testColor)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .invoke('css', 'box-shadow')
      .then((boxShadow) => {
        const colorValue = boxShadow.toString().split(')')[0] + ')'

        expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
      })
  })

  it('should display the list of colors passed to it in complex mode', async () => {
    cy.mount(
      <SimpleExample
        colorMixerSettings={{
          popoverAddButtonLabel: 'add',
          popoverCloseButtonLabel: 'close',
          colorMixer: {
            withAlpha: false,
            rgbRedInputScreenReaderLabel: 'Red input',
            rgbBlueInputScreenReaderLabel: 'Blue input',
            colorSliderNavigationExplanationScreenReaderLabel: '',
            colorPaletteNavigationExplanationScreenReaderLabel: '',
            rgbAlphaInputScreenReaderLabel: '',
            alphaSliderNavigationExplanationScreenReaderLabel: '',
            rgbGreenInputScreenReaderLabel: 'Green input'
          },
          colorPreset: {
            label: 'colors',
            colors: colorPreset
          }
        }}
      />
    )
    cy.get('button').click()

    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .should('have.length', colorPreset.length)
      .each(($indicator, index) => {
        cy.wrap($indicator)
          .invoke('css', 'box-shadow')
          .then((boxShadow) => {
            const expectedColor = colorToRGB(colorPreset[index])
            const colorValue = boxShadow.toString().split(')')[0] + ')'

            expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
          })
      })
  })

  it('should correctly set the color when picked from the list of colors in complex mode', async () => {
    cy.mount(
      <SimpleExample
        colorMixerSettings={{
          popoverAddButtonLabel: 'add',
          popoverCloseButtonLabel: 'close',
          colorMixer: {
            withAlpha: false,
            rgbRedInputScreenReaderLabel: 'Red input',
            rgbBlueInputScreenReaderLabel: 'Blue input',
            colorSliderNavigationExplanationScreenReaderLabel: '',
            colorPaletteNavigationExplanationScreenReaderLabel: '',
            rgbAlphaInputScreenReaderLabel: '',
            alphaSliderNavigationExplanationScreenReaderLabel: '',
            rgbGreenInputScreenReaderLabel: 'Green input'
          },
          colorPreset: {
            label: 'colors',
            colors: colorPreset
          }
        }}
      />
    )
    cy.get('button').click()
    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(1)
      .realClick()
    cy.contains('button', 'add').realClick()

    cy.get('input[type="text"]').should(
      'have.value',
      colorPreset[1].substring(1)
    )
  })

  it('should correctly call onChange with the color when picked from the list of colors in complex mode', async () => {
    const onChange = cy.spy()
    cy.mount(
      <SimpleExample
        onChange={onChange}
        colorMixerSettings={{
          popoverAddButtonLabel: 'add',
          popoverCloseButtonLabel: 'close',
          colorMixer: {
            withAlpha: false,
            rgbRedInputScreenReaderLabel: 'Red input',
            rgbBlueInputScreenReaderLabel: 'Blue input',
            colorSliderNavigationExplanationScreenReaderLabel: '',
            colorPaletteNavigationExplanationScreenReaderLabel: '',
            rgbAlphaInputScreenReaderLabel: '',
            alphaSliderNavigationExplanationScreenReaderLabel: '',
            rgbGreenInputScreenReaderLabel: 'Green input'
          },
          colorPreset: {
            label: 'colors',
            colors: colorPreset
          }
        }}
      />
    )
    cy.get('button').click()
    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(1)
      .realClick()
    cy.contains('button', 'add').realClick()

    cy.wrap(onChange).should('have.been.calledWith', colorPreset[1])
  })

  it('should display the text passed to ColorContrast in complex mode', async () => {
    cy.mount(
      <SimpleExample
        colorMixerSettings={{
          popoverAddButtonLabel: 'add',
          popoverCloseButtonLabel: 'close',
          colorMixer: {
            withAlpha: false,
            rgbRedInputScreenReaderLabel: 'Red input',
            rgbBlueInputScreenReaderLabel: 'Blue input',
            colorSliderNavigationExplanationScreenReaderLabel: '',
            colorPaletteNavigationExplanationScreenReaderLabel: '',
            rgbAlphaInputScreenReaderLabel: '',
            alphaSliderNavigationExplanationScreenReaderLabel: '',
            rgbGreenInputScreenReaderLabel: 'Green input'
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
        }}
      />
    )
    cy.get('button').realClick()

    cy.get('div[class$="-colorContrast"]')
      .should('contain', 'Normal text')
      .and('contain', 'Large text')
      .and('contain', 'Graphics text')
  })

  it('should display the correct color in the colormixer when the input is prefilled in custom popover mode', async () => {
    const testColor = '0374B5'
    const expectedColor = colorToRGB(`#${testColor}`)

    cy.mount(
      <SimpleExample>
        {(value, onChange, handleAdd, handleClose) => (
          <div>
            <ColorMixer
              withAlpha
              value={value}
              onChange={onChange}
              rgbRedInputScreenReaderLabel="Input field for red"
              rgbGreenInputScreenReaderLabel="Input field for green"
              rgbBlueInputScreenReaderLabel="Input field for blue"
              rgbAlphaInputScreenReaderLabel="Input field for alpha"
              colorSliderNavigationExplanationScreenReaderLabel="Label"
              alphaSliderNavigationExplanationScreenReaderLabel="Label"
              colorPaletteNavigationExplanationScreenReaderLabel="Label"
            />
            <div>
              <Button onClick={handleAdd}>add</Button>
              <Button onClick={handleClose}>close</Button>
            </div>
          </div>
        )}
      </SimpleExample>
    )
    cy.get('input[id^="TextInput_"]').type(testColor)
    cy.get('button').realClick()

    cy.get('label')
      .contains('Input field for red')
      .siblings('span')
      .find('input')
      .should('have.value', expectedColor.r)

    cy.get('label')
      .contains('Input field for green')
      .siblings('span')
      .find('input')
      .should('have.value', expectedColor.g)

    cy.get('label')
      .contains('Input field for blue')
      .siblings('span')
      .find('input')
      .should('have.value', expectedColor.b)

    cy.get('label')
      .contains('Input field for alpha')
      .siblings('span')
      .find('input')
      .should('have.value', '100')
  })

  it('should trigger onChange when selected color is added from colorMixer in custom popover mode', async () => {
    const onChange = cy.spy()
    const rgb = { r: 131, g: 6, b: 25, a: 1 }

    cy.mount(
      <SimpleExample onChange={onChange}>
        {(value, onChange, handleAdd, handleClose) => {
          return (
            <div>
              <ColorMixer
                withAlpha
                value={value}
                onChange={onChange}
                rgbRedInputScreenReaderLabel="Input field for red"
                rgbGreenInputScreenReaderLabel="Input field for green"
                rgbBlueInputScreenReaderLabel="Input field for blue"
                rgbAlphaInputScreenReaderLabel="Input field for alpha"
                colorSliderNavigationExplanationScreenReaderLabel="Label"
                alphaSliderNavigationExplanationScreenReaderLabel="Label"
                colorPaletteNavigationExplanationScreenReaderLabel="Label"
              />
              <div>
                <Button onClick={handleAdd}>add</Button>
                <Button onClick={handleClose}>close</Button>
              </div>
            </div>
          )
        }}
      </SimpleExample>
    )
    cy.get('button').click()

    cy.get('label')
      .contains('Input field for red')
      .siblings('span')
      .find('input')
      .type(rgb.r.toString())

    cy.get('label')
      .contains('Input field for green')
      .siblings('span')
      .find('input')
      .type(rgb.g.toString())

    cy.get('label')
      .contains('Input field for blue')
      .siblings('span')
      .find('input')
      .type(rgb.b.toString())

    cy.contains('button', 'add').realClick()
    cy.wrap(onChange).should('have.been.calledWith', color2hex(rgb))
  })

  it('should display the color in the trigger button in custom popover mode', async () => {
    const testColor = '0374B5'
    const expectedColor = colorToRGB(testColor)

    cy.mount(
      <SimpleExample>
        {(value, onChange, handleAdd, handleClose) => (
          <div>
            <ColorMixer
              withAlpha
              value={value}
              onChange={onChange}
              rgbRedInputScreenReaderLabel="Label"
              rgbGreenInputScreenReaderLabel="Label"
              rgbBlueInputScreenReaderLabel="Label"
              rgbAlphaInputScreenReaderLabel="Label"
              colorSliderNavigationExplanationScreenReaderLabel="Label"
              alphaSliderNavigationExplanationScreenReaderLabel="Label"
              colorPaletteNavigationExplanationScreenReaderLabel="Label"
            />
            <div>
              <Button onClick={handleAdd}>add</Button>
              <Button onClick={handleClose}>close</Button>
            </div>
          </div>
        )}
      </SimpleExample>
    )

    cy.get('input[id^="TextInput_"]').type(testColor)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .invoke('css', 'box-shadow')
      .then((boxShadow) => {
        const colorValue = boxShadow.toString().split(')')[0] + ')'

        expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
      })
  })

  it('should display the list of colors passed to it in custom popover mode', async () => {
    cy.mount(
      <SimpleExample>
        {(value, onChange, handleAdd, handleClose) => (
          <div>
            <ColorPreset
              label="Choose a color"
              colors={colorPreset}
              selected={value}
              onSelect={onChange}
            />
            <div>
              <Button onClick={handleAdd}>add</Button>
              <Button onClick={handleClose}>close</Button>
            </div>
          </div>
        )}
      </SimpleExample>
    )
    cy.get('button').realClick()

    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .should('have.length', colorPreset.length)
      .each(($indicator, index) => {
        cy.wrap($indicator)
          .invoke('css', 'box-shadow')
          .then((boxShadow) => {
            const expectedColor = colorToRGB(colorPreset[index])
            const colorValue = boxShadow.toString().split(')')[0] + ')'

            expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
          })
      })
  })

  it('should correctly set the color when picked from the list of colors in custom popover mode', async () => {
    cy.mount(
      <SimpleExample>
        {(value, onChange, handleAdd, handleClose) => (
          <div>
            <ColorPreset
              label="Choose a color"
              colors={colorPreset}
              selected={value}
              onSelect={onChange}
            />
            <div>
              <Button onClick={handleAdd}>add</Button>
              <Button onClick={handleClose}>close</Button>
            </div>
          </div>
        )}
      </SimpleExample>
    )
    cy.get('button').click()
    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(3)
      .realClick()
    cy.contains('button', 'add').realClick()

    cy.get('input[type="text"]').should(
      'have.value',
      colorPreset[3].substring(1)
    )
  })

  it('should correctly call onChange with the color when picked from the list of colors in custom popover mode', async () => {
    const onChange = cy.spy()

    cy.mount(
      <SimpleExample onChange={onChange}>
        {(value, onChange, handleAdd, handleClose) => {
          return (
            <div>
              <ColorPreset
                label="Choose a color"
                colors={colorPreset}
                selected={value}
                onSelect={onChange}
              />
              <div>
                <Button onClick={handleAdd}>add</Button>
                <Button onClick={handleClose}>close</Button>
              </div>
            </div>
          )
        }}
      </SimpleExample>
    )
    cy.get('button').click()
    cy.get('div[role="presentation"][class$="-colorIndicator"]')
      .eq(3)
      .realClick()
    cy.contains('button', 'add').realClick()

    cy.wrap(onChange).should('have.been.calledWith', colorPreset[3])
  })

  it('should display the text passed to ColorContrast in custom popover mode', async () => {
    cy.mount(
      <SimpleExample>
        {(value, onChange, handleAdd, handleClose) => (
          <div>
            <ColorPreset
              label="Choose a color"
              colors={colorPreset}
              selected={value}
              onSelect={onChange}
            />
            <ColorContrast
              firstColor="#FFFF00"
              secondColor={value}
              label="Color Contrast Ratio"
              successLabel="PASS"
              failureLabel="FAIL"
              normalTextLabel="Normal text"
              largeTextLabel="Large text"
              graphicsTextLabel="Graphics text"
              firstColorLabel="Background"
              secondColorLabel="Foreground"
            />
            <div>
              <Button onClick={handleAdd}>add</Button>
              <Button onClick={handleClose}>close</Button>
            </div>
          </div>
        )}
      </SimpleExample>
    )
    cy.get('button').realClick()

    cy.get('div[class$="-colorContrast"]')
      .should('contain', 'Normal text')
      .and('contain', 'Large text')
      .and('contain', 'Graphics text')
  })
})
