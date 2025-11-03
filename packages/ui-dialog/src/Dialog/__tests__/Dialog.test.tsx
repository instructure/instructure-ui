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
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
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
  afterEach(() => {
    vi.useRealTimers()
  })

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

  it('should call onDismiss prop when Esc key pressed', () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    const { getByRole } = renderDialog({ onDismiss })

    // Run RAF to set up focus region and event listeners
    act(() => {
      vi.runAllTimers()
    })

    const dialog = getByRole('dialog')

    act(() => {
      fireEvent.keyUp(dialog, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27
      })
      vi.runAllTimers() // Run any timers triggered by the event
    })

    expect(onDismiss).toHaveBeenCalled()
  })

  it('should call onDismiss prop when the document is clicked', () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    renderDialog({ onDismiss, shouldCloseOnDocumentClick: true })

    // Run RAF to set up focus region and event listeners
    act(() => {
      vi.runAllTimers()
    })

    act(() => {
      // Fire mousedown first to capture the target, then click
      fireEvent.mouseDown(document.body, { button: 0, detail: 1 })
      fireEvent.click(document.body, { button: 0, detail: 1 })
      vi.runAllTimers() // Run any timers triggered by the event
    })

    expect(onDismiss).toHaveBeenCalled()
  })

  describe('managed focus', () => {
    it('should provide focus method', () => {
      vi.useFakeTimers()
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

      fireEvent.keyDown(document.activeElement!, {
        key: 'Tab',
        code: 'Tab',
        keyCode: 9
      })

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(nonTabbableContent)
      vi.useRealTimers()
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

    it('should focus the first tabbable element by default', () => {
      vi.useFakeTimers()
      const { getByTestId } = render(<DialogExample open />)
      const inputOne = getByTestId('input-one')

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(inputOne)
      vi.useRealTimers()
    })

    it('should focus the first tabbable element when open prop becomes true', () => {
      vi.useFakeTimers()
      const { rerender, getByTestId } = render(<DialogExample open={false} />)
      const inputTrigger = getByTestId('input-trigger')

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(inputTrigger)

      rerender(<DialogExample open={true} />)
      const inputOne = getByTestId('input-one')

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(inputOne)
      vi.useRealTimers()
    })

    it('should take a prop for finding default focus', () => {
      vi.useFakeTimers()
      const { getByTestId } = render(
        <DialogExample
          open
          defaultFocusElement={() => getByTestId('input-two')}
        />
      )
      const inputTwo = getByTestId('input-two')

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(inputTwo)
      vi.useRealTimers()
    })

    it('should still focus the defaultFocusElement when it is focusable but not tabbable', () => {
      vi.useFakeTimers()
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

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(nonTabbableContent)
      vi.useRealTimers()
    })

    it('should focus the contentElement by default if focusable and no defaultFocusElement is provided', () => {
      vi.useFakeTimers()
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

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(nonTabbableContent)
      vi.useRealTimers()
    })

    it('should focus the document body if there is no defaultFocusElement, tabbable elements, or focusable contentElement', () => {
      vi.useFakeTimers()
      const { rerender, getByTestId } = render(
        <DialogExample open={false}>{TEST_TEXT}</DialogExample>
      )
      const inputTrigger = getByTestId('input-trigger')
      inputTrigger.focus()

      rerender(<DialogExample open={true}>{TEST_TEXT}</DialogExample>)

      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(document.body)
      vi.useRealTimers()
    })

    it('should return focus', () => {
      vi.useFakeTimers()
      const { rerender, getByTestId } = render(<DialogExample open={false} />)
      expect(document.activeElement).toBe(getByTestId('input-trigger'))

      rerender(<DialogExample open={true} />)
      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(getByTestId('input-one'))

      rerender(<DialogExample open={false} />)
      act(() => {
        vi.runAllTimers()
      })

      expect(document.activeElement).toBe(getByTestId('input-trigger'))
      vi.useRealTimers()
    })

    describe('when focus leaves the first and last tabbable', () => {
      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing last tabbable`, () => {
        vi.useFakeTimers()
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

        act(() => {
          vi.runAllTimers()
        })

        expect(document.activeElement).toBe(inputTwo)

        fireEvent.keyDown(inputTwo, { key: 'Tab', code: 'Tab', keyCode: 9 })

        act(() => {
          vi.runAllTimers()
        })

        expect(onBlur).not.toHaveBeenCalled()
        expect(document.activeElement).toBe(inputOne)
        vi.useRealTimers()
      })

      it('should NOT call onBlur when shouldContainFocus=true and Shift+Tab pressing first tabbable', () => {
        vi.useFakeTimers()
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

        act(() => {
          vi.runAllTimers()
        })

        expect(document.activeElement).toBe(inputOne)

        fireEvent.keyDown(inputOne, {
          key: 'Tab',
          code: 'Tab',
          keyCode: 9,
          charCode: 9,
          shiftKey: true
        })

        act(() => {
          vi.runAllTimers()
        })

        expect(onBlur).not.toHaveBeenCalled()
        expect(document.activeElement).toBe(inputTwo)
        vi.useRealTimers()
      })

      it('should call onBlur when shouldContainFocus=false and tab pressing last tabbable', () => {
        vi.useFakeTimers()
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

        act(() => {
          vi.runAllTimers()
        })

        expect(document.activeElement).toBe(inputTwo)

        fireEvent.keyDown(inputTwo, {
          key: 'Tab',
          code: 'Tab',
          keyCode: 9,
          charCode: 9
        })

        act(() => {
          vi.runAllTimers()
        })

        expect(onBlur).toHaveBeenCalled()
        vi.useRealTimers()
      })

      it('should call onBlur when shouldContainFocus=false and pressing Shift+Tab on the first tabbable', () => {
        vi.useFakeTimers()
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

        act(() => {
          vi.runAllTimers()
        })

        expect(document.activeElement).toBe(inputOne)

        fireEvent.keyDown(inputOne, {
          key: 'Tab',
          code: 'Tab',
          keyCode: 9,
          charCode: 9,
          shiftKey: true
        })

        act(() => {
          vi.runAllTimers()
        })

        expect(onBlur).toHaveBeenCalled()
        vi.useRealTimers()
      })
    })
  })
})
