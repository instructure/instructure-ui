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
import { mount, expect, find, within } from '../index'

describe('assertions', async () => {
  describe('#text', async () => {
    it('matches elements by matching their text content', async () => {
      const subject = await mount(
        <div data-locator="TestLocator">
          <span>Currently showing: </span>
          <span>
            {`Step
            1
              of 4`}
          </span>
        </div>
      )

      expect(within(subject.getDOMNode())).to.have.text(
        'Currently showing: Step 1 of 4'
      )
    })

    it('matches elements by matching their text across adjacent text nodes', async () => {
      const div = document.createElement('div')
      const textNodeContent = ['£', '24', '.', '99']
      textNodeContent
        .map((text) => document.createTextNode(text))
        .forEach((textNode) => div.appendChild(textNode))

      const subject = await mount(<div />)
      subject.getDOMNode().appendChild(div)

      expect(within(subject.getDOMNode())).to.have.text('£24.99')
    })

    it('matches text content correctly when nodes are nested', async () => {
      const subject = await mount(
        <div>
          <span>Hello World</span>
        </div>
      )
      expect(within(subject.getDOMNode())).to.have.text('Hello World')
    })
  })

  describe('#contain', async () => {
    it('matches an element that contains another element', async () => {
      await mount(
        <div id="foo">
          <div id="bar">Hello</div>
        </div>
      )

      const foo = await find('#foo')
      const bar = await find('#bar')

      expect(foo).to.contain(bar)
      expect(foo).to.not.contain(document.body)
    })
  })

  describe('#className', async () => {
    it('matches an element that has a class', async () => {
      await mount(
        <div className="foo bar" id="foo">
          <div className="bar" id="bar">
            Hello
          </div>
        </div>
      )

      const foo = await find('#foo')
      const bar = await find('#bar')

      expect(foo).to.have.className('foo')
      expect(bar).to.not.have.className('foo')
      expect(bar).to.have.className('bar')
    })
  })

  describe('#label', async () => {
    it('matches an input with an aria-labelledby attribute', async () => {
      /* eslint-disable jsx-a11y/label-has-associated-control */
      await mount(
        <div>
          <label id="name-label">Name</label>
          <input aria-labelledby="name-label" id="name-id" />
        </div>
      )
      /* eslint-enable jsx-a11y/label-has-associated-control */

      expect(await find('input')).to.have.label('Name')
    })

    it('matches an input with a complex aria-labelledby attribute', async () => {
      /* eslint-disable jsx-a11y/label-has-associated-control */
      await mount(
        <div>
          <label id="name-label-one">Name</label>
          <span id="name-label-two">(Last, First)</span>
          <input aria-labelledby="name-label-one name-label-two" id="name-id" />
        </div>
      )
      /* eslint-enable jsx-a11y/label-has-associated-control */

      expect(await find('input')).to.have.label('Name (Last, First)')
    })

    it('matches an input with an id via the `for` attribute', async () => {
      await mount(
        <div>
          <div>
            <label htmlFor="first">First name</label>
            <input id="first" />
          </div>
          <div>
            <label htmlFor="last">
              <span>Last name</span>
            </label>
            <input id="last" />
          </div>
        </div>
      )

      expect(await find('#first')).to.have.label('First name')
      expect(await find('#last')).to.have.label('Last name')
    })

    it('matches an input with an id via a for attribute', async () => {
      await mount(
        <div>
          <label htmlFor="name-id">Name</label>
          <input id="name-id" />
        </div>
      )
      expect(await find('input')).to.have.label('Name')
    })

    it('matches an input nested in a label', async () => {
      await mount(
        <label>
          Name
          <input />
        </label>
      )
      expect(await find('input')).to.have.label('Name')
    })

    it('matches an input with an aria-label', async () => {
      await mount(<input aria-label="Name" />)
      expect(await find('input')).to.have.label('Name')
    })

    it('matches a button by its text content', async () => {
      await mount(<button>Submit</button>)
      expect(await find('button')).to.have.label('Submit')
    })

    it('matches a fieldset by its legend', async () => {
      await mount(
        <fieldset>
          <legend>Full name</legend>
          <label>
            First name <input type="text" />
          </label>
        </fieldset>
      )
      expect(await find('fieldset')).to.have.label('Full name')
      expect(await find('input')).to.have.label('First name')
    })
  })

  describe('#title', async () => {
    it('matches an element by its title', async () => {
      await mount(
        <div>
          <span title="Ignore this">foo</span>
          <button title="Delete">bar</button>
          <span title="Ignore this as well">baz</span>
        </div>
      )

      expect(await find('button')).to.have.title('Delete')
    })

    it('matches an SVG element by its title element content', async () => {
      await mount(
        <svg>
          <title>Close</title>
          <g>
            <path />
          </g>
        </svg>
      )

      expect(await find('svg')).to.have.title('Close')
    })
  })

  describe('#value', async () => {
    it('matches an element by its value', async () => {
      await mount(<input type="text" defaultValue="Norris" />)
      expect(await find('input')).to.have.value('Norris')
    })
  })

  describe('#attribute', async () => {
    it('matches an element by attribute', async () => {
      await mount(<input type="text" />)
      expect(await find('input')).to.have.attribute('type')
    })
    it('can find an element by attribute name and value', async () => {
      await mount(<input type="text" />)
      expect(await find('input')).to.have.attribute('type', 'text')
    })
  })

  describe('#ancestors', async () => {
    it('matches an input with a matching parent element', async () => {
      await mount(
        <form>
          <input type="text" />
        </form>
      )
      expect(await find('input'))
        .to.have.exactly(1)
        .ancestors('form')
    })
    it('does not include the element itself', async () => {
      await mount(
        <form>
          <input type="text" />
        </form>
      )
      expect(await find('input')).to.not.have.ancestors('input')
    })
  })

  describe('#parents', async () => {
    it('matches an input with a matching parent element', async () => {
      await mount(
        <form>
          <input type="text" />
        </form>
      )
      expect(await find('input'))
        .to.have.exactly(1)
        .parents('form')
    })
    it('does not include the element itself', async () => {
      await mount(
        <form>
          <input type="text" />
        </form>
      )
      expect(await find('input')).to.not.have.parents('input')
    })
  })

  describe('#descendants', async () => {
    it('matches an element with matching children', async () => {
      await mount(
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      )
      expect(await find('form'))
        .to.have.exactly(3)
        .descendants('input')
    })
    it('does not include the element itself', async () => {
      await mount(
        <table>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>I am so nested!</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )
      expect(await find('table'))
        .to.have.exactly(2)
        .descendants('table')
    })
  })

  describe('#children', async () => {
    it('matches an element with matching children', async () => {
      await mount(
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      )
      expect(await find('form'))
        .to.have.exactly(3)
        .children('input')
    })
    it('does not include the element itself', async () => {
      await mount(
        <table>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>I am so nested!</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )
      expect(await find('table'))
        .to.have.exactly(2)
        .children('table')
    })
  })
})
