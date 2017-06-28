import React from 'react'
import ScreenReaderContent from '../index'

describe('<ScreenReaderContent />', () => {
  const testbed = new Testbed(<ScreenReaderContent />)

  it('should render the specified tag when `as` prop is set', () => {
    const subject = testbed.render({as: 'div'})

    expect(subject.tagName())
      .to.equal('DIV')
  })

  it('accepts props like normal', () => {
    const subject = testbed.render({hidden: 'true'})
    expect(subject.prop('hidden')).to.equal('true')
  })

  it('renders children components', () => {
    const childComponent = React.createElement('span')
    const subject = testbed.render({children: childComponent})
    expect(subject.find('span').length).to.equal(2)
  })

  it('is accessible by screen readers', () => {
    const subject = testbed.render()

    const {
      offsetHeight,
      opacity
    } = subject.getComputedStyle()

    expect(offsetHeight).to.not.equal(0)
    expect(opacity).to.not.equal(0)
  })
})
