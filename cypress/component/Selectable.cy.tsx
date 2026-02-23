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

import { Selectable } from '@instructure/ui/latest'
import { expect } from 'chai'
import 'cypress-real-events'
import '../support/component'

const defaultOptions = ['foo', 'bar', 'baz']

const getSelectable = (selectable) => (
  <span {...selectable.getRootProps()}>
    <label
      htmlFor={selectable.getInputProps().id}
      {...selectable.getLabelProps()}
    >
      Selectable
    </label>
    <input
      type="text"
      {...selectable.getTriggerProps()}
      {...selectable.getInputProps()}
    />
    <ul {...selectable.getListProps()}>
      {defaultOptions.map((opt) => (
        <li key={opt} {...selectable.getOptionProps({ id: opt })}>
          {opt}
        </li>
      ))}
    </ul>
  </span>
)

describe('<Selectable />', () => {
  it('should fire onRequestHideOptions when escape is pressed', async () => {
    const onRequestHideOptions = cy.stub()
    let defaultPrevented = false

    cy.mount(
      <div
        role="button"
        tabIndex={0}
        onKeyUp={(e) => {
          defaultPrevented = e.defaultPrevented
        }}
      >
        <Selectable
          isShowingOptions={true}
          onRequestHideOptions={onRequestHideOptions}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      </div>
    )

    cy.get('input')
      .focus()
      .realType('{esc}')
      .then(() => {
        cy.wrap(onRequestHideOptions).should('have.been.calledOnce')
        cy.wrap(defaultPrevented).should('be.true')
      })
  })

  it('should fire onRequestHideOptions when options are hovered', async () => {
    const onRequestHighlightOption = cy.stub()

    cy.mount(
      <Selectable onRequestHighlightOption={onRequestHighlightOption}>
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )

    cy.get('li').as('options')

    cy.get('@options').eq(0).trigger('mouseover')
    cy.wrap(onRequestHighlightOption)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('id', defaultOptions[0])
        expect(spy.lastCall.args[1]).not.to.have.property('direction')
      })

    cy.get('@options').eq(1).trigger('mouseover')
    cy.wrap(onRequestHighlightOption)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('id', defaultOptions[1])
        expect(spy.lastCall.args[1]).not.to.have.property('direction')
      })
  })

  it('should fire onRequestHideOptions when up/down arrows are pressed', async () => {
    const onRequestShowOptions = cy.stub()
    const onRequestHighlightOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={false}
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )

    cy.get('input[role$="combobox"]').as('input')
    cy.get('@input').type('{downArrow}')
    cy.wrap(onRequestHighlightOption).should('not.have.been.called')
    cy.wrap(onRequestShowOptions).should('have.been.called')

    // Set prop: isShowingOptions, highlightedOptionId
    cy.mount(
      <Selectable
        isShowingOptions={true}
        highlightedOptionId={defaultOptions[0]}
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )

    cy.get('@input').type('{downArrow}')
    cy.wrap(onRequestHighlightOption)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('direction', 1)
        expect(spy.lastCall.args[1]).not.to.have.property('id')
      })

    // Set prop: highlightedOptionId
    cy.mount(
      <Selectable
        isShowingOptions={true}
        highlightedOptionId={defaultOptions[1]}
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )

    cy.get('@input').type('{upArrow}')
    cy.wrap(onRequestHighlightOption)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('direction', -1)
        expect(spy.lastCall.args[1]).not.to.have.property('id')
      })
  })

  it('should fire onRequestHideOptions when home/end is pressed', async () => {
    const onRequestHighlightOption = cy.stub()
    const onRequestHighlightFirstOption = cy.stub()
    const onRequestHighlightLastOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={true}
        highlightedOptionId={defaultOptions[1]}
        onRequestHighlightOption={onRequestHighlightOption}
        onRequestHighlightFirstOption={onRequestHighlightFirstOption}
        onRequestHighlightLastOption={onRequestHighlightLastOption}
      >
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )

    cy.get('input[role$="combobox"]').as('input')

    cy.get('@input').type('{home}')
    cy.get('@input').type('{end}')
    cy.wrap(onRequestHighlightFirstOption).should('have.been.calledOnce')
    cy.wrap(onRequestHighlightLastOption).should('have.been.calledOnce')
    cy.wrap(onRequestHighlightOption).should('not.have.been.called')
  })

  it('should fire onRequestSelectOption when enter is pressed', async () => {
    const onRequestSelectOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={true}
        highlightedOptionId={defaultOptions[1]}
        onRequestSelectOption={onRequestSelectOption}
      >
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )
    cy.get('input[role$="combobox"]').as('input')

    cy.get('@input').type('{enter}')
    cy.wrap(onRequestSelectOption)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('id', defaultOptions[1])
      })
  })

  it('should fire onRequestSelectOption when options are clicked', async () => {
    const onRequestSelectOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={true}
        onRequestSelectOption={onRequestSelectOption}
      >
        {(selectable) => getSelectable(selectable)}
      </Selectable>
    )

    cy.get('li').as('options')

    cy.get('@options').eq(1).click()
    cy.wrap(onRequestSelectOption)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('id', defaultOptions[1])
      })
  })

  it('getRootProps() should allow supplemental onKeyDown behavior', async () => {
    const onKeyDown = cy.stub()
    const onRequestHighlightOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={true}
        highlightedOptionId={defaultOptions[1]}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {(selectable) => (
          <span {...selectable.getRootProps({ onKeyDown })}>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
          </span>
        )}
      </Selectable>
    )

    cy.get('input[role$="combobox"]').as('input')

    cy.get('@input').type('{downArrow}')
    cy.get('@input').type('{upArrow}')

    cy.wrap(onRequestHighlightOption).should('have.been.calledTwice')
    cy.wrap(onKeyDown).should('have.been.calledTwice')
  })

  it('getTriggerProps() should allow supplemental onKeyDown behavior', async () => {
    const onKeyDown = cy.stub()
    const onRequestHighlightOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={true}
        highlightedOptionId={defaultOptions[1]}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <input
              type="text"
              {...selectable.getTriggerProps({ onKeyDown })}
              {...selectable.getInputProps()}
            />
          </span>
        )}
      </Selectable>
    )

    cy.get('input[role$="combobox"]').as('input')

    cy.get('@input').type('{downArrow}')
    cy.get('@input').type('{upArrow}')
    cy.get('@input').type('a')

    cy.wrap(onRequestHighlightOption).should('have.been.calledTwice')
    cy.wrap(onKeyDown).should('have.been.calledThrice')
  })

  it('getOptionProps() should allow supplemental onMouseOver behavior', async () => {
    const onMouseOver = cy.stub()
    const onRequestHighlightOption = cy.stub()

    cy.mount(
      <Selectable
        isShowingOptions={true}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {(selectable) => (
          <span>
            <input type="text" {...selectable.getInputProps()} />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li
                  key={opt}
                  {...selectable.getOptionProps({ id: opt, onMouseOver })}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )

    cy.get('li').as('options')

    cy.get('@options').eq(0).trigger('mouseover')
    cy.get('@options').eq(1).trigger('mouseover')

    cy.wrap(onMouseOver).should('have.been.calledTwice')
    cy.wrap(onRequestHighlightOption).should('have.been.calledTwice')
  })
})
