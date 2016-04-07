import React from 'react'
import TabList, { TabPanel} from '../index'
import Tab from '../Tab'

describe('<TabList />', function () {
  const data = [
    { title: 'First Tab', contents: 'Contents of first tab.' },
    { title: 'Second Tab', contents: 'Contents of second tab.' },
    { title: 'Third Tab', contents: 'Contents of third tab.', disabled: true }
  ]

  const panels = data.map((item, i) => {
    return <TabPanel key={i} title={item.title} disabled={item.disabled}>{item.contents}</TabPanel>
  })

  const testbed = createTestbed(TabList, {
    children: panels
  })

  it('should render the correct number of panels', function () {
    testbed.render()

    const panels = testbed.dom.findAll('[role="tabpanel"]')
    expect(panels.nodes).to.have.length(3)
  })

  it('should render screen reader only tabs', function () {
    testbed.render()

    const tabs = testbed.dom.findAll('[role="tab"]')

    expect(tabs.nodes).to.have.length(3)
  })

  it('should render presentational only tabs', function () {
    testbed.render()

    const tabs = testbed.dom.findAll('[role="presentation"]')

    expect(tabs.nodes).to.have.length(2)
  })

  it('should render correct number of tabs', function () {
    testbed.render()

    const children = testbed.dom.findAll(Tab)
    // there should be 2 extra tabs for screen readers
    expect(children.nodes.length)
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
        children: <div/>
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
    testbed.render()

    const tabs = testbed.dom.findAll('[role="tab"]')
    const panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[0].getAttribute('aria-selected')).to.equal('true')
    expect(panels.nodes[0].getAttribute('aria-hidden')).to.not.exist
  })

  it('should honor the defaultSelectedIndex prop', function () {
    testbed.render({
      defaultSelectedIndex: 1
    })

    const tabs = testbed.dom.findAll('[role="tab"]')
    const panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[1].getAttribute('aria-selected')).to.equal('true')
    expect(panels.nodes[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should not allow selecting a disabled tab', function () {
    testbed.render({
      defaultSelectedIndex: 2
    })

    const tabs = testbed.dom.findAll(Tab)
    const panels = testbed.dom.findAll(TabPanel)

    expect(tabs.nodes[2].getAttribute('aria-selected')).to.not.exist
    expect(panels.nodes[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should call onChange when selection changes', function () {
    const onChange = testbed.sandbox.stub()

    testbed.render({
      selectedIndex: 2,
      onChange
    })

    testbed.dom.find('[role="presentation"]:not([aria-selected])').click()

    expect(onChange).to.have.been.calledWith(1, 2)
  })

  it('should not update the selected tab when selectedIndex is set', function () {
    const onChange = testbed.sandbox.stub()

    const component = testbed.render({
      selectedIndex: 0,
      onChange
    })

    testbed.dom.find('[role="presentation"]:not([aria-selected])').click()

    expect(component.selectedIndex).to.equal(0)
  })

  it('should focus the selected tab when focus is set', function () {
    testbed.render({
      defaultSelectedIndex: 1,
      focus: true
    })

    const tabs = testbed.dom.findAll('[role="tab"]')

    expect(tabs.nodes[1]).to.equal(document.activeElement)
  })

  it('should update the selected tab via keyboard arrow keys', function () {
    testbed.render()

    testbed.dom.find('[aria-selected]').keyDown(37)

    let tabs = testbed.dom.findAll('[role="tab"]')
    let panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[0].getAttribute('aria-selected')).to.not.exist
    expect(tabs.nodes[1].getAttribute('aria-selected')).to.equal('true')

    expect(panels.nodes[1].getAttribute('aria-hidden')).to.not.exist

    testbed.dom.find('[aria-selected]').keyDown(39)
    testbed.dom.find('[aria-selected]').keyDown(40)

    tabs = testbed.dom.findAll('[role="tab"]')
    panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[1].getAttribute('aria-selected')).to.equal('true')
    expect(panels.nodes[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should update the selected tab via keyboard ENTER keys on screen reader tabs', function () {
    testbed.render()

    testbed.dom.find('[role="tab"]:contains("Second Tab")').keyDown(13)

    const tabs = testbed.dom.find('[role="tab"]')
    const panels = testbed.dom.find('[role="tabpanel"]')

    expect(tabs.nodes[0].getAttribute('aria-selected')).to.not.exist
    expect(tabs.nodes[1].getAttribute('aria-selected')).to.equal('true')

    expect(panels.nodes[0].getAttribute('aria-hidden')).to.equal('true')
    expect(panels.nodes[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should update the selected tab when clicked', function () {
    testbed.render()

    // skip tabs 1 and 2 becuase they are screen reader only
    testbed.dom.find('[role="presentation"]:contains("Second Tab")').click()

    const tabs = testbed.dom.findAll('[role="tab"]')
    const panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[0].getAttribute('aria-selected')).to.not.exist
    expect(tabs.nodes[1].getAttribute('aria-selected')).to.equal('true')

    expect(panels.nodes[0].getAttribute('aria-hidden')).to.equal('true')
    expect(panels.nodes[1].getAttribute('aria-hidden')).to.not.exist
  })

  it('should not change selectedIndex when clicking a disabled tab', function () {
    testbed.render()

    testbed.dom.find('[role="presentation"][aria-disabled]').click()

    const tabs = testbed.dom.findAll('[role="tab"]')
    const panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[0].getAttribute('aria-selected')).to.equal('true')
    expect(tabs.nodes[2].getAttribute('aria-selected')).to.not.exist

    expect(panels.nodes[0].getAttribute('aria-hidden')).to.not.exist
    expect(panels.nodes[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should meet a11y standards when set to simple style tabs', function (done) {
    testbed.render({
      style: 'simple'
    })

    testbed.checkA11yStandards(done, {
      exclude: [['[aria-disabled]']] // ignore color contrast for disabled tab
    })
  })

  it('should meet a11y standards when set to accordion style tabs', function (done) {
    testbed.render({
      style: 'accordion'
    })

    testbed.checkA11yStandards(done, {
      exclude: [['[aria-disabled]']] // ignore color contrast for disabled tab
    })
  })

  it('should meet a11y standards when set to minimal style tabs', function (done) {
    testbed.render({
      style: 'minimal'
    })

    testbed.checkA11yStandards(done, {
      exclude: [['[aria-disabled]']] // ignore color contrast for disabled tab
    })
  })

  it('should have appropriate aria attributes', function () {
    testbed.render()

    expect(testbed.dom.node.getAttribute('role'))
      .to.equal('tablist')
  })

  it('should link tabs with the corresponding panels via ids', function () {
    testbed.render()

    const tabs = testbed.dom.findAll('[role="tab"]')
    const panels = testbed.dom.findAll('[role="tabpanel"]')

    expect(tabs.nodes[0].getAttribute('aria-controls'))
      .to.equal(panels.nodes[0].getAttribute('id'))

    expect(panels.nodes[0].getAttribute('aria-labelledby'))
      .to.equal(tabs.nodes[0].getAttribute('id'))
  })
})
