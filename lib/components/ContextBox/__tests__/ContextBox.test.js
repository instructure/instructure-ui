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
        .to.contain('position--above')
    })

    it('should render with an arrow', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('withArrow')
    })

    it('should animate', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('animateTo--')
    })
  })

  describe('when the arrow is disabled', function () {
    it('should not display the arrow', function () {
      testbed.render({
        showArrow: false
      })

      expect(testbed.dom.node.className)
        .to.not.contain('withArrow')
    })
  })

  describe('when animation is disabled', function () {
    it('should not animate', function () {
      testbed.render({
        animate: false
      })

      expect(testbed.dom.node.className)
        .to.not.contain('animateTo--')
    })
  })

  describe('when a position is provided', function () {
    const position = 'below'

    it('should animate to that position', function () {
      testbed.render({
        position
      })

      expect(testbed.dom.node.className)
        .to.contain('animateTo--' + position)
    })

    it('should display in that position', function () {
      testbed.render({
        position
      })

      expect(testbed.dom.node.className)
        .to.contain('position--' + position)
    })
  })
})
