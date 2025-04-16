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

import { expect } from 'chai'

import '../support/component'
import { within } from '@instructure/ui-utils'
import truncate from '@instructure/ui-truncate-text/src/TruncateText/utils/truncate'

describe('truncate', () => {
  const defaultText = 'Hello world! This is a long string that should truncate'
  const baseStyle = {
    fontSize: '16px',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal'
  }

  it('should truncate text when no options are given', async () => {
    cy.mount(
      <div id="stage" style={{ ...baseStyle, width: '200px' }}>
        {defaultText}
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0])
      const text = $stage.text()

      expect(text.indexOf('truncate')).to.equal(-1)
      expect(text.indexOf('\u2026')).to.not.equal(-1)
    })

    cy.get('#stage').should('have.text', 'Hello world! This is a long…')
  })

  it('should truncate in the middle of a string', async () => {
    cy.mount(
      <div id="stage" style={{ ...baseStyle, width: '200px' }}>
        {defaultText}
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0], { position: 'middle' })
      const text = $stage.text()

      expect(text.indexOf('long')).to.equal(-1)
      expect(text.indexOf('Hello')).to.not.equal(-1)
      expect(text.indexOf('truncate')).to.not.equal(-1)
      expect(text.indexOf('\u2026')).to.not.equal(-1)
    })

    cy.get('#stage').should('have.text', 'Hello world! …ould truncate')
  })

  it('should truncate at words', async () => {
    cy.mount(
      <div id="stage" style={{ ...baseStyle, width: '220px' }}>
        {defaultText}
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0], { truncate: 'word' })
      const text = $stage.text()

      expect(text.indexOf('string')).to.equal(-1)
      expect(text.indexOf('st')).to.equal(-1)
      expect(text.indexOf('long')).to.not.equal(-1)
    })

    cy.get('#stage').should('have.text', 'Hello world! This is a long …')
  })

  it('should allow custom ellipsis', async () => {
    cy.mount(
      <div id="stage" style={{ ...baseStyle, width: '200px' }}>
        {defaultText}
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0], { ellipsis: '(...)' })
      const text = $stage.text()

      expect(text!.slice(-5)).to.equal('(...)')
    })

    cy.get('#stage').should('have.text', 'Hello world! This is a lon(...)')
  })

  it('should preserve node structure', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: '200px' }}>
        <p id="stage" className="testClass">
          Hello world! <strong>This is a</strong> long string that{' '}
          <em>should truncate</em>
        </p>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0])

      cy.wrap($stage[0].childNodes[1].nodeType).should('equal', 1)
      cy.wrap($stage[0].childNodes[2].nodeType).should('equal', 3)
      cy.wrap($stage[0].children.length).should('equal', 2)
      cy.wrap($stage[0].className).should('equal', 'testClass')
      cy.wrap($stage[0].tagName).should('equal', 'P')
    })

    cy.get('strong').should('exist')
    cy.get('#stage').should('have.text', 'Hello world! This is a lon…')
  })

  it('should preserve attributes on nodes', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: '200px' }}>
        <span id="stage">
          This is a{' '}
          <a id="link" href="http://google.com" className="tester">
            text link
          </a>{' '}
          with classes and an href.
        </span>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0])
    })

    cy.get('#link')
      .should('have.attr', 'href', 'http://google.com')
      .and('have.attr', 'class', 'tester')
      .and('have.attr', 'id', 'link')

    cy.get('#link').then(($link) => {
      const attributesLength = $link[0].attributes.length
      expect(attributesLength).to.equal(3)
    })
  })

  it('should calculate max width properly', async () => {
    cy.mount(
      <div style={{ ...baseStyle, width: 'auto' }}>
        <div>
          <span id="textContainer">{defaultText}</span>
          <div style={{ ...baseStyle, width: '100px' }}>
            <div id="stage">{defaultText}</div>
          </div>
        </div>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      const result = truncate($stage[0])
      const maxWidth = result!.constraints.width

      cy.get('#textContainer').then(($textContainer) => {
        const actualMax = $textContainer[0].getBoundingClientRect().width

        expect(within(maxWidth, actualMax, 1)).to.equal(true)
      })
    })
  })

  it('should calculate `maxLines: auto` correctly', async () => {
    cy.mount(
      <div
        style={{
          ...baseStyle,
          width: '50px',
          height: '180px',
          lineHeight: 2.8
        }}
      >
        <span id="stage">{defaultText}</span>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      const result = truncate($stage[0], { maxLines: 'auto' })
      const text = $stage.text()

      cy.wrap(text).should('not.equal', defaultText)
      cy.wrap(text.length).should('not.equal', 1)
      cy.wrap(result!.constraints.lines).should('equal', 4)
    })
  })

  it('should calculate height correctly when `maxLines` is not `auto`', async () => {
    cy.mount(
      <div
        style={{
          ...baseStyle,
          width: '200px',
          height: '200px',
          lineHeight: 1.4
        }}
      >
        <span id="stage">{defaultText}</span>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      const result = truncate($stage[0])
      const text = $stage.text()

      cy.wrap(text.length).should('not.equal', 1)

      cy.wrap(text).should('not.equal', defaultText)
      cy.wrap(result!.constraints.height).should('equal', 22.4)
    })
  })

  it('should escape node content', async () => {
    cy.spy(console, 'log').as('consoleLogSpy')
    const content = '"><img src=a onerror=console.log("hello world") />'

    cy.mount(
      <div style={{ ...baseStyle, width: '1000px', height: '200px' }}>
        <span id="stage">{content}</span>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0])

      cy.wrap($stage.text()).should('equal', content)
      cy.get('@consoleLogSpy').should('not.have.been.calledWith', 'hello world')
    })
  })

  it('should truncate when visually hidden', async () => {
    cy.mount(
      <div
        id="stage-wrapper"
        style={{ ...baseStyle, width: '200px', opacity: 0 }}
      >
        <span id="stage">{defaultText}</span>
      </div>
    )

    cy.get('#stage').then(($stage) => {
      truncate($stage[0])
      const text = $stage.text()

      expect(text.indexOf('truncate')).to.equal(-1)
      expect(text.indexOf('\u2026')).to.not.equal(-1)
    })

    cy.get('#stage-wrapper').should('have.css', 'opacity', '0')
    cy.get('#stage').should('have.text', 'Hello world! This is a long…')
  })

  it('should account for font size styles', async () => {
    cy.mount(
      <div
        id="stage"
        style={{ ...baseStyle, width: '200px', fontSize: '16px' }}
      >
        {defaultText}
      </div>
    )

    cy.get('#stage').then(($stageInitial) => {
      truncate($stageInitial[0])
    })

    cy.get('#stage').should('have.text', 'Hello world! This is a long…')

    // Update font size
    cy.get('#stage').invoke('css', {
      ...baseStyle,
      width: '200px',
      fontSize: '24px'
    })

    cy.get('#stage').then(($stageUpdated) => {
      truncate($stageUpdated[0])
    })

    cy.get('#stage').should('have.text', 'Hello world! This…')
  })
})
