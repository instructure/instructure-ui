import ScreenReaderContent from '../index'
import React from 'react'

describe('<ScreenReaderContent />', function () {
  const testbed = createTestbed(<ScreenReaderContent />)

  it('renders custom tags', function () {
    const subject = testbed.render({tag: 'span'})

    expect(subject.find('span').dom()).to.exist
  })

  it('accepts props like normal', function () {
    const subject = testbed.render({customProp: 'myProp'})
    expect(subject.props('customProp')).to.equal('myProp')
  })

  it('renders children components', function () {
    const childComponent = React.createElement('span')
    const subject = testbed.render({children: childComponent})
    expect(subject.find('span').length).to.equal(1)
  })

  it('is accessible by screen readers', function () {
    const subject = testbed.render()

    const style = getComputedStyle(subject.dom())
    const {
      offsetHeight,
      opacity
    } = style

    expect(offsetHeight).to.not.equal(0)
    expect(opacity).to.not.equal(0)
  })
})
