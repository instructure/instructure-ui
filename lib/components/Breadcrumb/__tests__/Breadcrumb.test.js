import React from 'react'
import Breadcrumb from '../index'
import BreadcrumbLink from '../BreadcrumbLink'

describe('<Breadcrumb />', function () {
  const testbed = new Testbed(
    <Breadcrumb label="This is a test">
      <BreadcrumbLink href="http://fakeurl.com">English 204</BreadcrumbLink>
      <BreadcrumbLink href="http://fakeurl.com">Exploring John Updike</BreadcrumbLink>
      <BreadcrumbLink href="http://fakeurl.com">The Rabbit Novels</BreadcrumbLink>
      <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
  )

  it('should render the label as an aria-label attribute', function () {
    const subject = testbed.render({label: 'This is a test'})
    expect(subject.find('ol[aria-label]').getAttribute('aria-label')).to.equal('This is a test')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })
})
