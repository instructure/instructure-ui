import React from 'react'
import ToggleDetails from '../index'
import styles from '../styles.css'

const TOGGLE = 'button'
const CONTENT = '[id]'

describe('<ToggleDetails />', function () {
  const testbed = new Testbed(
    <ToggleDetails summary="Click me">Content</ToggleDetails>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should hide its content', () => {
    const subject = testbed.render()

    expect(subject.text()).not.to.contain('Content')
  })

  it('should place the icon after the summary when prop is set', () => {
    const subject = testbed.render({
      iconPosition: 'end'
    })
    const summary = subject.find(`.${styles.summary}`)
    expect(summary.childAt(0).text()).to.contain('Click me')
  })

  it('should have an aria-controls attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)
    const content = subject.find(CONTENT)

    expect(toggle.getAttribute('aria-controls')).to
      .equal(content.getAttribute('id'))
  })

  it('should have an aria-expanded attribute', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should toggle on click events', () => {
    const subject = testbed.render()
    const toggle = subject.find(TOGGLE)

    toggle.simulate('click')

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
  })

  it('should be initialized by expanded prop', () => {
    const subject = testbed.render({expanded: true})
    const toggle = subject.find(TOGGLE)

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
