import React from 'react'
import Table from '../index'

describe('<Table />', function () {
  const testbed = createTestbed(<Table caption="Test table" />)

  it('should render a caption', function () {
    const subject = testbed.render({
      caption: 'An amazing test table'
    })
    expect(subject.find('caption').text()).to.equal('An amazing test table')
  })

  it('should render table headers and data', function () {
    const subject = testbed.render({
      colHeaders: ['Band', 'Best Album', 'Best Song', 'Record Label'],
      rowHeaders: true,
      tableData: [
        {
          band: 'Tame Impala',
          bestAlbum: 'Lonerism',
          bestSong: 'Seems Like We Only Go Backwards',
          recordLabel: 'Modular'
        }
      ]
    })
    expect(subject.find('th').length).to.equal(5)
    expect(subject.find('td').length).to.equal(3)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
