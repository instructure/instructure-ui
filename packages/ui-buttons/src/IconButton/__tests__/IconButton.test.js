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

import { IconButton } from '../index'
import { IconButtonLocator } from '../IconButtonLocator'

describe('<IconButton/>', async () => {
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

  it('should render an icon when provided as the `children` prop', async () => {
    await mount(
      <IconButton screenReaderLabel="some action">{icon}</IconButton>
    )
    const button = await IconButtonLocator.find()
    expect(await button.find(iconSelector)).to.exist()
  })

  it('should render an icon when provided as the `renderIcon` prop', async () => {
    await mount(
      <IconButton screenReaderLabel="some action" renderIcon={icon} />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find(iconSelector)).to.exist()
  })

  it('should fail if `screenReaderLabel` is not provided', async () => {
    let error = false

    try {
      await mount(
        <IconButton renderIcon={icon} />
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should provide a focused getter', async () => {
    let componentRef = null

    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        componentRef={(component) => { componentRef = component }}
      />
    )
    const button = await IconButtonLocator.find()

    await button.focus()

    expect(componentRef.focused).to.be.true()
  })

  it('should provide a focus function', async () => {
    let componentRef = null

    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        componentRef={(component) => { componentRef = component }}
      />
    )
    const button = await IconButtonLocator.find()

    componentRef.focus()

    await wait(() => {
      expect(button.focused()).to.be.true()
    })
  })

  it('should pass the `href` prop', async () => {
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        href="#"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('a[href="#"]')).to.exist()
  })

  it('should pass the `type` prop', async () => {
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        type="reset"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[type="reset"]')).to.exist()
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = stub()
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        elementRef={elementRef}
      />
    )
    const button = await IconButtonLocator.find()
    expect(elementRef).to.have.been.calledWith(button.getDOMNode())
  })

  it('should pass the `as` prop', async () => {
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        as="li"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('li')).to.exist()
  })

  it('should pass the `interaction` prop when  set to disabled', async () => {
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        interaction="disabled"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  it('should pass the `interaction` prop when  set to readonly', async () => {
    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        interaction="readonly"
      />
    )
    const button = await IconButtonLocator.find()
    expect(await button.find('button[disabled]')).to.exist()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = stub()

    await mount(
      <IconButton
        screenReaderLabel="some action"
        renderIcon={icon}
        onClick={onClick}
      />
    )
    const button = await IconButtonLocator.find()

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})
