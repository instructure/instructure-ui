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

import { Img } from '../index'
import { ImgLocator } from '../ImgLocator'

describe('<Img />', () => {
  // eslint-disable-next-line max-len
  const image =
    'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  beforeEach(async () => {
    stub(console, 'warn') // suppress deprecation warnings
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Img src={image} />)
      const img = await ImgLocator.find()
      expect(await img.accessible()).to.be.true()
    })

    it('should render an empty alt attribute by default', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Img src={image} />)
      expect(await ImgLocator.find('[alt=""]')).to.exist()
    })

    it('should render the provided alt attribute', async () => {
      const alt = 'Foo'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<Img src={image} alt={alt} />)
      expect(await ImgLocator.find(`[alt="${alt}"]`)).to.exist()
    })
  })

  it('should render an overlay color', async () => {
    await mount(<Img src={image} overlay={{ color: '#ff0000', opacity: 7 }} />)
    expect(await ImgLocator.find('[class*=-img__overlay]')).to.exist()
  })

  it('should render a blur filter', async () => {
    await mount(<Img src={image} withBlur={true} />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('filter')).to.contain('blur')
  })

  it('should render a grayscale filter', async () => {
    await mount(<Img src={image} withGrayscale={true} />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('filter')).to.contain(
      'grayscale'
    )
  })

  // If component renders as simple image
  it('should display block-level when display="block"', async () => {
    await mount(<Img src={image} display="block" />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  // If component has an overlay and renders as image inside containing element
  it('should display block-level with overlay when display="block"', async () => {
    await mount(
      <Img
        src={image}
        display="block"
        overlay={{ color: 'tomato', opacity: 7 }}
      />
    )

    const container = await ImgLocator.find()
    expect(container.getComputedStyle().getPropertyValue('display')).to.equal(
      'block'
    )

    const img = await container.find('img')
    expect(img.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  it('should apply CSS object-fit: cover when constrain="cover"', async () => {
    await mount(
      <div style={{ width: 16, height: 16 }}>
        <Img src={image} constrain="cover" />
      </div>
    )
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('object-fit')).to.equal(
      'cover'
    )
  })

  it('should apply CSS object-fit: contain when constrain="contain"', async () => {
    await mount(
      <div style={{ width: 16, height: 16 }}>
        <Img src={image} constrain="contain" />
      </div>
    )
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('object-fit')).to.equal(
      'contain'
    )
  })

  it('has a container with matching height and width when constrain="cover" is used with overlay', async () => {
    const height = 32
    const width = 24

    await mount(
      <div style={{ width, height }}>
        <Img
          src={image}
          alt="testing123"
          constrain="cover"
          overlay={{ color: '#ff0000', opacity: 7 }}
        />
      </div>
    )

    const container = await ImgLocator.find('[class*=-img__container]')

    expect(container.getComputedStyle().height).to.equal(`${height}px`)
    expect(container.getComputedStyle().width).to.equal(`${width}px`)
    expect(await ImgLocator.find('[alt="testing123"]')).to.exist()
  })

  it('has a container with matching height and not matching width when constrain="contain" is used with overlay', async () => {
    const height = 32
    const width = 24

    await mount(
      <div style={{ width, height }}>
        <Img
          src={image}
          alt="testing123"
          constrain="contain"
          overlay={{ color: '#ff0000', opacity: 7 }}
        />
      </div>
    )

    const container = await ImgLocator.find('[class*=-img__container]')

    // height is set to inherit, it should match
    expect(container.getComputedStyle().height).to.equal(`${height}px`)
    // width isn't set, it shouldn't match
    expect(container.getComputedStyle().width).not.to.equal(`${width}px`)
    expect(await ImgLocator.find('[alt="testing123"]')).to.exist()
  })
})
