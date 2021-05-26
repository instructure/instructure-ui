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
  wrapQueryResult
} from '@instructure/ui-test-utils'

import { Tray } from '../index'
import { TrayLocator } from '../TrayLocator'

describe('<Tray />', async () => {
  it('should render nothing and have a node with no parent when closed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Tray label="Tray Example">Hello World</Tray>)
    const tray = await TrayLocator.find({ expectEmpty: true })
    expect(tray).to.not.exist()
  })

  it('should render children and have a node with a parent when open', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Tray label="Tray Example" open>
        Hello World
      </Tray>
    )
    const tray = await TrayLocator.find(':label(Tray Example)')

    expect(tray.getTextContent()).to.equal('Hello World')
  })

  it('should apply theme overrides when open', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Tray
        label="Tray Example"
        open
        size="small"
        placement="start"
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        themeOverride={{ smallWidth: '10em' }}
      >
        <div>Hello</div>
      </Tray>
    )
    const tray = await TrayLocator.find()
    const dialog = await tray.find('[role="dialog"]')
    await wait(() => {
      expect(dialog.getComputedStyle().width).to.equal('160px')
    })
  })

  it('should apply the a11y attributes', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onOpen = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Tray label="Tray Example" open onOpen={onOpen}>
        Hello World
      </Tray>
    )

    await wait(() => {
      expect(onOpen).to.have.been.calledOnce()
    })
  })

  it('should support onClose prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onClose = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Tray label="Tray Example" open onClose={onClose}>
        Hello World
      </Tray>
    )

    await subject.setProps({ open: false })

    await wait(() => {
      expect(onClose).to.have.been.calledOnce()
    })
  })

  it('should take a prop for finding default focus', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Tray
        label="Tray Example"
        open
        defaultFocusElement={() => document.getElementById('my-input')}
      >
        Hello World
        <input type="text" />
        <input type="text" id="my-input" />
      </Tray>
    )

    const tray = await TrayLocator.find()
    const input = await tray.find('#my-input')

    await wait(() => {
      expect(input.focused()).to.be.true()
    })
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onDismiss = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Tray
        open
        label="Tray Example"
        shouldCloseOnDocumentClick
        onDismiss={onDismiss}
      >
        Hello World
        <input type="text" />
        <input type="text" id="my-input" />
      </Tray>
    )

    const tray = await TrayLocator.find()

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    await (
      wrapQueryResult(tray.getOwnerDocument().documentElement) as any
    ).keyUp(
      'escape',
      {
        defaultPrevented: false,
        bubbles: true,
        button: 0
      },
      { focusable: false }
    )

    await wait(() => {
      expect(onDismiss).to.have.been.calledOnce()
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
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // eslint-disable-next-line no-restricted-syntax
        for (const placement in placements[dir].enteringPlacements) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const val = placements[dir].enteringPlacements[placement]
          it(`returns ${val} for ${placement} when entering`, async () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
            const onEntered = stub()
            document.documentElement.setAttribute('dir', dir)

            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            await mount(
              <Tray
                open
                label="Tray Example"
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                placement={placement}
                onEntered={onEntered}
              >
                Hello
              </Tray>
            )

            await wait(() => {
              expect(onEntered).to.have.been.called()
            })
          })
        }

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // eslint-disable-next-line no-restricted-syntax
        for (const placement in placements[dir].exitingPlacements) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const val = placements[dir].exitingPlacements[placement]
          it(`returns ${val} for ${placement} when exiting`, async () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
            const onExited = stub()
            document.documentElement.setAttribute('dir', dir)

            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            const subject = await mount(
              <Tray
                open
                label="Tray Example"
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                placement={placement}
                onExited={onExited}
              >
                Hello
              </Tray>
            )

            await subject.setProps({ open: false })

            await wait(() => {
              expect(onExited).to.have.been.called()
            })
          })
        }
      })
    }
  })
})
