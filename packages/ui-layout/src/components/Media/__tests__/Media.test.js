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

import { expect, mount, spy, within } from '@instructure/ui-test-utils'
import Media from '../index'
import View from '../../View'

describe('<Media />', async () => {
  // eslint-disable-next-line max-len
  const image = <img alt="" src="data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw==" />

  it('should render', async () => {
    const subject = await mount(
      <Media
        title="Hello World"
        description="Test Image"
      >
        {image}
      </Media>
    )

    expect(subject.getDOMNode()).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <Media
        title="Hello World"
        description="Test Image"
      >
        {image}
      </Media>
    )

    const media = within(subject.getDOMNode())
    expect(await media.accessible()).to.be.true()
  })

  it(`should render a figure by default`, async () => {
    await mount(
      <Media as="foo">
        {image}
      </Media>
    )

    expect(await find({tag: 'figure'})).to.exist()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small'
    }

    const ignore = [
      'elementRef'
    ]

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children' && !ignore.includes(prop))
      .forEach((prop) => {
        const warning = `Warning: ${View.disallowedPropWarning(prop, Media)}`

        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const props = {
              [prop]: 'foo'
            }
            const consoleWarn = spy(console, 'warn')

            await mount(
              <Media {...props}>{image}</Media>
            )

            expect(consoleWarn).to.have.been.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleWarn = spy(console, 'warn')
            await mount(
              <Media {...props}>{image}</Media>
            )
            expect(consoleWarn).to.not.have.been.calledWith(warning)
          })
        }
    })
  })
})
