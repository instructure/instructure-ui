import React from 'react'
import PresentationContent from '../index'

describe('<PresentationContent />', function () {
  const testbed = createTestbed(<PresentationContent />)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject.dom()).to.exist
  })

  it('should render aria-hidden flag', function () {
    const subject = testbed.render()

    expect(subject.find('span[aria-hidden]')).to.exist
  })

  it('should render the node tagName provided', function () {
    const subject = testbed.render({tagName: 'div'})

    expect(subject.find('div')).to.exist
  })

  it('should render children', function () {
    const subject = testbed.render({
      children: <div>Hello everybody</div>
    })

    expect(subject.find('div').text()).to.equal('Hello everybody')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
    })
  })
})

