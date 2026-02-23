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

import 'cypress-real-events'

import { SideNavBarItem } from '@instructure/ui/latest'
import { IconAdminLine } from '@instructure/ui/latest'
import '../support/component'

describe('<SideNavBarItem/>', () => {
  it('should show a tooltip when the nav is minimized ', async () => {
    const onClick = cy.spy()
    cy.mount(
      <div data-testid="navBarItemWrapper" style={{ width: 300 }}>
        <SideNavBarItem
          icon={<IconAdminLine />}
          label="Admin"
          onClick={onClick}
          minimized={true}
        />
      </div>
    )
    cy.get('body').find('span[role="tooltip"]').should('contain', 'Admin')
    cy.get('body').find('span[role="tooltip"]').should('not.be.visible')

    cy.get('button').realHover().wait(100)

    cy.get('body').find('span[role="tooltip"]').should('be.visible')
  })
})
