import React from 'react'
import ContextBox from '../index'

import styles from '../styles.css'

describe('<ContextBox />', function () {
  const testbed = new Testbed(<ContextBox>foo</ContextBox>)

  it('should render the children', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('foo')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  describe('with the default props', function () {
    it('should render above the trigger element', function () {
      const subject = testbed.render()

      expect(subject.hasClass(styles['positioned--top']))
        .to.be.true
    })

    it('should render with an arrow', function () {
      const subject = testbed.render()

      expect(subject.hasClass(styles['with-arrow']))
        .to.be.true
    })
  })

  describe('when the arrow is disabled', function () {
    it('should not display the arrow', function () {
      const subject = testbed.render({
        withArrow: false
      })

      expect(subject.hasClass(styles.withArrow))
        .to.be.false
    })
  })

  describe('when a placement is provided', function () {
    const placement = 'bottom'

    it('should display in that position', function () {
      const subject = testbed.render({
        placement
      })

      expect(subject.hasClass(styles['positioned--' + placement]))
        .to.be.true
    })
  })
})
