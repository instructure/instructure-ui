import ScreenReaderContent from '../index'
import React from 'react'

describe('<ScreenReaderContent />', function () {
  const testbed = createTestbed(ScreenReaderContent)

  it('renders custom tags', function () {
    testbed.render({tag: 'span'})

    expect(testbed.dom.find('span').node).to.exist
  })

  it('accepts props like normal', function () {
    testbed.render({customProp: 'myProp'})
    expect(testbed.subject.props.customProp).to.equal('myProp')
  })

  it('renders children components', function () {
    const childComponent = React.createElement('span')
    testbed.render({children: childComponent})
    expect(testbed.dom.find('span').nodes).to.exist
  })

  it('is accessible by screen readers', function () {
    testbed.render()

    const style = getComputedStyle(testbed.dom.node)
    const {
      offsetHeight,
      opacity
    } = style

    expect(offsetHeight).to.not.equal(0)
    expect(opacity).to.not.equal(0)
  })
})
