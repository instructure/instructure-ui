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
import { SourceCodeEditor } from '@instructure/ui/latest'

import '../support/component'
import 'cypress-real-events'

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in aliquam erat, sit amet imperdiet arcu. Curabitur cursus et diam in pharetra.'

describe('<SourceCodeEditor/>', () => {
  it('should behave uncontrolled', async () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(
      <SourceCodeEditor
        label="foo"
        defaultValue="hello"
        onChange={onChangeSpy}
      />
    )
    cy.get('[role="textbox"]')
      .should('contain.text', 'hello')
      .click()
      .realType(' world')

    cy.get('@onChangeSpy').should('have.been.calledWith', 'hello world')

    cy.get('[role="textbox"]').invoke('text').should('contain', 'hello world')
  })

  it('should behave controlled', async () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(
      <SourceCodeEditor label="foo" value="hello" onChange={onChangeSpy} />
    )

    cy.get('[role="textbox"]')
      .should('contain.text', 'hello')
      .click()
      .realType('w')

    cy.get('@onChangeSpy').should('have.been.calledWith', 'hellow')
    cy.get('[role="textbox"]').invoke('text').should('eq', 'hello')

    cy.mount(
      <SourceCodeEditor
        label="foo"
        value="hello world"
        onChange={onChangeSpy}
      />
    )

    cy.get('[role="textbox"]').invoke('text').should('eq', 'hello world')
  })

  it('should focus editor on load', async () => {
    cy.mount(<SourceCodeEditor label="foo" autofocus />)
    cy.get('[role="textbox"]').should('have.focus')
  })

  it("shouldn't update value when typing if readOnly", async () => {
    cy.mount(<SourceCodeEditor label="foo" readOnly />)

    cy.get('[role="textbox"]').should('not.contain.text', 'w')
    cy.get('[role="textbox"]').realType('w')
    cy.get('[role="textbox"]').should('not.contain.text', 'w')
  })

  it('should wrap lines when lineWrapping is true', () => {
    let boxWidth: number
    let boxHeight: number
    let wrappedBoxWidth: number
    let wrappedBoxHeight: number

    cy.mount(<SourceCodeEditor label="foo" defaultValue={LONG_TEXT} />)

    cy.get('[role="textbox"]')
      .should('exist')
      .invoke('css', ['width', 'height'])
      .then((styles) => {
        boxWidth = parseFloat(styles.width)
        boxHeight = parseFloat(styles.height)
      })

    // Set props: lineWrapping
    cy.mount(
      <SourceCodeEditor label="foo" defaultValue={LONG_TEXT} lineWrapping />
    )

    cy.get('[role="textbox"]')
      .should('exist')
      .invoke('css', ['width', 'height'])
      .then((styles) => {
        wrappedBoxWidth = parseFloat(styles.width)
        wrappedBoxHeight = parseFloat(styles.height)

        expect(wrappedBoxWidth).to.be.lessThan(boxWidth)
        expect(wrappedBoxHeight).to.be.greaterThan(boxHeight)
      })
  })

  it('should apply and update width', async () => {
    const testValue1 = '300px'
    const testValue2 = '500px'

    cy.mount(
      <SourceCodeEditor
        label="this is a label for the SR"
        defaultValue="hello"
        width={testValue1}
      />
    )

    cy.get('[class$="-codeEditor"]').should('have.css', 'width', testValue1)

    cy.get('.cm-editor').should('have.css', 'width', testValue1)

    cy.get('[role="textbox"]').should('have.css', 'width', testValue1)

    // Set props: width
    cy.mount(
      <SourceCodeEditor
        label="this is a label for the SR"
        defaultValue="hello"
        width={testValue2}
      />
    )

    cy.get('[class$="-codeEditor"]').should('have.css', 'width', testValue2)

    cy.get('.cm-editor').should('have.css', 'width', testValue2)

    cy.get('[role="textbox"]').should('have.css', 'width', testValue2)
  })

  it('should apply and update height', async () => {
    const testValue1 = '300px'
    const testValue2 = '500px'

    cy.mount(
      <SourceCodeEditor
        label="this is a label for the SR"
        defaultValue="hello"
        height={testValue1}
      />
    )

    cy.get('[class$="-codeEditor"]').should('have.css', 'height', testValue1)

    cy.get('.cm-editor').should('have.css', 'height', testValue1)

    cy.get('[role="textbox"]').should('have.css', 'height', testValue1)

    // Set props: height
    cy.mount(
      <SourceCodeEditor
        label="this is a label for the SR"
        defaultValue="hello"
        height={testValue2}
      />
    )

    cy.get('[class$="-codeEditor"]').should('have.css', 'height', testValue2)

    cy.get('.cm-editor').should('have.css', 'height', testValue2)

    cy.get('[role="textbox"]').should('have.css', 'height', testValue2)
  })
})
