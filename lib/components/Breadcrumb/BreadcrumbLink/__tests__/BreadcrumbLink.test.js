import React from 'react'
import BreadcrumbLink from '../index'
import Link from '../../../Link'
import IconArrowOpenRightSolid from 'instructure-icons/react/Solid/IconArrowOpenRightSolid'

import styles from '../styles.css'

describe('<BreadcrumbLink />', function () {
  const testbed = createTestbed(<BreadcrumbLink>Content</BreadcrumbLink>)

  it('should render out a Link component when given an href prop', function () {
    const subject = testbed.render({href: '#'})
    expect(subject.find(Link)).to.exist
  })

  it('should not render a Link component when not given an href prop', function () {
    const subject = testbed.render()
    expect(subject.find('.' + styles.text)).to.exist
  })

  it('should render out a IconArrowOpenRightSolid by default as a separator', function () {
    const subject = testbed.render()
    expect(subject.find(IconArrowOpenRightSolid)).to.exist
  })

  it('should not render a separator if showSeparator is false', function () {
    const subject = testbed.render({showSeparator: false})
    expect(subject.find(IconArrowOpenRightSolid).length).to.equal(0)
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
