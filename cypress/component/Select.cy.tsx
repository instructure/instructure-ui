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
import { Select } from '../../packages/ui'
import { IconCheckSolid } from '../../packages/ui-icons'
import 'cypress-real-events'
import '../support/component'

const defaultOptions = ['foo', 'bar', 'baz']
const getOptions = (
  highlighted?: string,
  selected?: string,
  disabled?: string
) =>
  defaultOptions.map((opt) => (
    <Select.Option
      id={opt}
      key={opt}
      isHighlighted={opt === highlighted}
      isSelected={opt === selected}
      isDisabled={opt === disabled}
    >
      {opt}
    </Select.Option>
  ))

describe('<Select/>', () => {
  it('should render dynamically colored icons before option', async () => {
    const renderBeforeLabel = (props: any) => {
      return (
        <IconCheckSolid color={props.isHighlighted ? 'warning' : 'brand'} />
      )
    }

    cy.mount(
      <Select renderLabel="Choose an option" isShowingOptions>
        <Select.Option
          id="0"
          isHighlighted
          renderBeforeLabel={renderBeforeLabel}
        >
          ungrouped option one
        </Select.Option>
        <Select.Option id="1" renderBeforeLabel={renderBeforeLabel}>
          grouped option one
        </Select.Option>
      </Select>
    )

    cy.get('input').click()
    cy.get('ul[role="listbox"]').as('listbox')
    cy.get('@listbox')
      .find('li [role="presentation"] svg')
      .then(($icons) => {
        const iconStyles = $icons.map((_index, icon) => {
          return window.getComputedStyle(icon).fill
        })

        expect(iconStyles[0]).to.equal('rgb(203, 78, 21)')
        expect(iconStyles[1]).to.equal('rgb(17, 124, 186)')
      })
  })

  it('should set maxHeight according to the visibleOptionsCount prop', async () => {
    cy.mount(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        visibleOptionsCount={2}
      >
        {getOptions()}
      </Select>
    )

    cy.get('ul[role="listbox"]').should(($listbox) => {
      const style = window.getComputedStyle($listbox[0])
      expect(style.height).to.equal('72px')
    })
  })

  it('should override maxHeight with optionsMaxHeight, even if visibleOptionsCount is set', async () => {
    cy.mount(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        visibleOptionsCount={2}
        optionsMaxHeight="50px"
      >
        {getOptions()}
      </Select>
    )

    cy.get('ul[role="listbox"]').should(($listbox) => {
      const style = window.getComputedStyle($listbox[0])
      expect(style.height).to.equal('50px')
    })
  })

  it('should fire onRequestHighlightOption when up/down arrows are pressed', async () => {
    const onRequestShowOptions = cy.spy()
    const onRequestHighlightOption = cy.spy()

    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {getOptions()}
      </Select>
    )

    cy.get('input').realPress('ArrowDown')
    cy.wrap(onRequestShowOptions).should('have.been.calledOnce')
    cy.wrap(onRequestHighlightOption).should('not.have.been.called')

    // Set prop isShowingOptions
    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
        isShowingOptions={true}
      >
        {getOptions()}
      </Select>
    )

    cy.get('input').realPress('ArrowDown')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.0.id')
      .should('equal', defaultOptions[0])

    // Set prop children
    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
        isShowingOptions={true}
      >
        {getOptions(defaultOptions[0])}
      </Select>
    )

    cy.get('input').realPress('ArrowDown')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[1])

    // Set prop children
    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
        isShowingOptions={true}
      >
        {getOptions(defaultOptions[1])}
      </Select>
    )

    cy.get('input').realPress('ArrowUp')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[0])

    // Set prop children (Should skip disabled option...)
    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
        isShowingOptions={true}
      >
        {getOptions(defaultOptions[0], undefined, defaultOptions[1])}
      </Select>
    )

    cy.get('input').realPress('ArrowDown')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[2])

    // Set prop children
    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestShowOptions={onRequestShowOptions}
        onRequestHighlightOption={onRequestHighlightOption}
        isShowingOptions={true}
      >
        {getOptions(defaultOptions[2], undefined, defaultOptions[1])}
      </Select>
    )

    cy.get('input').realPress('ArrowUp')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[0])
  })

  it('should fire onRequestHighlightOption when home/end is pressed', async () => {
    const onRequestHighlightOption = cy.spy()

    cy.mount(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {getOptions(defaultOptions[1])}
      </Select>
    )

    cy.get('input').realPress('Home')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[0])

    cy.get('input').realPress('End')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[2])

    // Set prop children (with a disabled option...)
    cy.mount(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {getOptions(undefined, undefined, defaultOptions[2])}
      </Select>
    )

    cy.get('input').realPress('End')
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[2])
  })

  it('should fire onRequestHighlightOption when onRequestShowOptions is called with selected options', async () => {
    const onRequestHighlightOption = cy.spy()

    cy.mount(
      <Select
        renderLabel="Choose an option"
        onRequestHighlightOption={onRequestHighlightOption}
      >
        {getOptions(undefined, defaultOptions[1])}
      </Select>
    )

    cy.get('input').click()
    cy.wrap(onRequestHighlightOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[1])
  })

  it('should fire onRequestSelectOption when enter is pressed', async () => {
    const onRequestSelectOption = cy.spy()

    cy.mount(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        onRequestSelectOption={onRequestSelectOption}
      >
        {getOptions(defaultOptions[1])}
      </Select>
    )

    cy.get('input').realPress('Enter')
    cy.wrap(onRequestSelectOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[1])
  })

  it('should fire onRequestSelectOption when options are clicked', async () => {
    const onRequestSelectOption = cy.spy()

    cy.mount(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        onRequestSelectOption={onRequestSelectOption}
      >
        {getOptions()}
      </Select>
    )

    cy.contains('foo').click()
    cy.wrap(onRequestSelectOption)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[1])
  })

  it('should fire onKeyDown while preserving default behavior', async () => {
    const onRequestHighlightOption = cy.spy()
    const onKeyDown = cy.spy()

    cy.mount(
      <Select
        isShowingOptions
        renderLabel="Choose an option"
        onRequestHighlightOption={onRequestHighlightOption}
        onKeyDown={onKeyDown}
      >
        {getOptions(defaultOptions[0])}
      </Select>
    )

    cy.get('input').realPress('ArrowDown')
    cy.get('input').realPress('a')

    cy.wrap(onRequestHighlightOption).should('have.been.calledOnce')
    cy.wrap(onKeyDown).should('have.been.calledTwice')
  })
})
