import React from 'react'
import FormFieldLabel from '../index'
import styles from '../styles.css'
import ScreenReaderContent from '../../../ScreenReaderContent'

describe('<FormFieldLabel />', function () {
  const testbed = new Testbed(<FormFieldLabel>Foo</FormFieldLabel>)

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should not apply margins when label is screen reader only', function () {
    const subject = testbed.render({
      children: <ScreenReaderContent>Foo</ScreenReaderContent>
    })

    expect(subject.hasClass(styles.marginBottom)).to.be.false
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
