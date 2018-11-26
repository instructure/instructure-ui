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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/components/View'

import Avatar from '../index'
import AvatarLocator from '../locator'

import styles from '../styles.css'

describe('<Avatar />', async () => {
  describe('for a11y', async () => {
    it('should be accessible', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      const avatar = await AvatarLocator.find()

      expect(await avatar.accessible()).to.be.true()
    })

    it('initials should have aria-hidden=true', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      const avatar = await AvatarLocator.find()
      const initials = await avatar.find(':textContent(JJ)')

      expect(initials.getAttribute('aria-hidden')).to.equal('true')
    })
  })

  describe('with the default props', async () => {
    it('should should display as a circle', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      expect(await AvatarLocator.find(`.${styles.circle}`)).to.exist()
    })

    it('should render initials', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      expect(await AvatarLocator.find(':textContent(JJ)')).to.exist()
    })
  })

  describe('when an image src url is provided', async () => {
    // eslint-disable-next-line max-len
    const src = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

    it('should display the image url provided', async () => {
      await mount(
        <Avatar
          name="Foo bar"
          src={src}
        />
      )

      const avatar = await AvatarLocator.find()
      const image = await avatar.find('img', { visible: false })

      await image.load()

      expect(avatar.getDOMNode().style.backgroundImage).to.contain(src)
    })

    it('should call onImageLoaded once the image loads', async () => {
      const onImageLoaded = stub()

      await mount(
        <Avatar
          name="Foo bar"
          src={src}
          onImageLoaded={onImageLoaded}
        />
      )

      const avatar = await AvatarLocator.find()
      const image = await avatar.find('img', { visible: false })

      await image.load()

      expect(onImageLoaded).to.have.been.called()
    })
  })

  describe('when variant is set to "rectangle"', async () => {
    it('should display as a rectangle', async () => {
      await mount(<Avatar name="Jessica Jones" variant="rectangle" />)

      const avatar = await AvatarLocator.find()
      const rectangle = await avatar.find(`.${styles.rectangle}`)

      expect(rectangle).to.exist()
    })
  })

  describe('when the user name has no spaces', async () => {
    it('should render a single initial', async () => {
      await mount(<Avatar name="Jessica" />)

      expect(await AvatarLocator.find(':textContent(J)')).to.exist()
    })
  })

  describe('when the user name has leading spaces', async () => {
    it('should skip them', async () => {
      await mount(<Avatar name=" Jessica Jones" />)

      expect(await AvatarLocator.find(':textContent(JJ)')).to.exist()
    })
  })

  describe('when the user name is empty', async () => {
    it('should render', async () => {
      await mount(<Avatar name="" />)

      const avatar = await AvatarLocator.find()
      const initials = await avatar.find(`.${styles.initials}`)

      expect(initials).to.exist()
      expect(initials.getTextContent()).to.equal('')
    })
  })

  describe('when alt text is provided', async () => {
    it('should render the text as an aria-label attribute', async () => {
      await mount(<Avatar name="Jessica Jones" alt="This is a test" />)

      expect(await AvatarLocator.find(':label(This is a test)')).to.exist()
    })

    it('should set the role attribute to img', async () => {
      await mount(<Avatar name="Jessica Jones" alt="This is a test" />)

      const avatar = await AvatarLocator.find()
      const img = await avatar.find('[role="img"]')

      expect(img).to.exist()
    })
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      as: 'div'
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const warning = `Warning: [Avatar] prop '${prop}' is not allowed.`
            const consoleError = stub(console, 'error')
            const props = {
              [prop]: 'foo'
            }
            await mount(<Avatar name="Jessica Jones" {...props} />)
            expect(consoleError)
              .to.be.calledWithExactly(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = {
              [prop]: allowedProps[prop]
            }
            const consoleError = stub(console, 'error')
            await mount(<Avatar name="Jessica Jones" {...props} />)
            expect(consoleError)
              .to.not.be.called()
          })
        }
    })
  })
})
