import ScopedStyle from '../ScopedStyle'

describe('<ScopedStyle />', function () {
  const testbed = createTestbed(ScopedStyle, {
    scope: '#foo',
    children: '.bar.baz { color: red }'
  })

  it('should render a style tag with the scoped attribute', function () {
    testbed.render()

    expect(testbed.dom.find('style[scoped]')).to.exist
  })

  it('should should polyfill scoped css when it is not supported', function () {
    testbed.render()
    const styleNode = testbed.dom.find('style[scoped]').node

    if (styleNode.scoped) {
      expect(styleNode.sheet.cssRules[0].cssText)
        .to.equal('.bar.baz { color: red; }')
    } else if (styleNode.sheet) {
      expect(styleNode.sheet.cssRules[0].cssText)
        .to.equal('#foo.bar.baz, #foo .bar.baz { color: red; }')
    }
  })
})
