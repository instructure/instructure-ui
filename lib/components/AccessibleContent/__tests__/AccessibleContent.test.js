import React from 'react'
import AccessibleContent from '../index'

import PresentationContent from '../../PresentationContent'
import ScreenReaderContent from '../../ScreenReaderContent'

describe('<AccessibleContent />', function () {
  const testbed = createTestbed(<AccessibleContent />)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject.dom()).to.exist
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

  it('should render a PresentationContent with the specified tagName', function () {
    const subject = testbed.render({
      children: 'Not screenreader text',
      tagName: 'div'
    })

    expect(subject.find(PresentationContent).find('div').text()).to.equal('Not screenreader text')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
    })
  })
})
