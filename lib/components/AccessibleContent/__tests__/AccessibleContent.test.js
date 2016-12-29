import React from 'react'
import AccessibleContent from '../index'

import PresentationContent from '../../PresentationContent'
import ScreenReaderContent from '../../ScreenReaderContent'

describe('<AccessibleContent />', function () {
  const testbed = new Testbed(<AccessibleContent />)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should render a ScreenReaderContent', function () {
    const subject = testbed.render({
      alt: 'Screenreader text'
    })

    expect(subject.find(ScreenReaderContent).text()).to.equal('Screenreader text')
  })

  it('should render a PresentationContent', function () {
    const subject = testbed.render({
      children: 'Not screenreader text'
    })

    expect(subject.find(PresentationContent).find('span').text()).to.equal('Not screenreader text')
  })

  it('should render with the specified tag when `as` prop is set', function () {
    const subject = testbed.render({
      as: 'div'
    })

    expect(subject.tagName())
      .to.equal('DIV')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
    })
  })
})
