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

import { AppNav } from '@instructure/ui'

import '../support/component'
import 'cypress-real-events'

describe('<AppNav/>', () => {
  it('should hide and show items based on the containing element width', async () => {
    const onUpdate = cy.spy()
    const itemWidth = 70

    const Nav = ({ width }: { width: number }) => (
      <div style={{ width }}>
        <AppNav screenReaderLabel="App navigation" onUpdate={onUpdate}>
          <AppNav.Item
            renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
            href="http://instructure.design"
          />
        </AppNav>
      </div>
    )

    cy.mount(<Nav width={800} />)

    cy.wrap(onUpdate).should('have.been.calledWithMatch', {
      visibleItemsCount: 4
    })

    cy.mount(<Nav width={400} />)

    cy.wrap(onUpdate).should('have.been.calledWithMatch', {
      visibleItemsCount: 2
    })
  })
})
