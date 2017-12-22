import React from 'react'

import IconArrowOpenRight from '@instructure/ui-icons/lib/Solid/IconArrowOpenRight'

import Breadcrumb from '../index'
import BreadcrumbLink from '../BreadcrumbLink'

describe('<Breadcrumb />', () => {
  const testbed = new Testbed(
    <Breadcrumb label="This is a test">
      <BreadcrumbLink href="http://fakeurl.com">English 204</BreadcrumbLink>
      <BreadcrumbLink>Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
  )

  it('should render the label as an aria-label attribute', () => {
    const subject = testbed.render({label: 'This is a test'})
    expect(subject.find('ol[aria-label]').getAttribute('aria-label')).to.equal('This is a test')
  })

  it('should render IconArrowOpenRightSolid by default as a separator', () => {
    const subject = testbed.render()
    expect(subject.find(IconArrowOpenRight)).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })
})
