import TabPanel from '../TabPanel'

describe('<TabPanel />', function () {
  const testbed = createTestbed(TabPanel, {
    selected: true,
    title: 'Panel Title',
    children: 'Panel contents'
  })

  it('should render children', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("Panel contents")'))
      .to.be.ok
  })

  it('should have appropriate role attribute', function () {
    testbed.render()

    expect(testbed.dom.node.getAttribute('role'))
      .to.equal('tabpanel')
  })
})
