import React from 'react'
import Container from '../index'

describe('<Container />', function () {
  const testbed = new Testbed(
    <Container>
      <h1>Hello!</h1>
    </Container>
  )

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render children', function () {
    const subject = testbed.render()
    expect(subject.find('h1')).to.have.length(1)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
