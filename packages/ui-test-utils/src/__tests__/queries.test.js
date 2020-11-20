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
import {
  findWithLabel,
  findWithTitle,
  findWithText,
  mount,
  expect,
  findAll,
  find,
  spy,
  wait,
  within
} from '../index'

describe('queries', async () => {
  it('throws an error message by default when nothing is found', async () => {
    await expect(findAll('[selected]', { timeout: 0 })).to.be.rejected()
    await expect(
      findAll(':withLabel(pineapple)', { timeout: 0 })
    ).to.be.rejected()
    await expect(findAll('pineapple', { timeout: 0 })).to.be.rejected()
    await expect(
      findAll(':withText(pineapple)', { timeout: 0 })
    ).to.be.rejected()
    await expect(findAll('table', { timeout: 100 })).to.be.rejected()
  })

  it('should return empty array when configured to expect empty results', async () => {
    const options = { expectEmpty: true }
    expect(await findAll('[selected]', options)).to.have.length(0)
    expect(await findAll(':withLabel(pineapple)', options)).to.have.length(0)
    expect(await findAll('pineapple', options)).to.have.length(0)
    expect(await findAll(':withText(pineapple)', options)).to.have.length(0)
    expect(await findAll(':withTitle(pineapple)', options)).to.have.length(0)
  })

  it('works with SVG elements', async () => {
    await mount(
      <svg>
        <title>Close</title>
        <g>
          <path />
        </g>
      </svg>
    )

    expect(await findAll(':withTitle(Close)')).to.have.length(1)
  })

  describe('by locator', async () => {
    it('finds a single element', async () => {
      await mount(<div data-uid="Foo">hello world</div>)

      expect(await find('[data-uid~="Foo"]')).to.exist()
    })

    it('finds multiple elements', async () => {
      await mount(
        <div>
          <div data-uid="Foo">hello world</div>
          <div data-uid="Foo">hello world</div>
          <div data-uid="Bar">hello world</div>
          <div data-uid="Foo">hello world</div>
        </div>
      )

      expect(await findAll('[data-uid~="Foo"]')).to.have.length(3)
    })

    it('finds elements with space separated attribute values', async () => {
      await mount(
        <div>
          <div data-uid="Foo">hello world</div>
          <div data-uid="Foo Bar">hello world</div>
          <div data-uid="Qux Foo Bar Baz">hello world</div>
          <div data-uid="Qux Bar Foo">hello world</div>
        </div>
      )

      expect(await findAll('[data-uid~="Foo"]')).to.have.length(4)
    })

    it('does not find elements with attribute values that are substrings', async () => {
      await mount(
        <div>
          <div data-uid="FooBar">hello world</div>
          <div data-uid="Foooo">hello world</div>
          <div data-uid="FooFooFoo">hello world</div>
          <div data-uid="Baz FooBar QuxFoo Fooo">hello world</div>
        </div>
      )

      expect(
        await findAll('[data-uid~="Foo"]', { expectEmpty: true })
      ).to.have.length(0)
    })
  })

  describe('by text', async () => {
    it('can get elements by matching their text content', async () => {
      await mount(
        <div data-locator="TestLocator">
          <span>Currently showing: </span>
          <span>
            {`Step
            1
              of 4`}
          </span>
        </div>
      )

      expect(await findWithText('Currently showing:')).to.exist()
      expect(await findAll(':withText("Step 1 of 4")')).to.have.length(1)
      expect(
        await findAll(':withText("Currently showing: Step 1 of 4")')
      ).to.have.length(1)
    })

    it('can get elements by matching their nested contents', async () => {
      await mount(
        <div>
          <span>Currently showing</span>
        </div>
      )

      expect(await findAll(':contains(Currently showing)')).to.have.length(4) // body, div (mount node), div, span
    })

    it('should filter out non-matching results', async () => {
      await mount(
        <div data-locator="TestLocator">
          <span>Currently showing</span>
        </div>
      )

      expect(
        await findAll('[data-locator="TestLocator"]:withText(Foo)', {
          expectEmpty: true
        })
      ).to.have.length(0)
    })

    it('can get elements by matching their text across adjacent text nodes', async () => {
      const div = document.createElement('div')
      const textNodeContent = ['£', '24', '.', '99']
      textNodeContent
        .map((text) => document.createTextNode(text))
        .forEach((textNode) => div.appendChild(textNode))

      const subject = await mount(<div />)
      subject.getDOMNode().appendChild(div)

      const nodes = await findAll(':withText(£24.99)')

      expect(nodes).to.have.length(1)
    })

    it('gets text content correctly', async () => {
      const subject = await mount(
        <div>
          <span>Hello World</span>
        </div>
      )
      expect(within(subject.getDOMNode())).to.have.text('Hello World')
    })
  })

  describe('by label', async () => {
    it('can find an input with an aria-labelledby attribute', async () => {
      /* eslint-disable jsx-a11y/label-has-associated-control */
      await mount(
        <div>
          <label id="name-label">Name</label>
          <input aria-labelledby="name-label" id="name-id" />
        </div>
      )
      /* eslint-enable jsx-a11y/label-has-associated-control */
      expect(await findAll(':withLabel(Name)')).to.have.length(1)
      expect(await findWithLabel('Name')).to.exist()
    })

    it('can find an input with a complex aria-labelledby attribute', async () => {
      /* eslint-disable jsx-a11y/label-has-associated-control */
      await mount(
        <div>
          <label id="name-label-one">Name</label>
          <span id="name-label-two">(Last, First)</span>
          <input aria-labelledby="name-label-one name-label-two" id="name-id" />
        </div>
      )
      /* eslint-enable jsx-a11y/label-has-associated-control */
      expect(await findAll(':label(Name)', { exact: false })).to.have.length(1)
      expect(await findAll(':withLabel("(Last, First)")', { exact: false }))
        .to.have.length(1)
        .to.have.length(1)
      expect(
        await findAll(':withLabel("Name (Last, First)")', { exact: false })
      ).to.have.length(1)
    })

    it('can find an input with an id via the `for` attribute', async () => {
      await mount(
        <div>
          <div>
            <label htmlFor="first.id">First name</label>
            <input id="first.id" />
          </div>
          <div>
            <label htmlFor="last-id">
              <span>Last name</span>
            </label>
            <input id="last-id" />
          </div>
        </div>
      )
      expect(await findAll(':withLabel(First name)')).to.have.length(1)
      expect(await findAll(':withLabel(Last name)')).to.have.length(1)
    })

    it('can find an input with an id via a for attribute', async () => {
      await mount(
        <div>
          <label htmlFor="name-id">Name</label>
          <input id="name-id" />
        </div>
      )
      expect(await findAll(':withLabel(Name)')).to.have.length(1)
    })

    it('can find an input nested in a label', async () => {
      await mount(
        <label>
          Name
          <input />
        </label>
      )
      expect(await findAll(':withLabel(Name)')).to.have.length(1)
    })

    it('handles a label with no form control', async () => {
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      await mount(<label>First name</label>)
      expect(await find(':withLabel(Name)', { expectEmpty: true })).to.be.null()
    })

    it('handles a totally empty label', async () => {
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      await mount(<label />)
      expect(await find(':withLabel(" ")', { expectEmpty: true })).to.be.null()
    })

    it('can find an input with an aria-label', async () => {
      await mount(<input aria-label="Name" />)
      expect(await findAll(':withLabel(Name)')).to.have.length(1)
    })

    it('can find a button by its text content', async () => {
      await mount(<button>Submit</button>)
      expect(await findAll(':withLabel(Submit)')).to.have.length(1)
    })

    it('can find a fieldset by its legend', async () => {
      await mount(
        <fieldset>
          <legend>Full name</legend>
          <label>
            First name <input type="text" />
          </label>
        </fieldset>
      )
      expect(await findAll(':withLabel(Full name)')).to.have.length(1)
    })

    it('can find an element with a visually hidden label', async () => {
      await mount(
        <button>
          <span style={{ position: 'absolute', left: -9999, top: -9999 }}>
            Hello World
          </span>
        </button>
      )
      expect(await find('button:withLabel(Hello World)')).to.exist()
    })

    it('can find an element with a visually hidden label and a visible label', async () => {
      await mount(
        <button>
          <span style={{ position: 'absolute', left: -9999, top: -9999 }}>
            Hello World
          </span>
          <span aria-hidden="true">Hello</span>
        </button>
      )
      expect(await find('button:withLabel(Hello WorldHello)')).to.exist()
    })
  })

  describe('by title', async () => {
    it('can find an element by its title', async () => {
      await mount(
        <div>
          <span title="Ignore this">foo</span>
          <span title="Delete">bar</span>
          <span title="Ignore this as well">baz</span>
        </div>
      )

      expect(await findAll(':title(Delete)')).to.have.length(1)
      expect(
        await findAll(':withTitle(Ignore)', { exact: false })
      ).to.have.length(2)
    })

    it('can find an SVG element by its title', async () => {
      await mount(
        <svg>
          <title>Close</title>
          <g>
            <path />
          </g>
        </svg>
      )

      expect(await findWithTitle('Close')).to.exist()
    })
  })

  describe('by value', async () => {
    it('can find an element by its value', async () => {
      await mount(
        <div>
          <input type="text" />
          <input type="text" defaultValue="Norris" />
          <input type="text" />
        </div>
      )
      expect(await findAll('[value="Norris"]')).to.have.length(1)
    })
  })

  describe('by attribute', async () => {
    it('can find an element by attribute', async () => {
      await mount(
        <div>
          <input type="text" />
          <input type="text" defaultValue="Norris" />
          <input type="text" />
        </div>
      )
      expect(await findAll('input[type]')).to.have.length(3)
    })
    it('can find an element by attribute name and value', async () => {
      await mount(
        <div>
          <input type="text" />
          <input type="password" />
        </div>
      )
      expect(await findAll('input[type="password"]')).to.have.length(1)
    })
  })

  describe('findParent', async () => {
    it('can find a matching parent element', async () => {
      await mount(
        <form>
          <input type="text" />
        </form>
      )
      const input = await find('input')
      const form = await input.findParent('form')
      expect(form).to.exist()
    })
    it('includes the element itself', async () => {
      await mount(
        <form>
          <input type="text" />
        </form>
      )
      const input1 = await find('input')
      const input2 = await input1.findParent('input')
      expect(input1.getDOMNode()).to.equal(input2.getDOMNode())
    })
  })

  describe('findParents', async () => {
    it('can find matching parents', async () => {
      await mount(
        <div data-foo="bar">
          <div>
            <div data-foo="baz">
              <input type="text" />
            </div>
          </div>
        </div>
      )
      const input = await find('input')

      const parents = await input.findParents('[data-foo]')
      expect(parents.length).to.equal(2)
      expect(parents[1].getAttribute('data-foo')).to.equal('bar')
    })
    it('includes the element itself', async () => {
      await mount(
        <div data-foo="bar">
          <div>
            <div data-foo="baz">
              <input type="text" data-foo="first" />
            </div>
          </div>
        </div>
      )
      const input = await find('input')
      const parents = await input.findParents('[data-foo]')
      expect(parents.length).to.equal(3)
      expect(parents[0].getAttribute('data-foo')).to.equal('first')
    })
  })

  describe('event helpers', async () => {
    describe('#focus', async () => {
      it('should programmtically move focus', async () => {
        await mount(<button>hello</button>)
        const button = await find('button')
        await button.focus()
        expect(button.focused()).to.be.true()
      })
      it('should support initializing the event object', async () => {
        const handleFocus = spy((e) => {
          e.persist() // so that we can get the native event later
        })

        await mount(<button onFocus={handleFocus}>hello</button>)

        const button = await find('button')

        await button.focus({ bubbles: true })

        const nativeEvent = handleFocus.getCall(0).args[0].nativeEvent

        expect(nativeEvent.bubbles).to.be.true()
      })
    })
    describe('#click', async () => {
      it('should support spies on event methods', async () => {
        const handleClick = spy((e) => {
          e.persist() // so that we can get the native event later
          e.preventDefault()
        })

        const subject = await mount(
          <button onClick={handleClick}>hello</button>
        )

        const button = within(subject.getDOMNode())

        const event = await button.click({})

        await wait(() => {
          expect(event.preventDefault).to.have.been.calledOnce()
        })
      })
    })
  })
})
