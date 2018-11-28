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

import { expect, mount, stub, spy, wait, within } from '@instructure/ui-test-utils'

import Tray from '../index'
import TrayLocator from '../locator'

describe('<Tray />', async () => {
  it('should render nothing and have a node with no parent when closed', async () => {
    await mount(
      <Tray label="Tray Example">
        Hello World
      </Tray>
    )
    const tray = await TrayLocator.find({ expectEmpty: true })
    expect(tray).to.not.exist()
  })

  it('should render children and have a node with a parent when open', async () => {
    await mount(
      <Tray label="Tray Example" open>
        Hello World
      </Tray>
    )
    const tray = await TrayLocator.find(':label(Tray Example)')

    expect(tray.getTextContent()).to.equal('Hello World')
  })

  it('should apply theme overrides when open', async () => {
    await mount(
      <Tray
        label="Tray Example"
        open
        size="small"
        theme={{
          smallWidth: '10em'
        }}
        placement="start"
      >
        <div>Hello</div>
      </Tray>
    )
    const tray = await TrayLocator.find()
    const dialog = await tray.find('[role="dialog"]')

    await wait(() => {
      expect(dialog.getComputedStyle().width)
        .to.equal('160px')
    })

  })

  it('should apply the a11y attributes', async () => {
    await mount(
      <Tray label="Tray Example" open>
        Hello World
      </Tray>
    )
    const tray = await TrayLocator.find()
    const dialog = await tray.find('[role="dialog"]')

    expect(dialog.getAttribute('aria-label')).to.equal('Tray Example')
  })

  it('should support onOpen prop', async () => {
    const onOpen = stub()
    await mount(
      <Tray
        label="Tray Example"
        open
        onOpen={onOpen}
      >
        Hello World
      </Tray>
    )

    await wait(() => {
      expect(onOpen).to.have.been.calledOnce()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = stub()
    const subject = await mount(
      <Tray
        label="Tray Example"
        open
        onClose={onClose}
      >
        Hello World
      </Tray>
    )

    await subject.setProps({ open: false })

    await wait(() => {
      expect(onClose).to.have.been.calledOnce()
    })
  })

  it('should take a prop for finding default focus', async () => {
    await mount(
      <Tray
        label="Tray Example"
        open
        defaultFocusElement={() => document.getElementById('my-input')}
      >
        Hello World
        <input type="text" />
        <input type="text" id="my-input"/>
      </Tray>
    )

    const tray = await TrayLocator.find()
    const input = await tray.find('#my-input')

    await wait(() => {
      expect(input.focused()).to.be.true()
    })
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    const onDismiss = stub()
    await mount(
      <Tray
        open
        label="Tray Example"
        shouldCloseOnDocumentClick
        onDismiss={onDismiss}
      >
        Hello World
        <input type="text" />
        <input type="text" id="my-input"/>
      </Tray>
    )

    await within(document.body).keyUp('escape', {
      defaultPrevented: false,
      bubbles: true,
      button: 0
    })

    await wait(() => {
      expect(onDismiss).to.have.been.calledOnce()
    })
  })

  describe('with a closeButtonLabel', async () => {
    it('should log deprecation warnings', async () => {
      const consoleWarn = spy(console, 'warn')
      await mount(
        <Tray
          label="Tray Example"
          closeButtonLabel="Close"
          open
        >
          Hello World
        </Tray>
      )

      expect(consoleWarn)
        .to.have.been.calledWithMatch('Warning: [Tray] `closeButtonLabel` was deprecated in 5.0.0.')
    })

    it('should render an "icon" style close button by default', async () => {
      await mount(
        <Tray
          label="Tray Example"
          closeButtonLabel="Close"
          open
        >
          Hello World
        </Tray>
      )
      const tray = await TrayLocator.find()
      const button = await tray.find('button:label(Close)')
      const icon = await button.find('svg[name="IconX"]')

      expect(icon).to.exist()
    })

    it('should focus closeButton by default', async () => {
      await mount(
        <Tray
          open
          label="Tray Example"
          closeButtonLabel="close"
        >
          <div>
            <input type="text" />
          </div>
        </Tray>
      )

      const tray = await TrayLocator.find()
      const button = await tray.find('button:label(close)')

      await wait(() => {
        expect(button.focused()).to.be.true()
      })
    })
  })

  describe('transition()', () => {

    const placements = {
      ltr: {
        enteringPlacements: {
          start: 'slide-left',
          end: 'slide-right',
          top: 'slide-up',
          bottom: 'slide-down'
        },
        exitingPlacements: {
          start: 'slide-left',
          end: 'slide-right',
          top: 'slide-up',
          bottom: 'slide-down'
        }
      },
      rtl: {
        enteringPlacements: {
          start: 'slide-right',
          end: 'slide-left'
        },
        exitingPlacements: {
          start: 'slide-right',
          end: 'slide-left'
        }
      }
    }

    for (const dir in placements) {
      describe(`when text direction is '${dir}'`, () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const placement in placements[dir].enteringPlacements) {
          const val = placements[dir].enteringPlacements[placement]
          it(`returns ${val} for ${placement} when entering`, async () => {
            const onEntered = stub()
            document.documentElement.setAttribute('dir', dir)

            await mount(
              <Tray
                open
                label="Tray Example"
                placement={placement}
                onEntered={onEntered}
              >
                Hello
              </Tray>
            )

            await wait(() => {
              expect(onEntered).to.have.been.calledWith(val)
            })
          })
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const placement in placements[dir].exitingPlacements) {
          const val = placements[dir].exitingPlacements[placement]
          it(`returns ${val} for ${placement} when exiting`, async () => {
            const onExited = stub()
            document.documentElement.setAttribute('dir', dir)

            const subject = await mount(
              <Tray
                open
                label="Tray Example"
                placement={placement}
                onExited={onExited}
              >
                Hello
              </Tray>
            )

            await subject.setProps({ open: false })

            await wait(() => {
              expect(onExited).to.have.been.calledWith(val)
            })
          })
        }
      })
    }
  })
})
