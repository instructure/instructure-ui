import React from 'react'
import PresentationContent from '../index'

describe('<PresentationContent />', () => {
  const testbed = new Testbed(<PresentationContent />)

  /* example test (replace me) */
  it('should render', () => {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should render aria-hidden flag', () => {
    const subject = testbed.render()

    expect(subject.find('span[aria-hidden]')).to.exist
  })

  it('should render the specified tag when `as` prop is set', () => {
    const subject = testbed.render({as: 'div'})

    expect(subject.tagName())
      .to.equal('DIV')
  })

  it('should render children', () => {
    const subject = testbed.render({
      children: <div>Hello everybody</div>
    })

    expect(subject.find('div').text()).to.equal('Hello everybody')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
    })
  })
})
