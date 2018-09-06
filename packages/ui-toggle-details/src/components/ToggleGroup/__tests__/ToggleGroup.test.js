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
import IconAdd from '@instructure/ui-icons/lib/Line/IconAdd'
import IconEnd from '@instructure/ui-icons/lib/Line/IconEnd'
import View from '@instructure/ui-layout/lib/components/View'

import ToggleGroup from '../index'

const TOGGLE = 'button'
const CONTENT = '[id]'

describe('<ToggleGroup />', () => {
  const testbed = new Testbed(
    <ToggleGroup
      transition={false}
      summary="This is the summary section"
      toggleLabel="This is the toggleLabel"
    >
      This is the details section
    </ToggleGroup>
  )

  it('should show its summary and hide its children by default', () => {
    const subject = testbed.render()

    expect(subject.text()).to.contain('This is the summary section')
    expect(subject.text()).not.to.contain('This is the details section')
  })

  it('should render with children showing with the defaultExpanded prop', () => {
    const subject = testbed.render({ defaultExpanded: true })
    const toggle = subject.find(TOGGLE)

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
    expect(subject.text()).to.contain('This is the details section')
  })

  it('should have an aria-controls attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)
    const content = subject.find(CONTENT)

    expect(toggle.getAttribute('aria-controls')).to
      .equal(content.getAttribute('id'))
  })

  it('should have an aria-expanded attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should toggle on click events', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    toggle.simulate('click')

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
  })

  it('should call onToggle on click events', () => {
    const onToggle = testbed.stub()
    const subject = testbed.render({ expanded: false, onToggle })

    subject.find(TOGGLE).simulate('click')

    expect(onToggle.firstCall.args[0].type).to.equal('click')
    expect(onToggle.firstCall.args[1]).to.eql(true)
  })

  it('should update the toggle screenreader label based on the expanded state', () => {
    const subject = testbed.render({
      toggleLabel: function (expanded) {
        if (expanded) {
          return 'Hide content'
        } else {
          return 'Show content'
        }
      }
    })
    const toggle = subject.find(TOGGLE)
    expect(toggle.text()).to.equal('Show content')

    toggle.simulate('click')
    expect(toggle.text()).to.equal('Hide content')
  })

  it('should accept custom icons', () => {
    const subject = testbed.render({
      icon: IconAdd,
      iconExpanded: IconEnd
    })
    expect(subject.find('IconAdd').length).to.eql(1)
    expect(subject.find('IconEnd').length).to.eql(0)

    const toggle = subject.find(TOGGLE)
    toggle.simulate('click')
    expect(subject.find('IconAdd').length).to.eql(0)
    expect(subject.find('IconEnd').length).to.eql(1)
  })

  it('should render without a border', () => {
    const subject = testbed.render({
      border: false
    })
    expect(subject.find(View).first().props().borderWidth).to.equal('none')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'aria-allowed-role' // TODO remove this when we fix the issue
      ]
    })
  })

  it('focuses with the focus helper', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true()
  })
})
