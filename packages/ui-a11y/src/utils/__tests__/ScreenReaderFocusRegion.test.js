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
import { expect, mount, within } from '@instructure/ui-test-utils'
import ScreenReaderFocusRegion from '../ScreenReaderFocusRegion'

describe('ScreenReaderFocusRegion', async () => {
  const element = (
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

  it('should accept a function for liveRegion', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const ignore = (await main.find('[data-test-ignore]')).getDOMNode()
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(
      content,
      {
        liveRegion: () => ignore,
        shouldContainFocus: true
      }
    )

    screenReaderFocusRegion.activate()

    expect(ignore.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should apply aria-hidden to all children of content\'s parent nodes unless they are live regions', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const ignore = (await main.find('[data-test-ignore]')).getDOMNode()
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const children = await main.findAll('[data-test-child]')
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(
      content,
      {
        liveRegion: ignore,
        shouldContainFocus: true
      }
    )

    screenReaderFocusRegion.activate()

    children.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.exist()
    })

    expect(ignore.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should mute designated attributes for content\'s parent nodes', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const parents = await main.findAll('[data-test-parent]')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    screenReaderFocusRegion.activate()

    parents.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist()
      expect(node.getAttribute('aria-label')).to.not.exist()
      expect(node.getAttribute('role')).to.not.exist()
    })
  })

  it('should not apply aria-hidden to descendants', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const descendants = await main.findAll('[data-test-descendant]')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    screenReaderFocusRegion.activate()

    descendants.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist()
    })
  })

  it('should not apply aria-hidden to dynamically added descendants of content', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    screenReaderFocusRegion.activate()

    const desc = document.createElement('div')
    content.appendChild(desc)

    screenReaderFocusRegion.handleDOMMutation([
      { addedNodes: [desc], removedNodes: [] }
    ])

    content.childNodes.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist()
    })
  })

  it('should remove aria-hidden from children unless they had aria-hidden before', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)
    const childNodes = await main.findAll('[data-test-child]:not([aria-hidden="true"])')
    const exception = await main.find('[data-test-child][aria-hidden="true"]')

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    childNodes.forEach((node) => {
      expect(node.getAttribute('aria-hidden')).to.not.exist()
    })
    expect(exception.getAttribute('aria-hidden')).to.exist()
  })

  it('should properly restore and unmute parent attributes', async () => {
    const subject = await mount(element)
    const main = within(subject.getDOMNode())
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const screenReaderFocusRegion = new ScreenReaderFocusRegion(content)

    const attrsMap = {}
    const parentNodes = await main.findAll('[data-test-parent]')
    parentNodes.forEach((node) => {
      attrsMap[node.getAttribute('id')] = [...node.getDOMNode().attributes]
    })

    screenReaderFocusRegion.activate()
    screenReaderFocusRegion.deactivate()

    parentNodes.forEach((node) => {
      const preNodeAttrs = attrsMap[node.getAttribute('id')]
      const postNodeAttrs = [...node.getDOMNode().attributes]

      expect(preNodeAttrs.length).to.equal(postNodeAttrs.length) // both should have same number of attributes

      preNodeAttrs.forEach((preNodeAttribute) => {
        const matchingAttribute = postNodeAttrs.filter(
          postNodeAttribute => preNodeAttribute.name === postNodeAttribute.name
        )[0]

        expect(matchingAttribute.value).to.equal(preNodeAttribute.value)
      })
    })
  })


  it('should hide the body element of any iframes present on the page', async () => {
    const subject = await mount(
      <div>
        <div data-test-ignore>
          <iframe title="unhidden" width="100%" height="100px" />
        </div>
        <iframe title="hidden" width="100%" height="100px" />
        <div>
          <iframe title="hidden" width="100%" height="100px" />
          <div data-test-content>
            <span>
              <iframe title="unhidden" width="100%" height="100px" />
            </span>
            <div>Hello world</div>
            <button>click me</button>
            <button>or click me</button>
            <iframe title="unhidden" width="100%" height="100px"
            />
          </div>
          <div>
            <span>
              <iframe title="hidden" width="100%" height="100px" />
              <iframe title="hidden" width="100%" height="100px" />
            </span>
          </div>
          <iframe title="always-hidden" width="100%" height="100px" />
        </div>
      </div>
    )

    const main = within(subject.getDOMNode())
    const content = (await main.find('[data-test-content]')).getDOMNode()
    const ignore = (await main.find('[data-test-ignore]')).getDOMNode()

    const getIframeBody = iframe => iframe.getDOMNode().contentDocument.body

    const alwaysHidden = getIframeBody(await main.find('iframe[title="always-hidden"]'))
    alwaysHidden.setAttribute('aria-hidden', 'true')

    const screenReaderFocusRegion = new ScreenReaderFocusRegion(
      content,
      {
        liveRegion: ignore,
        shouldContainFocus: true
      }
    )

    // verify no iframe bodies are hidden unless they were hidden initially
    const iframes = await main.findAll('iframe:not([title="always-hidden"])')
    iframes.forEach((iframe) => {
      expect(getIframeBody(iframe).getAttribute('aria-hidden')).to.not.exist()
    })

    expect(alwaysHidden.getAttribute('aria-hidden')).to.equal('true')

    screenReaderFocusRegion.activate()

    // once activated, all iframe bodies should be hidden except for iframes that
    // are contained in the defined content element or live region
    const hiddenIframes = await main.findAll('iframe[title="hidden"]')
    hiddenIframes.forEach((iframe) => {
      expect(getIframeBody(iframe).getAttribute('aria-hidden')).to.equal('true')
    })

    const unhiddenIframes = await main.findAll('iframe[title="unhidden"]')
    unhiddenIframes.forEach((iframe) => {
      expect(getIframeBody(iframe).getAttribute('aria-hidden')).to.not.exist()
    })

    expect(alwaysHidden.getAttribute('aria-hidden')).to.equal('true')

    screenReaderFocusRegion.deactivate()

    // should restore all iframe bodies
    iframes.forEach((iframe) => {
      expect(getIframeBody(iframe).getAttribute('aria-hidden')).to.not.exist()
    })

    expect(alwaysHidden.getAttribute('aria-hidden')).to.equal('true')
  })
})
