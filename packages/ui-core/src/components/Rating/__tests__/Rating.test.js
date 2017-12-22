import React from 'react'
import IconStar from '@instructure/ui-icons/lib/Solid/IconStar'
import IconStarLight from '@instructure/ui-icons/lib/Solid/IconStarLight'
import Rating from '../index'
import RatingIcon from '../RatingIcon'

describe('<Rating />', () => {
  const testbed = new Testbed(
    <Rating label="Course rating" />
  )

  it('should have a title attribute', () => {
    const subject = testbed.render()
    expect(subject.getAttribute('title')).to.equal('Course rating')
  })

  it('should format screenreader text via formatValueText prop', () => {
    const subject = testbed.render({
      formatValueText: function (current, max) {
        return `${current} out of ${max}`
      },
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    expect(subject.getAttribute('aria-valuetext')).to.equal('4 out of 5')
  })

  it('should render the correct number of icons', () => {
    const subject = testbed.render({
      iconCount: 5
    })
    const svg = subject.find(IconStarLight)
    expect(svg.length).to.equal(5)
  })

  it('should handle a valueMax of zero', () => {
    const subject = testbed.render({
      valueMax: 0
    })
    const svg = subject.find(IconStarLight)
    expect(svg.length).to.equal(3)
  })

  it('transitions when animateFill is set', () => {
    const subject = testbed.render({
      iconCount: 5,
      animateFill: true,
      valueNow: 100,
      valueMax: 100
    })

    expect(subject.find(RatingIcon).at(4).props().animateFill).to.be.true
  })

  it('should fill the correct number of icons', () => {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    const svg = subject.find(IconStar)
    expect(svg.length).to.equal(4)
  })

  it('never renders more than `iconCount` icons', () => {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 110,
      valueMax: 100
    })
    const svg = subject.find(IconStar)
    expect(svg.length).to.equal(5)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()
    subject.should.be.accessible(done)
  })
})
