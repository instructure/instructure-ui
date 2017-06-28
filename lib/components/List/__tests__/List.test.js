import React from 'react'
import List from '../index'
import ListItem from '../ListItem'

describe('<List />', () => {
  const testbed = new Testbed(
    <List>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
      <ListItem>List item 4</ListItem>
    </List>
  )

  it('should render list items', () => {
    const subject = testbed.render()
    expect(subject.find('li').length).to.equal(4)
  })

  it('should render an ordered list', () => {
    const subject = testbed.render({as: 'ol'})
    expect(subject.find('ol').length).to.equal(1)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
