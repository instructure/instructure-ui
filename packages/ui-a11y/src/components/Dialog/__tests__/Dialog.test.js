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
import { expect, mount, stub, wait, within, find} from '@instructure/ui-test-utils'
import Dialog from '../index'

describe('<Dialog />', async () => {
  it('should render nothing when closed', async () => {
    const subject = await mount(
      <Dialog>
        <button>Hello World</button>
      </Dialog>
    )

    expect(subject.getDOMNode()).to.not.exist()
  })

  it('should render children when open', async () => {
    const subject = await mount(
      <Dialog open>
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())
    expect(await dialog.find(':focusable')).to.exist()
  })

  it('should apply the a11y attributes', async () => {
    const subject = await mount(
      <Dialog
        open
        label="Dialog Example"
      >
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())

    expect(await dialog.find('[role="dialog"]')).to.exist()
    expect(await dialog.find('[aria-label="Dialog Example"]')).to.exist()
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    const onDismiss = stub()
    const subject = await mount(
      <Dialog
        open
        onDismiss={onDismiss}
      >
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

  it('should call onDismiss prop when the document is clicked', async () => {
    const onDismiss = stub()
    const subject = await mount(
      <Dialog
        open
        shouldCloseOnDocumentClick
        onDismiss={onDismiss}
      >
        <button>Hello World</button>
      </Dialog>
    )

    const dialog = within(subject.getDOMNode())

    await wait(() => {
      expect(dialog.containsFocus()).to.be.true()
    })

    await within(dialog.getOwnerDocument().documentElement)
      .click()

    expect(onDismiss).to.have.been.called()
  })

  describe('managed focus', async () => {
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
              id="input-trigger"
              type="text"
              ref={c => {
                this._input = c
              }}
            />
            <Dialog
              shouldContainFocus
              shouldReturnFocus
              label="A Modal"
              {...this.props}
            >
              <div>
                <input type="text" id="input-one" />
                <input type="text" id="input-two" />
              </div>
            </Dialog>
          </div>
        )
      }
    }

    it('should focus the first tabbable element by default', async () => {
      await mount(<DialogExample open={true} />)
      const input = await find('#input-one')
      await wait(() => {
        expect(input.focused()).to.be.true()
      })
    })

    it('should focus the first tabbable element when open prop becomes true', async () => {
      const subject = await mount(
        <DialogExample open={false} />
      )

      await subject.setProps({ open: true })

      const input = await find('#input-one')

      await wait(() => {
        expect(input.focused()).to.be.true()
      })
    })

    it('should take a prop for finding default focus', async () => {
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

    it('should return focus', async () => {
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

    describe('when focus leaves the first and last tabbable', async () => {
      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing last tabbable`, async () => {
        const onBlur = stub()
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

      it(`should NOT call onBlur when shouldContainFocus=true and tab pressing first tabbable`, async () => {
        const onBlur = stub()
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

      it(`should call onBlur when shouldContainFocus=false and tab pressing last tabbable`, async () => {
        const onBlur = stub()
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

      it(`should call onBlur when shouldContainFocus=false and tab pressing first tabbable`, async () => {
        const onBlur = stub()
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

      describe('when launching a dialog w/out focusable content from another dialog', () => {
        class NestedDialogExample extends React.Component {
          static propTypes = {
            ...Dialog.propTypes
          }

          state = {
            open: false
          }

          handleTriggerClick = e => {
            this.setState({ open: true })
          }

          render () {
            return (
              <div>
                <Dialog
                  open
                  shouldReturnFocus
                  label="A dialog"
                  {...this.props}
                >
                  <div>
                    <div>
                      <input onClick={this.handleTriggerClick} type="text" id="input-one" />
                      <input onClick={this.handleTriggerClick} type="text" id="input-two" />
                    </div>
                    <Dialog
                      open={this.state.open}
                      label="Another dialog"
                    >
                      Hello world
                    </Dialog>
                  </div>
                </Dialog>
              </div>
            )
          }
        }

        it(`should contain focus when last tabbable element triggers dialog w/out focusable content`, async () => {
          const onBlur = stub()

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

        it(`should contain focus when first tabbable element triggers dialog w/out focusable content`, async () => {
          const onBlur = stub()

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

        it(`should call onBlur when shouldContainFocus=false and last tabbable element triggers dialog w/out focusable content`, async () => {
          const onBlur = stub()

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

        it(`should call onBlur when shouldContainFocus=false and first tabbable element triggers dialog w/out focusable content`, async () => {
          const onBlur = stub()

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
