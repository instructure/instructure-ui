import React from 'react'
import Grid, { GridRow, GridCol } from '../index'

describe('<Grid />', function () {
  const testbed = createTestbed(
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
})
