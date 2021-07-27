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
import { expect, mount, spy, stub, wait } from '@instructure/ui-test-utils'

import { Tag } from '../index'
import { TagLocator } from '../TagLocator'
import { View } from '@instructure/ui-view'

describe('<Tag />', async () => {
  it('should display text', async () => {
    await mount(<Tag text="Summer" />)

    const tag = await TagLocator.find()

    expect(await tag.find(':contains(Summer)')).to.exist()
  })

  it('should render as a button and respond to onClick event', async () => {
    const onClick = stub()
    await mount(<Tag text="Summer" onClick={onClick} />)
    const tag = await TagLocator.find()
    const button = await tag.find('button')
    await button.click()

    await wait(() => {
      expect(onClick).to.have.been.called()
    })
  })

  it('should render a close icon when it is dismissible and clickable', async () => {
    const onClick = stub()
    await mount(<Tag text="Summer" onClick={onClick} dismissible={true} />)
    const tag = await TagLocator.find()
    expect(await tag.find('svg[name="IconX"]')).to.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(<Tag text="Summer" />)
    const tag = await TagLocator.find()
    expect(await tag.accessible()).to.be.true()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {}
    }

    View.allowedProps
      .filter((prop) => prop !== 'styles' && prop !== 'makeStyles')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const warning = `Warning: [Tag] prop '${prop}' is not allowed.`
            const props = {
              [prop]: 'foo'
            }
            const consoleError = spy(console, 'error')

            await mount(<Tag text="Summer" {...props} />)
            expect(consoleError.firstCall.args[0]).to.be.equal(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')

            await mount(<Tag text="Summer" {...props} />)
            expect(consoleError).to.not.be.called()
          })
        }
      })
  })
})
