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
      const initials = await avatar.findWithText('JJ')

      expect(initials.getAttribute('aria-hidden')).to.equal('true')
    })
  })

  describe('with the default props', async () => {
    it('should display as a circle', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      expect(await AvatarLocator.find(`.${styles.circle}`)).to.exist()
    })

    it('should render initials', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      expect(await AvatarLocator.findWithText('JJ')).to.exist()
    })

    it('should have border and no box-shadow', async () => {
      const subject = await mount(<Avatar name="Jessica Jones" />)

      const avatar = subject.getDOMNode()
      const computedStyle = getComputedStyle(avatar)

      expect(computedStyle.borderWidth).not.to.equal('0px')
      expect(computedStyle.boxShadow).to.equal('none')
    })

    it('should display the initials in brand color', async () => {
      await mount(<Avatar name="Jessica Jones" />)

      const avatar = await AvatarLocator.find()
      const initials = await avatar.findWithText('JJ')

      expect(getComputedStyle(initials.getDOMNode()).color).to.equal(
        'rgb(0, 142, 226)'
      )
    })
  })

  describe('when an image src url is provided', async () => {
    // eslint-disable-next-line max-len
    const src =
      'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

    it('should display the image url provided', async () => {
      await mount(<Avatar name="Foo bar" src={src} />)

      const avatar = await AvatarLocator.find()
      const image = await avatar.find('img')

      await image.load()

      expect(avatar.getDOMNode().style.backgroundImage).to.contain(src)
    })

    it('should call onImageLoaded once the image loads', async () => {
      const onImageLoaded = stub()

      await mount(
        <Avatar name="Foo bar" src={src} onImageLoaded={onImageLoaded} />
      )

      const avatar = await AvatarLocator.find()
      const image = await avatar.find('img')

      await image.load()

      expect(onImageLoaded).to.have.been.called()
    })

    it('should have box-shadow instead of border', async () => {
      const subject = await mount(<Avatar name="Foo bar" src={src} />)

      const avatar = await AvatarLocator.find()
      const image = await avatar.find('img')

      await image.load()

      const computedStyle = getComputedStyle(subject.getDOMNode())

      expect(computedStyle.borderWidth).to.equal('0px')
      expect(computedStyle.boxShadow).not.to.equal('none')
    })
  })

  describe('when shape is set to "rectangle"', async () => {
    it('should display as a rectangle', async () => {
      await mount(<Avatar name="Jessica Jones" shape="rectangle" />)

      const avatar = await AvatarLocator.find()
      const rectangle = await avatar.find(`.${styles.rectangle}`)

      expect(rectangle).to.exist()
    })
  })

  describe('when the color is set to "shamrock"', async () => {
    it('should display the initials in green (shamrock)', async () => {
      await mount(<Avatar name="Jessica Jones" color="shamrock" />)

      const avatar = await AvatarLocator.find()
      const initials = await avatar.findWithText('JJ')

      expect(getComputedStyle(initials.getDOMNode()).color).to.equal(
        'rgb(0, 172, 24)'
      )
    })
  })

  describe('when the user name has no spaces', async () => {
    it('should render a single initial', async () => {
      await mount(<Avatar name="Jessica" />)

      expect(await AvatarLocator.find()).to.have.text('J')
    })
  })

  describe('when the user name has leading spaces', async () => {
    it('should skip them', async () => {
      await mount(<Avatar name=" Jessica Jones" />)

      expect(await AvatarLocator.find()).to.have.text('JJ')
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

      expect(await AvatarLocator.find()).to.have.label('This is a test')
    })

    it('should set the role attribute to img', async () => {
      await mount(<Avatar name="Jessica Jones" alt="This is a test" />)
      expect(await AvatarLocator.find()).to.contain('[role="img"]')
    })
  })
})
