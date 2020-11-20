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
import { expect, mount, stub, within, wait } from '@instructure/ui-test-utils'
import { Link } from '../index'
import { LinkLocator } from '../LinkLocator'

class TruncateText extends React.Component {
  render() {
    return <span>{this.props.children}</span>
  }
}

describe('<Link />', async () => {
  it('should render the children as text content', async () => {
    await mount(<Link href="https://instructure.design">Hello World</Link>)
    expect(await LinkLocator.find(':contains(Hello World)')).to.exist()
  })

  it('should render a button', async () => {
    const onClick = stub()
    await mount(<Link onClick={onClick}>Hello World</Link>)
    expect(await LinkLocator.find('button[type="button"]')).to.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(<Link href="https://instructure.design">Hello World</Link>)
    const link = await LinkLocator.find()
    expect(await link.accessible()).to.be.true()
  })

  it('should focus with the focus helper', async () => {
    let linkRef
    await mount(
      <Link
        href="https://instructure.design"
        componentRef={(el) => {
          linkRef = el
        }}
      >
        Hello World
      </Link>
    )

    linkRef.focus()
    expect(linkRef.focused).to.be.true()

    const link = await LinkLocator.find()
    const focusable = await link.find(':focusable')
    expect(focusable.focused()).to.be.true()
  })

  it('should display block when TruncateText is a child', async () => {
    const subject = await mount(
      <Link href="example.html">
        <TruncateText>Hello World</TruncateText>
      </Link>
    )

    const link = within(subject.getDOMNode())
    expect(link.getComputedStyle().display).to.equal('block')
  })

  it('should display inline-flex when TruncateText is a child and there is an icon', async () => {
    const customIcon = (
      <svg height="24" width="24">
        <title>Custom icon</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )

    const subject = await mount(
      <Link href="example.html" renderIcon={customIcon}>
        <TruncateText>Hello World</TruncateText>
      </Link>
    )

    const link = within(subject.getDOMNode())
    expect(link.getComputedStyle().display).to.equal('inline-flex')
  })

  it('should call the onClick prop when clicked', async () => {
    const onClick = stub()
    await mount(<Link onClick={onClick}>Hello World</Link>)

    const link = await LinkLocator.find()

    await link.click()

    await wait(() => {
      expect(onClick).to.have.been.called()
    })
  })

  it('should pass down an icon via the icon property', async () => {
    const customIcon = (
      <svg height="100" width="100">
        <title>Custom icon</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )

    await mount(
      <Link href="https://instructure.design" renderIcon={customIcon}>
        Hello World
      </Link>
    )

    const link = await LinkLocator.find()
    const icon = await link.find('svg')

    expect(icon).to.have.title('Custom icon')
  })

  describe('when interaction is disabled', async () => {
    it('should apply aria-disabled when interaction is disabled', async () => {
      await mount(
        <Link href="example.html" interaction="disabled">
          Hello World
        </Link>
      )
      expect(await LinkLocator.find('a[aria-disabled]')).to.exist()
    })

    it('should apply aria-disabled when `disabled` is set', async () => {
      await mount(
        <Link href="example.html" disabled>
          Hello World
        </Link>
      )
      expect(await LinkLocator.find('a[aria-disabled]')).to.exist()
    })

    it('should not be clickable when interaction is disabled', async () => {
      const onClick = stub()
      await mount(
        <Link onClick={onClick} interaction="disabled">
          Hello World
        </Link>
      )

      const link = await LinkLocator.find()
      await link.click(null, { clickable: false })

      expect(onClick).to.not.have.been.called()
    })

    it('should not be clickable when `disabled` is set', async () => {
      const onClick = stub()
      await mount(
        <Link onClick={onClick} disabled>
          Hello World
        </Link>
      )

      const link = await LinkLocator.find()
      await link.click(null, { clickable: false })

      expect(onClick).to.not.have.been.called()
    })
  })

  describe('with `as` prop', async () => {
    describe('with `onClick`', async () => {
      let onClick

      before(() => {
        onClick = Function.prototype
      })

      it('should render designated tag', async () => {
        await mount(
          <Link as="a" onClick={onClick}>
            Hello World
          </Link>
        )
        const componentRoot = await LinkLocator.find()
        const link = await componentRoot.findWithText('Hello World')
        expect(link.getTagName()).to.equal('a')
      })

      it('should set role="button"', async () => {
        await mount(
          <Link as="span" onClick={onClick}>
            Hello World
          </Link>
        )
        expect(await LinkLocator.find('[role="button"]')).to.exist()
      })

      describe('should not set type="button", unless it is actually a button', async () => {
        it('should not set type="button" on other things like <span>s', async () => {
          await mount(
            <Link as="span" onClick={onClick}>
              Hello World
            </Link>
          )
          expect(
            await LinkLocator.find('[type="button"]', {
              expectEmpty: true
            })
          ).to.not.exist()
        })

        it('should set type="button" on <button>s', async () => {
          await mount(
            <Link as="button" onClick={onClick}>
              Hello World
            </Link>
          )
          expect(await LinkLocator.find('[type="button"]')).to.exist()
        })
      })

      it('should set tabIndex="0"', async () => {
        await mount(
          <Link as="span" onClick={onClick}>
            Hello World
          </Link>
        )
        expect(await LinkLocator.find('[tabIndex="0"]')).to.exist()
      })
    })

    describe('without `onClick`', async () => {
      it('should render designated tag', async () => {
        await mount(<Link as="a">Hello World</Link>)
        const componentRoot = await LinkLocator.find()
        const link = await componentRoot.findWithText('Hello World')
        expect(link.getTagName()).to.equal('a')
      })

      it('should not set role="button"', async () => {
        await mount(<Link as="span">Hello World</Link>)
        expect(
          await LinkLocator.find('[role="button"]', {
            expectEmpty: true
          })
        ).to.not.exist()
      })

      it('should not set type="button"', async () => {
        await mount(<Link as="span">Hello World</Link>)
        expect(
          await LinkLocator.find('[type="button"]', {
            expectEmpty: true
          })
        ).to.not.exist()
      })

      it('should not set tabIndex="0"', async () => {
        await mount(<Link as="span">Hello World</Link>)
        expect(
          await LinkLocator.find('[tabIndex="0"]', {
            expectEmpty: true
          })
        ).to.not.exist()
      })
    })
  })

  describe('when an href is provided', async () => {
    it('should render an anchor element', async () => {
      await mount(<Link href="example.html">Hello World</Link>)
      expect(await LinkLocator.find('a')).to.exist()
    })

    it('should set the href attribute', async () => {
      await mount(<Link href="example.html">Hello World</Link>)
      expect(await LinkLocator.find('[href="example.html"]')).to.exist()
    })

    it('should not set role="button"', async () => {
      await mount(<Link href="example.html">Hello World</Link>)
      expect(
        await LinkLocator.find('[role="button"]', {
          expectEmpty: true
        })
      ).to.not.exist()
    })

    it('should not set type="button"', async () => {
      await mount(<Link href="example.html">Hello World</Link>)
      expect(
        await LinkLocator.find('[type="button"]', {
          expectEmpty: true
        })
      ).to.not.exist()
    })
  })

  describe('when a `to` is provided', async () => {
    it('should render an anchor element', async () => {
      await mount(<Link to="/example">Hello World</Link>)
      expect(await LinkLocator.find('a')).to.exist()
    })

    it('should set the to attribute', async () => {
      await mount(<Link to="/example">Hello World</Link>)
      expect(await LinkLocator.find('[to="/example"]')).to.exist()
    })

    it('should not set role="button"', async () => {
      await mount(<Link to="/example">Hello World</Link>)
      expect(
        await LinkLocator.find('[role="button"]', {
          expectEmpty: true
        })
      ).to.not.exist()
    })
  })
})
