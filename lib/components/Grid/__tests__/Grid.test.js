import React from 'react'
import Grid, { GridRow, GridCol } from '../index'

describe('<Grid />', function () {
  const testbed = new Testbed(
    <Grid>
      <GridRow>
        <GridCol>
          Foo
        </GridCol>
        <GridCol>
          Bar
        </GridCol>
        <GridCol>
          Baz
        </GridCol>
      </GridRow>
    </Grid>
  )

  it('should render content in each column', function () {
    const subject = testbed.render()

    expect(subject.text()).to.equal('FooBarBaz')
  })

  it('should pass aria and role attributes to underlying DOM elements', function () {
    const children = (
      <GridRow aria-live="polite" role="presentation">
        <GridCol aria-disabled="true" role="presentation">
          Foo
        </GridCol>
      </GridRow>
    )

    const subject = testbed.render({
      role: 'grid',
      'aria-hidden': true,
      children
    })

    expect(subject.find('span[role="grid"][aria-hidden]')).to.be.present
    expect(subject.find('span[role="presentation"][aria-live="polite"]')).to.be.present
    expect(subject.find('span[role="presentation"][aria-disabled]')).to.be.present
  })
})
