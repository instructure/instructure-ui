import ScreenReaderContent from '../index'
import React from 'react'

describe('<ScreenReaderContent />', function () {
  const testbed = new Testbed(<ScreenReaderContent />)

  it('renders custom tags', function () {
    const subject = testbed.render({tag: 'div'})

    expect(subject.find('div')).to.be.present
  })

  it('accepts props like normal', function () {
    const subject = testbed.render({hidden: 'true'})
    expect(subject.props('hidden')).to.equal('true')
  })

  it('renders children components', function () {
    const childComponent = React.createElement('span')
    const subject = testbed.render({children: childComponent})
    expect(subject.find('span').length).to.equal(2)
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
