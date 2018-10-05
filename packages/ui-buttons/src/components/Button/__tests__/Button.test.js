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
import { mount, expect, stub, spy } from '@instructure/ui-test-utils'
import View from '@instructure/ui-layout/lib/components/View'
import IconTrash from '@instructure/ui-icons/lib/Solid/IconTrash'
import Button from '../index'
import ButtonLocator from '../locator'

import styles from '../styles.css'

describe('<Button/>', async () => {
  it('should render the children as button text', async () => {
  await mount(
    <Button>Hello World</Button>
  )
    expect(await ButtonLocator.find({ contains: 'Hello World' })).to.exist()
  })

  it('should render a button', async () => {
    await mount(
      <Button>Hello World</Button>
    )
    expect(await ButtonLocator.find('button[type="button"]')).to.exist()
  })

  it('should not error with a null child', async () => {
    await mount(
      <Button>Hello World{null}</Button>
    )
    expect( await ButtonLocator.find({ tag: 'button' })).to.exist()
  })

  it('should render a link styled as a button if href is provided', async () => {
    await mount(
      <Button href='example.html'>Hello World</Button>
    )
    expect(await ButtonLocator.findAll('[href="example.html"]')).to.have.length(1)
  })

  it('should render designated tag if `as` prop is specified', async () => {
    await mount(
      <Button as='span'>Hello World</Button>
    )
    const span = await ButtonLocator.find()
    expect(span.getTagName()).to.equal('span')
  })

  it('should set role="button"', async () => {
    const onClick = stub()
    await mount(
      <Button as='span' onClick={onClick}>Hello World</Button>
    )
    expect(await ButtonLocator.find('[role="button"]')).to.exist()
  })

  it('should set tabIndex="0"', async () => {
    const onClick = stub()
    await mount(
      <Button as='span' onClick={onClick}>Hello World</Button>
    )
    expect(await ButtonLocator.find('[tabIndex="0"]')).to.exist()
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = stub()
    await mount(
      <Button type="submit" onClick={onClick}>Hello World</Button>
    )
    expect(await ButtonLocator.find('[type="submit"]')).to.exist()
  })

  it('should pass down an icon via the icon property', async () => {
    await mount(
      <Button icon={IconTrash}>Hello World</Button>
    )
    const icon = await ButtonLocator.find({
      tag: 'svg',
      attribute: 'name'
    })
    expect(icon.getAttribute('name')).to.equal('IconTrash')
  })

  it('should apply fluid-width styles when set to fluidWidth', async () => {
    const divStyle = {width: '70px'}
    await mount(
      <div style={divStyle}>
        <Button fluidWidth>More Than Just Hello World</Button>
      </div>
    )
    const button = await ButtonLocator.find({ tag: 'button' })
    expect(button.hasClass(styles['width--fluid'])).to.be.true()
  })

  it('should not allow padding as a property', async () => {
    await mount(
      <Button padding='24px 4px 24px 8px'>Hello World</Button>
    )
    const padding = await ButtonLocator.find()
    expect(padding.getComputedStyle()['padding-top']).to.equal('0px')
    expect(padding.getComputedStyle()['padding-right']).to.equal('12px')
    expect(padding.getComputedStyle()['padding-bottom']).to.equal('0px')
    expect(padding.getComputedStyle()['padding-left']).to.equal('12px')
  })

  it('focuses with the focus helper', async () => {
    const onFocus = stub()
    await mount(
      <Button onFocus={onFocus}>Hello World</Button>
    )
    const button = await ButtonLocator.find()
    await button.focus()
    expect(button.focused()).to.be.true()
  })

  it('should provide a buttonRef prop', async () => {
    const buttonRef = stub()
    await mount(
      <Button buttonRef={buttonRef}>Hello World</Button>
    )
    const button = await ButtonLocator.find({ contains: 'Hello World'})
    expect(buttonRef).to.have.been.calledWith(button.getDOMNode())
  })

  describe('onClick', async () => {
    it('should call onClick when clicked', async () => {
      const onClick = stub()
      await mount(
        <Button onClick={onClick}>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.been.calledOnce()
    })

    it('should not call onClick when button is disabled', async () => {
      const onClick = stub()
      await mount(
        <Button
          disabled
          onClick={onClick}>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is readOnly', async () => {
      const onClick = stub()
      await mount(
        <Button
          readOnly
          onClick={onClick}>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = stub()
      await mount(
        <Button
          href="#">Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is readOnly and an href prop is provided', async () => {
      const onClick = stub()
      await mount(
        <Button
          readOnly
          onClick={onClick}
          href="#">Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should call onClick when space key is pressed if href is provided', async () => {
      const onClick = stub()
      await mount(
        <Button
          onClick={onClick}
          href="#">Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.have.been.called()
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = stub()
      await mount(
        <Button as="span" onClick={onClick}>Hello World</Button>
      )
      const span = await ButtonLocator.find('[type="button"]')
      await span.keyDown('enter')
      expect(onClick).to.have.been.called()
    })

    it('should not call onClick when button is disabled and space key is pressed', async () => {
      const onClick = stub()
      await mount(
        <Button
          disabled
          onClick={onClick}
          href="#">Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })

    it('should not call onClick when button is readOnly and space key is pressed', async () => {
      const onClick = stub()
      await mount(
        <Button
          readOnly
          onClick={onClick}
          href="#">Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      as: 'div',
      cursor: 'move'
    }

    const ignore = [
      'elementRef'
    ]

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children' && !ignore.includes(prop))
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const props = { [prop]: 'foo' }
            const consoleWarn = spy(console, 'warn')
            await mount(
              <Button {...props}>Hello World</Button>
            )
            expect(consoleWarn).to.have.been.calledOnce()
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleWarn = spy(console, 'warn')
            await mount(
              <Button {...props}>Hello World</Button>
            )
            expect(consoleWarn).to.not.have.been.called()
          })
        }
    })

    it("passes cursor='pointer' to View by default", async () => {
      await mount(
        <Button>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      const cursor = button.getComputedStyle().cursor
      expect(cursor).to.equal('pointer')
    })

    it("passes cursor='not-allowed' to View when disabled", async () => {
      await mount(
        <Button disabled>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      const cursor = button.getComputedStyle().cursor
      expect(cursor).to.equal('not-allowed')
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <Button>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      expect(await button.accessible()).to.be.true()
    })

    it('should meet standards when onClick is given', async () => {
      const onClick = stub()
      await mount(
        <Button onClick={onClick}>Hello World</Button>
      )
      const button = await ButtonLocator.find()
      await button.click()
      expect(await button.accessible()).to.be.true()
    })

    describe('when disabled', async () => {
      it('sets the aria-disabled attribute', async () => {
        await mount(
          <Button disabled>Hello World</Button>
        )
        const button = await ButtonLocator.find()
        expect(button.getAttribute('aria-disabled')).to.exist()
      })

      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await mount(
          <Button disabled>Hello World</Button>
        )
        const button = await ButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })

      it('sets the aria-disabled attribute when an href is provided', async () => {
        await mount(
          <Button disabled href="example.com">Hello World</Button>
        )
        const button = await ButtonLocator.find()
        expect(button.getAttribute('aria-disabled')).to.exist()
      })
    })

    describe('when readOnly', () => {
      it('sets the aria-disabled attribute', async () => {
        await mount(
          <Button readOnly>Hello World</Button>
        )
        const button = await ButtonLocator.find()
        expect(button.getAttribute('aria-disabled')).to.exist()
      })

      it('sets the readOnly attribute so that the button is not in tab order', async () => {
        await mount(
          <Button readOnly>Hello World</Button>
        )
        const button = await ButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })

      it('sets the aria-disabled attribute when an href is provided', async () => {
        await mount(
          <Button readOnly href="example.com">Hello World</Button>
        )
        const button = await ButtonLocator.find()
        expect(button.getAttribute('aria-disabled')).to.exist()
      })
    })
  })
})
