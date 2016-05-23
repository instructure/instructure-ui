import React from 'react'
import Image from '../index'
import placeholderImage from 'mocks/util/placeholder-image'

describe('<Image />', function () {
  const testbed = createTestbed(<Image src={placeholderImage(250, 250)} />)

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should render an empty alt attribute by default', function () {
      const subject = testbed.render()

      expect(subject.find('[alt=""]')).to.exist
    })

    it('should render the provided alt attribute', function () {
      const subject = testbed.render({ alt: 'Foo' })

      expect(subject.find('[alt="Foo"]')).to.exist
    })
  })
})
