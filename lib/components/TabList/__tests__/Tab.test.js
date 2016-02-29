import Tab from '../Tab'

describe('<Tab />', function () {
  const label = 'Tab Label'

  const testbed = createTestbed(Tab, {
    id: 'foo',
    index: 0,
    controls: 'foo-panel',
    children: label
  })

  it('should render children', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("Tab Label")'))
      .to.be.ok
  })

  it('should have appropriate role attribute', function () {
    testbed.render()

    expect(testbed.dom.node.getAttribute('role'))
      .to.equal('tab')
  })

  it('should have appropriate aria attributes', function () {
    testbed.render()

    expect(testbed.dom.node.getAttribute('aria-selected'))
      .to.not.exist
    expect(testbed.dom.node.getAttribute('aria-disabled'))
      .to.not.exist
  })

  it('should set the aria-selected attribute', function () {
    testbed.render({
      selected: true
    })

    expect(testbed.dom.node.getAttribute('aria-selected'))
      .to.equal('true')
  })

  it('should set the aria-disabled attribute', function () {
    testbed.render({
      disabled: true
    })

    expect(testbed.dom.node.getAttribute('aria-disabled'))
      .to.equal('true')
  })

  it('should set the tabindex to 0 when selected', function () {
    testbed.render({
      selected: true
    })

    expect(testbed.dom.node.getAttribute('tabindex'))
      .to.equal('0')
  })

  it('should set the tabindex to -1 when not selected', function () {
    testbed.render({
      selected: false
    })

    expect(testbed.dom.node.getAttribute('tabindex'))
      .to.equal('-1')
  })

  it('should remove the tabindex attribute when disabled', function () {
    testbed.render({
      disabled: true
    })

    expect(testbed.dom.node.getAttribute('tabindex'))
      .to.not.exist
  })

  it('should call onClick when clicked', function () {
    const onClick = testbed.sandbox.stub()
    const index = 2

    testbed.render({
      index,
      onClick
    })

    testbed.dom.click()

    expect(onClick).to.have.been.called
    expect(onClick.args[0][0]).to.equal(2)
  })

  it('should NOT call onClick when clicked and tab is disabled', function () {
    const onClick = testbed.sandbox.stub()

    testbed.render({
      disabled: true,
      onClick
    })

    testbed.dom.click()

    expect(onClick).to.not.have.been.called
  })

  it('should call onKeyDown when keys are pressed', function () {
    const onKeyDown = testbed.sandbox.stub()
    const index = 2

    testbed.render({
      index,
      onKeyDown
    })

    testbed.dom.keyDown(37)

    expect(onKeyDown).to.have.been.called
    expect(onKeyDown.args[0][0]).to.equal(2)
  })

  it('should NOT call onKeyDown when keys are pressed and tab is disabled', function () {
    const onKeyDown = testbed.sandbox.stub()

    testbed.render({
      disabled: true,
      onKeyDown
    })

    testbed.dom.keyDown(37)

    expect(onKeyDown).to.not.have.been.called
  })

  it('should focus itself when focus is set and it is selected', function () {
    testbed.render({
      selected: true,
      focus: true
    })

    expect(testbed.dom.node).to.equal(document.activeElement)
  })

  it('should not focus itself when it is not selected', function () {
    testbed.render({
      selected: false,
      focus: true
    })

    expect(testbed.dom.node).to.not.equal(document.activeElement)
  })
})
