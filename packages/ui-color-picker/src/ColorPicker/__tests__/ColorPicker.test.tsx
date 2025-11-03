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

import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import conversions from '@instructure/ui-color-utils'

import type { ColorPickerProps } from '../props'
import { ContrastStrength } from '../props'
import { ColorPicker } from '../'

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
  let consoleErrorMock: ReturnType<typeof vi.spyOn>
  let consoleWarningMock: ReturnType<typeof vi.spyOn>

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
    consoleWarningMock.mockRestore()
  })

  describe('simple input mode', () => {
    it('should render correctly', async () => {
      const { container } = render(<SimpleExample />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should work controlled', async () => {
      const color = '#FFF'
      const onChange = vi.fn()

      const { rerender } = render(
        <SimpleExample value={color} onChange={onChange} />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('FFF')

      // set new value
      rerender(<SimpleExample value={`${color}555`} onChange={onChange} />)

      const inputUpdated = screen.getByRole('textbox')
      expect(inputUpdated).toHaveValue('FFF555')
    })

    it('should accept 3 digit hex code', () => {
      const color = '0CB'
      render(<SimpleExample />)

      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: color } })
      fireEvent.blur(input)

      expect(input).toHaveValue(color)
    })

    it('should accept 6 digit hex code', async () => {
      const color = '0CBF2D'
      render(<SimpleExample />)

      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: color } })
      fireEvent.blur(input)

      expect(input).toHaveValue(color)
    })

    it('should not accept not valid hex code', async () => {
      const color = 'WWWZZZ'
      render(<SimpleExample />)

      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: color } })
      fireEvent.blur(input)

      expect(input).not.toHaveValue(color)
    })

    it('should not allow more than 6 characters', async () => {
      const color = '0CBF2D'
      render(<SimpleExample />)

      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: color } })
      fireEvent.blur(input)

      expect(input).toHaveValue('0CBF2D')
    })

    it('should not allow input when disabled', async () => {
      render(<SimpleExample disabled />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('disabled')
    })

    for (const contrastStrength of [
      'min',
      'mid',
      'max'
    ] as ContrastStrength[]) {
      it(`should check contrast correctly when color has enough contrast [contrastStrength=${contrastStrength}]`, async () => {
        //oxford in canvas color palette, should be valid with all contrast strenght checkers
        const colorToCheck = '394B58'
        const { container } = render(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength
            }}
          />
        )
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: colorToCheck } })
        fireEvent.blur(input)

        expect(input).toHaveValue(colorToCheck)

        const successIconWrapper = container.querySelector(
          'div[class$="-colorPicker__successIcon"]'
        )
        const successIcon = container.querySelector('svg[name="IconCheckDark"]')

        expect(successIconWrapper).toBeInTheDocument()
        expect(successIcon).toBeInTheDocument()
      })

      it(`should check contrast correctly when color does not have enough contrast [contrastStrength=${contrastStrength}, isStrict=false]`, async () => {
        //porcelain in canvas color palette, it should be failing even the min check
        const colorToCheck = 'F5F5F5'
        const { container } = render(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength
            }}
          />
        )
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: colorToCheck } })
        fireEvent.blur(input)

        expect(input).toHaveValue(colorToCheck)

        const warningIconWrapper = container.querySelector(
          'div[class$="-colorPicker__errorIcons"]'
        )
        const warningIcon = container.querySelector('svg[name="IconWarning"]')

        expect(warningIconWrapper).toBeInTheDocument()
        expect(warningIcon).toBeInTheDocument()
      })

      it(`should check contrast correctly when color does not have enough contrast [contrastStrength=${contrastStrength}, isStrict=true]`, async () => {
        //porcelain in canvas color palette, it should be failing even the min check
        const colorToCheck = 'F5F5F5'
        const { container } = render(
          <SimpleExample
            checkContrast={{
              isStrict: true,
              contrastStrength: contrastStrength
            }}
          />
        )
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: colorToCheck } })
        fireEvent.blur(input)

        expect(input).toHaveValue(colorToCheck)

        const errorIconWrapper = container.querySelector(
          'div[class$="-colorPicker__errorIcons"]'
        )
        const errorIcon = container.querySelector('svg[name="IconTrouble"]')

        expect(errorIconWrapper).toBeInTheDocument()
        expect(errorIcon).toBeInTheDocument()
      })

      it(`should display success message when contrast is met [contrastStrength=${contrastStrength}]`, async () => {
        const colorToCheck = '394B58'
        render(
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
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: colorToCheck } })
        fireEvent.blur(input)

        const successMessage = screen.getByText(
          'I am a contrast success message'
        )

        expect(input).toHaveValue(colorToCheck)
        expect(successMessage).toBeInTheDocument()
      })

      it(`should display error message when contrast is not met [contrastStrength=${contrastStrength}, isStrict=false]`, async () => {
        const colorToCheck = 'F5F5F5'
        render(
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
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: colorToCheck } })
        fireEvent.blur(input)

        const warningMessage = screen.getByText(
          'I am a contrast warning message'
        )

        expect(input).toHaveValue(colorToCheck)
        expect(warningMessage).toBeInTheDocument()
      })

      it(`should display error message when contrast is not met [contrastStrength=${contrastStrength}, isStrict=true]`, async () => {
        const colorToCheck = 'F5F5F5'
        render(
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
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: colorToCheck } })
        fireEvent.blur(input)

        const errorMessage = screen.getByText('I am a contrast error message')

        expect(input).toHaveValue(colorToCheck)
        expect(errorMessage).toBeInTheDocument()
      })
    }

    it('should call onChange', async () => {
      const onChange = vi.fn()
      render(<SimpleExample onChange={onChange} />)

      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'FFF' } })
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith('#FFF')
    })

    it('should display message when ColorPicker is a required field', async () => {
      render(
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
      const input = screen.getByRole('textbox')

      fireEvent.focus(input)
      fireEvent.blur(input)

      const requiredMessage = screen.getByText('I am a required message')

      expect(requiredMessage).toBeInTheDocument()
    })

    it('should display message when color is invalid', async () => {
      render(
        <SimpleExample
          renderInvalidColorMessage={() => [
            { type: 'error', text: 'I am an invalid color message' }
          ]}
        />
      )
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'F' } })
      fireEvent.blur(input)

      const errorMessage = screen.getByText('I am an invalid color message')

      expect(errorMessage).toBeInTheDocument()
    })

    it('should provide an inputRef prop', async () => {
      const inputRef = vi.fn()
      render(<SimpleExample inputRef={inputRef} />)
      const input = screen.getByRole('textbox')

      expect(inputRef).toHaveBeenCalledWith(input)
    })
  })

  describe('complex mode', () => {
    it('should display trigger button', async () => {
      const { container } = render(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        />
      )
      const buttonWrapper = container.querySelector(
        'div[class$="-colorPicker__colorMixerButtonWrapper"]'
      )
      const button = screen.getByRole('button')

      expect(buttonWrapper).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    it('should open popover when trigger is clicked', () => {
      render(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        />
      )
      const trigger = screen.getByRole('button')

      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(trigger)

      act(() => {
        vi.runOnlyPendingTimers()
      })

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBe(2)
      expect(buttons[0]).toHaveTextContent('close')
      expect(buttons[1]).toHaveTextContent('add')

      const popoverContent = document.querySelector(
        'div[class$="-colorPicker__popoverContent"]'
      )

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(popoverContent).toBeInTheDocument()
    })

    it('should display the color mixer', async () => {
      render(
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
      const trigger = screen.getByRole('button')

      fireEvent.click(trigger)

      const redInput = screen.getByLabelText('Red input')
      const blueInput = screen.getByLabelText('Blue input')
      const greenInput = screen.getByLabelText('Green input')

      expect(redInput).toBeInTheDocument()
      expect(blueInput).toBeInTheDocument()
      expect(greenInput).toBeInTheDocument()
    })

    it('should display the correct color in the colormixer when the input is prefilled', async () => {
      const color = '0374B5'
      render(
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
      const input = screen.getByRole('textbox')
      const trigger = screen.getByRole('button')

      fireEvent.change(input, { target: { value: color } })
      fireEvent.blur(input)
      fireEvent.click(trigger)

      const redInput = screen.getByLabelText('Red input') as HTMLInputElement
      const blueInput = screen.getByLabelText('Blue input') as HTMLInputElement
      const greenInput = screen.getByLabelText(
        'Green input'
      ) as HTMLInputElement
      const convertedColor = conversions.colorToRGB(`#${color}`)

      const actualColor = {
        r: parseInt(redInput.value),
        g: parseInt(greenInput.value),
        b: parseInt(blueInput.value),
        a: 1
      }

      expect(convertedColor).toStrictEqual(actualColor)
    })

    it('should trigger onChange when selected color is added from colorMixer', async () => {
      const onChange = vi.fn()
      const rgb = { r: 131, g: 6, b: 25, a: 1 }
      render(
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

      const trigger = screen.getByRole('button')

      fireEvent.click(trigger)

      const addBtn = screen.getByRole('button', { name: 'add' })
      const redInput = screen.getByLabelText('Red input') as HTMLInputElement
      const greenInput = screen.getByLabelText(
        'Green input'
      ) as HTMLInputElement
      const blueInput = screen.getByLabelText('Blue input') as HTMLInputElement

      fireEvent.change(redInput, { target: { value: `${rgb.r}` } })
      fireEvent.change(greenInput, { target: { value: `${rgb.g}` } })
      fireEvent.change(blueInput, { target: { value: `${rgb.b}` } })

      fireEvent.click(addBtn)

      expect(onChange).toHaveBeenCalledWith(conversions.color2hex(rgb))
    })
  })

  describe('custom popover mode', () => {
    it('should throw warning if children and settings object are passed too', async () => {
      render(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        >
          {() => <div></div>}
        </SimpleExample>
      )

      expect(consoleWarningMock.mock.calls[0][0]).toEqual(
        expect.stringContaining(
          'Warning: You should either use children, colorMixerSettings or neither, not both. In this case, the colorMixerSettings will be ignored.'
        )
      )
    })

    it('should display trigger button', async () => {
      render(<SimpleExample>{() => <div></div>}</SimpleExample>)

      const trigger = screen.getByRole('button')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('data-popover-trigger', 'true')
    })
  })

  describe('should be accessible', () => {
    beforeAll(() => {
      vi.useRealTimers()
    })

    afterAll(() => {
      vi.useFakeTimers()
    })

    it('a11y', async () => {
      const { container } = render(<SimpleExample />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
