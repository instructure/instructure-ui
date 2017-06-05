import React from 'react'
import BreadcrumbLink from '../index'
import Link from '../../../Link'

import styles from '../styles.css'

describe('<BreadcrumbLink />', function () {
  const testbed = new Testbed(<BreadcrumbLink>Content</BreadcrumbLink>)

  it('should render a Link component when given an href prop', function () {
    const subject = testbed.render({href: '#'})
    expect(subject.find(Link)).to.be.present
  })

  it('should render as a button and respond to onClick event', function () {
    const onClick = testbed.stub()
    const subject = testbed.render({onClick})
    subject.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should not render a Link component when not given an href prop', function () {
    const subject = testbed.render()
    expect(subject.find('.' + styles.text)).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })
})
