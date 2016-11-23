import React from 'react'
import Image from '../index'

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
  })
})
