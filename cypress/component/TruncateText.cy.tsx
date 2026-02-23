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

import { TruncateText, Text } from '@instructure/ui/latest'
import { expect } from 'chai'
import '../support/component'

describe('<TruncateText />', () => {
  const defaultText = 'Hello world! This is a long string that should truncate'
  const baseStyle = {
    fontSize: '16px',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal'
  }

  it('should truncate text', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    cy.get('[class$="-truncateText"]')
      .invoke('text')
      .should('not.contain', 'truncate')
      .and('contain', '\u2026')
  })

  it('should recalculate when parent width changes', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: '200px' }} data-testid="container">
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    cy.get('[class$="-truncateText"]').invoke('text').as('text1')

    cy.get('[data-testid="container"]').invoke('css', {
      ...baseStyle,
      width: '100px'
    })

    cy.get('[class$="-truncateText"]').invoke('text').as('text2')

    cy.get('@text2').then((text2) => {
      cy.get('@text1').should('not.equal', text2)
    })

    cy.get('[data-testid="container"]').invoke('css', {
      ...baseStyle,
      width: '400px'
    })

    cy.get('[class$="-truncateText"]').invoke('text').as('text3')

    cy.get('@text3').then((text3) => {
      cy.get('@text2').should('not.equal', text3)
    })
  })

  it('should preserve node structure', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: '200px' }}>
        <TruncateText>
          <p className="testClass">
            Hello world! <strong>This is a</strong> long string that{' '}
            <em>should truncate</em>
          </p>
        </TruncateText>
      </div>
    )

    cy.get('p.testClass')
      .as('paragraph')
      .should('exist')
      .and('have.class', 'testClass')
      .within(() => {
        cy.get('strong').should('exist')
        cy.get('em').should('exist')
      })

    cy.get('@paragraph').then((paragraph) => {
      expect(paragraph[0].children.length).to.equal(3)
    })
  })

  it('should recalculate if props change', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    cy.get('[class$="-truncateText"]')
      .invoke('text')
      .then((textBeforeUpdate) => {
        // Set props: position, ellipsis
        cy.mount(
          <div style={{ ...baseStyle, width: '200px' }}>
            <TruncateText position="middle" ellipsis="(...)">
              {defaultText}
            </TruncateText>
          </div>
        )

        cy.get('[class$="-truncateText"]')
          .invoke('text')
          .should('not.equal', textBeforeUpdate)
      })
  })

  it('should re-render with new children if children change', async () => {
    cy.mount(
      <TruncateText>
        <span style={{ ...baseStyle }}>{defaultText}</span>
      </TruncateText>
    )

    cy.get('[class$="-truncateText"]')
      .invoke('text')
      .then((textBeforeUpdate) => {
        // Set child
        cy.mount(
          <div style={{ ...baseStyle }}>
            <TruncateText>
              <span>This is a different string of text</span>
            </TruncateText>
          </div>
        )

        cy.get('[class$="-truncateText"]')
          .invoke('text')
          .should('not.equal', textBeforeUpdate)
      })
  })

  it('should call onUpdate when text changes', async () => {
    const onUpdate = cy.stub()

    cy.mount(
      <div data-testid="container" style={{ ...baseStyle, width: '700px' }}>
        <TruncateText onUpdate={onUpdate}>{defaultText}</TruncateText>
      </div>
    )
    cy.wrap(onUpdate).should('not.have.been.called')

    // Set container width
    cy.get('[data-testid="container"]').invoke('css', {
      ...baseStyle,
      width: '100px'
    })
    cy.wrap(onUpdate).should('have.been.calledWith', true)

    // Set container width
    cy.get('[data-testid="container"]').invoke('css', {
      ...baseStyle,
      width: '800px'
    })
    cy.wrap(onUpdate).should('have.been.calledWith', false)
  })

  it('should render text at any size with no lineHeight set', async () => {
    cy.mount(
      <div data-testid="container" style={{ ...baseStyle, width: '200px' }}>
        <span>
          <Text size="x-small">
            <TruncateText>xsmall</TruncateText>
          </Text>
          <Text size="small">
            <TruncateText>small</TruncateText>
          </Text>
          <Text size="medium">
            <TruncateText>medium</TruncateText>
          </Text>
          <Text size="large">
            <TruncateText>large</TruncateText>
          </Text>
          <Text size="x-large">
            <TruncateText>xlarge</TruncateText>
          </Text>
          <Text size="xx-large">
            <TruncateText>xxlarge</TruncateText>
          </Text>
        </span>
      </div>
    )

    cy.get('[data-testid="container"]').should(
      'contain',
      'xsmallsmallmediumlargexlargexxlarge'
    )
  })
})
