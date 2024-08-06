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
import 'cypress-real-events'

import { Drilldown } from '../../packages/ui'
import '../support/component'

const data = Array(5)
  .fill(0)
  .map((_v, ind) => ({
    label: `option ${ind}`,
    id: `opt_${ind}`
  }))

const renderOptions = (page: string) => {
  return data.map((option) => (
    <Drilldown.Option id={option.id} key={option.id}>
      {option.label} - {page}
    </Drilldown.Option>
  ))
}

describe('<Drilldown/>', () => {
  it('should disabled prop prevent option actions', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" disabled>
        <Drilldown.Page id="page0" renderActionLabel="Action">
          <Drilldown.Option id="page0option" subPageId="page1">
            Option-0
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1">
          <Drilldown.Option id="page1option">Option-1</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option-0').realClick()

    cy.get('Option-0').should('not.exist')
    cy.contains('Option-1').should('be.visible')
  })

  it('should disabled trigger, if disabled prop provided', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        disabled
        trigger={<button data-test-id="toggleButton">Toggle</button>}
      >
        <Drilldown.Page id="page0" renderActionLabel="Action">
          <Drilldown.Option id="page0option">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )

    cy.get('[data-test-id="toggleButton"]')
      .should('have.attr', 'aria-disabled', 'true')
      .and('be.disabled')

    cy.get('[data-test-id="toggleButton"]').click({ force: true })

    cy.get('#page0option').should('not.exist')
  })

  it('should rotate focus in the drilldown by default', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option1</Drilldown.Option>
          <Drilldown.Option id="option02">Option2</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('body').realClick()
    cy.get('body').realPress('Tab')

    cy.realPress('ArrowDown')
    cy.focused().should('have.id', 'option01')

    cy.realPress('ArrowDown')
    cy.focused().should('have.id', 'option02')

    cy.realPress('ArrowDown')
    cy.focused().should('have.id', 'option01')
  })

  it('should prevent focus rotation in the drilldown with "false"', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" rotateFocus={false}>
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
          <Drilldown.Option id="option02">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('body').realClick()
    cy.get('body').realPress('Tab')

    cy.realPress('ArrowDown')
    cy.focused().should('have.id', 'option01')

    cy.realPress('ArrowDown')
    cy.focused().should('have.id', 'option02')

    cy.realPress('ArrowDown')
    cy.focused().should('have.id', 'option02')
  })

  it('should set the width of the drilldown', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" width="320px">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[role="menu"]').should('have.css', 'width', '320px')
  })

  it('should set the width of the drilldown in the popover', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        width="320px"
        trigger={<button>Toggle</button>}
        defaultShow
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'width',
      '320px'
    )
  })

  it('should be overruled by maxWidth prop', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" width="300px" maxWidth="160px">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'width',
      '160px'
    )
  })

  it('should be affected by overflowX prop', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" width="320px" overflowX="auto">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">
            <div style={{ whiteSpace: 'nowrap' }}>
              Option with a very long label so that it has to break
            </div>
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]')
      .should('have.css', 'width', '320px')
      .and('have.css', 'overflow-x', 'auto')
      .then(($container) => {
        const scrollWidth = $container[0].scrollWidth
        const clientWidth = $container[0].clientWidth

        cy.wrap(scrollWidth > clientWidth).should('be.true')
      })
  })

  it('should set minWidth in popover mode', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        minWidth="336px"
        trigger={<button>Trigger</button>}
        show
        onToggle={cy.spy()}
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'width',
      '336px'
    )
  })

  it('should set the height of the drilldown', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" height="320px">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'height',
      '320px'
    )
  })

  it('should set the height of the drilldown in the popover', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        height="320px"
        trigger={<button>Toggle</button>}
        defaultShow
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'height',
      '320px'
    )
  })

  it('should be overruled by maxHeight prop', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" height="300px" maxHeight="160px">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'height',
      '160px'
    )
  })

  it('should be affected by overflowY prop', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" height="160px" overflowY="auto">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
          <Drilldown.Option id="option02">Option</Drilldown.Option>
          <Drilldown.Option id="option03">Option</Drilldown.Option>
          <Drilldown.Option id="option04">Option</Drilldown.Option>
          <Drilldown.Option id="option05">Option</Drilldown.Option>
          <Drilldown.Option id="option06">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]')
      .should('have.css', 'height', '160px')
      .and('have.css', 'overflow-y', 'auto')
      .then(($container) => {
        const scrollHeight = $container[0].scrollHeight
        const clientHeight = $container[0].clientHeight

        cy.wrap(scrollHeight > clientHeight).should('be.true')
      })
  })

  it('should minHeight prop set height', async () => {
    cy.mount(
      <Drilldown rootPageId="page0" minHeight="336px">
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'height',
      '336px'
    )
  })

  it('should minHeight prop set height in popover mode', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        minHeight="336px"
        trigger={<button>Trigger</button>}
        show
        onToggle={cy.spy()}
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('[class$="-drilldown__container"]').should(
      'have.css',
      'height',
      '336px'
    )
  })

  it('should call onDismiss when Drilldown is closed', async () => {
    const onDismiss = cy.spy()
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>Options</button>}
        onDismiss={onDismiss}
        defaultShow
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option0">Option 0</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('div[role="menu"]').focus()

    cy.realPress('Escape')

    cy.wrap(onDismiss)
      .should('have.been.called')
      .and(
        'have.been.calledWithMatch',
        Cypress.sinon.match.instanceOf(Event),
        false
      )
  })

  it('should shouldHideOnSelect prop be true by default', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>Toggle</button>}
        defaultShow
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option-01</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option01').should('exist')
    cy.get('#option01').click()
    cy.get('#option01').should('not.exist')
  })

  it('should not close on subPage nav, even if shouldHideOnSelect is "true"', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>Toggle</button>}
        defaultShow
        shouldHideOnSelect={true}
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01" subPageId="page1">
            Option
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1">
          <Drilldown.Option id="option11">Sub-Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('#option01').should('exist')
    cy.get('#option11').should('not.exist')

    cy.get('#option01').click()

    cy.get('#option01').should('not.exist')
    cy.get('#option11').should('exist')
  })

  it('should not close on Back nav, even if shouldHideOnSelect is "true"', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>Toggle</button>}
        defaultShow
        shouldHideOnSelect={true}
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01" subPageId="page1">
            Option01
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1">
          <Drilldown.Option id="option11">Sub-Option</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option01').should('be.visible')

    cy.get('#option01').click()

    cy.contains('Option01').should('not.exist')
    cy.contains('Sub-Option').should('be.visible')

    cy.contains('Back').click()

    cy.contains('Sub-Option').should('not.exist')
    cy.contains('Option01').should('be.visible')
  })

  it('should prevent closing when shouldHideOnSelect is "false"', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>Toggle</button>}
        defaultShow
        shouldHideOnSelect={false}
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option01">Option01</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('Option01').should('be.visible')

    cy.get('#option01').click()

    cy.contains('Option01').should('be.visible')
  })

  it('should be able to navigate between options with up/down arrows', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          {data.map((option) => (
            <Drilldown.Option id={option.id} key={option.id}>
              {option.label}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('div[role="menu"]').focus()

    cy.realPress('ArrowDown')
    cy.get('#opt_0').should('have.focus')

    cy.realPress('ArrowDown')
    cy.get('#opt_1').should('have.focus')

    cy.realPress('ArrowDown')
    cy.get('#opt_2').should('have.focus')

    cy.realPress('ArrowUp')
    cy.get('#opt_1').should('have.focus')
  })

  it('should be able to navigate forward between pages with right arrow', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0" renderTitle={'Page 0'}>
          <Drilldown.Option id="opt0" subPageId="page1">
            To Page 1
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1" renderTitle={'Page 1'}>
          {[
            <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
              To Page 2
            </Drilldown.Option>,
            ...renderOptions('page 1')
          ]}
        </Drilldown.Page>

        <Drilldown.Page id="page2" renderTitle="Page 2">
          {renderOptions('page 2')}
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('div[role="menu"]').focus()

    // the option which navigates to next page should be focused
    cy.realPress('ArrowDown')
    cy.get('#opt0').should('have.focus').and('have.text', 'To Page 1')

    // go to Page 1
    cy.realPress('ArrowRight')

    // on the Page 1 the 1st option is the `Back` button
    cy.realPress('ArrowDown')
    cy.contains('[role="menuitem"]', 'Back').should('have.focus')

    // next arrowDown should skip the header Title and focus on 'To Page 2' option
    cy.realPress('ArrowDown')
    cy.contains('[id^="DrilldownHeader-Title_"]', 'Page 1').should('be.visible')
    cy.contains('[role="button"]', 'To Page 2').should('have.focus')

    // go to Page 2
    cy.realPress('ArrowRight')

    // on Page 2 the header title should be 'Page 2'
    cy.contains('[id^="DrilldownHeader-Title_"]', 'Page 2').should('be.visible')
  })

  it('should be able to navigate back to previous page with left arrow', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0" renderTitle={'Page 0'}>
          <Drilldown.Option id="opt0" subPageId="page1">
            To Page 1
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1" renderTitle={'Page 1'}>
          {[
            <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
              To Page 2
            </Drilldown.Option>,
            ...renderOptions('page 1')
          ]}
        </Drilldown.Page>

        <Drilldown.Page id="page2" renderTitle="Page 2">
          {renderOptions('page 2')}
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('div[role="menu"]').focus()

    // go to Page 1
    cy.realPress('ArrowDown')
    cy.realPress('ArrowRight')

    // on Page 1 should be visible header title
    cy.contains('[id^="DrilldownHeader-Title_"]', 'Page 1').should('be.visible')

    // go to Page 0
    cy.realPress('ArrowLeft')

    // on Page 0 should be visible header title
    cy.contains('[id^="DrilldownHeader-Title_"]', 'Page 0').should('be.visible')
  })

  it('should close the drilldown on root page and left arrow is pressed', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>options</button>}
        defaultShow
      >
        <Drilldown.Page id="page0" renderTitle={'Page 0'}>
          <Drilldown.Option id="opt0" subPageId="page1">
            To Page 1
          </Drilldown.Option>
        </Drilldown.Page>
        <Drilldown.Page id="page1" renderTitle={'Page 1'}>
          {[
            <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
              To Page 2
            </Drilldown.Option>,
            ...renderOptions('page 1')
          ]}
        </Drilldown.Page>

        <Drilldown.Page id="page2" renderTitle="Page 2">
          {renderOptions('page 2')}
        </Drilldown.Page>
      </Drilldown>
    )
    cy.get('div[role="menu"]').focus()
    cy.contains('[id^="DrilldownHeader-Title_"]', 'Page 0').should('be.visible')

    cy.realPress('ArrowLeft')

    cy.contains('[id^="DrilldownHeader-Title_"]', 'Page 0').should('not.exist')
    cy.contains('div[role="menu"]').should('not.exist')
  })

  it('should correctly return focus when "trigger" and "shouldReturnFocus" is set', async () => {
    cy.mount(
      <Drilldown
        rootPageId="page0"
        trigger={<button>Options</button>}
        shouldReturnFocus
      >
        <Drilldown.Page id="page0">
          <Drilldown.Option id="option0">Option-0</Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    )
    cy.contains('button', 'Options').focus()
    cy.contains('Option-0').should('not.exist')

    cy.realPress('Space')

    cy.contains('Option-0').should('be.visible')

    cy.realPress('Escape')

    cy.contains('Option-0').should('not.exist')
    cy.contains('button', 'Options').should('have.focus')
  })
})
