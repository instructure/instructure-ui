import React from 'react'
import Rating from '../index'
import Transition from '../../Transition'

import IconStarSolid from 'instructure-icons/lib/Solid/IconStarSolid'
import IconStarLightSolid from 'instructure-icons/lib/Solid/IconStarLightSolid'

describe('<Rating />', function () {
  const testbed = new Testbed(
    <Rating label="Course rating" />
  )

  it('should have a title attribute', function () {
    const subject = testbed.render()
    expect(subject.getAttribute('title')).to.equal('Course rating')
  })

  it('should format screenreader text via formatValueText prop', function () {
    const subject = testbed.render({
      formatValueText: function (current, max) {
        return current + ' out of ' + max
      },
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    expect(subject.getAttribute('aria-valuetext')).to.equal('4 out of 5')
  })

  it('should render the correct number of icons', function () {
    const subject = testbed.render({
      iconCount: 5
    })
    const svg = subject.find(IconStarLightSolid)
    expect(svg.length).to.equal(5)
  })

  it('should handle a valueMax of zero', function () {
    const subject = testbed.render({
      valueMax: 0
    })
    const svg = subject.find(IconStarLightSolid)
    expect(svg.length).to.equal(3)
  })

  it('transitions when animateFill is set', function () {
    const subject = testbed.render({
      animateFill: true
    })

    expect(subject.find(Transition)).to.be.present
  })

  it('should fill the correct number of icons', function () {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    const svg = subject.find(IconStarSolid)
    expect(svg.length).to.equal(4)
  })

  it('never renders more than `iconCount` icons', function () {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 110,
      valueMax: 100
    })
    const svg = subject.find(IconStarSolid)
    expect(svg.length).to.equal(5)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()
    subject.should.be.accessible(done)
  })
})
