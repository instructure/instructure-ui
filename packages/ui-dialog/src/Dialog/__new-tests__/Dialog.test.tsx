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

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Dialog } from '../index'
import type { DialogProps } from '../props'

const TEST_TEXT = 'test-text'
const TEST_LABEL = 'test-label'

const renderDialog = (props?: Partial<DialogProps>) => {
  const allProps: DialogProps = {
    open: true,
    label: TEST_LABEL,
    ...props
  }

  return render(
    <Dialog {...allProps}>
      <button>{TEST_TEXT}</button>
    </Dialog>
  )
}

const DialogExample = forwardRef((props: DialogProps, ref: React.Ref<any>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dialogRef = useRef<Dialog | null>(null)

  useEffect(() => {
    if (!props.open) {
      inputRef.current!.focus()
    }
  }, [props.open])

  useImperativeHandle(ref, () => ({
    focusDialog: () => dialogRef.current!.focus(),
    blurDialog: () => dialogRef.current!.blur()
  }))

  return (
    <div>
      <input data-testid="input-trigger" type="text" ref={inputRef} />
      <Dialog
        shouldContainFocus
        shouldReturnFocus
        label={TEST_LABEL}
        {...props}
        ref={dialogRef}
      >
        {props.children || (
          <div>
            <input type="text" data-testid="input-one" />
            <input type="text" data-testid="input-two" />
          </div>
        )}
      </Dialog>
    </div>
  )
})
DialogExample.displayName = 'DialogExample'

const NestedDialogExample = (props: DialogProps) => {
  const [nestedOpen, setNestedOpen] = useState(false)
  const handleTriggerClick = () => setNestedOpen(true)

  return (
    <div>
      <Dialog open shouldReturnFocus label={TEST_LABEL} {...props}>
        <div>
          <div>
            <input
              onClick={handleTriggerClick}
              type="text"
              data-testid="nested-input-one"
            />
            <input
              onClick={handleTriggerClick}
              type="text"
              data-testid="nested-input-two"
            />
          </div>
          <Dialog open={nestedOpen} label={TEST_LABEL}>
            {TEST_TEXT}
          </Dialog>
        </div>
      </Dialog>
    </div>
  )
}
NestedDialogExample.displayName = 'NestedDialogExample'

describe('<Dialog />', () => {
  it('should render nothing when closed', () => {
    const { container } = renderDialog({ open: false })

    expect(container.firstChild).not.toBeInTheDocument()
  })

  it('should render children when open', async () => {
    const { container } = renderDialog({ open: true })

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveTextContent(TEST_TEXT)
  })

  it('should apply the a11y attributes', () => {
    const { getByRole, getByLabelText } = renderDialog({ label: TEST_LABEL })
    const dialog = getByRole('dialog')
    const label = getByLabelText(TEST_LABEL)

    expect(dialog).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('should apply the role attributes, if explicitly passed', () => {
    const { getByRole, getByLabelText } = renderDialog({
      label: TEST_LABEL,
      role: 'region'
    })
    const regionRole = getByRole('region')
    const label = getByLabelText(TEST_LABEL)

    expect(regionRole).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    const onDismiss = vi.fn()
    const { getByRole } = renderDialog({ onDismiss })
    const dialog = getByRole('dialog')

    await waitFor(() => {
      fireEvent.keyUp(dialog, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27
      })
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should call onDismiss prop when the document is clicked', async () => {
    const onDismiss = vi.fn()
    renderDialog({ onDismiss, shouldCloseOnDocumentClick: true })

    await waitFor(() => {
      userEvent.click(document.body)
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  describe('managed focus', () => {
    it('should provide focus method', async () => {
      const { getByTestId } = render(
        <div>
          <DialogExample
            open
            contentElement={() => getByTestId('non-tabbable')}
          >
            {TEST_TEXT}
          </DialogExample>
          <div tabIndex={-1} data-testid="non-tabbable">
            {TEST_TEXT}
          </div>
        </div>
      )
      const nonTabbableContent = getByTestId('non-tabbable')

      userEvent.tab()
      await waitFor(() => {
        expect(document.activeElement).toBe(nonTabbableContent)
      })
    })

    it('should warn when trying to focus or blur a closed dialog', () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      let ref
      render(<DialogExample open={false} ref={(el) => (ref = el)} />)

      ref!.focusDialog()
      expect(consoleError.mock.calls[0][0]).toBe(
        "Warning: [Dialog] Can't focus a Dialog that isn't open."
      )

      ref!.blurDialog()
      expect(consoleError.mock.calls[1][0]).toBe(
        "Warning: [Dialog] Can't blur a Dialog that isn't open."
      )

      consoleError.mockRestore()
    })

    it('should focus the first tabbable element by default', async () => {
      const { getByTestId } = render(<DialogExample open />)
      const inputOne = getByTestId('input-one')

      await waitFor(() => {
        expect(document.activeElement).toBe(inputOne)
      })
    })

    it('should focus the first tabbable element when open prop becomes true', async () => {
      const { rerender, getByTestId } = render(<DialogExample open={false} />)
      const inputTrigger = getByTestId('input-trigger')

      await waitFor(() => {
        expect(document.activeElement).toBe(inputTrigger)
      })

      rerender(<DialogExample open={true} />)
      const inputOne = getByTestId('input-one')

      await waitFor(() => {
        expect(document.activeElement).toBe(inputOne)
      })
    })

    it('should take a prop for finding default focus', async () => {
      const { getByTestId } = render(
        <DialogExample
          open
          defaultFocusElement={() => getByTestId('input-two')}
        />
      )
      const inputTwo = getByTestId('input-two')

      await waitFor(() => {
        expect(document.activeElement).toBe(inputTwo)
      })
    })

    it('should still focus the defaultFocusElement when it is focusable but not tabbable', async () => {
      const { getByTestId } = render(
        <DialogExample
          open
          defaultFocusElement={() => getByTestId('non-tabbable')}
        >
          <div tabIndex={-1} data-testid="non-tabbable">
            {TEST_TEXT}
          </div>
        </DialogExample>
      )
      const nonTabbableContent = getByTestId('non-tabbable')

      await waitFor(() => {
        expect(document.activeElement).toBe(nonTabbableContent)
      })
    })

    it('should focus the contentElement by default if focusable and no defaultFocusElement is provided', async () => {
      const { getByTestId } = render(
        <div>
          <DialogExample
            open
            contentElement={() => getByTestId('non-tabbable')}
          >
            {TEST_TEXT}
          </DialogExample>
          <div tabIndex={-1} data-testid="non-tabbable">
            {TEST_TEXT}
          </div>
        </div>
      )
      const nonTabbableContent = getByTestId('non-tabbable')

      await waitFor(() => {
        expect(document.activeElement).toBe(nonTabbableContent)
      })
    })

    it('should focus the document body if there is no defaultFocusElement, tabbable elements, or focusable contentElement', async () => {
      const { rerender, getByTestId } = render(
        <DialogExample open={false}>{TEST_TEXT}</DialogExample>
      )
      const inputTrigger = getByTestId('input-trigger')
      inputTrigger.focus()

      rerender(<DialogExample open={true}>{TEST_TEXT}</DialogExample>)

      await waitFor(() => {
        expect(document.activeElement).toBe(document.body)
      })
    })

    it('should return focus', async () => {
      const { rerender, getByTestId } = render(<DialogExample open={false} />)
      expect(document.activeElement).toBe(getByTestId('input-trigger'))

      rerender(<DialogExample open={true} />)
      await waitFor(() => {
        expect(document.activeElement).toBe(getByTestId('input-one'))
      })

      rerender(<DialogExample open={false} />)
      await waitFor(() => {
        expect(document.activeElement).toBe(getByTestId('input-trigger'))
      })
    })

    describe('when focus leaves the first and last tabbable', () => {
      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing last tabbable`, async () => {
        const onBlur = vi.fn()
        const { getByTestId } = render(
          <DialogExample
            open
            onBlur={onBlur}
            shouldContainFocus
            defaultFocusElement={() => getByTestId('input-two')}
          />
        )
        const inputOne = getByTestId('input-one')
        const inputTwo = getByTestId('input-two')

        await waitFor(() => {
          expect(document.activeElement).toBe(inputTwo)
        })

        await waitFor(() => {
          userEvent.tab()
          expect(onBlur).not.toHaveBeenCalled()
          expect(document.activeElement).toBe(inputOne)
        })
      })

      it('should NOT call onBlur when shouldContainFocus=true and Shift+Tab pressing first tabbable', async () => {
        const onBlur = vi.fn()

        const { getByTestId } = render(
          <DialogExample
            open
            shouldContainFocus
            defaultFocusElement={() => getByTestId('input-one')}
            onBlur={onBlur}
          />
        )
        const inputOne = getByTestId('input-one')
        const inputTwo = getByTestId('input-two')

        await waitFor(() => {
          expect(document.activeElement).toBe(inputOne)

          fireEvent.keyDown(inputOne, {
            key: 'Tab',
            code: 'Tab',
            keyCode: 9,
            charCode: 9,
            shiftKey: true
          })

          expect(onBlur).not.toHaveBeenCalled()
          expect(document.activeElement).toBe(inputTwo)
        })
      })

      it('should call onBlur when shouldContainFocus=false and tab pressing last tabbable', async () => {
        const onBlur = vi.fn()

        const { getByTestId } = render(
          <DialogExample
            open
            shouldContainFocus={false}
            defaultFocusElement={() => getByTestId('input-two')}
            onBlur={onBlur}
          />
        )
        const inputTwo = getByTestId('input-two')
        inputTwo.focus()

        await waitFor(() => {
          expect(document.activeElement).toBe(inputTwo)

          fireEvent.keyDown(inputTwo, {
            key: 'Tab',
            code: 'Tab',
            keyCode: 9,
            charCode: 9
          })
          expect(onBlur).toHaveBeenCalled()
        })
      })

      it('should call onBlur when shouldContainFocus=false and pressing Shift+Tab on the first tabbable', async () => {
        const onBlur = vi.fn()

        const { getByTestId } = render(
          <DialogExample
            open
            shouldContainFocus={false}
            defaultFocusElement={() => getByTestId('input-one')}
            onBlur={onBlur}
          />
        )
        const inputOne = getByTestId('input-one')
        inputOne.focus()

        await waitFor(() => {
          expect(document.activeElement).toBe(inputOne)

          fireEvent.keyDown(inputOne, {
            key: 'Tab',
            code: 'Tab',
            keyCode: 9,
            charCode: 9,
            shiftKey: true
          })
          expect(onBlur).toHaveBeenCalled()
        })
      })
    })
  })
})
