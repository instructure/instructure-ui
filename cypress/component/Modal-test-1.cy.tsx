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
import { Tooltip, Modal, Button, CloseButton } from '@instructure/ui'
import 'cypress-real-events'

import '../support/component'

describe('<Modal/>', () => {
  it('should be just here for flake prevention', () => {
    const onDismissSpy = cy.spy()
    cy.mount(
      <Modal
        open={true}
        onDismiss={onDismissSpy}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <p>Modal body text</p>
      </Modal>
    )
    cy.root().should('contain', 'Modal body text')
  })

  it('should not close when button is clicked to rerender content', () => {
    const TestModal = () => {
      const [isOpen, setIsOpen] = useState(false)
      const [state, setState] = useState({
        content:
          'This content should change by clicking on the Change content button',
        isButtonVisible: true
      })

      return (
        <div>
          <Button onClick={() => setIsOpen(true)}>Open the Modal</Button>

          {isOpen && (
            <Modal
              label="label"
              open
              onDismiss={() => setIsOpen(false)}
              shouldCloseOnDocumentClick
            >
              <Modal.Body>
                <div data-testid="modal-content">{state.content}</div>
                {state.isButtonVisible && (
                  <Button
                    onClick={() =>
                      setState({
                        content: 'The content has changed!',
                        isButtonVisible: false
                      })
                    }
                    data-testid="change-content-button"
                  >
                    Change content
                  </Button>
                )}
                <Button
                  data-testid="close-button"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </Modal.Body>
            </Modal>
          )}
        </div>
      )
    }

    cy.mount(<TestModal />)

    cy.contains('Open the Modal').realClick()

    cy.get('[data-testid="modal-content"]').should('be.visible')

    cy.get('[data-testid="change-content-button"]')
      .realClick()
      .then(() => cy.get('[data-testid="modal-content"]').should('be.visible'))

    cy.get('[data-testid="close-button"]').should('be.visible')

    cy.get('[data-testid="close-button"]').realClick()

    cy.get('[data-testid="modal-content"]').should('not.exist')
  })

  it('should not close with shouldCloseOnDocumentClick when Tooltip inside is clicked on', async () => {
    const TestModal = () => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            Open the Modal
          </Button>
          <Modal
            label="modal"
            open={open}
            onDismiss={() => {
              setOpen(false)
            }}
            shouldCloseOnDocumentClick
          >
            <CloseButton
              screenReaderLabel="Close"
              onClick={() => {
                setOpen(false)
              }}
            />
            <Tooltip renderTip="Tooltip!">
              <Button data-testid="trigger">Hello</Button>
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
        .realClick()
        .wait(500)
        .then(() => {
          cy.get(tooltip).should('be.visible')
          cy.get('[role="dialog"]').should('be.visible')
        })
    })
  })

  it('should not close with shouldCloseOnDocumentClick when inside Tooltip has renderTip with HTML content', async () => {
    const TestModal = () => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            Open the Modal
          </Button>
          <Modal
            label="modal"
            open={open}
            onDismiss={() => {
              setOpen(false)
            }}
            shouldCloseOnDocumentClick
          >
            <CloseButton
              screenReaderLabel="Close"
              onClick={() => {
                setOpen(false)
              }}
            />
            <Tooltip
              renderTip={
                <div>
                  <div>HTML content</div>
                </div>
              }
            >
              <Button data-testid="trigger">Hello</Button>
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
        .realClick()
        .wait(500)
        .then(() => {
          cy.get(tooltip).should('be.visible')
          cy.get('[role="dialog"]').should('be.visible')
        })
    })
  })

  it('should not close with shouldCloseOnDocumentClick when ToolTip button is focused and Tooltip is clicked', async () => {
    const TestModal = () => {
      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            Open the Modal
          </Button>
          <Modal
            label="modal"
            open={open}
            onDismiss={() => {
              setOpen(false)
            }}
            shouldCloseOnDocumentClick
          >
            <CloseButton
              screenReaderLabel="Close"
              onClick={() => {
                setOpen(false)
              }}
            />
            <Tooltip renderTip={<div>HTML content</div>}>
              <Button data-testid="trigger">Hello</Button>
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
        .realClick()
        .then(() => {
          cy.get(tooltip).should('be.visible')
          cy.get('[data-testid="trigger"]')
            .should('have.focus')
            .then(() => {
              cy.get(tooltip)
                .realClick()
                .wait(500)
                .then(() => {
                  cy.get('[role="dialog"]').should('be.visible')
                })
            })
        })
    })
  })
})
