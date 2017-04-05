import React from 'react'
import Image from '../index'
import styles from '../styles.css'

describe('<Image />', function () {
  const testbed = new Testbed(<Image src={Testbed.testImage} />)

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should render an empty alt attribute by default', function () {
      const subject = testbed.render()

      expect(subject.find('[alt=""]')).to.be.present
    })

    it('should render the provided alt attribute', function () {
      const subject = testbed.render({ alt: 'Foo' })

      expect(subject.find('[alt="Foo"]')).to.be.present
    })

    it('should render an overlay color', function () {
      const subject = testbed.render({
        overlay: {color: '#ff0000', opacity: 7}
      })
      const overlay = subject.find('.' + styles.overlay)
      expect(overlay).to.be.present
    })

    it('should render a blur filter', function () {
      const subject = testbed.render({
        blur: true
      })
      expect(subject.getComputedStyle().getPropertyValue('filter')).to.contain('blur')
    })

    it('should render a grayscale filter', function () {
      const subject = testbed.render({
        grayscale: true
      })
      expect(subject.getComputedStyle().getPropertyValue('filter')).to.contain('grayscale')
    })
  })
})
