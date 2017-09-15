import React from 'react'
import Pill from '../index'
import styles from '../styles.css'
import Container from '../../Container'

describe('<Pill />', () => {
  const testbed = new Testbed(<Pill text="Overdue" />)

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should display text', () => {
    const subject = testbed.render()
    const textSpan = subject.find(`span.${styles.text}`)
    expect(textSpan.text()).to.equal('Overdue')
  })

  it('should not allow padding to be added as a property', () => {
    const subject = testbed.render({
      padding: 'small medium large large'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast'
      ]
    })
  })
})
