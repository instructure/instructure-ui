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
import React, { useState } from 'react'
import { Modal, View, Button } from '@instructure/ui'
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

  it('should call onDismiss prop when Esc key pressed by default', () => {
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

    cy.get('body').trigger('keydown', { keyCode: 27 })
    cy.get('body').trigger('keyup', { keyCode: 27 })
    cy.wrap(onDismissSpy).should('have.been.calledOnce')
  })

  it('should not call stale callbacks', () => {
    const handleDismissSpy = cy.spy()
    interface ExampleProps {
      handleDismiss: (value: number) => void
    }

    function Example({ handleDismiss }: ExampleProps) {
      const [value, setValue] = useState(0)

      function onButtonClick() {
        setValue(value + 1)
      }

      return (
        <View>
          <Modal
            label="Modal"
            open
            onDismiss={() => {
              handleDismiss(value)
            }}
          >
            <Modal.Body>
              <p>Modal body text</p>
              <div id="value-indicator">{value}</div>
              <button id="increment-btn" onClick={onButtonClick}>
                Increment Button
              </button>
            </Modal.Body>
          </Modal>
        </View>
      )
    }
    cy.mount(<Example handleDismiss={handleDismissSpy} />)

    cy.root().should('contain', 'Modal body text')

    cy.get('#increment-btn').click().wait(100)
    cy.get('#value-indicator').should('contain', '1')
    cy.wrap(handleDismissSpy).should('not.have.been.called')

    cy.get('body').click(0, 0)
    cy.wrap(handleDismissSpy).should('have.been.calledOnceWith', 1)
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
})
