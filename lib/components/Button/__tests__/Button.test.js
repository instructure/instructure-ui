import Button from '../index'

describe('Button', function () {
  const testbed = createTestbed(Button, {
    children: 'Hello World'
  })

  it('should render the children as button text', function () {
    testbed.render()

    expect(testbed.getText())
      .to.equal('Hello World')
  })

  it('should render a button', function () {
    testbed.render()

    expect(testbed.dom.node.tagName.toUpperCase())
      .to.equal('BUTTON')
  })

  it('should render a link styled as a button if href is provided', function () {
    testbed.render({
      href: 'example.html'
    })
    expect(testbed.dom.node.tagName.toUpperCase())
      .to.equal('A')
  })

  describe('onClick', function () {
    it('should call onClick when clicked', function () {
      const onClick = testbed.sandbox.stub()

      testbed.render({
        onClick
      })

      testbed.dom.click()

      expect(onClick).to.have.been.called
    })

    it('should not call onClick when button is disabled', function () {
      const onClick = testbed.sandbox.stub()

      testbed.render({
        disabled: true,
        onClick
      })

      testbed.dom.click()

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is disabled and an href prop is provided', function () {
      const onClick = testbed.sandbox.stub()

      testbed.render({
        disabled: true,
        href: 'example.html',
        onClick
      })

      testbed.dom.click()

      expect(onClick).to.not.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })
    it('sets the aria-disabled attribute', function () {
      testbed.render({
        disabled: true,
        href: 'example.html'
      })

      expect(testbed.dom.node.getAttribute('aria-disabled'))
        .to.exist
    })
    describe('when disabled', function () {
      it('sets the aria-disabled attribute', function () {
        testbed.render({
          disabled: true
        })

        expect(testbed.dom.node.getAttribute('aria-disabled'))
          .to.exist
      })
      it('does not set the disabled attribute so that the button stays in tab order', function () {
        testbed.render({
          disabled: true
        })

        expect(testbed.dom.node.getAttribute('disabled'))
          .to.not.exist
      })
      it('sets the aria-disabled attribute when an href is provided', function () {
        testbed.render({
          disabled: true,
          href: 'example.html'
        })

        expect(testbed.dom.node.getAttribute('aria-disabled'))
          .to.exist
      })
    })
  })
})
