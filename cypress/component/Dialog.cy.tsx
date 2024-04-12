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
import React, { useState, useRef } from 'react'
import { Dialog } from '../../packages/ui'
import 'cypress-real-events'

import '../support/component'

const NestedDialogExample = ({ defaultInput = 'one', onBlur }) => {
  const [nestedOpen, setNestedOpen] = useState(false)
  const handleTriggerClick = () => setNestedOpen(true)
  const inputOneRef = useRef(null)
  const inputTwoRef = useRef(null)

  return (
    <div>
      <Dialog
        open
        label={'label'}
        shouldReturnFocus
        shouldContainFocus
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

describe('<Dialog/>', () => {
  // when launching a dialog w/out focusable content from another dialog
  it('should contain focus when last tabbable element triggers dialog w/out focusable content', () => {
    const onBlur = cy.spy()

    cy.mount(<NestedDialogExample defaultInput={'one'} onBlur={onBlur} />)

    cy.get('[data-testid="nested-input-two"]').click().should('have.focus')

    cy.realPress('Tab')

    cy.get('[data-testid="nested-input-one"]').should('have.focus')

    cy.wrap(onBlur).should('not.have.been.called')
  })

  it('should contain focus when first tabbable element triggers dialog w/out focusable content', () => {
    const onBlur = cy.spy()

    cy.mount(<NestedDialogExample defaultInput={'two'} onBlur={onBlur} />)

    cy.get('[data-testid="nested-input-one"]').click().should('have.focus')

    cy.realPress(['Shift', 'Tab'])

    cy.get('[data-testid="nested-input-two"]').should('have.focus')

    cy.wrap(onBlur).should('not.have.been.called')
  })
})
