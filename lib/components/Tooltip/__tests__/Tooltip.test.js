import React from 'react'
import Tooltip from '../index'
import Heading from '../../Heading'

describe('<Tooltip />', () => {
  const testbed = new Testbed(
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
    const attr = subject.find('a').getAttribute('aria-describedby')

    expect(attr).to.exist
  })

  it('should have href attribute', () => {
    const subject = testbed.render()
    const attr = subject.find('a').getAttribute('href')

    expect(attr).to.exist
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
