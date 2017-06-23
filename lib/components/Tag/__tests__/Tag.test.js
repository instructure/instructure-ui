import React from 'react'
import Tag from '../index'
import styles from '../styles.css'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

describe('<Tag />', function () {
  const testbed = new Testbed(<Tag text="Summer" />)

  it('should display text', function () {
    const tag = testbed.render()
    const textSpan = tag.find('span.' + styles.text)
    expect(textSpan.text()).to.equal('Summer')
  })

  it('should render as a button and respond to onClick event', function () {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick})
    tag.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should render a close icon when it is dismissible and clickable', function () {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick, isDismissable: true})
    const svg = tag.find(IconXSolid)
    expect(svg.length).to.equal(1)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
