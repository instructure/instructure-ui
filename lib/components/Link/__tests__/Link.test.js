import Link from '../index'

describe('<Link />', function () {
  const testbed = createTestbed(Link, {
    children: 'Hello World'
  })

  it('should render the children as text content', function () {
    testbed.render()

    expect(testbed.getText())
      .to.equal('Hello World')
  })

  it('should render a button', function () {
    testbed.render()
    expect(testbed.dom.node.tagName.toUpperCase())
      .to.equal('BUTTON')
  })

  it('should meet a11y standards', function (done) {
    testbed.render()

    testbed.checkA11yStandards(done)
  })

  describe('when an href is provided', function () {
    it('should render an anchor element', function () {
      testbed.render({
        href: 'http://instructure.com'
      })
      expect(testbed.dom.node.tagName.toUpperCase())
        .to.equal('A')
    })

    it('should set the href attribute', function () {
      testbed.render({
        href: 'http://instructure.com'
      })
      expect(testbed.dom.node.getAttribute('href'))
        .to.equal('http://instructure.com')
    })
  })
})
