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
import Button from '@instructure/ui-buttons/lib/components/Button'

import Dialog from '../index'

describe('<Dialog />', () => {
  const testbed = new Testbed(
    (
      <Dialog>
        <Button>Hello World</Button>
      </Dialog>
    )
  )

  it('should render nothing when closed', () => {
    const subject = testbed.render()
    expect(subject).to.be.blank()
  })

  it('should render children when open', () => {
    const subject = testbed.render({
      open: true
    })
    expect(subject).to.include.text('Hello World')
  })

  it('should apply the a11y attributes', () => {
    const subject = testbed.render({ open: true, label: 'Dialog Example' })
    expect(subject.find('[role="dialog"]')).to.be.present
    expect(subject.find('[aria-label="Dialog Example"]')).to.be.present
  })

  it('should call onDismiss prop when Esc key pressed', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      shouldCloseOnEscape: true,
      onDismiss
    })

    testbed.tick()

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')

    expect(onDismiss).to.have.been.called
  })

  it('should call onDismiss prop when the document is clicked', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      shouldCloseOnDocumentClick: true,
      onDismiss
    })

    testbed.tick()

    testbed.wrapper.dispatchNativeMouseEvent('click', {
      bubbles: true
    })

    expect(onDismiss).to.have.been.called
  })
})

describe('<Dialog /> managed focus', () => {
  class DialogExample extends React.Component {
    static propTypes = {
      ...Dialog.propTypes
    }

    componentDidMount () {
      if (!this.props.open) {
        this._input.focus()
      }
    }

    render () {
      return (
        <div>
          <input
            type="text"
            ref={c => {
              this._input = c
            }}
          />
          <Dialog {...this.props} label="A Modal">
            <div>
              <input type="text" id="input-one" />
              <input type="text" id="input-two" />
            </div>
          </Dialog>
        </div>
      )
    }
  }

  const testbed = new Testbed(<DialogExample />)

  it('should focus the first tabbable element by default', () => {
    testbed.render({
      open: true
    })

    testbed.tick()

    expect(document.getElementById('input-one') === document.activeElement).to.be.true
  })

  it('should focus the first tabbable element when open prop becomes true', done => {
    const subject = testbed.render({
      open: false
    })

    subject.setProps(
      {
        open: true
      },
      () => {
        testbed.tick()
        expect(document.getElementById('input-one') === document.activeElement).to.be.true
        done()
      }
    )
  })

  it('should take a prop for finding default focus', () => {
    testbed.render({
      open: true,
      defaultFocusElement: function () {
        return document.getElementById('input-two')
      }
    })

    testbed.tick()

    expect(document.getElementById('input-two') === document.activeElement).to.be.true
  })
})
