import ContextBox from '../index'

describe('<ContextBox />', function () {
  const testbed = createTestbed(ContextBox, {
    children: 'foo'
  })

  it('should render the children', function () {
    testbed.render()

    expect(testbed.getText())
      .to.equal('foo')
  })

  it('should meet a11y standards', function (done) {
    testbed.render()

    testbed.checkA11yStandards(done)
  })

  describe('with the default props', function () {
    it('should render above the trigger element', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('positioned--top')
    })

    it('should render with an arrow', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('with-arrow')
    })
  })

  describe('when the arrow is disabled', function () {
    it('should not display the arrow', function () {
      testbed.render({
        withArrow: false
      })

      expect(testbed.dom.node.className)
        .to.not.contain('withArrow')
    })
  })

  describe('when a placement is provided', function () {
    const placement = 'bottom'

    it('should display in that position', function () {
      testbed.render({
        placement
      })

      expect(testbed.dom.node.className)
        .to.contain('positioned--' + placement)
    })
  })
})
