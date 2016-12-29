import React from 'react'
import Media from '../index'

import Image from '../../Image'

describe('<Media />', function () {
  const testbed = new Testbed(
    <Media
      title="Hello World"
      description="Test Image"
    >
      <Image src={Testbed.testImage} />
    </Media>
  )

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
