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
import {
  Popover,
  View,
  Button,
  CloseButton,
  FormFieldGroup,
  TextInput
} from '@instructure/ui/latest'

import '../support/component'
import 'cypress-real-events'

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

const PopoverExample = () => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <div id="main">
      <View>
        <Popover
          renderTrigger={<Button>Sign In</Button>}
          isShowingContent={popoverOpen}
          onShowContent={() => {
            setPopoverOpen(true)
          }}
          onHideContent={() => {
            setPopoverOpen(false)
          }}
          on="click"
          screenReaderLabel="Popover Dialog Example"
          shouldContainFocus
          shouldReturnFocus
          shouldCloseOnDocumentClick
          offsetY="16px"
          mountNode={() => document.getElementById('main')}
        >
          <View padding="medium" display="block" as="form">
            <CloseButton
              placement="end"
              offset="small"
              onClick={() => setPopoverOpen(false)}
              screenReaderLabel="Close"
            />
            <FormFieldGroup description="Log In">
              <TextInput renderLabel="Username" />
              <TextInput renderLabel="Password" type="password" />
            </FormFieldGroup>
          </View>
        </Popover>
      </View>
    </div>
  )
}

describe('<Popover/>', () => {
  it('opens and closes when clicking on the trigger', () => {
    cy.mount(<PopoverExample />)
    cy.contains('Sign In')
      .realClick()
      .then(() => {
        cy.get('#main').should('contain', 'Log In')
      })
    cy.contains('Sign In')
      .realClick()
      .then(() => {
        cy.get('#main').should('not.contain', 'Log In')
      })
  })

  // TODO convert to e2e regression
  // it('should hide content when clicked outside content by default', () => {
  //   const onHideContent = cy.spy()
  //   cy.mount(
  //     <div id="main">
  //       <div>
  //         <button>Outer</button>
  //       </div>
  //       <div>
  //         <Popover
  //           on="click"
  //           onHideContent={onHideContent}
  //           renderTrigger={<button>Trigger</button>}
  //         >
  //           <h2>Popover content</h2>
  //           <button>focus me</button>
  //         </Popover>
  //       </div>
  //     </div>
  //   )
  //   cy.contains('button', 'Trigger')
  //     .realClick()
  //     .then(() => {
  //       cy.contains('Popover content').should('be.visible')
  //     })
  //     .then(() => {
  //       cy.contains('button', 'Outer').click(0, 0)
  //     })
  //     .then(() => {
  //       cy.contains('Popover content').should('not.exist')
  //       cy.wrap(onHideContent)
  //         .should('have.been.calledOnce')
  //         .then((spy) => {
  //           cy.wrap(spy)
  //             .its('lastCall.args')
  //             .should('deep.include', { documentClick: true })
  //         })
  //     })
  // })

  it('should move focus into the content when the trigger is blurred', () => {
    const onHideContent = cy.spy()

    cy.mount(
      <span>
        <button>outer btn</button>
        <Popover
          isShowingContent={true}
          onHideContent={onHideContent}
          renderTrigger={<button>trigger btn initial focus me</button>}
          on={['hover', 'focus', 'click']}
          mountNode={() => document.getElementById('container')!}
          shouldContainFocus={false}
          shouldReturnFocus={false}
          shouldFocusContentOnTriggerBlur
        >
          <button>focus me after trigger</button>
        </Popover>
        <span id="container" />
        <button id="next">focus me last</button>
      </span>
    )

    cy.contains('button', 'trigger btn initial focus me')
      .focus()
      .wait(200)
      .then(() => {
        cy.contains('focus me after trigger').should('not.be.focused')
      })
      .then(() => {
        cy.realPress('Tab').wait(200)
      })
      .then(() => {
        cy.contains('focus me after trigger').should('be.focused')
      })
      .then(() => {
        cy.realPress('Tab').wait(200)
      })
      .then(() => {
        cy.wrap(onHideContent).should('have.been.calledOnce')
      })
  })

  it('should close the popover via trigger before dismissing via documentClick', async () => {
    const hideContentFn = cy.spy()
    cy.mount(<PopoverContainer onHideFn={hideContentFn} />)

    cy.contains('button', 'Trigger btn').click()

    // this means the `onHideContent` callback was first called because the trigger and not the document click
    // if it was the other way around that would mean the document click closed the popover and a trigger would open it again
    // which makes the popover seem "unclosable"
    cy.wrap(hideContentFn).should('have.been.calledWith', false)
    cy.wrap(hideContentFn).should('have.been.calledWith', true)
  })

  it('should call onHideContent when clicking outside', async () => {
    const hideContentFn = cy.spy()

    cy.mount(
      <div id="main">
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
          popover inner texts
        </Popover>
      </div>
    )

    cy.get('body').should('contain', 'popover inner texts')

    cy.get('body').click()
    cy.wrap(hideContentFn).should('have.been.calledWithMatch', {
      documentClick: true
    })
  })
})
