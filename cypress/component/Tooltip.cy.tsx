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
import { useState } from 'react'
import 'cypress-real-events'

import { Modal, Tooltip, Button } from '@instructure/ui'
import { IconInfoLine } from '@instructure/ui-icons'
import '../support/component'

describe('<Tooltip/>', () => {
  it('should render the tip offscreen', async () => {
    cy.mount(
      <div>
        <button>For dismiss</button>
        <Tooltip renderTip="Hello">
          <a data-testid="trigger" href="example.html">
            Hover or focus me
          </a>
        </Tooltip>
      </div>
    )

    cy.contains('Hello').should('not.be.visible')
    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const offscreenPopoverId = $trigger.attr('data-position-target')
      const offscreenPopover = `[data-position-content="${offscreenPopoverId}"]`

      cy.get(offscreenPopover).should('have.text', 'Hello')
      cy.get(offscreenPopover).should('have.css', 'display', 'none')
      cy.get(offscreenPopover).should('have.css', 'left', '-159984px')
    })

    cy.get('[data-testid="trigger"]').realHover().wait(100)

    cy.contains('Hello').should('be.visible')
    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const popoverId = $trigger.attr('data-position-target')
      const popover = `span[data-position-content="${popoverId}"]`

      cy.get(popover).should('have.text', 'Hello')
      cy.get(popover).should('have.css', 'display', 'block')
      cy.get(popover).should('have.css', 'left', '0px')
    })
  })

  it('should show tip by default when defaultIsShowingContent is true', async () => {
    cy.mount(
      <Tooltip renderTip="Hello" defaultIsShowingContent>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    cy.contains('Hello').should('be.visible')

    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const popoverId = $trigger.attr('data-position-target')
      const popover = `span[data-position-content="${popoverId}"]`

      cy.get(popover).should('have.text', 'Hello')
      cy.get(popover).should('have.css', 'display', 'block')
      cy.get(popover).should('have.css', 'left', '0px')
    })
  })

  it('should show tip when isShowingContent is true', async () => {
    cy.mount(
      <Tooltip renderTip={<h2>Hello</h2>} isShowingContent>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    cy.contains('Hello').should('be.visible')
    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const popoverId = $trigger.attr('data-position-target')
      const popover = `span[data-position-content="${popoverId}"]`

      cy.get(popover).should('have.text', 'Hello')
      cy.get(popover).should('have.css', 'display', 'block')
      cy.get(popover).should('have.css', 'left', '0px')
    })
  })

  it('should call onShowContent and on onHideContent', async () => {
    const onShowContent = cy.spy()
    const onHideContent = cy.spy()

    cy.mount(
      <div>
        <button>For dismiss</button>
        <Tooltip
          renderTip={<h2>Hello</h2>}
          onShowContent={onShowContent}
          onHideContent={onHideContent}
        >
          <a data-testid="trigger" href="example.html">
            Hover or focus me
          </a>
        </Tooltip>
      </div>
    )

    cy.get('[data-testid="trigger"]').realHover()
    cy.contains('Hello').should('be.visible')
    cy.wrap(onShowContent).should('have.been.calledOnce')

    cy.contains('button', 'For dismiss').realHover()
    cy.contains('Hello').should('not.be.visible')
    cy.wrap(onHideContent).should('have.been.calledOnce')
  })

  it('should remain visible when Tooltip is hovered over', async () => {
    cy.mount(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a data-testid="trigger" href="example.html">
          Hover me!
        </a>
      </Tooltip>
    )

    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const tooltipId = $trigger.attr('data-position-target')
      const tooltip = `span[data-position-content="${tooltipId}"]`

      cy.get(tooltip).should('not.be.visible')

      cy.contains('Hover me!').realHover()

      cy.get(tooltip).should('be.visible')

      cy.contains('Hello').realHover().wait(100)

      cy.get(tooltip).should('be.visible')
    })
  })

  it('should close when Esc key is pressed', async () => {
    cy.mount(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a data-testid="trigger" href="example.html">
          Hover me!
        </a>
      </Tooltip>
    )

    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const tooltipId = $trigger.attr('data-position-target')
      const tooltip = `span[data-position-content="${tooltipId}"]`

      cy.get(tooltip).should('not.be.visible')

      cy.contains('Hover me!').realHover()

      cy.get(tooltip).should('be.visible').realPress('Escape')

      cy.get(tooltip).should('not.be.visible')
    })
  })

  it('should close when Esc key is pressed and Tooltip is hovered over', async () => {
    cy.mount(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a data-testid="trigger" href="example.html">
          Hover me!
        </a>
      </Tooltip>
    )

    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const tooltipId = $trigger.attr('data-position-target')
      const tooltip = `span[data-position-content="${tooltipId}"]`

      cy.get(tooltip).should('not.be.visible')

      cy.contains('Hover me!')
        .realHover()
        .then(() => {
          cy.get(tooltip).should('be.visible')
        })

      cy.contains('Hello')
        .realHover()
        .then(() => {
          cy.realPress('Escape').then(() => {
            cy.get(tooltip).should('not.be.visible')
          })
        })
    })
  })

  it('should close when Esc key is pressed, but should not close the parent modal', () => {
    const TestModal = () => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button onClick={() => setOpen((state) => !state)}>
            Open the Modal
          </Button>
          <Modal
            data-testid="modal"
            open={open}
            onDismiss={() => setOpen(false)}
            label="modal"
          >
            Hello, Word!
            <Tooltip renderTip="Hello. I'm a tool tip">
              <IconInfoLine data-testid="trigger" />
            </Tooltip>
          </Modal>
        </div>
      )
    }
    cy.mount(<TestModal />)

    cy.contains('Open the Modal').click()

    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const tooltipId = $trigger.attr('data-position-target')
      const tooltip = `span[data-position-content="${tooltipId}"]`

      cy.get(tooltip).should('not.be.visible')

      cy.get('[data-testid="trigger"]')
        .realHover()
        .then(() => {
          cy.get(tooltip).should('be.visible')
        })

      cy.get(tooltip)
        .realPress('Escape')
        .then(() => {
          cy.get(tooltip).should('not.be.visible')
          cy.wait(300)
          cy.get('[role="dialog"]').should('be.visible')
        })

      cy.get('[role="dialog"]')
        .realPress('Escape')
        .then(() => {
          cy.get('[role="dialog"]').should('not.exist')
        })
    })
  })

  it('should allow closing modal with Esc when the modal trigger button has a Tooltip', async () => {
    const TestModal = () => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Tooltip renderTip="Hello. I'm a tool tip">
            <Button
              onClick={() => {
                setOpen((state) => !state)
              }}
            >
              Open the Modal
            </Button>
          </Tooltip>
          <Modal
            open={open}
            onDismiss={() => {
              setOpen(false)
            }}
            label="modal"
          >
            Hello, World!
          </Modal>
        </div>
      )
    }
    cy.mount(<TestModal />)

    cy.contains('Open the Modal').click()

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('[role="dialog"]')
      .realPress('Escape')
      .then(() => {
        cy.get('[role="dialog"]').should('not.exist')
      })
  })

  it('should not trap focus when Modal closing button has a Tooltip', async () => {
    const TestModal = () => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button
            onClick={() => {
              setOpen((state) => !state)
            }}
          >
            Open the Modal
          </Button>
          <Button>Hello</Button>
          <Modal
            label="modal"
            open={open}
            onDismiss={() => {
              setOpen((state) => !state)
            }}
          >
            <Tooltip renderTip="Hello. I'm a tool tip">
              <Button
                onClick={() => {
                  setOpen((state) => !state)
                }}
              >
                Close the Modal
              </Button>
            </Tooltip>
          </Modal>
        </div>
      )
    }
    cy.mount(<TestModal />)

    cy.contains('Open the Modal').click()

    cy.get('[role="dialog"]').should('be.visible')

    cy.contains('Close the Modal')
      .realPress('Space')
      .then(() => {
        cy.get('[role="dialog"]').should('not.exist')
      })

    cy.contains('Open the Modal').should('be.focused')

    cy.contains('Open the Modal').realPress('Tab')

    cy.contains('Hello').should('be.focused')
  })
})
