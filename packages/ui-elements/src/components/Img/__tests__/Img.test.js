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
import { expect, mount, spy } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/components/View'

import Img from '../index'
import ImgLocator from '../locator'

import styles from '../styles.css'

describe('<Img />', () => {
  // eslint-disable-next-line max-len
  const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  describe('for a11y', () => {
    it('should meet standards', async () => {
      await mount(<Img src={image} />)
      const img = await ImgLocator.find()
      expect(await img.accessible()).to.be.true()
    })

    it('should render an empty alt attribute by default', async () => {
      await mount(<Img src={image} />)
      expect(await ImgLocator.find('[alt=""]')).to.exist()
    })

    it('should render the provided alt attribute', async () => {
      const alt = 'Foo'
      await mount(<Img src={image} alt={alt} />)
      expect(await ImgLocator.find(`[alt="${alt}"]`)).to.exist()
    })
  })

  it('should render an overlay color', async () => {
    await mount(<Img src={image} overlay={{ color: '#ff0000', opacity: 7 }} />)
    expect(await ImgLocator.find(`.${styles.overlay}`)).to.exist()
  })

  it('should render a blur filter', async () => {
    await mount(<Img src={image} blur={true} />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('filter')).to.contain('blur')
  })

  it('should render a grayscale filter', async () => {
    await mount(<Img src={image} grayscale={true} />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('filter')).to.contain('grayscale')
  })

  // If component renders as simple image
  it('should display block-level when inline is false', async () => {
    await mount(<Img src={image} inline={false} />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  // If component has an overlay and renders as image inside containing element
  it('should display block-level with overlay when inline is false', async () => {
    await mount(
      <Img
        src={image}
        inline={false}
        overlay={{ color: 'tomato', opacity: 7 }}
      />
    )

    const container = await ImgLocator.find()
    expect(container.getComputedStyle().getPropertyValue('display')).to.equal('block')

    const img = await container.find('img')
    expect(img.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  it('should apply CSS object-fit: cover when cover is true', async () => {
    await mount(<Img src={image} cover={true} />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('object-fit')).to.equal('cover')
  })

  it('should apply CSS object-fit: cover when constrain="cover"', async () => {
    await mount(<Img src={image} constrain="cover" />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('object-fit')).to.equal('cover')
  })

  it('should apply CSS object-fit: contain when constrain="contain"', async () => {
    await mount(<Img src={image} constrain="contain" />)
    const img = await ImgLocator.find()
    expect(img.getComputedStyle().getPropertyValue('object-fit')).to.equal('contain')
  })

  it('applies the container--has-cover class when the cover property is used with overlay', async () => {
    await mount(
      <Img
        src={image}
        alt="testing123"
        cover={true}
        overlay={{color: '#ff0000', opacity: 7}}
      />
    )

    expect(await ImgLocator.find(`.${styles['container--has-cover']}`)).to.exist()
    expect(await ImgLocator.find('[alt="testing123"]')).to.exist()
  })

  it('applies the container--has-cover class when constrain="cover" is used with overlay', async () => {
    await mount(
      <Img
        src={image}
        alt="testing123"
        constrain="cover"
        overlay={{color: '#ff0000', opacity: 7}}
      />
    )

    expect(await ImgLocator.find(`.${styles['container--has-cover']}`)).to.exist()
    expect(await ImgLocator.find('[alt="testing123"]')).to.exist()
  })

  it('applies the container--has-contain class when constrain="contain" is used with overlay', async () => {
    await mount(
      <Img
        src={image}
        alt="testing123"
        constrain="contain"
        overlay={{color: '#ff0000', opacity: 7}}
      />
    )

    expect(await ImgLocator.find(`.${styles['container--has-contain']}`)).to.exist()
    expect(await ImgLocator.find('[alt="testing123"]')).to.exist()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      width: 100,
      height: 200
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        const warning = `Warning: ${View.disallowedPropWarning(prop, Img)}`

        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const props = {
              [prop]: 'foo'
            }
            const consoleWarn = spy(console, 'warn')
            await mount(<Img src={image} {...props} />)

            expect(consoleWarn).to.have.been.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleWarn = spy(console, 'warn')
            await mount(<Img src={image} {...props} />)
            expect(consoleWarn).to.not.have.been.calledWith(warning)
          })
        }
    })
  })
})
