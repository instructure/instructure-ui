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
import { TruncateList } from '@instructure/ui'
import { expect } from 'chai'

import '../support/component'
import 'cypress-real-events'

describe('<TruncateList />', () => {
  it('should pass how many items should be visible with `onUpdate` prop', async () => {
    const onUpdate = cy.stub()
    cy.mount(
      <TruncateList onUpdate={onUpdate} style={{ width: '100px' }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    cy.get('li[class$="_listItem"]').as('items')
    cy.get('@items').should('have.length', 3)

    cy.wrap(onUpdate).should('have.been.calledWith', {
      visibleItemsCount: 2
    })
  })

  it('should behave controlled', async () => {
    const initialItemNumber = 2
    const updatedItemNumber = 9

    cy.mount(
      <TruncateList
        visibleItemsCount={initialItemNumber}
        style={{ width: '400px' }}
      >
        {Array.from(Array(15)).map((_item, idx) => (
          <div key={idx}>Item {idx + 1}</div>
        ))}
      </TruncateList>
    )
    cy.get('li[class$="_listItem"]').as('items')
    cy.get('@items').should('have.length', initialItemNumber)

    // Set Prop: visibleItemsCount
    cy.mount(
      <TruncateList
        visibleItemsCount={updatedItemNumber}
        style={{ width: '400px' }}
      >
        {Array.from(Array(15)).map((_item, idx) => (
          <div key={idx}>Item {idx + 1}</div>
        ))}
      </TruncateList>
    )
    cy.get('@items').should('have.length', updatedItemNumber)
  })

  it('should renderHiddenItemMenu callback return hidden children', async () => {
    const renderHiddenItemMenu = cy.stub()
    cy.mount(
      <TruncateList
        style={{ width: '100px' }}
        visibleItemsCount={2}
        renderHiddenItemMenu={renderHiddenItemMenu}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 3</div>
      </TruncateList>
    )

    cy.wrap(renderHiddenItemMenu)
      .should('have.been.called')
      .then((spy) => {
        const args = spy.lastCall.args[0]

        expect(args.length).to.equal(3)

        args.forEach((item) => {
          expect(item.props.children).to.be.oneOf([
            'Item 3',
            'Item 4',
            'Item 5'
          ])
        })
      })
  })

  it('should have no item spacing by default', async () => {
    cy.mount(
      <TruncateList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </TruncateList>
    )

    cy.get('li[class$="_listItem"]').as('items')

    cy.get('@items').each(($item) => {
      cy.wrap($item)
        .should('have.css', 'margin', '0px')
        .and('have.css', 'padding', '0px')
    })
  })

  it('should add itemSpacing', async () => {
    cy.mount(
      <TruncateList
        itemSpacing={'1rem'}
        visibleItemsCount={3}
        renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </TruncateList>
    )
    cy.get('li[class$="_listItem"]').as('items')

    cy.get('@items').should('have.length', 3)

    cy.get('@items').each((item, idx) => {
      cy.wrap(item)
        .should('have.css', 'margin', '0px')
        .should('have.css', 'padding', idx === 0 ? '0px' : '0px 0px 0px 16px')
    })
  })

  it('should resize list when itemSpacing changed in runtime', async () => {
    const Example = ({ itemSpacing }) => {
      const [itemsCount, setItemsCount] = useState(5)

      return (
        <TruncateList
          onUpdate={({ visibleItemsCount }) => {
            setItemsCount(visibleItemsCount)
          }}
          visibleItemsCount={itemsCount}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
          itemSpacing={itemSpacing}
          style={{ width: '400px' }}
        >
          {Array.from(Array(15)).map((_item, idx) => (
            <div key={idx}>Item {idx + 1}</div>
          ))}
        </TruncateList>
      )
    }

    cy.mount(<Example itemSpacing="1rem" />)

    cy.get('li[class$="_listItem"]:visible').as('items')

    cy.get('@items').should('have.length', 5)
    cy.get('@items').each((item, idx) => {
      cy.wrap(item)
        .should('have.css', 'margin', '0px')
        .should('have.css', 'padding', idx === 0 ? '0px' : '0px 0px 0px 16px')
    })

    // Set prop: itemSpacing
    cy.mount(<Example itemSpacing="4rem" />)

    cy.get('li[class$="_listItem"]:visible').as('updatedItems')

    cy.get('@updatedItems').should('have.length', 3)
    cy.get('@items').each((item, idx) => {
      cy.wrap(item)
        .should('have.css', 'margin', '0px')
        .should('have.css', 'padding', idx === 0 ? '0px' : '0px 0px 0px 64px')
    })
  })

  it('should add fix width to the trigger li item via fixMenuTriggerWidth prop', async () => {
    cy.mount(
      <TruncateList
        fixMenuTriggerWidth="320px"
        visibleItemsCount={1}
        renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </TruncateList>
    )
    cy.get('li[class$="_menuTrigger"]').as('trigger')
    cy.get('@trigger').should('have.css', 'width', '320px')
  })

  it('when not set, should be the width of its content', async () => {
    cy.mount(
      <TruncateList
        visibleItemsCount={1}
        renderHiddenItemMenu={() => (
          <div style={{ width: '80px' }} id="trigger">
            trigger label
          </div>
        )}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )

    cy.get('li[class$="_menuTrigger"]').as('trigger')

    cy.get('@trigger').should('have.css', 'width', '80px')
  })

  it('should resize list when fixMenuTriggerWidth changed in runtime', async () => {
    const Example = ({ fixMenuTriggerWidth }) => {
      const [itemsCount, setItemsCount] = useState(Number)

      return (
        <TruncateList
          fixMenuTriggerWidth={fixMenuTriggerWidth}
          onUpdate={({ visibleItemsCount }) => {
            setItemsCount(visibleItemsCount)
          }}
          visibleItemsCount={itemsCount}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
          itemSpacing="1rem"
          style={{ width: '400px' }}
        >
          {Array.from(Array(15)).map((_item, idx) => (
            <div key={idx}>Item {idx + 1}</div>
          ))}
        </TruncateList>
      )
    }

    cy.mount(<Example fixMenuTriggerWidth="1rem" />)

    cy.get('li[class$="_menuTrigger"]').as('trigger')
    cy.get('li[class$="_listItem"]:visible').as('items')

    cy.get('@items').should('have.length', 6)
    cy.get('@trigger').should('have.css', 'width', '16px')

    // Set prop: fixMenuTriggerWidth
    cy.mount(<Example fixMenuTriggerWidth="10rem" />)

    cy.get('li[class$="_menuTrigger"]').as('trigger')
    cy.get('li[class$="_listItem"]:visible').as('items')

    cy.get('@items').should('have.length', 4)
    cy.get('@trigger').should('have.css', 'width', '160px')
  })
})
