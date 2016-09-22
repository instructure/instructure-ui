import React from 'react'
import ToggleDetails from '../index'

const TOGGLE = 'button'
const CONTENT = '[id]'

describe('<ToggleDetails />', function () {
  const testbed = createTestbed(
    <ToggleDetails summary="Click me">Content</ToggleDetails>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject.dom()).to.exist
  })

  it('should hide its content', () => {
    const subject = testbed.render()

    expect(subject.text()).not.to.contain('Content')
  })

  it('should have an aria-controls attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE).dom()
    const content = subject.find(CONTENT).dom()

    expect(toggle.getAttribute('aria-controls')).to
      .equal(content.getAttribute('id'))
  })

  it('should have an aria-expanded attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE).dom()

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should toggle on click events', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    toggle.trigger('click')

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
  })

  it('should be initialized by isExpanded prop', () => {
    const subject = testbed.render({isExpanded: true})
    const toggle = subject.find(TOGGLE).dom()

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
    expect(subject.text()).to.contain('Content')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
