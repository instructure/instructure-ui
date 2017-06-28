import React from 'react'
import ContextBox from '../index'

import styles from '../styles.css'

describe('<ContextBox />', () => {
  const testbed = new Testbed(<ContextBox>foo</ContextBox>)

  it('should render the children', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('foo')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  describe('with the default props', () => {
    it('should render above the trigger element', () => {
      const subject = testbed.render({
        placement: 'top'
      })

      expect(subject.hasClass(styles['positioned--top']))
        .to.be.true
    })

    it('should render with an arrow', () => {
      const subject = testbed.render()

      expect(subject.hasClass(styles['with-arrow']))
        .to.be.true
    })
  })

  describe('when the arrow is disabled', () => {
    it('should not display the arrow', () => {
      const subject = testbed.render({
        withArrow: false
      })

      expect(subject.hasClass(styles.withArrow))
        .to.be.false
    })
  })

  describe('when a placement is provided', () => {
    const placement = 'bottom'

    it('should display in that position', () => {
      const subject = testbed.render({
        placement
      })

      expect(subject.hasClass(styles['positioned--' + placement]))
        .to.be.true
    })
  })
})
