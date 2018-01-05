import React from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'
import Tag from '../index'
import styles from '../styles.css'

describe('<Tag />', () => {
  const testbed = new Testbed(<Tag text="Summer" />)

  it('should display text', () => {
    const tag = testbed.render()
    const textSpan = tag.find(`span.${styles.text}`)
    expect(textSpan.text()).to.equal('Summer')
  })

  it('should render as a button and respond to onClick event', () => {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick})
    tag.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should render a close icon when it is dismissible and clickable', () => {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick, dismissible: true})
    const svg = tag.find(IconX)
    expect(svg.length).to.equal(1)
  })

  it('should not allow padding to be added as a propery', () => {
    const subject = testbed.render({
      padding: 'small medium large small'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
