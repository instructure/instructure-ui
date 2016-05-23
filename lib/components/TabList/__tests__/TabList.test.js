import React from 'react'
import TabList, { TabPanel} from '../index'
import Tab from '../Tab'

describe('<TabList />', function () {
  const testbed = createTestbed(
    <TabList>
      <TabPanel title="First Tab">Contents of first tab.</TabPanel>
      <TabPanel title="Second Tab">Contents of second tab.</TabPanel>
      <TabPanel title="Third Tab" disabled>Contents of third tab.</TabPanel>
    </TabList>
  )

  it('should render the correct number of panels', function () {
    const subject = testbed.render()

    expect(subject.find(':dom[role="tabpanel"]')).to.have.length(3)
  })

  it('should render screen reader only tabs', function () {
    const subject = testbed.render()

    expect(subject.find(':dom[role="tab"]')).to.have.length(3)
  })

  it('should render presentational only tabs', function () {
    const subject = testbed.render()

    expect(subject.find(':dom[role="presentation"]')).to.have.length(2)
  })

  it('should render correct number of tabs', function () {
    const subject = testbed.render()

    // there should be 2 extra tabs for screen readers
    expect(subject.find(Tab).length)
      .to.equal(5)
  })

  it('should be okay with rendering without any children', function () {
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

  it('should not allow invalid children', function () {
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

  it('requires an `onChange` prop with a `selectedIndex` prop', function () {
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

  it('should default to selectedIndex being 0', function () {
    const subject = testbed.render()

    const tabs = subject.find(':dom[role="tab"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[0].getAttribute('aria-selected')).to.equal('true')
    expect(panels[0].getAttribute('aria-hidden')).to.not.exist
  })

  it('should honor the defaultSelectedIndex prop', function () {
    const subject = testbed.render({
      defaultSelectedIndex: 1
    })

    const tabs = subject.find(':dom[role="tab"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[1].getAttribute('aria-selected')).to.equal('true')
    expect(panels[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should not allow selecting a disabled tab', function () {
    const subject = testbed.render({
      defaultSelectedIndex: 2
    })

    const tabs = subject.find(':dom[role="presentation"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[2].getAttribute('aria-selected')).to.not.exist
    expect(panels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should call onChange when selection changes', function () {
    const onChange = testbed.sandbox.stub()

    const subject = testbed.render({
      selectedIndex: 2,
      onChange
    })

    subject.find(':dom[role="presentation"]:not([aria-selected])').trigger('click')

    expect(onChange).to.have.been.calledWith(1, 2)
  })

  it('should not update the selected tab when selectedIndex is set', function () {
    const onChange = testbed.sandbox.stub()

    const subject = testbed.render({
      selectedIndex: 0,
      onChange
    })

    subject.find(':dom[role="presentation"]:not([aria-selected])').trigger('click')

    expect(subject.props('selectedIndex')).to.equal(0)
  })

  it('should focus the selected tab when focus is set', function () {
    const subject = testbed.render({
      defaultSelectedIndex: 1,
      focus: true
    })

    const tabs = subject.find(':dom[role="tab"]')

    expect(tabs[1] === document.activeElement).to.be.true
  })

  it('should update the selected tab via keyboard arrow keys', function () {
    const subject = testbed.render()

    subject.find(':dom[aria-selected]').keyDown('left')

    let tabs = subject.find(':dom[role="tab"]')
    let panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[0].getAttribute('aria-selected')).to.not.exist
    expect(tabs[1].getAttribute('aria-selected')).to.equal('true')

    expect(panels[1].getAttribute('aria-hidden')).to.not.exist

    subject.find(':dom[aria-selected]').keyDown('right')
    subject.find(':dom[aria-selected]').keyDown('down')

    tabs = subject.find(':dom[role="tab"]')
    panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[1].getAttribute('aria-selected')).to.equal('true')
    expect(panels[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should update the selected tab via keyboard ENTER keys on screen reader tabs', function () {
    const subject = testbed.render()

    subject.find(':dom[role="tab"]:contains("Second Tab")').keyDown('enter')

    const tabs = subject.find(':dom[role="tab"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[0].getAttribute('aria-selected')).to.not.exist
    expect(tabs[1].getAttribute('aria-selected')).to.equal('true')

    expect(panels[0].getAttribute('aria-hidden')).to.equal('true')
    expect(panels[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should update the selected tab when clicked', function () {
    const subject = testbed.render()

    // skip tabs 1 and 2 becuase they are screen reader only
    subject.find(':dom[role="presentation"]:contains("Second Tab")').trigger('click')

    const tabs = subject.find(':dom[role="tab"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[0].getAttribute('aria-selected')).to.not.exist
    expect(tabs[1].getAttribute('aria-selected')).to.equal('true')

    expect(panels[0].getAttribute('aria-hidden')).to.equal('true')
    expect(panels[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should not change selectedIndex when clicking a disabled tab', function () {
    const subject = testbed.render()

    subject.find(':dom[role="presentation"][aria-disabled]').trigger('click')

    const tabs = subject.find(':dom[role="tab"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[0].getAttribute('aria-selected')).to.equal('true')
    expect(tabs[2].getAttribute('aria-selected')).to.not.exist

    expect(panels[0].getAttribute('aria-hidden')).to.not.exist
    expect(panels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should meet a11y standards when set to simple style tabs', function (done) {
    const subject = testbed.render({
      style: 'simple'
    })

    subject.should.be.accessible(done, {
      exclude: [['[aria-disabled]']] // ignore color contrast for disabled tab
    })
  })

  it('should meet a11y standards when set to accordion style tabs', function (done) {
    const subject = testbed.render({
      style: 'accordion'
    })

    subject.should.be.accessible(done, {
      exclude: [['[aria-disabled]']] // ignore color contrast for disabled tab
    })
  })

  it('should meet a11y standards when set to minimal style tabs', function (done) {
    const subject = testbed.render({
      style: 'minimal'
    })

    subject.should.be.accessible(done, {
      exclude: [['[aria-disabled]']] // ignore color contrast for disabled tab
    })
  })

  it('should have appropriate aria attributes', function () {
    const subject = testbed.render()

    expect(subject.getAttribute('role'))
      .to.equal('tablist')
  })

  it('should link tabs with the corresponding panels via ids', function () {
    const subject = testbed.render()

    const tabs = subject.find(':dom[role="tab"]')
    const panels = subject.find(':dom[role="tabpanel"]')

    expect(tabs[0].getAttribute('aria-controls'))
      .to.equal(panels[0].getAttribute('id'))

    expect(panels[0].getAttribute('aria-labelledby'))
      .to.equal(tabs[0].getAttribute('id'))
  })
})
