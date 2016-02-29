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
        .to.contain('positioned--above')
    })

    it('should render with an arrow', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('with-arrow')
    })

    it('should animate', function () {
      testbed.render()

      expect(testbed.dom.node.className)
        .to.contain('with-animation')
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

  describe('when animation is disabled', function () {
    it('should not animate', function () {
      testbed.render({
        withAnimation: false
      })

      expect(testbed.dom.node.className)
        .to.not.contain('with-animation')
    })
  })

  describe('when a position is provided', function () {
    const positioned = 'below'

    it('should animate to that position', function () {
      testbed.render({
        positioned
      })

      expect(testbed.dom.node.className)
        .to.contain('positioned--' + positioned)
    })

    it('should display in that position', function () {
      testbed.render({
        positioned
      })

      expect(testbed.dom.node.className)
        .to.contain('positioned--' + positioned)
    })
  })
})
