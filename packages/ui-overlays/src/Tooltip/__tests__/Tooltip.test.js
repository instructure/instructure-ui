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
import { expect, mount, accessible, spy, wait } from '@instructure/ui-test-utils'

import { Tooltip } from '../index'

import { TooltipLocator } from '../TooltipLocator'

describe('<Tooltip />', async () => {
  describe('using as', async () => {
    it('should render', async () => {
      await mount(
        <Tooltip tip={<h2>Hello</h2>} placement="end" as="a" href="example.html">
          Hover or focus me
        </Tooltip>
      )

      const tip = await TooltipLocator.find()

      expect(tip).to.exist()
    })

    it('should render the children', async () => {
      await mount(
        <Tooltip tip={<h2>Hello</h2>} placement="end" as="a" href="example.html">
          Hover or focus me
        </Tooltip>
      )

      const tip = await TooltipLocator.find()
      const trigger = await tip.findTrigger()

      const content = await tip.findContent()

      await wait(() => {
        expect(trigger).to.have.text('Hover or focus me')
        expect(content).to.have.text('Hello')
      })
    })

    it('should have an aria-describedby attribute', async () => {
      await mount(
        <Tooltip tip={<h2>Hello</h2>} placement="end" as="a" href="example.html">
          Hover or focus me
        </Tooltip>
      )
      const tip = await TooltipLocator.find()
      const trigger = await tip.findTrigger()

      await trigger.focus()

      const content = await tip.findContent()

      await wait(() => {
        expect(content).to.contain(`#${trigger.getAttribute('aria-describedby')}`)
      })
    })

    it('should pass down the href attribute', async () => {
      await mount(
        <Tooltip tip={<h2>Hello</h2>} placement="end" as="a" href="example.html">
          Hover or focus me
        </Tooltip>
      )
      const tip = await TooltipLocator.find()
      const link = await tip.find('a')

      expect(link.getAttribute('href')).to.equal('example.html')
    })

    describe('for a11y', async () => {
      it('should meet standards', async () => {
        await mount(
          <Tooltip tip={<h2>Hello</h2>} placement="end" as="a" href="example.html">
            Hover or focus me
          </Tooltip>
        )

        expect(await accessible()).to.be.true()
      })
    })
  })

  describe('using children', async () => {
    it('should call onClick of child', async () => {
      const onClick = spy()
      await mount(
        <Tooltip tip={<h2>Hello</h2>}>
          <button onClick={onClick}>
            Hover or focus me
          </button>
        </Tooltip>
      )

      const tip = await TooltipLocator.find()
      const button = await tip.find('button')

      await button.click()

      expect(onClick).to.have.been.calledOnce()
    })
  })
})
