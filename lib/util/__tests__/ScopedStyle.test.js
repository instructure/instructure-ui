import React from 'react'
import ScopedStyle from '../ScopedStyle'

describe('<ScopedStyle />', function () {
  const testbed = createTestbed(
    <ScopedStyle scope="#foo" />
  )

  it('should render a style tag with the scoped attribute', function () {
    const subject = testbed.render({
      children: '.bar.baz { color: red }'
    })

    expect(subject.find('style[scoped]').length).to.equal(1)
  })

  it('should should polyfill scoped css when it is not supported', function () {
    const subject = testbed.render({
      children: '.bar.baz { color: red }'
    })
    const styleNode = subject.find('style[scoped]').dom()

    if (styleNode.scoped) {
      expect(styleNode.sheet.cssRules[0].cssText)
        .to.equal('.bar.baz { color: red; }')
    } else if (styleNode.sheet) {
      expect(styleNode.sheet.cssRules[0].cssText)
        .to.equal('#foo.bar.baz, #foo .bar.baz { color: red; }')
    }
  })
})
