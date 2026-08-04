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
import { describe, it, expect, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import { Dialog } from '../index.js'
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

describe('<Dialog />', () => {
  it('should render nothing when closed', async () => {
    const { container } = await renderDialog({ open: false })

    expect(container.firstChild).not.toBeInTheDocument()
  })

  it('should render children when open', async () => {
    const { container } = await renderDialog({ open: true })

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveTextContent(TEST_TEXT)
  })

  it('should apply the a11y attributes', async () => {
    const { getByRole, getByLabelText } = await renderDialog({
      label: TEST_LABEL
    })
    const dialog = getByRole('dialog')
    const label = getByLabelText(TEST_LABEL)

    await expect.element(dialog).toBeInTheDocument()
    await expect.element(label).toBeInTheDocument()
  })

  it('should apply the role attributes, if explicitly passed', async () => {
    const { getByRole, getByLabelText } = await renderDialog({
      label: TEST_LABEL,
      role: 'region'
    })
    const regionRole = getByRole('region')
    const label = getByLabelText(TEST_LABEL)

    await expect.element(regionRole).toBeInTheDocument()
    await expect.element(label).toBeInTheDocument()
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    const onDismiss = vi.fn()
    await renderDialog({ onDismiss })

    // The FocusRegion's `keyup` listener is attached asynchronously, and a
    // region left over from an earlier test can swallow the first press, so
    // re-send the key on each attempt rather than asserting on a single one.
    await vi.waitFor(async () => {
      await userEvent.keyboard('{Escape}')

      expect(onDismiss).toHaveBeenCalled()
    })
  })

  it('should call onDismiss prop when the document is clicked', async () => {
    const onDismiss = vi.fn()
    await renderDialog({ onDismiss, shouldCloseOnDocumentClick: true })

    await userEvent.click(document.body)

    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  describe('managed focus', () => {
    it('should provide focus method', async () => {
      await render(
        <div>
          <DialogExample
            open
            contentElement={() => page.getByTestId('non-tabbable').element()}
          >
            {TEST_TEXT}
          </DialogExample>
          <div tabIndex={-1} data-testid="non-tabbable">
            {TEST_TEXT}
          </div>
        </div>
      )
      const nonTabbableContent = page.getByTestId('non-tabbable')

      await userEvent.tab()
      await expect.element(nonTabbableContent).toHaveFocus()
    })

    it('should warn when trying to focus or blur a closed dialog', async () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      let ref: any
      await render(<DialogExample open={false} ref={(el) => (ref = el)} />)

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
      await render(<DialogExample open />)
      const inputOne = page.getByTestId('input-one')

      await expect.element(inputOne).toHaveFocus()
    })

    it('should focus the first tabbable element when open prop becomes true', async () => {
      const { rerender } = await render(<DialogExample open={false} />)
      const inputTrigger = page.getByTestId('input-trigger')

      await expect.element(inputTrigger).toHaveFocus()

      await rerender(<DialogExample open={true} />)
      const inputOne = page.getByTestId('input-one')

      await expect.element(inputOne).toHaveFocus()
    })

    it('should take a prop for finding default focus', async () => {
      await render(
        <DialogExample
          open
          defaultFocusElement={() => page.getByTestId('input-two').element()}
        />
      )

      await expect.element(page.getByTestId('input-two')).toHaveFocus()
    })

    it('should still focus the defaultFocusElement when it is focusable but not tabbable', async () => {
      await render(
        <DialogExample
          open
          defaultFocusElement={() => page.getByTestId('non-tabbable').element()}
        >
          <div tabIndex={-1} data-testid="non-tabbable">
            {TEST_TEXT}
          </div>
        </DialogExample>
      )
      const nonTabbableContent = page.getByTestId('non-tabbable')

      await expect.element(nonTabbableContent).toHaveFocus()
    })

    it('should focus the contentElement by default if focusable and no defaultFocusElement is provided', async () => {
      await render(
        <div>
          <DialogExample
            open
            contentElement={() => page.getByTestId('non-tabbable').element()}
          >
            {TEST_TEXT}
          </DialogExample>
          <div tabIndex={-1} data-testid="non-tabbable">
            {TEST_TEXT}
          </div>
        </div>
      )
      const nonTabbableContent = page.getByTestId('non-tabbable')

      await expect.element(nonTabbableContent).toHaveFocus()
    })

    it('should focus the document body if there is no defaultFocusElement, tabbable elements, or focusable contentElement', async () => {
      const { rerender } = await render(
        <DialogExample open={false}>{TEST_TEXT}</DialogExample>
      )
      const inputTrigger = page.getByTestId('input-trigger').element()
      inputTrigger.focus()

      await rerender(<DialogExample open={true}>{TEST_TEXT}</DialogExample>)

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(document.body)
      })
    })

    it('should return focus', async () => {
      const { rerender } = await render(<DialogExample open={false} />)
      await expect.element(page.getByTestId('input-trigger')).toHaveFocus()

      await rerender(<DialogExample open={true} />)
      await expect.element(page.getByTestId('input-one')).toHaveFocus()

      await rerender(<DialogExample open={false} />)
      await expect.element(page.getByTestId('input-trigger')).toHaveFocus()
    })

    describe('when focus leaves the first and last tabbable', () => {
      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing last tabbable`, async () => {
        const onBlur = vi.fn()
        await render(
          <DialogExample
            open
            onBlur={onBlur}
            shouldContainFocus
            defaultFocusElement={() => page.getByTestId('input-two').element()}
          />
        )
        const inputOne = page.getByTestId('input-one')
        const inputTwo = page.getByTestId('input-two')

        await expect.element(inputTwo).toHaveFocus()

        await userEvent.tab()

        expect(onBlur).not.toHaveBeenCalled()
        await expect.element(inputOne).toHaveFocus()
      })

      it('should NOT call onBlur when shouldContainFocus=true and Shift+Tab pressing first tabbable', async () => {
        const onBlur = vi.fn()

        await render(
          <DialogExample
            open
            shouldContainFocus
            defaultFocusElement={() => page.getByTestId('input-one').element()}
            onBlur={onBlur}
          />
        )
        const inputOne = page.getByTestId('input-one')
        const inputTwo = page.getByTestId('input-two')

        await expect.element(inputOne).toHaveFocus()

        await userEvent.tab({ shift: true })

        expect(onBlur).not.toHaveBeenCalled()
        await expect.element(inputTwo).toHaveFocus()
      })

      it('should call onBlur when shouldContainFocus=false and tab pressing last tabbable', async () => {
        const onBlur = vi.fn()

        await render(
          <DialogExample
            open
            shouldContainFocus={false}
            defaultFocusElement={() => page.getByTestId('input-two').element()}
            onBlur={onBlur}
          />
        )
        const inputTwo = page.getByTestId('input-two')

        await expect.element(inputTwo).toHaveFocus()

        await userEvent.tab()

        await vi.waitFor(() => {
          expect(onBlur).toHaveBeenCalled()
        })
      })

      it('should call onBlur when shouldContainFocus=false and pressing Shift+Tab on the first tabbable', async () => {
        const onBlur = vi.fn()

        await render(
          <DialogExample
            open
            shouldContainFocus={false}
            defaultFocusElement={() => page.getByTestId('input-one').element()}
            onBlur={onBlur}
          />
        )
        const inputOne = page.getByTestId('input-one')

        await expect.element(inputOne).toHaveFocus()

        await userEvent.tab({ shift: true })

        await vi.waitFor(() => {
          expect(onBlur).toHaveBeenCalled()
        })
      })
    })
  })

  type NestedDialogExampleProps = {
    defaultInput?: 'one' | 'two'
    onBlur?: (...args: any[]) => void
    shouldContainFocus?: boolean
  }

  describe('Component tests', () => {
    const NestedDialogFocusExample = ({
      defaultInput = 'one',
      onBlur,
      shouldContainFocus = true
    }: NestedDialogExampleProps) => {
      const [nestedOpen, setNestedOpen] = useState(false)
      const handleTriggerClick = () => setNestedOpen(true)
      const inputOneRef = useRef<HTMLInputElement | null>(null)
      const inputTwoRef = useRef<HTMLInputElement | null>(null)

      return (
        <div>
          <Dialog
            open
            label={'label'}
            shouldReturnFocus
            shouldContainFocus={shouldContainFocus}
            onBlur={onBlur}
            defaultFocusElement={() =>
              defaultInput === 'one' ? inputOneRef.current : inputTwoRef.current
            }
          >
            <div>
              <div>
                <input
                  ref={inputOneRef}
                  onClick={handleTriggerClick}
                  type="text"
                  data-testid="nested-input-one"
                />
                <input
                  ref={inputTwoRef}
                  onClick={handleTriggerClick}
                  type="text"
                  data-testid="nested-input-two"
                />
              </div>
              <Dialog open={nestedOpen} label={'test-label'}>
                {'test-text'}
              </Dialog>
            </div>
          </Dialog>
        </div>
      )
    }

    it('should contain focus when last tabbable element triggers dialog w/out focusable content', async () => {
      const onBlur = vi.fn()
      await render(
        <NestedDialogFocusExample defaultInput={'one'} onBlur={onBlur} />
      )

      // Wait for the Dialog's initial focus (a requestAnimationFrame in
      // KeyboardFocusRegion) to land on the defaultFocusElement before
      // clicking the other input. Otherwise that pending rAF can fire after
      // the click and steal focus back.
      await expect.element(page.getByTestId('nested-input-one')).toHaveFocus()

      await userEvent.click(page.getByTestId('nested-input-two'))
      await expect.element(page.getByTestId('nested-input-two')).toHaveFocus()

      await userEvent.tab()

      await expect.element(page.getByTestId('nested-input-one')).toHaveFocus()
      expect(onBlur).not.toHaveBeenCalled()
    })

    it('should contain focus when first tabbable element triggers dialog w/out focusable content', async () => {
      const onBlur = vi.fn()
      await render(
        <NestedDialogFocusExample defaultInput={'two'} onBlur={onBlur} />
      )

      await expect.element(page.getByTestId('nested-input-two')).toHaveFocus()

      await userEvent.click(page.getByTestId('nested-input-one'))
      await expect.element(page.getByTestId('nested-input-one')).toHaveFocus()

      await userEvent.tab({ shift: true })

      await expect.element(page.getByTestId('nested-input-two')).toHaveFocus()
      expect(onBlur).not.toHaveBeenCalled()
    })

    it('should call onBlur when shouldContainFocus=false and last tabbable element triggers dialog w/out focusable content', async () => {
      const onBlur = vi.fn()
      await render(
        <NestedDialogFocusExample
          defaultInput={'two'}
          onBlur={onBlur}
          shouldContainFocus={false}
        />
      )

      await userEvent.click(page.getByTestId('nested-input-two'))
      await expect.element(page.getByTestId('nested-input-two')).toHaveFocus()

      await userEvent.tab()

      await vi.waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('should call onBlur when shouldContainFocus=false and first tabbable element triggers dialog w/out focusable content', async () => {
      const onBlur = vi.fn()
      await render(
        <NestedDialogFocusExample
          defaultInput={'one'}
          onBlur={onBlur}
          shouldContainFocus={false}
        />
      )

      await userEvent.click(page.getByTestId('nested-input-one'))
      await expect.element(page.getByTestId('nested-input-one')).toHaveFocus()

      await userEvent.tab({ shift: true })

      await vi.waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })
  })
})
