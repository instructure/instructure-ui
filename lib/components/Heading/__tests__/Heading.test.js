import Heading from '../index'

describe('Heading', function () {
  const testbed = createTestbed(Heading, {
    children: 'Hello World'
  })

  it('should render as an H2 element', function () {
    testbed.render()

    expect(testbed.dom.node.tagName.toUpperCase())
      .to.equal('H2')
  })

  it('should render the children as text content', function () {
    testbed.render()

    expect(testbed.dom.node.textContent.trim())
      .to.equal('Hello World')
  })

  it('should meet a11y standards', function (done) {
    testbed.render()

    testbed.checkA11yStandards(done)
  })
})
