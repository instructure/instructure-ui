import React from 'react'
import Container from '../index'

describe('<Container />', () => {
  const testbed = new Testbed(
    <Container>
      <h1>Hello!</h1>
    </Container>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render children', () => {
    const subject = testbed.render()
    expect(subject.find('h1')).to.have.length(1)
  })

  it('accepts x-small size prop type', () => {
    const subject = testbed.render({ size: 'x-small' })
    expect(subject.prop('size')).to.eq('x-small')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
