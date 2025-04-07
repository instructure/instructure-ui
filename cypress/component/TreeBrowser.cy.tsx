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
import { TreeBrowser, TreeNode } from '@instructure/ui'

import '../support/component'
import 'cypress-real-events'

const COLLECTIONS_DATA = {
  2: { id: 2, name: 'Root Directory', collections: [3, 4], items: [1] },
  3: { id: 3, name: 'Sub Root 1', collections: [5] },
  4: { id: 4, name: 'Sub Root 2' },
  5: { id: 5, name: 'Nested Sub Collection' }
}

const ITEMS_DATA = {
  1: { id: 1, name: 'Item 1' }
}

describe('<TreeBrowser/>', () => {
  it('should persist the state of expanded children when parent collapsed', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )
    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .realClick()
      .wait(500)

    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .realClick()
      .wait(500)

    cy.get('[role="treeitem"]').should('have.length', 5)

    cy.contains('Root Directory').realClick().wait(500)

    cy.get('[role="treeitem"]').should('have.length', 1)

    cy.contains('[role="treeitem"]', 'Root Directory').realClick().wait(500)

    cy.get('[role="treeitem"]').should('have.length', 5)
  })

  it('should not update expanded on click when set as explicit prop', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        expanded={[2]}
      />
    )

    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .realClick()
      .wait(500)

    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .realClick()
      .wait(500)

    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Nested Sub Collection').should(
      'not.exist'
    )
  })

  it('should call onCollectionToggle on arrow key expansion or collapse', async () => {
    const onCollectionToggle = cy.spy()

    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        onCollectionToggle={onCollectionToggle}
      />
    )
    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{rightarrow}')
      .realType('{leftarrow}')
      .realType('{leftarrow}')

    cy.wrap(onCollectionToggle).should('have.been.calledTwice')
  })

  it('should move focus with the up/down arrow keys', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{downarrow}')

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .should('be.focused')
      .realType('{downarrow}')

    cy.contains('[role="treeitem"]', 'Sub Root 1').should('not.be.focused')

    cy.contains('[role="treeitem"]', 'Sub Root 2')
      .should('exist')
      .should('be.focused')
      .realType('{uparrow}')

    cy.contains('[role="treeitem"]', 'Sub Root 1').should('be.focused')
  })

  it('should move focus via keyboard shortcuts', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('j')

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .should('be.focused')
      .realType('j')

    cy.contains('[role="treeitem"]', 'Sub Root 1').should('not.be.focused')

    cy.contains('[role="treeitem"]', 'Sub Root 2')
      .should('exist')
      .should('be.focused')
      .realType('k')

    cy.contains('[role="treeitem"]', 'Sub Root 1').should('be.focused')
  })

  it('should open collapsed collection with right arrow', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )
    cy.get('[role="treeitem"]').should('have.length', 1)

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{rightarrow}')

    cy.get('[role="treeitem"]').should('have.length', 4)
  })

  it('should move focus down when right arrow is pressed on expanded collection', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )
    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{rightarrow}')

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .should('be.focused')

    cy.get('[role="treeitem"]').should('have.length', 4)
  })

  it('should collapse expanded collection when left arrow is pressed', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )

    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{leftarrow}')
      
    cy.contains('[role="treeitem"]', 'Root Directory').should('be.focused')
    cy.get('[role="treeitem"]').should('have.length', 1)
  })

  it('should move focus up when left arrow is pressed on collapsed collection', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )
    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{leftarrow}')

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .should('be.focused')

    cy.get('[role="treeitem"]').should('have.length', 4)
  })

  it('should select the node on enter or space if selectionType is not "none"', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
        selectionType="single"
      />
    )
    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{enter}')

    cy.contains('[role="treeitem"]', 'Root Directory').should(
      'have.attr',
      'aria-selected',
      'true'
    )

    cy.contains('[role="treeitem"]', 'Sub Root 1')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType(' ') // Space key press

    cy.contains('[role="treeitem"]', 'Sub Root 1').should(
      'have.attr',
      'aria-selected',
      'true'
    )
  })

  it('should not expand the node on enter or space if selectionType is not "none"', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        selectionType="single"
      />
    )
    cy.get('[role="treeitem"]').should('have.length', 1)

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{enter}')

    cy.get('[role="treeitem"]').should('have.length', 1)
  })

  it('should move to the top node without expanding/collapsing anything when home is pressed', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )

    cy.get('[role="treeitem"]').should('have.length', 4)

    cy.contains('[role="treeitem"]', 'Item 1') // Last item
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{home}')

    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .should('be.focused')

    cy.get('[role="treeitem"]').should('have.length', 4)
  })

  it('should move to the bottom node without expanding/collapsing anything when end is pressed', async () => {
    cy.mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
        defaultExpanded={[2]}
      />
    )
    cy.contains('[role="treeitem"]', 'Root Directory')
      .should('exist')
      .focus()
      .should('be.focused')
      .realType('{end}')

    cy.contains('[role="treeitem"]', 'Item 1') // Last item
      .should('exist')
      .should('be.focused')

    cy.get('[role="treeitem"]').should('have.length', 4)
  })

  describe('TreeNode', () => {
    it('should take the selected CSS props if it is selected', async () => {
      const pink = 'rgb(255, 0, 255)'

      cy.mount(
        <TreeNode
          id="1"
          selected={true}
          themeOverride={{ selectedBackgroundColor: pink }}
        >
          <div> Hello!</div>
        </TreeNode>
      )

      cy.get('[class$="-treeButton"]')
        .should('exist')
        .and('have.css', 'background-color', pink)
    })

    it('should take the focused class if it is focused', async () => {
      cy.mount(
        <TreeNode id="1" focused={true}>
          <input />
        </TreeNode>
      )

      cy.get('[class$="-treeButton"]')
        .should('exist')
        .and('have.css', 'opacity', '1')
    })
  })
})
