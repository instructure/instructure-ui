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
import IconFolder from '@instructure/ui-icons/lib/Solid/IconFolder'
import IconDocument from '@instructure/ui-icons/lib/Solid/IconDocument'
import TreeButton from '../index'
import styles from '../styles.css'

describe('<TreeButton />', () => {
  const testbed = new Testbed(<TreeButton id="1" />)

  it('should render', () => {
    const button = testbed.render()
    expect(button).to.be.present()
  })

  describe('selected', () => {
    it('shows the selected class if the button is selected', () => {
      const button = testbed.render({selected: true})
      expect(button.find(`.${styles.selected}`)).to.have.length(1)
    })
  })

  describe('descriptor', () => {
    it('does not render a descriptor element if no descriptor passed', () => {
      const button = testbed.render()
      expect(button.find(`.${styles.textDescriptor}`)).to.have.length(0)
    })

    it('renders a descriptor element if passed', () => {
      const button = testbed.render({
        descriptor: 'Some Descriptor'
      })
      expect(button.find(`.${styles.textDescriptor}`).text()).to.equal('Some Descriptor')
    })
  })

  describe('icons', () => {
    it('renders a passed collection Icon', () => {
      const button = testbed.render({type: 'collection', collectionIcon: IconFolder})
      const svg = button.find(IconFolder)
      expect(svg.length).to.equal(1)
    })

    it('renders a passed item Icon', () => {
      const button = testbed.render({type: 'item', itemIcon: IconDocument})
      const svg = button.find(IconDocument)
      expect(svg.length).to.equal(1)
    })

    it('renders a TreeButton without icon if no icon prop passd', () => {
      const button = testbed.render()
      const svg1 = button.find(IconFolder)
      const svg2 = button.find(IconDocument)
      expect(svg1.length + svg2.length).to.equal(0)
    })
  })
})
