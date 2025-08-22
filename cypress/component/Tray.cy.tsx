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

import { Button, Overlay, Text, Tray, View } from '@instructure/ui'
import React from 'react'

import '../support/component'
import 'cypress-real-events'

describe('<Tray />', () => {
  it('should apply theme overrides when open', async () => {
    cy.mount(
      <Tray
        label="Tray Example"
        open
        size="small"
        placement="start"
        themeOverride={{ smallWidth: '10em' }}
      >
        <div>Hello</div>
      </Tray>
    )

    cy.get('[aria-label="Tray Example"]')
      .should('have.attr', 'role', 'dialog')
      .and('have.css', 'width', '160px')
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    const onDismiss = cy.stub()
    cy.mount(
      <Tray
        open
        label="Tray Example"
        shouldCloseOnDocumentClick
        onDismiss={onDismiss}
      >
        Hello Tray
        <input type="text" />
        <input type="text" id="my-input" />
      </Tray>
    )

    cy.get('[aria-label="Tray Example"]').as('tray')

    cy.get('@tray').realPress('Escape')
    cy.wrap(onDismiss).should('have.been.called')
  })

  it.only('should handle focus properly in complex cases', async () => {
    const Example = () => {
      const [showTray, setShowTray] = React.useState(false)
      const [showOverlay, setShowOverlay] = React.useState(false)

      const handleTrayButtonClick = () => {
        setShowOverlay(true)
        // hide the Tray after the Overlay is rendered.
        // This means it's not on the top of the FocusRegion stack
        setTimeout(() => {
          setShowTray(false)
        }, 30)
      }

      return (
        <View textAlign="center">
          <View as="div" maxWidth="600px" margin="0 auto">
            <Text as="p" size="large">
              Click the button below to open a tray. Then click the button
              inside the tray to trigger an overlay that will automatically
              close after a short time.
            </Text>
            <Button
              color="primary"
              size="large"
              id="open_tray_button"
              onClick={() => setShowTray(true)}
            >
              Open Tray
            </Button>
            <Button id="test1_button">test 1</Button>
            <Button id="test2_button">test 2</Button>
          </View>

          <Tray label="Sample Tray" open={showTray} placement="end">
            <Text as="p">
              This is the Tray. Click the button below to show an overlay and
              automatically close this tray after a short time.
            </Text>
            <Button
              color="success"
              id="close_tray_button"
              onClick={handleTrayButtonClick}
            >
              Close after a short time
            </Button>
            <Button onClick={() => setShowTray(false)}>Cancel</Button>
            <Button>test</Button>
          </Tray>

          <Overlay open={showOverlay} transition="fade" label="Loading overlay">
            <Text size="large" color="success">
              This is the overlay.
            </Text>
          </Overlay>
        </View>
      )
    }

    cy.mount(<Example />)

    cy.get('#open_tray_button').click()
    // Wait 500ms so the Tray CSS animation can finish
    cy.wait(500)
    // Click the close_tray_button. This should run the state changes in its handler
    cy.get('#close_tray_button').click()
    // Wait 500ms so the Tray CSS animation can finish
    cy.wait(500)
    cy.focused().should('have.attr', 'id', 'open_tray_button')
    cy.realPress('Tab')
    cy.focused().should('have.attr', 'id', 'test1_button')
    cy.realPress('Tab')
    cy.focused().should('have.attr', 'id', 'test2_button')
  })
})
