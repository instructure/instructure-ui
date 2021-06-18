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
import { mount, expect, stub } from '@instructure/ui-test-utils'

import { BaseButton } from '../index'

import { BaseButtonLocator } from '../BaseButtonLocator'

describe('<BaseButton/>', async () => {
  it('should render the children as button text', async () => {
    await mount(<BaseButton>Hello World</BaseButton>)
    expect(await BaseButtonLocator.find(':contains(Hello World)')).to.exist()
  })

  it('should render a button', async () => {
    await mount(<BaseButton>Hello World</BaseButton>)
    expect(await BaseButtonLocator.find('button[type="button"]')).to.exist()
  })

  it('should not error with a null child', async () => {
    await mount(<BaseButton>Hello World{null}</BaseButton>)
    expect(await BaseButtonLocator.find('button')).to.exist()
  })

  it('should render a link styled as a button if href is provided', async () => {
    await mount(<BaseButton href="example.html">Hello World</BaseButton>)
    expect(
      await BaseButtonLocator.findAll('[href="example.html"]')
    ).to.have.length(1)
  })

  it('should render as a link when `to` prop is provided', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<BaseButton to="/example">Test</BaseButton>)
    const link = await BaseButtonLocator.find('a')
    expect(link.getAttribute('to')).to.equal('/example')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    await mount(<BaseButton as="span">Hello World</BaseButton>)
    const span = await BaseButtonLocator.find()
    expect(span.getTagName()).to.equal('span')
  })

  it('should set role="button"', async () => {
    const onClick = stub()
    await mount(
      <BaseButton as="span" onClick={onClick}>
        Hello World
      </BaseButton>
    )
    expect(await BaseButtonLocator.find('[role="button"]')).to.exist()
  })

  it('should set tabIndex="0"', async () => {
    const onClick = stub()
    await mount(
      <BaseButton as="span" onClick={onClick}>
        Hello World
      </BaseButton>
    )
    expect(await BaseButtonLocator.find('[tabIndex="0"]')).to.exist()
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = stub()
    await mount(
      <BaseButton type="submit" onClick={onClick}>
        Hello World
      </BaseButton>
    )
    expect(await BaseButtonLocator.find('[type="submit"]')).to.exist()
  })

  it('should pass down an icon via the icon property', async () => {
    const SomeIcon = () => (
      <svg>
        <circle cx="25" cy="75" r="20" />
      </svg>
    )

    await mount(<BaseButton renderIcon={SomeIcon}>Hello World</BaseButton>)
    const button = await BaseButtonLocator.find()
    expect(await button.find('svg')).to.exist()
  })

  it('focuses with the focus helper', async () => {
    await mount(<BaseButton>Hello World</BaseButton>)
    const button = await BaseButtonLocator.find()
    await button.focus()
    expect(button.focused()).to.be.true()
  })

  it('should provide an  elementRef prop', async () => {
    const elementRef = stub()
    await mount(<BaseButton elementRef={elementRef}>Hello World</BaseButton>)
    const button = await BaseButtonLocator.find(':contains(Hello World)')
    expect(elementRef).to.have.been.calledWith(button.getDOMNode())
  })

  describe('onClick', async () => {
    it('should call onClick when clicked', async () => {
      const onClick = stub()

      await mount(<BaseButton onClick={onClick}>Hello World</BaseButton>)
      const button = await BaseButtonLocator.find()
      await button.click()
      expect(onClick).to.have.been.calledOnce()
    })

    it('should not call onClick when interaction is "disabled"', async () => {
      const onClick = stub()

      await mount(
        <BaseButton interaction="disabled" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when disabled is set"', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <BaseButton disabled onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when interaction is "readonly"', async () => {
      const onClick = stub()

      await mount(
        <BaseButton interaction="readonly" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when readOnly is set', async () => {
      const onClick = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <BaseButton readOnly onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = stub()

      await mount(<BaseButton href="#">Hello World</BaseButton>)
      const button = await BaseButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when interaction is "readonly" and an href prop is provided', async () => {
      const onClick = stub()

      await mount(
        <BaseButton interaction="readonly" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()

      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should call onClick when space key is pressed if href is provided', async () => {
      const onClick = stub()

      await mount(
        <BaseButton onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.have.been.called()
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = stub()

      await mount(
        <BaseButton as="span" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const span = await BaseButtonLocator.find('[type="button"]')
      await span.keyDown('enter')
      expect(onClick).to.have.been.called()
    })

    it('should not call onClick when interaction is "disabled" and space key is pressed', async () => {
      const onClick = stub()

      await mount(
        <BaseButton interaction="disabled" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })

    it('should not call onClick when interaction is "readonly" and space key is pressed', async () => {
      const onClick = stub()

      await mount(
        <BaseButton interaction="readonly" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )
      const button = await BaseButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when passing down props to View', async () => {
    it("passes cursor='pointer' to View by default", async () => {
      await mount(<BaseButton>Hello World</BaseButton>)
      const button = await BaseButtonLocator.find()
      const cursor = button.getComputedStyle().cursor
      expect(cursor).to.equal('pointer')
    })

    it("passes cursor='not-allowed' to View when disabled", async () => {
      await mount(<BaseButton interaction="disabled">Hello World</BaseButton>)
      const button = await BaseButtonLocator.find()
      const cursor = button.getComputedStyle().cursor
      expect(cursor).to.equal('not-allowed')
    })
  })

  describe('for a11y', async () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = stub()

      await mount(<BaseButton onClick={onClick}>Hello World</BaseButton>)
      const button = await BaseButtonLocator.find()
      await button.click()
      expect(await button.accessible()).to.be.true()
    })

    describe('when disabled', async () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await mount(<BaseButton interaction="disabled">Hello World</BaseButton>)
        const button = await BaseButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })
    })

    describe('when readonly', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await mount(<BaseButton interaction="readonly">Hello World</BaseButton>)
        const button = await BaseButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })
    })
  })
})
