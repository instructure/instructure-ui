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
import ScreenReaderFocusRegion from '../ScreenReaderFocusRegion'

describe('ScreenReaderFocusRegion', () => {
  const testbed = new Testbed(
    <div data-test-parent role="main" aria-label="test app" id="test-parent3">
      <div data-test-ignore role="alert">
        <span>test alert</span>
      </div>
      <div data-test-child>
        <div data-test-descendant></div>
        <div data-test-descendant>
          <div data-test-descendant></div>
        </div>
      </div>
      <div data-test-parent aria-hidden="true" id="test-parent2">
        <div data-test-child></div>
        <div role="dialog" aria-label="some content" data-test-parent id="test-parent1">
          <div data-test-content>
            <div>Hello world</div>
            <button>click me</button>
            <button>or click me</button>
          </div>
          <span data-test-child>
            <ul data-test-descendant>
              <li data-test-descendant>item 1</li>
              <li data-test-descendant>item 2</li>
              <li data-test-descendant>item 3</li>
            </ul>
          </span>
        </div>
      </div>
      <div data-test-child aria-hidden="true">
        <div data-test-descendant></div>
        <div data-test-descendant></div>
      </div>
    </div>
  )

  const findContent = (subject) => {
    return subject.find('[data-test-content]').node
  }

  const findIgnore = (subject) => {
    return subject.find('[data-test-ignore]').node
  }

  const findChildren = (subject) => {
    return subject.find('[data-test-child]').nodes
  }

  const findParents = (subject) => {
    return subject.find('[data-test-parent]').nodes
  }

  const findDescendants = (subject) => {
    return subject.find('[data-test-descendant]').nodes
  }

  it('should apply aria-hidden to all children of content\'s parent nodes unless they are live regions', () => {
    const subject = testbed.render()

    const ignore = findIgnore(subject)

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(
      findContent(subject),
      {
        liveRegion: ignore,
        shouldContainFocus: true
      }
    )

    screenReaderFocusRegion.activate()

    findChildren(subject).forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.exist
    })

    expect(ignore.getAttribute('aria-hidden')).to.not.exist
  })

  it('should mute designated attributes for content\'s parent nodes', () => {
    const subject = testbed.render()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(findContent(subject))
    screenReaderFocusRegion.activate()

    findParents(subject).forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist
      expect(node.getAttribute('aria-label')).to.not.exist
      expect(node.getAttribute('role')).to.not.exist
    })
  })

  it('should not apply aria-hidden to descendants', () => {
    const subject = testbed.render()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(findContent(subject))
    screenReaderFocusRegion.activate()

    findDescendants(subject).forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist
    })
  })

  it('should not apply aria-hidden to dynamically added descendants of content', () => {
    const subject = testbed.render()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(findContent(subject))
    screenReaderFocusRegion.activate()

    const desc = document.createElement('div')
    findContent(subject).appendChild(desc)
    screenReaderFocusRegion.handleDOMMutation([
      { addedNodes: [desc], removedNodes: [] }
    ])

    findContent(subject).childNodes.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist
    })
  })

  it('should remove aria-hidden from children unless they had aria-hidden before', () => {
    const subject = testbed.render()

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(findContent(subject))

    // Enzyme doesn't support pseudo class css selectors so we use query selector here
    const childNodes = subject.node.querySelectorAll('[data-test-child]:not([aria-hidden="true"])')
    const exception = subject.node.querySelector('[data-test-child][aria-hidden="true"]')

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    childNodes.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist
    })
    expect(exception.getAttribute('aria-hidden')).to.exist
  })

  it('should properly restore and unmute parent attributes', () => {
    const subject = testbed.render()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(findContent(subject))

    const attrsMap = {}
    const parentNodes = findParents(subject)
    parentNodes.forEach((node) => {
      attrsMap[node.getAttribute('id')] = [...node.attributes]
    })

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    parentNodes.forEach((node) => {
      const preNodeAttrs = attrsMap[node.getAttribute('id')]
      const postNodeAttrs = [...node.attributes]

      expect(preNodeAttrs.length).to.equal(postNodeAttrs.length) // both should have same number of attributes

      preNodeAttrs.forEach((preNodeAttribute) => {
        const matchingAttribute = postNodeAttrs.filter(
          postNodeAttribute => preNodeAttribute.name === postNodeAttribute.name
        )[0]

        expect(matchingAttribute.value).to.equal(preNodeAttribute.value)
      })
    })
  })
})
