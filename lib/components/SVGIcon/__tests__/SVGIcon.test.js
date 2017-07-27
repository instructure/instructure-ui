import React from 'react'
import SVGIcon from '../index'

describe('<SVGIcon />', () => {
  const testbed = new Testbed(<SVGIcon />)

  it('should render', () => {
    const subject = testbed.render({
      src: `<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`
    })

    expect(subject.containsMatchingElement(<path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" />))
  })

  it('should set rotate to 0 by default', () => {
    const subject = testbed.render()

    expect(subject.props().rotate).to.equal('0')
  })

  it('should allow rotate prop to be overridden', () => {
    const subject = testbed.render({
      rotate: '90'
    })

    expect(subject.props().rotate).to.equal('90')
  })

  it('should set custom width and height properly', () => {
    const subject = testbed.render({
      width: '2.75em',
      height: '3.8em'
    })

    expect(subject.props().width).to.equal('2.75em')
    expect(subject.props().height).to.equal('3.8em')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */
      ]
    })
  })
})
