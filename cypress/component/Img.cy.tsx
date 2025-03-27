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

import '../support/component'
import 'cypress-real-events'
import { Img } from '@instructure/ui'

const HEIGHT = 32
const WIDTH = 24
const ALT = 'test-alt'
const IMAGE =
  'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

describe('<Img />', () => {
  it('has a container with matching height and width when constrain="cover" is used with overlay', async () => {
    cy.mount(
      <div style={{ width: WIDTH, height: HEIGHT }}>
        <Img
          src={IMAGE}
          alt={ALT}
          constrain="cover"
          overlay={{ color: '#ff0000', opacity: 7 }}
        />
      </div>
    )

    cy.get('[class*="-img__container"]')
      .should('have.css', 'height', `${HEIGHT}px`)
      .and('have.css', 'width', `${WIDTH}px`)

    cy.get('img').should('have.attr', 'alt', ALT)
  })

  it('has a container with matching height and not matching width when constrain="contain" is used with overlay', async () => {
    cy.mount(
      <div style={{ width: WIDTH, height: HEIGHT }}>
        <Img
          src={IMAGE}
          alt={ALT}
          constrain="contain"
          overlay={{ color: '#ff0000', opacity: 7 }}
        />
      </div>
    )

    cy.get('[class*="-img__container"]')
      // height is set to inherit, it should match
      .should('have.css', 'height', `${HEIGHT}px`)
      // width isn't set, it shouldn't match
      .and('not.have.css', 'width', `${WIDTH}px`)

    cy.get('img').should('have.attr', 'alt', ALT)
  })
})
