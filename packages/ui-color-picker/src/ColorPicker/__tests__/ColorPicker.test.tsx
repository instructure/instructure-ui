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
  generateA11yTests,
  mount,
  stub,
  within
} from '@instructure/ui-test-utils'
import { color2hex, colorToRGB } from '@instructure/ui-color-utils'
import { ColorPicker } from '../'
import { ColorPickerLocator } from '../ColorPickerLocator'
import { ContrastStrength } from '../props'
import ColorPickerExamples from '../__examples__/ColorPicker.examples'
import type { ColorPickerProps } from '../props'

const SimpleExample = (props: Partial<ColorPickerProps>) => {
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

describe('<ColorPicker />', () => {
  describe('simple input mode', () => {
    it('should render correctly', async () => {
      await mount(<SimpleExample />)
    })

    it('should work controlled', async () => {
      const color = '#FFF'
      const onChange = stub()

      const subject = await mount(
        <SimpleExample value={color} onChange={onChange} />
      )

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      expect(input.value()).to.be.eq('FFF')

      await subject.setProps({ value: `${color}555` })

      expect(input.value()).to.be.eq('FFF555')
    })

    it('should accept 3 digit hex code', async () => {
      const color = '0CB'
      await mount(<SimpleExample />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn(color)

      expect(input.value()).to.eq(color)
    })

    it('should accept 6 digit hex code', async () => {
      const color = '0CBF2D'
      await mount(<SimpleExample />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn(color)

      expect(input.value()).to.eq(color)
    })

    it('should not accept not valid hex code', async () => {
      const color = 'WWWZZZ'
      await mount(<SimpleExample />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn(color)

      expect(input.value()).to.not.eq(color)
    })

    it('should not allow more than 6 characters', async () => {
      const color = '0CBF2D1234567'
      await mount(<SimpleExample />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn(color)

      expect(input.value()).to.eq('0CBF2D')
    })

    it('should display the color which was typed', async () => {
      const color = '0CBF2D'
      await mount(<SimpleExample />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn(color)

      const colorIndicator = await cp.findColorIndicator()
      const currentColor = colorIndicator.getColorRGBA()
      const expectedColor = colorToRGB(`#${color}`)

      expect(expectedColor).to.eql(colorToRGB(currentColor))
    })

    it('should not allow input when disabled', async () => {
      await mount(<SimpleExample disabled />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()
      const textInput = within(input.getDOMNode())

      expect(await textInput.find('input[disabled]')).to.exist()
    })

    for (const contrastStrength of [
      'min',
      'mid',
      'max'
    ] as ContrastStrength[]) {
      it(`should check contrast correctly when color has enough constrast [contrastStrength=${contrastStrength}]`, async () => {
        //oxford in canvas color palette, should be valid with all contrast strenght checkers
        const colorToCheck = '394B58'
        await mount(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength
            }}
          />
        )
        const cp = await ColorPickerLocator.find()
        const input = await cp.findTextInput()

        await input.typeIn(colorToCheck)
        const afterIcon = await cp.findInputAfterIcon()
        const successIcon = await afterIcon.find(
          '[class$=-colorPicker__successIcon]'
        )

        expect(successIcon).to.be.not.undefined()
      })

      it(`should check contrast correctly when color does not have enough contrast [contrastStrength=${contrastStrength}, isStrict=false]`, async () => {
        //porcelain in canvas color palette, it should be failing even the min check
        const colorToCheck = 'F5F5F5'
        await mount(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength
            }}
          />
        )
        const cp = await ColorPickerLocator.find()
        const input = await cp.findTextInput()

        await input.typeIn(colorToCheck)
        const afterIcon = await cp.findInputAfterIcon()
        const warningIcon = await afterIcon.find(
          '[class$=-colorPicker__errorIcons]'
        )
        const iconElement = await warningIcon
          .find('svg')
          .then((svg) => svg.getDOMNode())

        expect(warningIcon).to.be.not.undefined()
        expect(iconElement.getAttribute('name')).to.be.eq('IconWarning')
      })

      it(`should check contrast correctly when color does not have enough contrast [contrastStrength=${contrastStrength}, isStrict=true]`, async () => {
        //porcelain in canvas color palette, it should be failing even the min check
        const colorToCheck = 'F5F5F5'
        await mount(
          <SimpleExample
            checkContrast={{
              isStrict: true,
              contrastStrength: contrastStrength
            }}
          />
        )
        const cp = await ColorPickerLocator.find()
        const input = await cp.findTextInput()

        await input.typeIn(colorToCheck)
        const afterIcon = await cp.findInputAfterIcon()
        const errorIcon = await afterIcon.find(
          '[class$=-colorPicker__errorIcons]'
        )
        const iconElement = await errorIcon
          .find('svg')
          .then((svg) => svg.getDOMNode())

        expect(errorIcon).to.be.not.undefined()
        expect(iconElement.getAttribute('name')).to.be.eq('IconTrouble')
      })

      it(`should display success message when contrast is met [contrastStrength=${contrastStrength}]`, async () => {
        const colorToCheck = '394B58'
        await mount(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength,
              renderContrastSuccessMessage: () => [
                { type: 'success', text: 'I am a contrast success message' }
              ]
            }}
          />
        )
        const cp = await ColorPickerLocator.find()
        const input = await cp.findTextInput()

        await input.typeIn(colorToCheck)

        const messages = await cp.findFormMessages()

        expect(messages.length).to.be.eq(1)
        expect(messages[0].text()).to.be.eq('I am a contrast success message')
      })
      it(`should display error message when contrast is not met [contrastStrength=${contrastStrength}, isStrict=false]`, async () => {
        const colorToCheck = 'F5F5F5'
        await mount(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength,
              renderContrastErrorMessage: () => [
                { type: 'error', text: 'I am a contrast warning message' }
              ]
            }}
          />
        )
        const cp = await ColorPickerLocator.find()
        const input = await cp.findTextInput()

        await input.typeIn(colorToCheck)

        const messages = await cp.findFormMessages()

        expect(messages.length).to.be.eq(1)
        expect(messages[0].text()).to.be.eq('I am a contrast warning message')
      })
      it(`should display error message when contrast is not met [contrastStrength=${contrastStrength}, isStrict=true]`, async () => {
        const colorToCheck = 'F5F5F5'
        await mount(
          <SimpleExample
            checkContrast={{
              isStrict: true,
              contrastStrength: contrastStrength,
              renderContrastErrorMessage: () => [
                { type: 'error', text: 'I am a contrast error message' }
              ]
            }}
          />
        )
        const cp = await ColorPickerLocator.find()
        const input = await cp.findTextInput()

        await input.typeIn(colorToCheck)

        const messages = await cp.findFormMessages()

        expect(messages.length).to.be.eq(1)
        expect(messages[0].text()).to.be.eq('I am a contrast error message')
      })
    }

    it('should call onChange', async () => {
      const onChange = stub()

      await mount(<SimpleExample onChange={onChange} />)

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn('FFF')

      expect(onChange).to.have.been.calledWith('#FFF')
    })

    it('should display message when ColorPicker is a required field', async () => {
      await mount(
        <SimpleExample
          isRequired
          renderInvalidColorMessage={() => [
            { type: 'error', text: 'I am an invalid color message' }
          ]}
          renderIsRequiredMessage={() => [
            { type: 'error', text: 'I am a required message' }
          ]}
        />
      )

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.focus()

      await input.focusOut()

      const messages = await cp.findFormMessages()

      expect(messages.length).to.be.eq(1)
      expect(messages[0].text()).to.be.eq('I am a required message')
    })

    it('should display message when color is invalid', async () => {
      await mount(
        <SimpleExample
          renderInvalidColorMessage={() => [
            { type: 'error', text: 'I am an invalid color message' }
          ]}
        />
      )

      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()

      await input.typeIn('F')

      await input.focusOut()

      const messages = await cp.findFormMessages()

      expect(messages.length).to.be.eq(1)
      expect(messages[0].text()).to.be.eq('I am an invalid color message')
    })
  })

  describe('complex mode', () => {
    it('should display trigger button', async () => {
      await mount(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        />
      )
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      expect(trigger).to.be.not.undefined()
    })
    it('should open popover when trigger is clicked', async () => {
      await mount(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        />
      )
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()

      expect(popoverContent).to.be.not.undefined()
    })
    it('should display the color mixer', async () => {
      await mount(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close',
            colorMixer: {
              withAlpha: false,
              rgbRedInputScreenReaderLabel: 'Red input',
              rgbBlueInputScreenReaderLabel: 'Blue input',
              rgbGreenInputScreenReaderLabel: 'Green input',
              rgbAlphaInputScreenReaderLabel: '',
              alphaSliderNavigationExplanationScreenReaderLabel: '',
              colorSliderNavigationExplanationScreenReaderLabel: '',
              colorPaletteNavigationExplanationScreenReaderLabel: ''
            }
          }}
        />
      )
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()
      const colormixer = await popoverContent.findColorMixer()

      expect(colormixer).to.be.not.undefined()
    })

    it('should display the correct color in the colormixer when the input is prefilled', async () => {
      const color = '0374B5'
      await mount(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close',
            colorMixer: {
              withAlpha: false,
              rgbRedInputScreenReaderLabel: 'Red input',
              rgbBlueInputScreenReaderLabel: 'Blue input',
              rgbGreenInputScreenReaderLabel: 'Green input',
              rgbAlphaInputScreenReaderLabel: '',
              alphaSliderNavigationExplanationScreenReaderLabel: '',
              colorSliderNavigationExplanationScreenReaderLabel: '',
              colorPaletteNavigationExplanationScreenReaderLabel: ''
            }
          }}
        />
      )
      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()
      const trigger = await cp.findPopoverTrigger()

      await input.typeIn(color)

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()
      const convertedColor = colorToRGB(`#${color}`)
      const [r, g, b] = await popoverContent.findRGBAInputs()
      const actualColor = {
        r: Number(r.value()),
        g: Number(g.value()),
        b: Number(b.value()),
        a: 1
      }

      expect(convertedColor).to.be.eql(actualColor)
    })

    it('should trigger onChange when selected color is added from colorMixer', async () => {
      const onChange = stub()
      const rgb = { r: 131, g: 6, b: 25, a: 1 }
      await mount(
        <SimpleExample
          onChange={onChange}
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close',
            colorMixer: {
              withAlpha: false,
              rgbRedInputScreenReaderLabel: 'Red input',
              rgbBlueInputScreenReaderLabel: 'Blue input',
              rgbGreenInputScreenReaderLabel: 'Green input',
              colorSliderNavigationExplanationScreenReaderLabel: '',
              rgbAlphaInputScreenReaderLabel: '',
              alphaSliderNavigationExplanationScreenReaderLabel: '',
              colorPaletteNavigationExplanationScreenReaderLabel: ''
            }
          }}
        />
      )
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()

      const [r, g, b] = await popoverContent.findRGBAInputs()

      await r.typeIn(`${rgb.r}`)
      await g.typeIn(`${rgb.g}`)
      await b.typeIn(`${rgb.b}`)

      const addBtn = await popoverContent.findPopoverButtonWithText('add')

      await addBtn.click()

      expect(onChange).to.have.been.calledWith(color2hex(rgb))
    })

    it('should display the color in the trigger button', async () => {
      const color = '0374B5'
      await mount(
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
      const cp = await ColorPickerLocator.find()
      const input = await cp.findTextInput()
      const colorIndicator = await cp.findColorIndicator()

      await input.typeIn(color)

      const currentColor = colorIndicator.getColorRGBA()
      const expectedColor = colorToRGB(`#${color}`)

      expect(expectedColor).to.eql(colorToRGB(currentColor))
    })

    it('should display the list of colors passed to it', async () => {
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

      await mount(
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
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const colors = await cp.findColorPreset()

      for (let i = 0; i < colors.length; i++) {
        const computedStyle = colors[i].getComputedStyle().boxShadow
        const expectedColor = colorToRGB(colorPreset[i])
        const currentColor = /rgb\(\d+,\s\d+,\s\d+\)/.exec(computedStyle)![0]

        expect(expectedColor).to.be.eql(colorToRGB(currentColor))
      }
    })

    it('should correctly set the color when picked from the list of colors', async () => {
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

      await mount(
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
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()

      const colorButtons = await cp.findColorPresetButtons()

      await colorButtons[1].click()

      const addButton = await popoverContent.findPopoverButtonWithText('add')

      await addButton.click()

      const input = await cp.findTextInput()

      expect(`#${input.value()}`).to.be.eq(colorPreset[1])
    })

    it('should correctly call onChange with the color when picked from the list of colors', async () => {
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
      const onChange = stub()

      await mount(
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
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()

      const colorButtons = await cp.findColorPresetButtons()

      await colorButtons[1].click()

      const addButton = await popoverContent.findPopoverButtonWithText('add')

      await addButton.click()

      expect(onChange).to.have.been.calledWith(colorPreset[1])
    })

    it('should display the text passed to colorcontast', async () => {
      await mount(
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
      const cp = await ColorPickerLocator.find()
      const trigger = await cp.findPopoverTrigger()

      await trigger.click()

      const popoverContent = await cp.findPopoverContent()
      const t1 = await popoverContent.findWithText('Normal text')
      const t2 = await popoverContent.findWithText('Large text')
      const t3 = await popoverContent.findWithText('Graphics text')

      expect(t1.text()).to.be.eq('Normal text')
      expect(t2.text()).to.be.eq('Large text')
      expect(t3.text()).to.be.eq('Graphics text')
    })
  })

  describe('should be accessible', () => {
    generateA11yTests(ColorPicker, ColorPickerExamples)
    it('a11y', async () => {
      await mount(<SimpleExample />)
      const cp = await ColorPickerLocator.find()

      expect(await cp.accessible()).to.be.true()
    })
  })
})
