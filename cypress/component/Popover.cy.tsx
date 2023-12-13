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
import {
  Popover,
  View,
  Button,
  CloseButton,
  FormFieldGroup,
  TextInput
} from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

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
})
