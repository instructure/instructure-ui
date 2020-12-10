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
import { expect, mount, locator } from '@instructure/ui-test-utils'

import { TreeButton } from '../index'
import styles from '../styles.css'

const TreeButtonLocator = locator(TreeButton.selector)

describe('<TreeButton />', async () => {
  it('should render', async () => {
    await mount(<TreeButton id="1" />)
    const treeButton = await TreeButtonLocator.find()
    expect(treeButton).to.exist()
  })

  describe('selected', async () => {
    it('should take the selected class if the button is selected', async () => {
      await mount(<TreeButton id="1" selected={true} />)
      const treeButton = await TreeButtonLocator.find()
      expect(treeButton.hasClass(styles['selected'])).to.be.true()
    })
  })

  describe('descriptor', async () => {
    it('should not render a descriptor element if no descriptor passed', async () => {
      await mount(<TreeButton id="1" />)
      expect(
        await TreeButtonLocator.find(`.${styles.textDescriptor}`, {
          expectEmpty: true
        })
      ).to.not.exist()
    })

    it('should render a descriptor element if descriptor passed', async () => {
      await mount(<TreeButton id="1" descriptor="Some Descriptor" />)
      const descriptor = await TreeButtonLocator.find(
        `.${styles.textDescriptor}:contains(Some Descriptor)`
      )
      expect(descriptor).to.exist()
    })
  })

  describe('icons', async () => {
    const Icon = (
      <svg height="100" width="100">
        <title>Test icon</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )

    it('should render a collection icon', async () => {
      await mount(
        <TreeButton id="1" type="collection" collectionIcon={() => Icon} />
      )
      const icon = await TreeButtonLocator.find('svg:contains(Test icon)')
      expect(icon).to.exist()
    })

    it('should render an item icon', async () => {
      await mount(<TreeButton id="1" type="item" itemIcon={() => Icon} />)
      const icon = await TreeButtonLocator.find('svg:contains(Test icon)')
      expect(icon).to.exist()
    })

    it('should render no icon if no icon prop passed', async () => {
      await mount(<TreeButton id="1" />)
      expect(
        await TreeButtonLocator.find('svg', { expectEmpty: true })
      ).to.not.exist()
    })

    it('should render a thumbnail instead of an icon if a thumbnail URL is passed', async () => {
      await mount(
        <TreeButton
          id="1"
          type="item"
          thumbnail="data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=="
        />
      )

      const thumbnail = await TreeButtonLocator.find('img')
      expect(thumbnail).to.exist()
    })

    it('should not render a thumbnail if no thumbnail URL is passed', async () => {
      await mount(<TreeButton id="1" type="item" />)

      expect(
        await TreeButtonLocator.find('img', { expectEmpty: true })
      ).to.not.exist()
    })

    it('should render a thumbnail if a thumbnail and an icon are passed', async () => {
      await mount(
        <TreeButton
          id="1"
          type="item"
          itemIcon={() => Icon}
          thumbnail="data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=="
        />
      )

      expect(
        await TreeButtonLocator.find('svg', { expectEmpty: true })
      ).to.not.exist()
      expect(await TreeButtonLocator.find('img')).to.exist()
    })
  })
})
