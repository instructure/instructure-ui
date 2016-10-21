import React from 'react'
import Tooltip from '../index'
import Heading from '../../Heading'

describe('<Tooltip />', () => {
  const testbed = createTestbed(
    <Tooltip tip={<Heading>Hello</Heading>} placement="right">
      Hover or focus me
    </Tooltip>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should have an anchor tag', () => {
    const subject = testbed.render()

    expect(subject.find('a').length).to.be.equal(1)
  })

  it('should have an aria-describedby attribute', () => {
    const subject = testbed.render()
    const aTag = subject.find('a').dom()

    expect(aTag.hasAttribute('aria-describedby')).to.be.true
  })

  it('should have href attribute', () => {
    const subject = testbed.render()
    const aTag = subject.find('a').dom()

    expect(aTag.hasAttribute('href')).to.be.true
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })
  })
})
