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
import { mount, expect, stub, wait } from '@instructure/ui-test-utils'

import { Button } from '../index'

import { ButtonLocator } from '../ButtonLocator'

describe('<Button/>', async () => {
  const icon = (
    <svg
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; title: string; height: ... Remove this comment to see the full error message
      title="myIcon"
      height="1em"
      width="1em"
      style={{ fill: 'currentcolor' }}
    >
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[title="myIcon"]'

  it('should render children', async () => {
    const children = 'Hello world'

    await mount(<Button>{children}</Button>)

    expect(await ButtonLocator.findWithText(children))
  })

  it('should render a button', async () => {
    await mount(<Button>Hello World</Button>)
    expect(await ButtonLocator.find('button[type="button"]')).to.exist()
  })

  it('should provide a focused getter', async () => {
    let componentRef = null

    await mount(
      <Button
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        componentRef={(component) => {
          componentRef = component
        }}
      >
        Hello
      </Button>
    )
    const button = await ButtonLocator.find()

    await button.focus()

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    expect(componentRef.focused).to.be.true()
  })

  it('should provide a focus function', async () => {
    let componentRef = null

    await mount(
      <Button
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        componentRef={(component) => {
          componentRef = component
        }}
      >
        Hello
      </Button>
    )
    const button = await ButtonLocator.find()

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    componentRef.focus()

    await wait(() => {
      expect(button.focused()).to.be.true()
    })
  })

  it('should pass the type attribute', async () => {
    await mount(<Button type="submit">Hello</Button>)

    expect(await ButtonLocator.find('[type="submit"]')).to.exist()
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = stub()

    await mount(<Button elementRef={elementRef}>Hello</Button>)

    const button = await ButtonLocator.find()
    expect(elementRef).to.have.been.calledWith(button.getDOMNode())
  })

  it('should pass the `as` prop', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button as="li">Hello</Button>)

    const button = await ButtonLocator.find()
    expect(await button.find('li')).to.exist()
  })

  it('should set the disabled attribute when `interaction` is set to disabled', async () => {
    await mount(<Button interaction="disabled">Hello</Button>)

    expect(await ButtonLocator.find('[disabled]')).to.exist()
  })

  it('should set the disabled attribute when `disabled` is set', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button disabled>Hello</Button>)

    expect(await ButtonLocator.find('[disabled]')).to.exist()
  })

  it('should set the disabled attribute when `interaction` is set to readonly', async () => {
    await mount(<Button interaction="readonly">Hello</Button>)

    expect(await ButtonLocator.find('[disabled]')).to.exist()
  })

  it('should set the disabled attribute when `readOnly` is set', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button readOnly>Hello</Button>)

    expect(await ButtonLocator.find('[disabled]')).to.exist()
  })

  it('should pass the `href` prop', async () => {
    await mount(<Button href="#">Hello</Button>)

    expect(await ButtonLocator.find('[href="#"]')).to.exist()
  })

  it('should pass the `renderIcon` prop', async () => {
    await mount(<Button renderIcon={icon}>Hello</Button>)

    expect(await ButtonLocator.find(iconSelector)).to.exist()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = stub()
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button onClick={onClick}>Hello</Button>)
    const button = await ButtonLocator.find()

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })

  it('should render the children as button text', async () => {
    await mount(<Button>Hello World</Button>)
    expect(await ButtonLocator.find(':contains(Hello World)')).to.exist()
  })

  it('should render a button', async () => {
    await mount(<Button>Hello World</Button>)
    expect(await ButtonLocator.find('button[type="button"]')).to.exist()
  })

  it('should not error with a null child', async () => {
    await mount(<Button>Hello World{null}</Button>)
    expect(await ButtonLocator.find('button')).to.exist()
  })

  it('should render a link styled as a button if href is provided', async () => {
    await mount(<Button href="example.html">Hello World</Button>)
    expect(await ButtonLocator.findAll('[href="example.html"]')).to.have.length(
      1
    )
  })

  it('should render as a link when `to` prop is provided', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button to="/example">Test</Button>)
    const link = await ButtonLocator.find('a')
    expect(link.getAttribute('to')).to.equal('/example')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button as="span">Hello World</Button>)
    const span = await ButtonLocator.find()
    expect(span.getTagName()).to.equal('span')
  })

  it('should set role="button"', async () => {
    const onClick = stub()
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Button as="span" onClick={onClick}>
        Hello World
      </Button>
    )
    expect(await ButtonLocator.find('[role="button"]')).to.exist()
  })

  it('should set tabIndex="0"', async () => {
    const onClick = stub()
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Button as="span" onClick={onClick}>
        Hello World
      </Button>
    )
    expect(await ButtonLocator.find('[tabIndex="0"]')).to.exist()
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = stub()
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Button type="submit" onClick={onClick}>
        Hello World
      </Button>
    )
    expect(await ButtonLocator.find('[type="submit"]')).to.exist()
  })

  it('focuses with the focus helper', async () => {
    const onFocus = stub()
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Button onFocus={onFocus}>Hello World</Button>)
    const button = await ButtonLocator.find()
    await button.focus()
    expect(button.focused()).to.be.true()
  })

  describe('onClick', async () => {
    it('should call onClick when clicked', async () => {
      const onClick = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Button onClick={onClick}>Hello World</Button>)
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.been.calledOnce()
    })

    it('should not call onClick when button is disabled', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button disabled onClick={onClick}>
          Hello World
        </Button>
      )
      const button = await ButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is readOnly', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button readOnly onClick={onClick}>
          Hello World
        </Button>
      )
      const button = await ButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = stub()

      await mount(<Button href="#">Hello World</Button>)
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is readOnly and an href prop is provided', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button readOnly onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = await ButtonLocator.find()

      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should call onClick when space key is pressed if href is provided', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = await ButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.have.been.called()
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button as="span" onClick={onClick}>
          Hello World
        </Button>
      )
      const span = await ButtonLocator.find('[type="button"]')
      await span.keyDown('enter')
      expect(onClick).to.have.been.called()
    })

    it('should not call onClick when button is disabled and space key is pressed', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button disabled onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = await ButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })

    it('should not call onClick when button is readOnly and space key is pressed', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Button readOnly onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = await ButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('for a11y', async () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Button onClick={onClick}>Hello World</Button>)
      const button = await ButtonLocator.find()
      await button.click()
      expect(await button.accessible()).to.be.true()
    })

    describe('when disabled', async () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(<Button disabled>Hello World</Button>)
        const button = await ButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })
    })

    describe('when readOnly', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(<Button readOnly>Hello World</Button>)
        const button = await ButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })
    })
  })
})
