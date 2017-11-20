/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'
import Timebar from '../index'

import styles from '../styles.css'

describe('<Timebar />', () => {
  const videoId = 'uuid-123'
  const testbed = new Testbed(<Timebar videoId={videoId} duration={100} />)

  it('should render', () => {
    expect(testbed.render()).to.be.present
  })

  it('includes correct aria attributes', () => {
    const timebar = testbed.render({
      duration: 100,
      currentTime: 30
    }).find(`.${styles.container}`)

    expect(timebar.prop('role')).to.eql('slider')
    expect(timebar.prop('aria-valuemin')).to.eql(0)
    expect(timebar.prop('aria-valuemax')).to.eql(100)
    expect(timebar.prop('aria-valuenow')).to.eql(30)
    expect(timebar.prop('aria-valuetext')).to.eql('00:30')
    expect(timebar.prop('aria-controls')).to.eql(videoId)
  })

  it('renders the view progress and buffered progress', () => {
    const timebar = testbed.render({ currentTime: 20, buffered: 50 })
    const viewed = timebar.find(`.${styles.viewed}`)
    const buffered = timebar.find(`.${styles.buffered}`)

    expect(viewed.prop('style').flexBasis).to.eql('20%')
    expect(buffered.prop('style').flexBasis).to.eql('30%')
  })

  it('invokes timebarRef on mount', () => {
    const timebarRef = testbed.stub()
    testbed.render({ timebarRef })
    expect(timebarRef).to.have.been.called
  })

  describe('moving the mouse around on the timebar', () => {
    const mouseEvent = (coord) => {
      const timebarElement = {
        // Left position (in pixels) of the timebar container
        getBoundingClientRect: testbed.stub(),
        // Actual width of the timebar in pixels
        offsetWidth: 100
      }

      timebarElement.getBoundingClientRect.returns({ left: 10 })

      return {
        // x coordinate of the pointer
        pageX: coord,
        currentTarget: timebarElement
      }
    }

    it('hides the tooltip when mouse leaves the timebar', () => {
      const timebar = testbed.render()
      const tooltip = timebar.find(`.${styles.tooltipContainer}`)
      timebar.find(`.${styles.container}`).prop('onMouseMove')(mouseEvent(50))
      timebar.update()
      expect(tooltip.hasClass(styles.hidden)).to.eql(false)
      timebar.simulate('mouseLeave')
      expect(tooltip.hasClass(styles.hidden)).to.eql(true)
    })

    context('when x coordinate is within the timebar', () => {
      it('shows the tooltip with the correct timestamp', () => {
        const timebar = testbed.render()
        const tooltip = timebar.find(`.${styles.tooltipContainer}`)

        expect(tooltip.hasClass(styles.hidden)).to.eql(true)
        // It is not possible to replace the currentTarget on
        // events for mounted components, so we must invoke the
        // method on the instance, and then manually update.
        // https://github.com/airbnb/enzyme/issues/218
        timebar.find(`.${styles.container}`).prop('onMouseMove')(mouseEvent(50))
        timebar.update()
        expect(tooltip.hasClass(styles.hidden)).to.eql(false)
        // 100 - 60
        expect(tooltip.text()).to.eql('00:40')
        timebar.find(`.${styles.container}`).prop('onMouseMove')(mouseEvent(90))
        timebar.update()
        // 100 - 20
        expect(tooltip.text()).to.eql('01:20')
      })

      it('positions the tooltip in the correct place on the timebar', () => {
        const timebar = testbed.render()
        const tooltip = timebar.find(`.${styles.tooltipContainer}`)
        timebar.instance().tooltip = { offsetWidth: 20 }
        timebar.find(`.${styles.container}`).prop('onMouseMove')(mouseEvent(50))
        timebar.update()
        // 100 - 60 - 10
        expect(tooltip.prop('style').left).to.eql('30px')
      })
    })

    context('when x coordinate is outside of the timebar', () => {
      it('does not display the tooltip', () => {
        const timebar = testbed.render()
        const tooltip = timebar.find(`.${styles.tooltipContainer}`)
        timebar.find(`.${styles.container}`).prop('onMouseMove')(mouseEvent(9))
        timebar.update()
        expect(tooltip.hasClass(styles.hidden)).to.eql(true)
        timebar.find(`.${styles.container}`).prop('onMouseMove')(mouseEvent(111))
        timebar.update()
        expect(tooltip.hasClass(styles.hidden)).to.eql(true)
      })
    })
  })

  describe('clicking on the timebar', () => {
    it('invokes onClick prop with time at current coordinate', () => {
      const onClick = testbed.stub()
      const timebar = testbed.render({ onClick })
      timebar.setState({ hoverTime: 33 })

      timebar.simulate('click')
      expect(onClick).to.have.been.calledWith(33)
    })
  })
})
