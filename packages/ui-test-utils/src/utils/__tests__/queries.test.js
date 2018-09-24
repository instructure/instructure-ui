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
import { mount, expect } from '../../index'

import { findAll, find } from '../queries'

describe('find, findAll', () => {
  it('throws an error message by default when nothing is found', async () => {
    expect(findAll('[selected]', { timeout: 0 })).to.eventually.throw()
    expect(findAll({ css: '[selected]', timeout: 0 })).to.eventually.throw()
    expect(findAll({ label: 'pineapple', timeout: 0 })).to.eventually.throw()
    expect(findAll({ tag: 'pineapple', timeout: 0 })).to.eventually.throw()
    expect(findAll({ text: 'pineapple', timeout: 0 })).to.eventually.throw()
    expect(findAll('table', { timeout: 200 })).to.eventually.throw()
  })

  it('should return empty array when configured to not throw', async () => {
    const options = {
      timeout: 0,
      errorIfNotFound: false
    }
    expect(await findAll('[selected]', options)).to.have.length(0)
    expect(await findAll({ locator: '[selected]', ...options })).to.have.length(0)
    expect(await findAll({ css: '[selected]', ...options })).to.have.length(0)
    expect(await findAll({ label: 'pineapple', ...options })).to.have.length(0)
    expect(await findAll({ tag: 'pineapple', ...options })).to.have.length(0)
    expect(await findAll({ text: 'pineapple', ...options })).to.have.length(0)
    expect(await findAll({ title: 'pineapple', ...options, timeout: 200 })).to.have.length(0)
  })

  describe('by text', () => {
    it('can get elements by matching their text content', async () => {
      await mount(
        <div data-locator="TestLocator">
          <span>Currently showing</span>
          <span>
            {`Step
            1
              of 4`}
          </span>
        </div>
      )

      expect(await findAll({ text: 'Currently showing' })).to.have.length(1)
      expect(await findAll({ text: 'Step 1 of 4' })).to.have.length(1)
    })

    it('can get elements by matching their nested contents', async () => {
      await mount(
        <div>
          <span>Currently showing</span>
        </div>
      )

      expect(await findAll({
        contains: 'Currently showing'
      }))
        .to.have.length(3) // div (mount node), div, span
    })

    it('should filter out non-matching results', async () => {
      await mount(
        <div data-locator="TestLocator">
          <span>Currently showing</span>
        </div>
      )

      expect(await findAll({
        locator: '[data-locator="TestLocator"]',
        text: 'Foo',
        errorIfNotFound: false,
        timeout: 0
      })).to.have.length(0)
    })

    it('can get elements by matching their text across adjacent text nodes', async () => {
      const div = document.createElement('div')
      const textNodeContent = ['£', '24', '.', '99']
      textNodeContent
        .map(text => document.createTextNode(text))
        .forEach(textNode => div.appendChild(textNode))

      const subject = await mount(<div />)
      subject.getDOMNode().appendChild(div)

      const nodes = await findAll({
        text: '£24.99'
      })

      expect(nodes).to.have.length(1)
    })

    it('matches case with RegExp matcher', async () => {
      await mount(<span>STEP 1 of 4</span>)
      expect(await findAll({ text: /STEP 1 of 4/ })).to.have.length(1)
      expect(await findAll({ text: /Step 1 of 4/, errorIfNotFound: false, timeout: 0 }))
        .to.have.length(0)
    })
  })

  describe('by label', () => {
    it('can find an input with an aria-labelledby attribute', async () => {
      await mount(
        <div>
          <label id="name-label">Name</label>
          <input aria-labelledby="name-label" id="name-id" />
        </div>
      )
      expect(await findAll({ label: 'Name' })).to.have.length(1)
    })

    it('can find an input with a complex aria-labelledby attribute', async () => {
      await mount(
        <div>
          <label id="name-label-one">Name</label>
          <span id="name-label-two">(Last, First)</span>
          <input aria-labelledby="name-label-one name-label-two" id="name-id" />
        </div>
      )
      expect(await findAll({ label: 'Name' })).to.have.length(1)
      expect(await findAll({ label: '(Last, First)' })).to.have.length(1)
    })

    it('can find an input with an id via the for attribute', async () => {
      await mount(
        <div>
          <div>
            <label htmlFor="first.id">First name</label>
            <input id="first.id" />
          </div>
          <div>
            <label htmlFor="last-id"><span>Last name</span></label>
            <input id="last-id" />
          </div>
        </div>
      )
      expect(await findAll({ label: 'First name' })).to.have.length(1)
      expect(await findAll({ label: 'Last name' })).to.have.length(1)
    })

    it('can find an input with an id via a for attribute', async () => {
      await mount(
        <div>
          <label htmlFor="name-id">Name</label>
          <input id="name-id" />
        </div>
      )
      expect(await findAll({ label: 'Name' })).to.have.length(1)
    })

    it('can find an input nested in a label', async () => {
      await mount(<label>Name<input /></label>)
      expect(await findAll({ label: 'Name' })).to.have.length(1)
    })

    it('handles a label with no form control', async () => {
      await mount(<label>First name</label>)
      expect(await find({ label: /name/, errorIfNotFound: false, timeout: 0 }))
        .to.be.null()
    })

    it('handles a totally empty label', async () => {
      await mount(<label />)
      expect(await find({ label: ' ', errorIfNotFound: false, timeout: 0 }))
        .to.be.null()
    })

    it('can find an input with an aria-label', async () => {
      await mount(<input aria-label="Name" />)
      expect(await findAll({ label: 'Name' })).to.have.length(1)
    })
  })

  describe('by title', () => {
    it('can find an element by its title', async () => {
      await mount(
        <div>
          <span title="Ignore this" />
          <span title="Delete" />
          <span title="Ignore this as well" />
        </div>
      )

      expect(await findAll({ title: 'Delete' })).to.have.length(1)
      expect(await findAll({ title: 'Ignore', exact: false })).to.have.length(2)
    })

    it('can find an SVG element by its title', async () => {
      await mount(
        <div>
          <svg>
            <title>Close</title>
            <g>
              <path />
            </g>
          </svg>
        </div>
      )

      expect(await findAll({ title: 'Close', visible: false })).to.have.length(1)
    })
  })

  describe('by value', () => {
    it('can find an element by its value', async () => {
      await mount(
        <div>
          <input type="text"/>
          <input type="text" defaultValue="Norris"/>
          <input type="text"/>
        </div>
      )
      expect(await findAll({ value: 'Norris' })).to.have.length(1)
    })
  })

  describe('by attribute', () => {
    it('can find an element by attribute', async () => {
      await mount(
        <div>
          <input type="text"/>
          <input type="text" defaultValue="Norris"/>
          <input type="text"/>
        </div>
      )
      expect(await findAll({ tag: 'input', attribute: 'type' })).to.have.length(3)
    })
    it('can find an element by attribute name and value', async () => {
      await mount(
        <div>
          <input type="text"/>
          <input type="password" />
        </div>
      )
      expect(await findAll({ tag: 'input', attribute: { name: 'type', value: 'password' } }))
        .to.have.length(1)
    })
  })
})
