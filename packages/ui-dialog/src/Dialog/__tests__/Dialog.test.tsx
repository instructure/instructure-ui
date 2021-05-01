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
  mount,
  stub,
  wait,
  within,
  find
} from '@instructure/ui-test-utils'
import { Dialog } from '../index'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Dialog />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render nothing when closed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Dialog>
        <button>Hello World</button>
      </Dialog>
    )

    expect(subject.getDOMNode()).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render children when open', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Dialog open>
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())
    expect(await dialog.find(':focusable')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should apply the a11y attributes', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Dialog open label="Dialog Example">
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())

    expect(await dialog.find('[role="dialog"]')).to.exist()
    expect(await dialog.find('[aria-label="Dialog Example"]')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onDismiss prop when Esc key pressed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onDismiss = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Dialog open onDismiss={onDismiss}>
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())

    await wait(() => {
      expect(dialog.containsFocus()).to.be.true()
    })

    await dialog.keyUp('escape')

    await wait(() => {
      expect(onDismiss).to.have.been.called()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onDismiss prop when the document is clicked', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onDismiss = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Dialog open shouldCloseOnDocumentClick onDismiss={onDismiss}>
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())

    await wait(() => {
      expect(dialog.containsFocus()).to.be.true()
    })

    await within(dialog.getOwnerDocument().documentElement).click()

    await wait(() => {
      expect(onDismiss).to.have.been.called()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('managed focus', async () => {
    class DialogExample extends React.Component {
      static propTypes = {
        ...Dialog.propTypes
      }

      componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'open' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        if (!this.props.open) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'DialogEx... Remove this comment to see the full error message
          this._input.focus()
        }
      }

      focusDialog() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_dialog' does not exist on type 'DialogE... Remove this comment to see the full error message
        this._dialog && this._dialog.focus()
      }

      blurDialog() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_dialog' does not exist on type 'DialogE... Remove this comment to see the full error message
        this._dialog && this._dialog.blur()
      }

      render() {
        return (
          <div>
            <input
              id="input-trigger"
              type="text"
              ref={(c) => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'DialogEx... Remove this comment to see the full error message
                this._input = c
              }}
            />
            <Dialog
              shouldContainFocus
              shouldReturnFocus
              label="A Modal"
              {...this.props}
              // @ts-expect-error ts-migrate(2339) FIXME: Property '_dialog' does not exist on type 'DialogE... Remove this comment to see the full error message
              ref={(el) => (this._dialog = el)}
            >
              {this.props.children || (
                <div>
                  <input type="text" id="input-one" />
                  <input type="text" id="input-two" />
                </div>
              )}
            </Dialog>
          </div>
        )
      }
    }

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should provide focus method', async () => {
      let ref
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div>
          <DialogExample
            open
            contentElement={() => document.getElementById('container')}
            ref={(el) => (ref = el)}
          >
            some content
          </DialogExample>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
          <div id="container" tabIndex="-1">
            some more content
          </div>
        </div>
      )

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ref.focusDialog()

      const container = await find('#container')
      await wait(() => {
        expect(container.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should warn when trying to focus or blur a closed dialog', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      const consoleError = stub(console, 'error')
      let ref
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div>
          <DialogExample
            open={false}
            contentElement={() => document.getElementById('container')}
            ref={(el) => (ref = el)}
          >
            some content
          </DialogExample>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
          <div id="container" tabIndex="-1">
            some more content
          </div>
        </div>
      )

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ref.focusDialog()

      await wait(() => {
        expect(consoleError).to.have.been.calledWithMatch(
          "[Dialog] Can't focus a Dialog that isn't open."
        )
      })

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ref.blurDialog()

      await wait(() => {
        expect(consoleError).to.have.been.calledWithMatch(
          "[Dialog] Can't blur a Dialog that isn't open."
        )
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should focus the first tabbable element by default', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<DialogExample open />)
      const input = await find('#input-one')
      await wait(() => {
        expect(input.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should focus the first tabbable element when open prop becomes true', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(<DialogExample open={false} />)

      await subject.setProps({ open: true })

      const input = await find('#input-one')

      await wait(() => {
        expect(input.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should take a prop for finding default focus', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DialogExample
          open
          defaultFocusElement={() => {
            return document.getElementById('input-two')
          }}
        />
      )

      const input = await find('#input-two')

      await wait(() => {
        expect(input.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should still focus the defaultFocusElement when it is focusable but not tabbable', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DialogExample
          open
          defaultFocusElement={() => document.getElementById('non-tabbable')}
        >
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
          <div tabIndex="-1" id="non-tabbable">
            hello world
          </div>
        </DialogExample>
      )

      const content = await find('#non-tabbable')
      await wait(() => {
        expect(content.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should focus the contentElement by default if focusable and no defaultFocusElement is provided', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div>
          <DialogExample
            open
            contentElement={() => document.getElementById('container')}
          >
            some content
          </DialogExample>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
          <div id="container" tabIndex="-1">
            some more content
          </div>
        </div>
      )

      const container = await find('#container')
      await wait(() => {
        expect(container.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should focus the document body if there is no defaultFocusElement, tabbable elements, or focusable contentElement', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <DialogExample open={false}>hello world</DialogExample>
      )

      const input = await find('#input-trigger')
      await input.focus()

      await subject.setProps({ open: true })

      const body = await find('body')

      await wait(() => {
        expect(body.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return focus', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(<DialogExample open={false} />)

      const trigger = await find('#input-trigger')

      expect(trigger.focused()).to.be.true()

      await subject.setProps({ open: true })

      const input = await find('#input-one')

      await wait(() => {
        expect(input.focused()).to.be.true()
      })

      await subject.setProps({ open: false })

      await wait(() => {
        expect(trigger.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when focus leaves the first and last tabbable', async () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing last tabbable`, async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onBlur = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        const subject = await mount(
          <DialogExample
            open
            shouldContainFocus
            defaultFocusElement={() => {
              return document.getElementById('input-two')
            }}
            onBlur={onBlur}
          />
        )
        const main = within(subject.getDOMNode())
        const inputOne = await main.find('[id=input-one]')
        const inputTwo = await main.find('[id=input-two]')

        await wait(() => {
          expect(inputTwo.focused()).to.be.true()
        })

        await inputTwo.keyDown('tab')

        await wait(() => {
          expect(onBlur).to.not.have.been.called()
          expect(inputOne.focused()).to.be.true()
        })
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing first tabbable`, async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onBlur = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        const subject = await mount(
          <DialogExample
            open
            shouldContainFocus
            defaultFocusElement={() => {
              return document.getElementById('input-one')
            }}
            onBlur={onBlur}
          />
        )
        const main = within(subject.getDOMNode())
        const inputOne = await main.find('[id=input-one]')
        const inputTwo = await main.find('[id=input-two]')

        await wait(() => {
          expect(inputOne.focused()).to.be.true()
        })

        await inputOne.keyDown('tab', {
          shiftKey: true
        })

        await wait(() => {
          expect(onBlur).to.not.have.been.called()
          expect(inputTwo.focused()).to.be.true()
        })
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it(`should call onBlur when shouldContainFocus=false and tab pressing last tabbable`, async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onBlur = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        const subject = await mount(
          <DialogExample
            open
            shouldContainFocus={false}
            defaultFocusElement={() => {
              return document.getElementById('input-two')
            }}
            onBlur={onBlur}
          />
        )
        const main = within(subject.getDOMNode())
        const inputTwo = await main.find('[id=input-two]')

        await inputTwo.focus()

        await wait(() => {
          expect(inputTwo.focused()).to.be.true()
        })

        await inputTwo.keyDown('tab')

        await wait(() => {
          expect(onBlur).to.have.been.called()
        })
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it(`should call onBlur when shouldContainFocus=false and tab pressing first tabbable`, async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onBlur = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        const subject = await mount(
          <DialogExample
            open
            shouldContainFocus={false}
            defaultFocusElement={() => {
              return document.getElementById('input-one')
            }}
            onBlur={onBlur}
          />
        )
        const main = within(subject.getDOMNode())
        const inputOne = await main.find('[id=input-one]')

        await inputOne.focus()

        await wait(() => {
          expect(inputOne.focused()).to.be.true()
        })

        await inputOne.keyDown('tab', {
          shiftKey: true
        })

        await wait(() => {
          expect(onBlur).to.have.been.called()
        })
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when launching a dialog w/out focusable content from another dialog', () => {
        class NestedDialogExample extends React.Component {
          static propTypes = {
            ...Dialog.propTypes
          }

          state = {
            open: false
          }

          // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
          handleTriggerClick = (e) => {
            this.setState({ open: true })
          }

          render() {
            return (
              <div>
                <Dialog open shouldReturnFocus label="A dialog" {...this.props}>
                  <div>
                    <div>
                      <input
                        onClick={this.handleTriggerClick}
                        type="text"
                        id="input-one"
                      />
                      <input
                        onClick={this.handleTriggerClick}
                        type="text"
                        id="input-two"
                      />
                    </div>
                    <Dialog open={this.state.open} label="Another dialog">
                      Hello world
                    </Dialog>
                  </div>
                </Dialog>
              </div>
            )
          }
        }

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it(`should contain focus when last tabbable element triggers dialog w/out focusable content`, async () => {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
          const onBlur = stub()

          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          const subject = await mount(
            <NestedDialogExample
              onBlur={onBlur}
              shouldContainFocus
              defaultFocusElement={() => document.getElementById('input-two')}
            />
          )

          const main = within(subject.getDOMNode())
          const inputOne = await main.find('input#input-one')
          const inputTwo = await main.find('input#input-two')

          await inputTwo.click()

          // Need to wait here to give new region time to activate
          await wait(() => {
            expect(inputTwo.focused()).to.be.true()
          })

          await inputTwo.keyDown('tab')

          await wait(() => {
            expect(onBlur).to.not.have.been.called()
            expect(inputOne.focused()).to.be.true()
          })
        })

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it(`should contain focus when first tabbable element triggers dialog w/out focusable content`, async () => {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
          const onBlur = stub()

          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          const subject = await mount(
            <NestedDialogExample
              onBlur={onBlur}
              shouldContainFocus
              defaultFocusElement={() => document.getElementById('input-one')}
            />
          )

          const main = within(subject.getDOMNode())
          const inputOne = await main.find('input#input-one')
          const inputTwo = await main.find('input#input-two')

          await inputOne.click()

          // Need to wait here to give new region time to activate
          await wait(() => {
            expect(inputOne.focused()).to.be.true()
          })

          await inputOne.keyDown('tab', {
            shiftKey: true
          })

          await wait(() => {
            expect(onBlur).to.not.have.been.called()
            expect(inputTwo.focused()).to.be.true()
          })
        })

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it(`should call onBlur when shouldContainFocus=false and last tabbable element triggers dialog w/out focusable content`, async () => {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
          const onBlur = stub()

          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          const subject = await mount(
            <NestedDialogExample
              onBlur={onBlur}
              shouldContainFocus={false}
              defaultFocusElement={() => document.getElementById('input-two')}
            />
          )

          const main = within(subject.getDOMNode())
          const inputTwo = await main.find('input#input-two')

          await inputTwo.click()

          // Need to wait here to give new region time to activate
          await wait(() => {
            expect(inputTwo.focused()).to.be.true()
          })

          await inputTwo.keyDown('tab')

          await wait(() => {
            expect(onBlur).to.have.been.called()
          })
        })

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it(`should call onBlur when shouldContainFocus=false and first tabbable element triggers dialog w/out focusable content`, async () => {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
          const onBlur = stub()

          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          const subject = await mount(
            <NestedDialogExample
              onBlur={onBlur}
              shouldContainFocus={false}
              defaultFocusElement={() => document.getElementById('input-one')}
            />
          )

          const main = within(subject.getDOMNode())
          const inputOne = await main.find('input#input-one')

          await inputOne.click()

          // Need to wait here to give new region time to activate
          await wait(() => {
            expect(inputOne.focused()).to.be.true()
          })

          await inputOne.keyDown('tab', {
            shiftKey: true
          })

          await wait(() => {
            expect(onBlur).to.have.been.called()
          })
        })
      })
    })
  })
})
