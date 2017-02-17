import React from 'react'
import Popover, { PopoverTrigger, PopoverContent } from '../index'
import Button from '../../Button'
import Heading from '../../Heading'

describe('<Popover />', function () {
  const testbed = new Testbed(
    <Popover on="click">
      <PopoverTrigger>
        <Button>Click Me</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Heading>Foo Bar Baz</Heading>
      </PopoverContent>
    </Popover>
  )

  function testShowContent (on, eventType) {
    it(`should show content on ${on}`, function (done) {
      // If on is hover, also add focus to avoid invariant
      const onValue = [on, on === 'hover' ? 'focus' : undefined]
      const subject = testbed.render({ on: onValue })
      const button = subject.find(Button)
      testbed.sandbox.clock.restore()

      button.simulate(eventType)

      setTimeout(() => {
        const content = document.querySelector('[data-position-component]')

        expect(content).to.not.be.null
        done()
      }, 0)
    })
  }

  function testEventHandler (handler, ...eventType) {
    it(`should fire ${handler} handler`, function () {
      const spy = testbed.sandbox.spy()
      const subject = testbed.render({ [handler]: spy })
      const button = subject.find(Button)

      eventType.forEach((type) => {
        button.simulate(type)
      })

      expect(spy).to.have.been.called
    })
  }

  it('should not show content by default', function (done) {
    const subject = testbed.render()
    testbed.sandbox.clock.restore()

    setTimeout(() => {
      const button = subject.find(Button)
      const content = document.querySelector('[data-position-component]')

      expect(button.length).to.equal(1)
      expect(content).to.be.null
      done()
    }, 0)
  })

  it('should provide content ref', function (done) {
    let content = null

    testbed.render({
      show: true,
      onToggle: () => {},
      contentRef: (el) => {
        content = el
      }
    })
    testbed.sandbox.clock.restore()

    setTimeout(() => {
      expect(content).to.not.be.null
      done()
    }, 0)
  })

  testShowContent('click', 'click')
  testShowContent('focus', 'focus')
  testShowContent('hover', 'mouseOver')

  testEventHandler('onClick', 'click')
  testEventHandler('onFocus', 'focus')
  testEventHandler('onBlur', 'focus', 'blur')

  it('should close when clicked outside content by default', function (done) {
    const subject = testbed.render()
    const button = subject.find(Button)
    testbed.sandbox.clock.restore()

    button.simulate('click')

    setTimeout(() => {
      document.body.click()

      setTimeout(() => {
        const content = document.querySelector('[data-position-component]')

        expect(content).to.be.null
        done()
      }, 0)
    }, 0)
  })

  it('should close when trigger is clicked', function (done) {
    const subject = testbed.render()
    const button = subject.find(Button)
    testbed.sandbox.clock.restore()

    button.simulate('click')

    setTimeout(() => {
      button.simulate('click')

      setTimeout(() => {
        const content = document.querySelector('[data-position-component]')

        expect(content).to.be.null
        done()
      }, 0)
    }, 0)
  })

  describe('controlled', function () {
    it('should show content if defaultShow is true', function (done) {
      testbed.render({defaultShow: true})
      testbed.sandbox.clock.restore()

      setTimeout(() => {
        const content = document.querySelector('[data-position-component]')

        expect(content).to.not.be.null
        done()
      }, 0)
    })

    it('should support show prop', function (done) {
      const onToggle = testbed.sandbox.spy()
      const subject = testbed.render({ show: false, onToggle })

      subject.setProps({'show': true}, () => {
        testbed.sandbox.clock.restore()
        setTimeout(() => {
          const content = document.querySelector('[data-position-component]')

          expect(content).to.not.be.null
          done()
        }, 0)
      })
    })

    it('should call onToggle', function () {
      const onToggle = testbed.sandbox.spy()
      const subject = testbed.render({ show: false, onToggle })
      const button = subject.find(Button)

      button.simulate('click')

      expect(onToggle).to.have.been.calledWith(true)
    })

    it('should not show content on click', function (done) {
      const onToggle = testbed.sandbox.spy()
      const subject = testbed.render({ show: false, onToggle })
      const button = subject.find(Button)
      testbed.sandbox.clock.restore()

      button.simulate('click')

      setTimeout(() => {
        const content = document.querySelector('[data-position-component]')

        expect(content).to.be.null
        done()
      }, 0)
    })
  })
})
