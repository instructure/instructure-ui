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
import { expect } from 'chai'

import '../support/component'
import { px, within } from '@instructure/ui-utils'
import DrawerLayoutFixture from '../../packages/ui-drawer-layout/src/DrawerLayout/__fixtures__/DrawerLayout.fixture'

describe('<DrawerLayout/>', () => {
  it('with no overlay, layout content should have margin equal to tray width with placement=start', () => {
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="800px"
        trayWidth="250px"
        placement="start"
      />
    )

    cy.contains('div', 'Hello from tray').then(($tray) => {
      const trayWidth = px($tray.css('width'))

      cy.get('div[class$="-drawerLayout__content"]').should(($content) => {
        const marginLeft = px($content.css('margin-left'))

        expect(within(marginLeft, 250, 2)).to.equal(true)
        expect(marginLeft).to.equal(trayWidth)
      })
    })
  })

  it(`with no overlay, layout content should have margin equal to tray width with placement=end`, async () => {
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        placement="end"
        layoutWidth="800px"
        trayWidth="250px"
      />
    )

    cy.contains('div', 'Hello from tray').then(($tray) => {
      const trayWidth = px($tray.css('width'))

      cy.get('div[class$="-drawerLayout__content"]').should(($content) => {
        const marginRight = px($content.css('margin-right'))

        expect(within(marginRight, 250, 2)).to.equal(true)
        expect(marginRight).to.equal(trayWidth)
      })
    })
  })

  it(`with overlay, layout content should have a margin of zero with placement=start`, async () => {
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="700px"
        trayWidth="250px"
        placement="start"
      />
    )

    cy.get('div[class$="-drawerLayout__content"]').should(($content) => {
      const marginLeft = px($content.css('margin-left'))

      expect(marginLeft).to.equal(0)
    })
  })

  it(`with overlay, layout content should have a margin of zero with placement=end`, async () => {
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        placement="end"
        layoutWidth="700px"
        trayWidth="250px"
      />
    )

    cy.get('div[class$="-drawerLayout__content"]').should(($content) => {
      const marginRight = px($content.css('margin-right'))

      expect(marginRight).to.equal(0)
    })
  })

  it('the tray should overlay the content when the content is less than the minWidth', async () => {
    const onOverlayTrayChange = cy.spy()

    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="800px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    // set prop layoutWidth
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="295px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    cy.wrap(onOverlayTrayChange).should('have.been.calledWith', true)
  })

  it('the tray should stop overlaying the content when there is enough space for the content', async () => {
    const onOverlayTrayChange = cy.spy()

    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="400px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    // set prop layoutWidth
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="705px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    cy.wrap(onOverlayTrayChange).should('have.been.calledWith', false)
  })

  it('the tray should be set to overlay when it is opened and there is not enough space', async () => {
    const onOverlayTrayChange = cy.spy()

    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="295px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    // set prop open
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="295px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    cy.wrap(onOverlayTrayChange).should('have.been.calledWith', true)
  })

  it('the tray should not overlay on open when there is enough space', async () => {
    const onOverlayTrayChange = cy.spy()

    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="705px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    // set prop open
    cy.mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="705px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    cy.wrap(onOverlayTrayChange).should('have.been.calledWith', false)
  })
})
