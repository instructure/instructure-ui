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

import { Avatar } from '../index'
import { AvatarLocator } from '../AvatarLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Avatar />', async () => {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  describe('for a11y', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should be accessible', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      await mount(<Avatar name="Jessica Jones" />)

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      const avatar = await AvatarLocator.find()

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      expect(await avatar.accessible()).to.be.true()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    it('initials should have aria-hidden=true', async () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="Jessica Jones" />)

      const avatar = await AvatarLocator.find()
      const initials = await avatar.findWithText('JJ')

      expect(initials.getAttribute('aria-hidden')).to.equal('true')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('with the default props', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    it('should display as a circle', async () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="Jessica Jones" />)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const avatar = await AvatarLocator.find()

      expect(avatar.getAttribute('shape')).to.equal('circle')
    })

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    it('should render initials', async () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      await mount(<Avatar name="Jessica Jones" />)

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      expect(await AvatarLocator.findWithText('JJ')).to.exist()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  describe('when an image src url is provided', async () => {
    // eslint-disable-next-line max-len
    const src =
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should display the image url provided', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      await mount(<Avatar name="Foo bar" src={src} />)

      const avatar = await AvatarLocator.find()
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      const image = await avatar.find('img')

      await image.load()

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      expect(avatar.getAttribute('src')).to.contain(src)
    })

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onImageLoaded once the image loads', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onImageLoaded = stub()

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <Avatar name="Foo bar" src={src} onImageLoaded={onImageLoaded} />
      )

      const avatar = await AvatarLocator.find()
      const image = await avatar.find('img')

      await image.load()

      expect(onImageLoaded).to.have.been.called()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when shape is set to "rectangle"', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should display as a rectangle', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="Jessica Jones" shape="rectangle" />)

      const avatar = await AvatarLocator.find()

      expect(avatar.getAttribute('shape')).to.equal('rectangle')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user name has no spaces', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render a single initial', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="Jessica" />)

      expect(await AvatarLocator.find()).to.have.text('J')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user name has leading spaces', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should skip them', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name=" Jessica Jones" />)

      expect(await AvatarLocator.find()).to.have.text('JJ')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user name is empty', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="" />)

      const avatar = await AvatarLocator.find()
      const initials = await avatar.find('[class$="-avatar__initials"]')

      expect(initials).to.exist()
      expect(initials.getTextContent()).to.equal('')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when alt text is provided', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render the text as an aria-label attribute', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="Jessica Jones" alt="This is a test" />)

      expect(await AvatarLocator.find()).to.have.label('This is a test')
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set the role attribute to img', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Avatar name="Jessica Jones" alt="This is a test" />)
      expect(await AvatarLocator.find()).to.contain('[role="img"]')
    })
  })
})
