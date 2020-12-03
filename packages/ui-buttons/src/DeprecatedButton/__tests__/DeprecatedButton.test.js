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

import { View } from '@instructure/ui-view'

import { DeprecatedButton } from '../index'

import DeprecatedButtonLocator from '../locator'

import styles from '../styles.css'

describe('<DeprecatedButton/>', async () => {
  const icon = (
    <svg
      title="myIcon"
      height="1em"
      width="1em"
      style={{ fill: 'currentcolor' }}
    >
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )
  const iconSelector = 'svg[title="myIcon"]'

  it('should render the children as button text', async () => {
    await mount(<DeprecatedButton>Hello World</DeprecatedButton>)
    expect(
      await DeprecatedButtonLocator.find(':contains(Hello World)')
    ).to.exist()
  })

  it('should render a button', async () => {
    await mount(<DeprecatedButton>Hello World</DeprecatedButton>)
    expect(
      await DeprecatedButtonLocator.find('button[type="button"]')
    ).to.exist()
  })

  it('should not error with a null child', async () => {
    await mount(<DeprecatedButton>Hello World{null}</DeprecatedButton>)
    expect(await DeprecatedButtonLocator.find('button')).to.exist()
  })

  it('should render a link styled as a button if href is provided', async () => {
    await mount(
      <DeprecatedButton href="example.html">Hello World</DeprecatedButton>
    )
    expect(
      await DeprecatedButtonLocator.findAll('[href="example.html"]')
    ).to.have.length(1)
  })

  it('should render as a link when `to` prop is provided', async () => {
    await mount(<DeprecatedButton to="/example">Test</DeprecatedButton>)
    const link = await DeprecatedButtonLocator.find('a')
    expect(link.getAttribute('to')).to.equal('/example')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    await mount(<DeprecatedButton as="span">Hello World</DeprecatedButton>)
    const span = await DeprecatedButtonLocator.find()
    expect(span.getTagName()).to.equal('span')
  })

  it('should set role="button"', async () => {
    const onClick = stub()
    await mount(
      <DeprecatedButton as="span" onClick={onClick}>
        Hello World
      </DeprecatedButton>
    )
    expect(await DeprecatedButtonLocator.find('[role="button"]')).to.exist()
  })

  it('should set tabIndex="0"', async () => {
    const onClick = stub()
    await mount(
      <DeprecatedButton as="span" onClick={onClick}>
        Hello World
      </DeprecatedButton>
    )
    expect(await DeprecatedButtonLocator.find('[tabIndex="0"]')).to.exist()
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = stub()
    await mount(
      <DeprecatedButton type="submit" onClick={onClick}>
        Hello World
      </DeprecatedButton>
    )
    expect(await DeprecatedButtonLocator.find('[type="submit"]')).to.exist()
  })

  it('should pass down an icon via the icon property', async () => {
    await mount(<DeprecatedButton icon={icon}>Hello World</DeprecatedButton>)
    const button = await DeprecatedButtonLocator.find()
    expect(await button.find(iconSelector)).to.exist()
  })

  it('should apply fluid-width styles when set to fluidWidth', async () => {
    await mount(
      <div style={{ width: '70px' }}>
        <DeprecatedButton fluidWidth>
          More Than Just Hello World
        </DeprecatedButton>
      </div>
    )
    const button = await DeprecatedButtonLocator.find('button')
    expect(button.hasClass(styles['width--fluid'])).to.be.true()
  })

  it('should not allow padding as a property', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <DeprecatedButton padding="24px 4px 24px 8px">
        Hello World
      </DeprecatedButton>
    )
    expect(consoleError).to.be.calledWith(
      `Warning: [DeprecatedButton] prop 'padding' is not allowed.`
    )
  })

  it('focuses with the focus helper', async () => {
    const onFocus = stub()
    await mount(
      <DeprecatedButton onFocus={onFocus}>Hello World</DeprecatedButton>
    )
    const button = await DeprecatedButtonLocator.find()
    await button.focus()
    expect(button.focused()).to.be.true()
  })

  it('should provide a buttonRef prop', async () => {
    const buttonRef = stub()
    await mount(
      <DeprecatedButton buttonRef={buttonRef}>Hello World</DeprecatedButton>
    )
    const button = await DeprecatedButtonLocator.find(':contains(Hello World)')
    expect(buttonRef).to.have.been.calledWith(button.getDOMNode())
  })

  describe('onClick', async () => {
    it('should call onClick when clicked', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton onClick={onClick}>Hello World</DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
      await button.click()
      expect(onClick).to.have.been.calledOnce()
    })

    it('should not call onClick when button is disabled', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton disabled onClick={onClick}>
          Hello World
        </DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is readOnly', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton readOnly onClick={onClick}>
          Hello World
        </DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = stub()
      await mount(<DeprecatedButton href="#">Hello World</DeprecatedButton>)
      const button = await DeprecatedButtonLocator.find()
      await button.click()
      expect(onClick).to.have.not.been.called()
    })

    it('should not call onClick when button is readOnly and an href prop is provided', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton readOnly onClick={onClick} href="#">
          Hello World
        </DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()

      await button.click(null, { clickable: false })

      expect(onClick).to.have.not.been.called()
    })

    it('should call onClick when space key is pressed if href is provided', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton onClick={onClick} href="#">
          Hello World
        </DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.have.been.called()
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton as="span" onClick={onClick}>
          Hello World
        </DeprecatedButton>
      )
      const span = await DeprecatedButtonLocator.find('[type="button"]')
      await span.keyDown('enter')
      expect(onClick).to.have.been.called()
    })

    it('should not call onClick when button is disabled and space key is pressed', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton disabled onClick={onClick} href="#">
          Hello World
        </DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
      await button.keyDown('space')
      expect(onClick).to.not.have.been.called()
    })

    it('should not call onClick when button is readOnly and space key is pressed', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton readOnly onClick={onClick} href="#">
          Hello World
        </DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
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

    const ignore = ['elementRef']

    Object.keys(View.propTypes)
      .filter(
        (prop) =>
          prop !== 'theme' && prop !== 'children' && !ignore.includes(prop)
      )
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const warning = `Warning: [DeprecatedButton] prop '${prop}' is not allowed.`
            const props = { [prop]: 'foo' }
            await mount(
              <DeprecatedButton {...props}>Hello World</DeprecatedButton>
            )
            expect(consoleError).to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')
            await mount(
              <DeprecatedButton {...props}>Hello World</DeprecatedButton>
            )
            expect(consoleError).to.not.be.called()
          })
        }
      })

    it("passes cursor='pointer' to View by default", async () => {
      await mount(<DeprecatedButton>Hello World</DeprecatedButton>)
      const button = await DeprecatedButtonLocator.find()
      const cursor = button.getComputedStyle().cursor
      expect(cursor).to.equal('pointer')
    })

    it("passes cursor='not-allowed' to View when disabled", async () => {
      await mount(<DeprecatedButton disabled>Hello World</DeprecatedButton>)
      const button = await DeprecatedButtonLocator.find()
      const cursor = button.getComputedStyle().cursor
      expect(cursor).to.equal('not-allowed')
    })
  })

  describe('for a11y', async () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = stub()
      await mount(
        <DeprecatedButton onClick={onClick}>Hello World</DeprecatedButton>
      )
      const button = await DeprecatedButtonLocator.find()
      await button.click()
      expect(await button.accessible()).to.be.true()
    })

    describe('when disabled', async () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await mount(<DeprecatedButton disabled>Hello World</DeprecatedButton>)
        const button = await DeprecatedButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })
    })

    describe('when readOnly', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await mount(<DeprecatedButton readOnly>Hello World</DeprecatedButton>)
        const button = await DeprecatedButtonLocator.find()
        expect(button.getAttribute('disabled')).to.exist()
      })
    })
  })
})
