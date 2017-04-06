import React from 'react'
import RatingIcon from '../index'
import Transition from '../../../Transition'

describe('<RatingIcon />', function () {
  const testbed = new Testbed(
    <RatingIcon />
  )

  it('transitions when filled on render and animateFill is true', function () {
    const subject = testbed.render({
      filled: true,
      animateFill: true
    })

    testbed.tick() // delay
    testbed.raf()

    expect(subject.find(Transition)).to.be.present
  })

  it('transitions when filled after render and animateFill is true', function (done) {
    const subject = testbed.render({
      filled: false,
      animateFill: true
    })

    expect(subject.find(Transition).length).to.equal(0)

    subject.setProps({
      filled: true
    }, () => {
      testbed.defer(() => { // update state
        testbed.raf()
        expect(subject.find(Transition)).to.be.present
        done()
      })
    })
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()
    subject.should.be.accessible(done)
  })
})
