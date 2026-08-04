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

import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import conversions from '@instructure/ui-color-utils'

import { ContrastStrength } from '../v2/props.js'
import { ColorPicker } from '@instructure/ui-color-picker/latest'
import type { ColorPickerProps } from '@instructure/ui-color-picker/latest'

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
      const { container } = await render(<SimpleExample />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should work controlled', async () => {
      const color = '#FFF'
      const onChange = vi.fn()

      const { rerender } = await render(
        <SimpleExample value={color} onChange={onChange} />
      )

      const input = page.getByRole('textbox').element()
      expect(input).toHaveValue('FFF')

      // set new value
      await rerender(
        <SimpleExample value={`${color}555`} onChange={onChange} />
      )

      const inputUpdated = page.getByRole('textbox').element()
      expect(inputUpdated).toHaveValue('FFF555')
    })

    it('should accept 3 digit hex code', async () => {
      const color = '0CB'
      await render(<SimpleExample />)

      const input = page.getByRole('textbox').element()

      await userEvent.type(input, color)
      fireEvent.blur(input)

      await vi.waitFor(() => {
        expect(input).toHaveValue(color)
      })
    })

    it('should accept 6 digit hex code', async () => {
      const color = '0CBF2D'
      await render(<SimpleExample />)

      const input = page.getByRole('textbox').element()

      await userEvent.type(input, color)
      fireEvent.blur(input)

      await vi.waitFor(() => {
        expect(input).toHaveValue(color)
      })
    })

    it('should not accept not valid hex code', async () => {
      const color = 'WWWZZZ'
      await render(<SimpleExample />)

      const input = page.getByRole('textbox').element()

      await userEvent.type(input, color)
      fireEvent.blur(input)

      await vi.waitFor(() => {
        expect(input).not.toHaveValue(color)
      })
    })

    it('should not allow more than 6 characters', async () => {
      const color = '0CBF2D1234567'
      await render(<SimpleExample />)

      const input = page.getByRole('textbox').element()

      await userEvent.type(input, color)
      fireEvent.blur(input)

      await vi.waitFor(() => {
        expect(input).toHaveValue('0CBF2D')
      })
    })

    it('should not allow input when disabled', async () => {
      await render(<SimpleExample disabled />)

      const input = page.getByRole('textbox').element()
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
        const { container } = await render(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength
            }}
          />
        )
        const input = page.getByRole('textbox').element()

        await userEvent.type(input, colorToCheck)
        fireEvent.blur(input)

        await vi.waitFor(() => {
          expect(input).toHaveValue(colorToCheck)

          const successIconWrapper = container.querySelector(
            'div[class$="-colorPicker__successIcon"]'
          )
          const successIcon = container.querySelector('svg[name="Check"]')

          expect(successIconWrapper).toBeInTheDocument()
          expect(successIcon).toBeInTheDocument()
        })
      })

      it(`should check contrast correctly when color does not have enough contrast [contrastStrength=${contrastStrength}, isStrict=false]`, async () => {
        //porcelain in canvas color palette, it should be failing even the min check
        const colorToCheck = 'F5F5F5'
        const { container } = await render(
          <SimpleExample
            checkContrast={{
              isStrict: false,
              contrastStrength: contrastStrength
            }}
          />
        )
        const input = page.getByRole('textbox').element()

        await userEvent.type(input, colorToCheck)
        fireEvent.blur(input)

        await vi.waitFor(() => {
          expect(input).toHaveValue(colorToCheck)

          const warningIconWrapper = container.querySelector(
            'div[class$="-colorPicker__errorIcons"]'
          )
          const warningIcon = container.querySelector('svg[name="CircleAlert"]')

          expect(warningIconWrapper).toBeInTheDocument()
          expect(warningIcon).toBeInTheDocument()
        })
      })

      it(`should check contrast correctly when color does not have enough contrast [contrastStrength=${contrastStrength}, isStrict=true]`, async () => {
        //porcelain in canvas color palette, it should be failing even the min check
        const colorToCheck = 'F5F5F5'
        const { container } = await render(
          <SimpleExample
            checkContrast={{
              isStrict: true,
              contrastStrength: contrastStrength
            }}
          />
        )
        const input = page.getByRole('textbox').element()

        await userEvent.type(input, colorToCheck)
        fireEvent.blur(input)

        await vi.waitFor(() => {
          expect(input).toHaveValue(colorToCheck)

          const errorIconWrapper = container.querySelector(
            'div[class$="-colorPicker__errorIcons"]'
          )
          const errorIcon = container.querySelector('svg[name="CircleX"]')

          expect(errorIconWrapper).toBeInTheDocument()
          expect(errorIcon).toBeInTheDocument()
        })
      })

      it(`should display success message when contrast is met [contrastStrength=${contrastStrength}]`, async () => {
        const colorToCheck = '394B58'
        await render(
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
        const input = page.getByRole('textbox').element()

        await userEvent.type(input, colorToCheck)
        fireEvent.blur(input)

        await vi.waitFor(() => {
          const successMessage = page
            .getByText('I am a contrast success message')
            .element()

          expect(input).toHaveValue(colorToCheck)
          expect(successMessage).toBeInTheDocument()
        })
      })

      it(`should display error message when contrast is not met [contrastStrength=${contrastStrength}, isStrict=false]`, async () => {
        const colorToCheck = 'F5F5F5'
        await render(
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
        const input = page.getByRole('textbox').element()

        await userEvent.type(input, colorToCheck)
        fireEvent.blur(input)

        await vi.waitFor(() => {
          const warningMessage = page
            .getByText('I am a contrast warning message')
            .element()

          expect(input).toHaveValue(colorToCheck)
          expect(warningMessage).toBeInTheDocument()
        })
      })

      it(`should display error message when contrast is not met [contrastStrength=${contrastStrength}, isStrict=true]`, async () => {
        const colorToCheck = 'F5F5F5'
        await render(
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
        const input = page.getByRole('textbox').element()

        await userEvent.type(input, colorToCheck)
        fireEvent.blur(input)

        await vi.waitFor(() => {
          const errorMessage = page
            .getByText('I am a contrast error message')
            .element()

          expect(input).toHaveValue(colorToCheck)
          expect(errorMessage).toBeInTheDocument()
        })
      })
    }

    it('should call onChange', async () => {
      const onChange = vi.fn()
      await render(<SimpleExample onChange={onChange} />)

      const input = page.getByRole('textbox').element()

      fireEvent.change(input, { target: { value: 'FFF' } })
      fireEvent.blur(input)

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenLastCalledWith('#FFF')
      })
    })

    it('should display message when ColorPicker is a required field', async () => {
      await render(
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
      const input = page.getByRole('textbox').element()

      fireEvent.focus(input)
      fireEvent.blur(input)

      await vi.waitFor(() => {
        const requiredMessage = page
          .getByText('I am a required message')
          .element()

        expect(requiredMessage).toBeInTheDocument()
      })
    })

    it('should display message when color is invalid', async () => {
      await render(
        <SimpleExample
          renderInvalidColorMessage={() => [
            { type: 'error', text: 'I am an invalid color message' }
          ]}
        />
      )
      const input = page.getByRole('textbox').element()

      await userEvent.type(input, 'F')
      fireEvent.blur(input)

      await vi.waitFor(() => {
        const errorMessage = page
          .getByText('I am an invalid color message')
          .element()

        expect(errorMessage).toBeInTheDocument()
      })
    })

    it('should provide an inputRef prop', async () => {
      const inputRef = vi.fn()
      await render(<SimpleExample inputRef={inputRef} />)
      const input = page.getByRole('textbox').element()

      expect(inputRef).toHaveBeenCalledWith(input)
    })

    describe('paste behavior', () => {
      it('should strip leading # from pasted value', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.paste(input, {
          clipboardData: { getData: () => '#FF0000' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('FF0000')
        })
      })

      it('should block pasted value that exceeds 6 characters', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.paste(input, {
          clipboardData: { getData: () => 'FF00001' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('')
        })
      })

      it('should block pasted value with invalid hex characters', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.paste(input, {
          clipboardData: { getData: () => 'ZZZZZZ' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('')
        })
      })

      it('should replace entirely selected text when pasting', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.change(input, { target: { value: 'FF0000' } })
        await vi.waitFor(() => expect(input).toHaveValue('FF0000'))

        input.setSelectionRange(0, 6)
        fireEvent.paste(input, {
          clipboardData: { getData: () => 'AABBCC' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('AABBCC')
        })
      })

      it('should replace partially selected text when pasting', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.change(input, { target: { value: 'FF0000' } })
        await vi.waitFor(() => expect(input).toHaveValue('FF0000'))

        // select the two middle zeros (positions 2–4), paste FF → FFFF00
        input.setSelectionRange(2, 4)
        fireEvent.paste(input, {
          clipboardData: { getData: () => 'FF' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('FFFF00')
        })
      })

      it('should insert pasted text at cursor start position', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.change(input, { target: { value: '0000' } })
        await vi.waitFor(() => expect(input).toHaveValue('0000'))

        input.setSelectionRange(0, 0)
        fireEvent.paste(input, {
          clipboardData: { getData: () => 'FF' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('FF0000')
        })
      })

      it('should insert pasted text at cursor middle position', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.change(input, { target: { value: 'FF00' } })
        await vi.waitFor(() => expect(input).toHaveValue('FF00'))

        input.setSelectionRange(2, 2)
        fireEvent.paste(input, {
          clipboardData: { getData: () => 'AB' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('FFAB00')
        })
      })

      it('should insert pasted text at cursor end position', async () => {
        await render(<SimpleExample />)
        const input = page.getByRole('textbox').element() as HTMLInputElement

        fireEvent.change(input, { target: { value: '0000' } })
        await vi.waitFor(() => expect(input).toHaveValue('0000'))

        input.setSelectionRange(4, 4)
        fireEvent.paste(input, {
          clipboardData: { getData: () => 'FF' }
        })

        await vi.waitFor(() => {
          expect(input).toHaveValue('0000FF')
        })
      })
    })
  })

  describe('complex mode', () => {
    it('should display trigger button', async () => {
      const { container } = await render(
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
      const button = page.getByRole('button').element()

      expect(buttonWrapper).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    it('should open popover when trigger is clicked', async () => {
      await render(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        />
      )
      const trigger = page.getByRole('button').element()

      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(trigger)

      await vi.waitFor(() => {
        const buttons = page.getByRole('button').elements()
        const popoverContent = document.querySelector(
          'div[class$="-colorPicker__popoverContent"]'
        )

        expect(trigger).toHaveAttribute('aria-expanded', 'true')
        expect(popoverContent).toBeInTheDocument()

        expect(buttons.length).toBe(2)
        expect(buttons[0]).toHaveTextContent('close')
        expect(buttons[1]).toHaveTextContent('add')
      })
    })

    it('should display the color mixer', async () => {
      await render(
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
      const trigger = page.getByRole('button').element()

      fireEvent.click(trigger)

      await vi.waitFor(() => {
        const redInput = page.getByLabelText('Red input').element()
        const blueInput = page.getByLabelText('Blue input').element()
        const greenInput = page.getByLabelText('Green input').element()

        expect(redInput).toBeInTheDocument()
        expect(blueInput).toBeInTheDocument()
        expect(greenInput).toBeInTheDocument()
      })
    })

    it('should display the correct color in the colormixer when the input is prefilled', async () => {
      const color = '0374B5'
      await render(
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
      const input = page.getByRole('textbox').element()
      const trigger = page.getByRole('button').element()

      await userEvent.type(input, color)
      fireEvent.blur(input)
      fireEvent.click(trigger)

      await vi.waitFor(() => {
        const redInput = page
          .getByLabelText('Red input')
          .element() as HTMLInputElement
        const blueInput = page
          .getByLabelText('Blue input')
          .element() as HTMLInputElement
        const greenInput = page
          .getByLabelText('Green input')
          .element() as HTMLInputElement
        const convertedColor = conversions.colorToRGB(`#${color}`)

        const actualColor = {
          r: parseInt(redInput.value),
          g: parseInt(greenInput.value),
          b: parseInt(blueInput.value),
          a: 1
        }

        expect(convertedColor).toStrictEqual(actualColor)
      })
    })

    it('should trigger onChange when selected color is added from colorMixer', async () => {
      const onChange = vi.fn()
      const rgb = { r: 131, g: 6, b: 25, a: 1 }
      await render(
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

      const trigger = page.getByRole('button').element()

      fireEvent.click(trigger)

      await vi.waitFor(() => {
        const addBtn = page.getByRole('button', { name: 'add' }).element()
        const redInput = page
          .getByLabelText('Red input')
          .element() as HTMLInputElement
        const greenInput = page
          .getByLabelText('Green input')
          .element() as HTMLInputElement
        const blueInput = page
          .getByLabelText('Blue input')
          .element() as HTMLInputElement

        fireEvent.change(redInput, { target: { value: `${rgb.r}` } })
        fireEvent.change(greenInput, { target: { value: `${rgb.g}` } })
        fireEvent.change(blueInput, { target: { value: `${rgb.b}` } })

        fireEvent.click(addBtn)

        expect(onChange).toHaveBeenCalledWith(conversions.color2hex(rgb))
      })
    })
  })

  describe('custom popover mode', () => {
    it('should throw warning if children and settings object are passed too', async () => {
      await render(
        <SimpleExample
          colorMixerSettings={{
            popoverAddButtonLabel: 'add',
            popoverCloseButtonLabel: 'close'
          }}
        >
          {() => <div></div>}
        </SimpleExample>
      )

      await vi.waitFor(() => {
        expect(consoleWarningMock.mock.calls[0][0]).toEqual(
          expect.stringContaining(
            'Warning: You should either use children, colorMixerSettings or neither, not both. In this case, the colorMixerSettings will be ignored.'
          )
        )
      })
    })

    it('should display trigger button', async () => {
      await render(<SimpleExample>{() => <div></div>}</SimpleExample>)

      const trigger = page.getByRole('button').element()
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('data-popover-trigger', 'true')
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = await render(<SimpleExample />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
