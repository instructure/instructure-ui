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

import { getComputedStyle } from '@instructure/ui-dom-utils'
import {
  expect,
  mount,
  generateA11yTests,
  stub
} from '@instructure/ui-test-utils'

import { getBrand, SmallViewportModeWrapper } from '../../utils/exampleHelpers'
import { elevateLogo, elevateIcon } from '../../utils/exampleSvgFiles'

import { TopNavBarBrand } from '../index'
import { TopNavBarBrandLocator } from '../TopNavBarBrandLocator'
import TopNavBarBrandExamples from '../__examples__/TopNavBarBrand.examples'

describe('<TopNavBarBrand />', async () => {
  it('should render', async () => {
    await mount(getBrand({}))
    const component = await TopNavBarBrandLocator.find()

    expect(component).to.exist()
  })

  describe('elementRef prop should return a ref to the root element', async () => {
    it('should return root element', async () => {
      const elementRef = stub()
      await mount(
        getBrand({
          brandProps: { elementRef }
        })
      )
      const component = await TopNavBarBrandLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  describe('screenReaderLabel prop', async () => {
    it('should render label for SR', async () => {
      await mount(
        getBrand({
          brandProps: { screenReaderLabel: 'Test label' }
        })
      )
      const component = await TopNavBarBrandLocator.find()
      const screenReaderLabel = await component.findScreenReaderLabel()

      expect(screenReaderLabel).to.have.text('Test label')
    })
  })

  describe('renderName prop', async () => {
    it('should render name in desktop mode', async () => {
      await mount(getBrand({ brandProps: { renderName: elevateLogo } }))
      const component = await TopNavBarBrandLocator.find()
      const nameContainer = await component.findBrandNameContainer()
      const logo = await nameContainer.find('svg')

      expect(nameContainer).to.be.visible()
      expect(logo).to.be.visible()
      expect(logo).to.have.id('elevateLogo')
    })

    it('should render name in smallViewport mode', async () => {
      await mount(
        <SmallViewportModeWrapper>
          {getBrand({ brandProps: { renderName: elevateLogo } })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarBrandLocator.find()
      const nameContainer = await component.findBrandNameContainer()
      const logo = await nameContainer.find('svg')

      expect(nameContainer).to.be.visible()
      expect(logo).to.be.visible()
      expect(logo).to.have.id('elevateLogo')
    })
  })

  describe('renderIcon prop', async () => {
    it('should render name in desktop mode', async () => {
      await mount(getBrand({ brandProps: { renderIcon: elevateIcon } }))
      const component = await TopNavBarBrandLocator.find()
      const iconContainer = await component.findBrandIconContainer()
      const icon = await iconContainer.find('svg')

      expect(iconContainer).to.be.visible()
      expect(icon).to.be.visible()
      expect(icon).to.have.id('elevateIcon')
    })

    it('should not render name in smallViewport mode', async () => {
      await mount(
        <SmallViewportModeWrapper>
          {getBrand({ brandProps: { renderIcon: elevateIcon } })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarBrandLocator.find()
      const iconContainer = await component.findBrandIconContainer({
        expectEmpty: true
      })

      expect(iconContainer).to.not.exist()
    })
  })

  describe('nameBackground prop', async () => {
    it('should be visible in desktop mode', async () => {
      await mount(getBrand({ brandProps: { nameBackground: '#f5f5f5' } }))
      const component = await TopNavBarBrandLocator.find()
      const nameContainer = await component.findBrandNameContainer()

      expect(
        getComputedStyle(nameContainer.getDOMNode()).backgroundColor
      ).to.equal('rgb(245, 245, 245)')
    })

    it('should not be visible in smallViewport mode', async () => {
      await mount(
        <SmallViewportModeWrapper>
          {getBrand({ brandProps: { nameBackground: '#f5f5f5' } })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarBrandLocator.find()
      const nameContainer = await component.findBrandNameContainer()

      expect(
        getComputedStyle(nameContainer.getDOMNode()).backgroundColor
      ).to.equal('rgba(0, 0, 0, 0)')
    })
  })

  describe('iconBackground prop', async () => {
    it('should be visible in desktop mode', async () => {
      await mount(getBrand({ brandProps: { iconBackground: 'blue' } }))
      const component = await TopNavBarBrandLocator.find()
      const iconContainer = await component.findBrandIconContainer()

      expect(
        getComputedStyle(iconContainer.getDOMNode()).backgroundColor
      ).to.equal('rgb(0, 0, 255)')
    })

    it('should not be visible in smallViewport mode', async () => {
      await mount(
        <SmallViewportModeWrapper>
          {getBrand({ brandProps: { iconBackground: 'blue' } })}
        </SmallViewportModeWrapper>
      )
      const component = await TopNavBarBrandLocator.find()
      const iconContainer = await component.findBrandIconContainer({
        expectEmpty: true
      })

      expect(iconContainer).to.not.exist()
    })
  })

  describe('href prop', async () => {
    it('should render component as link', async () => {
      await mount(
        getBrand({
          brandProps: { href: '/#TestHref' }
        })
      )
      const component = await TopNavBarBrandLocator.find()
      const container = await component.findContainer()

      expect(container).to.have.tagName('a')
      expect(container).to.have.attribute('href', '/#TestHref')
    })
  })

  describe('onClick prop', async () => {
    it('should render component button', async () => {
      const onClick = stub()
      await mount(
        getBrand({
          brandProps: { href: undefined, onClick }
        })
      )
      const component = await TopNavBarBrandLocator.find()
      const container = await component.findContainer()

      expect(container).to.have.tagName('button')

      await container.click()

      expect(onClick).to.have.been.called()
    })
  })

  describe('as prop', async () => {
    it('should render component as passed element', async () => {
      const onClick = stub()
      await mount(
        getBrand({
          brandProps: { href: '/#TestHref', onClick, as: 'button' }
        })
      )
      const component = await TopNavBarBrandLocator.find()
      const container = await component.findContainer()

      expect(container).to.have.tagName('button')

      await container.click()

      expect(onClick).to.have.been.called()
    })
  })

  describe('should be accessible', async () => {
    generateA11yTests(TopNavBarBrand, TopNavBarBrandExamples)

    it('a11y', async () => {
      await mount(getBrand({}))
      const topNavBarBrand = await TopNavBarBrandLocator.find()
      expect(await topNavBarBrand.accessible()).to.be.true()
    })
  })
})
