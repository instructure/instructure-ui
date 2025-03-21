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

import '../support/component'
import { ToggleButton } from '@instructure/ui'

describe('<ToggleButton/>', () => {
  const icon = (
    <svg data-title="myIcon" height="1em" width="1em">
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[data-title="myIcon"]'

  it('should display a tooltip', () => {
    cy.mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="Tooltip content"
        status="pressed"
      />
    )
    cy.get('button').find(iconSelector).should('exist')
    cy.contains('Tooltip content').should('not.be.visible')

    cy.contains('button', 'This is a screen reader label').realHover().wait(100)
    cy.contains('Tooltip content').should('be.visible')
  })

  it('should display a tooltip without hover/focus when isShowingTooltip is true', () => {
    cy.mount(
      <ToggleButton
        screenReaderLabel="This is a screen reader label"
        renderIcon={icon}
        renderTooltipContent="Tooltip content"
        isShowingTooltip
        status="pressed"
      />
    )
    cy.contains('button', 'This is a screen reader label')
    cy.get('button').find(iconSelector).should('exist')
    cy.contains('Tooltip content').should('be.visible')
  })
})
