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

import { useState } from 'react'
import { act, render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'
import Popover from '../index'

const PopoverContainer = ({
  onHideFn
}: {
  onHideFn: (documentClick: boolean) => void
}) => {
  const [popoverOpen, setPopoverOpen] = useState(true)
  return (
    <div>
      <Popover
        renderTrigger={<button>Trigger btn</button>}
        isShowingContent={popoverOpen}
        onShowContent={() => {
          setPopoverOpen(true)
        }}
        onHideContent={(_e, { documentClick }) => {
          setPopoverOpen(false)
          onHideFn(documentClick)
        }}
        on="click"
        screenReaderLabel="Popover Dialog Example"
        shouldContainFocus
        shouldReturnFocus
        shouldCloseOnDocumentClick
        offsetY="16px"
      >
        popover inner text
      </Popover>
    </div>
  )
}

describe('<Popover />', () => {
  it('should close the popover via trigger before dismissing via documentClick', async () => {
    const hideContentFn = jest.fn()
    const { findByText } = render(<PopoverContainer onHideFn={hideContentFn} />)

    userEvent.click(await findByText('Trigger btn'))
    await waitFor(async () => {
      // this means the `onHideContent` callback was first called because the trigger and not the document click
      // if it was the other way around that would mean the document click closed the popover and a trigger would open it again
      // which makes the popover seem "unclosable"
      expect(hideContentFn).toHaveBeenNthCalledWith(1, false)
      expect(hideContentFn).toHaveBeenNthCalledWith(2, true)
    })
  })

  it('should call onHideContent when clicking outside', async () => {
    const hideContentFn = jest.fn()

    render(
      <div>
        <Popover
          renderTrigger={<button>Trigger btn</button>}
          isShowingContent={true}
          onHideContent={(_e, o) => hideContentFn(o)}
          on="click"
          screenReaderLabel="Popover Dialog Example"
          shouldContainFocus
          shouldReturnFocus
          offsetY="16px"
        >
          popover inner text
        </Popover>
      </div>
    )

    act(async () => {
      await userEvent.click(document.body)
    })
    await waitFor(() => {
      expect(hideContentFn).toHaveBeenCalledWith({ documentClick: true })
    })
  })
})
