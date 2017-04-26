import React from 'react'
import Pill from '../index'
import styles from '../styles.css'

describe('<Pill />', function () {
  const testbed = new Testbed(<Pill text="Overdue" />)

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should display text', function () {
    const subject = testbed.render()
    const textSpan = subject.find('span.' + styles.text)
    expect(textSpan.text()).to.equal('Overdue')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast'
      ]
    })
  })
})
