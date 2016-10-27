import React from 'react'
import Media from '../index'
import placeholderImage from 'mocks/util/placeholder-image'

import Image from '../../Image'

describe('<Media />', function () {
  const testbed = createTestbed(<Media><Image src={placeholderImage(250, 250)} /></Media>)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [ ]
    })
  })
})
