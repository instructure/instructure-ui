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

import { CondensedButton } from '../index'
import { CondensedButtonLocator } from '../CondensedButtonLocator'

describe('<CondensedButton/>', async () => {
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

  it('should render children', async () => {
    const children = 'Hello world'

    await mount(
      <CondensedButton>{children}</CondensedButton>
    )

    expect(await CondensedButtonLocator.findWithText(children))
  })

  it('should pass the type attribute', async () => {
    await mount(
      <CondensedButton type="submit">Hello</CondensedButton>
    )

    expect(await CondensedButtonLocator.find('[type="submit"]')).to.exist()
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = stub()

    await mount(
      <CondensedButton elementRef={elementRef}>Hello</CondensedButton>
    )

    const button = await CondensedButtonLocator.find()
    expect(elementRef).to.have.been.calledWith(button.getDOMNode())
  })

  it('should pass the `as` prop', async () => {
    await mount(
      <CondensedButton as="li">Hello</CondensedButton>
    )

    const button = await CondensedButtonLocator.find()
    expect(await button.find('li')).to.exist()
  })

  it('should pass the `interaction` prop when  set to disabled', async () => {
    await mount(
      <CondensedButton interaction="disabled">Hello</CondensedButton>
    )

    expect(await CondensedButtonLocator.find('[disabled]')).to.exist()
  })

  it('should pass the `interaction` prop when  set to readonly', async () => {
    await mount(
      <CondensedButton interaction="readonly">Hello</CondensedButton>
    )

    expect(await CondensedButtonLocator.find('[disabled]')).to.exist()
  })

  it('should pass the `href` prop', async () => {
    await mount(
      <CondensedButton href="#">Hello</CondensedButton>
    )

    expect(await CondensedButtonLocator.find('[href="#"]')).to.exist()
  })

  it('should pass the `renderIcon` prop', async () => {
    await mount(
      <CondensedButton renderIcon={icon}>Hello</CondensedButton>
    )

    expect(await CondensedButtonLocator.find(iconSelector)).to.exist()
  })


  it('should pass the `onClick` prop', async () => {
    const onClick = stub()

    await mount(
      <CondensedButton onClick={onClick}>Hello</CondensedButton>
    )
    const button = await CondensedButtonLocator.find()

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})