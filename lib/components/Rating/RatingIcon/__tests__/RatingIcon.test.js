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

    expect(subject.find(Transition)).to.be.present
  })

  it('transitions when filled after render and animateFill is true', function () {
    const subject = testbed.render({
      filled: false,
      animateFill: true
    })

    expect(subject.find(Transition)).to.not.be.present

    subject.setProps({
      filled: true
    }, () => {
      expect(subject.find(Transition)).to.be.present
    })
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()
    subject.should.be.accessible(done)
  })
})
