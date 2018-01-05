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
import TabList, { Tab, TabPanel} from '../index'

describe('<TabList />', () => {
  const testbed = new Testbed(
    <TabList>
      <TabPanel title="First Tab">Contents of first tab.</TabPanel>
      <TabPanel title="Second Tab">Contents of second tab.</TabPanel>
      <TabPanel title="Third Tab" disabled>Contents of third tab.</TabPanel>
    </TabList>
  )

  it('should render the correct number of panels', () => {
    const subject = testbed.render()

    expect(subject.find('[role="tabpanel"]')).to.have.length(3)
  })

  it('should render screen reader only tabs', () => {
    const subject = testbed.render()

    expect(subject.find('[role="tab"]')).to.have.length(3)
  })

  it('should render presentational only tabs', () => {
    const subject = testbed.render()

    expect(subject.find('[role="presentation"]')).to.have.length(2)
  })

  it('should render correct number of tabs', () => {
    const subject = testbed.render()

    // there should be 2 extra tabs for screen readers
    expect(subject.find(Tab).length)
      .to.equal(5)
  })

  it('should be okay with rendering without any children', () => {
    let error = false
    try {
      testbed.render({
        children: null
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.false
  })

  it('should not allow invalid children', () => {
    let error = false
    try {
      testbed.render({
        children: <div />
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  it('should preserve TabPanel keys', (done) => {
    const subject = testbed.render({
      children: <TabPanel title="foobar" key="foo" />
    })

    expect(subject.find(TabPanel).first().key()).to.equal('foo')

    subject.setProps({
      children: [
        <TabPanel title="foobar" key="foo" />,
        <TabPanel title="barbaz" key="bar" />
      ]
    }, () => {
      expect(subject.find(TabPanel).first().key()).to.equal('foo')
      expect(subject.find(TabPanel).last().key()).to.equal('bar')
      done()
    })
  })

  it('requires an `onChange` prop with a `selectedIndex` prop', () => {
    let error = false
    try {
      testbed.render({
        selectedIndex: 1
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  it('should default to selectedIndex being 0', () => {
    const subject = testbed.render()

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(0).getAttribute('aria-selected')).to.equal('true')
    expect(panels(0).getAttribute('aria-hidden')).to.not.exist
  })

  it('should honor the defaultSelectedIndex prop', () => {
    const subject = testbed.render({
      defaultSelectedIndex: 1
    })

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(1).getAttribute('aria-selected')).to.equal('true')
    expect(panels(1).getAttribute('aria-hidden')).to.not.exist
  })

  it('should not allow selecting a disabled tab', () => {
    const subject = testbed.render({
      defaultSelectedIndex: 2
    })

    const tabs = (n) => subject.find('[role="presentation"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(2).getAttribute('aria-selected')).to.not.exist
    expect(panels(2).getAttribute('aria-hidden')).to.equal('true')
  })

  it('should call onChange when selection changes', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      selectedIndex: 1,
      onChange
    })

    subject.find('[role="presentation"]').not('[aria-selected="true"]').first()
      .simulate('click')

    expect(onChange).to.have.been.calledWith(0, 1)
  })

  it('should not update the selected tab when selectedIndex is set', () => {
    const onChange = testbed.stub()

    const subject = testbed.render({
      selectedIndex: 0,
      onChange
    })

    subject.find('[role="presentation"]').not('[aria-selected="true"]').first().simulate('click')

    expect(subject.prop('selectedIndex')).to.equal(0)
  })

  it('should focus the defaultSelectedIndex tab when focus is set', () => {
    const subject = testbed.render({
      defaultSelectedIndex: 1,
      focus: true
    })

    const tabs = subject.find('[role="tab"]')

    expect(tabs.at(1).focused()).to.be.true
  })

  it('should focus the selectedIndex tab when focus is set', (done) => {
    const subject = testbed.render({
      selectedIndex: 1,
      focus: true
    })

    const tabs = (n) => subject.find('[role="tab"]').at(n)

    expect(tabs(1).focused()).to.be.true

    subject.setProps({ selectedIndex: 0 }, () => {
      expect(tabs(0).focused()).to.be.true
      done()
    })
  })

  it('should update the selected tab via keyboard arrow keys', () => {
    const subject = testbed.render()

    subject.find('[aria-selected="true"]').keyDown('left')

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(0).getAttribute('aria-selected')).to.not.exist
    expect(tabs(1).getAttribute('aria-selected')).to.equal('true')

    expect(panels(1).getAttribute('aria-hidden')).to.not.exist

    subject.find('[aria-selected="true"]').keyDown('right')
    subject.find('[aria-selected="true"]').keyDown('down')

    expect(tabs(1).getAttribute('aria-selected')).to.equal('true')
    expect(panels(1).getAttribute('aria-hidden')).to.not.exist
  })

  it('should update the selected tab via keyboard ENTER keys on screen reader tabs', () => {
    const subject = testbed.render()

    subject.find('[role="tab"]').findText('Second Tab').keyDown('enter')

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(0).getAttribute('aria-selected')).to.not.exist
    expect(tabs(1).getAttribute('aria-selected')).to.equal('true')

    expect(panels(0).getAttribute('aria-hidden')).to.equal('true')
    expect(panels(1).getAttribute('aria-hidden')).to.not.exist
  })

  it('should update the selected tab when clicked', () => {
    const subject = testbed.render()

    // skip tabs 1 and 2 becuase they are screen reader only
    subject.find('[role="presentation"]').findText('Second Tab').simulate('click')

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(0).getAttribute('aria-selected')).to.not.exist
    expect(tabs(1).getAttribute('aria-selected')).to.equal('true')

    expect(panels(0).getAttribute('aria-hidden')).to.equal('true')
    expect(panels(1).getAttribute('aria-hidden')).to.not.exist
  })

  it('should not change selectedIndex when clicking a disabled tab', () => {
    const subject = testbed.render()

    subject.find('[role="presentation"]').find('[aria-disabled="true"]').simulate('click')

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(0).getAttribute('aria-selected')).to.equal('true')
    expect(tabs(2).getAttribute('aria-selected')).to.not.exist

    expect(panels(0).getAttribute('aria-hidden')).to.not.exist
    expect(panels(2).getAttribute('aria-hidden')).to.equal('true')
  })

  it('should meet a11y standards when set to the simple variant', (done) => {
    const subject = testbed.render({
      variant: 'simple'
    })

    subject.should.be.accessible(done, {
      exclude: [['[aria-disabled="true"]']], // ignore color contrast for disabled tab
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  it('should meet a11y standards when set to the accordion variant', (done) => {
    const subject = testbed.render({
      variant: 'accordion'
    })

    subject.should.be.accessible(done, {
      exclude: [['[aria-disabled="true"]']], // ignore color contrast for disabled tab
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  it('should meet a11y standards when set to the minimal variant', (done) => {
    const subject = testbed.render({
      variant: 'minimal'
    })

    subject.should.be.accessible(done, {
      exclude: [['[aria-disabled]']], // ignore color contrast for disabled tab
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  it('should have appropriate aria attributes', () => {
    const subject = testbed.render()

    expect(subject.getAttribute('role'))
      .to.equal('tablist')
  })

  it('should link tabs with the corresponding panels via ids', () => {
    const subject = testbed.render()

    const tabs = (n) => subject.find('[role="tab"]').at(n)
    const panels = (n) => subject.find('[role="tabpanel"]').at(n)

    expect(tabs(0).getAttribute('aria-controls'))
      .to.equal(panels(0).getAttribute('id'))

    expect(panels(0).getAttribute('aria-labelledby'))
      .to.equal(tabs(0).getAttribute('id'))
  })
})
