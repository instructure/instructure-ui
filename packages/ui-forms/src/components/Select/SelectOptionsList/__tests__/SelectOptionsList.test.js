import React from 'react'
import SelectOptionsList from '../index'
import styles from '../styles.css'

describe('<SelectOptionsList />', () => {
  const testbed = new Testbed(
    <SelectOptionsList
      options={[
        {
          label: 'Alabama',
          value: '0',
          id: '0',
          children: 'Alabama'
        },
        {
          label: 'Alaska',
          value: '1',
          id: '1',
          children: 'Alaska'
        },
        {
          label: 'America',
          value: '2',
          id: '2',
          children: 'America'
        }
      ]}
    />
  )

  it('should render options', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
    expect(subject.find('li').length).to.equal(3)
  })

  it('should set selectedOption correctly', () => {
    const subject = testbed.render({
      selectedOption: {
        label: 'Alaska',
        value: '1',
        id: '1',
        children: 'Alaska'
      }
    })
    expect(subject.find(`.${styles.selected}`).text().trim()).to.equal('Alaska')
  })

  it('should set highlightedIndex correctly', () => {
    const subject = testbed.render({
      highlightedIndex: 2
    })
    expect(subject.find(`.${styles.highlighted}`).text().trim()).to.equal('America')
  })

  it('should call onSelect', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({ onSelect })

    subject.find('li').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should call onHighlightOption', () => {
    const onHighlightOption = testbed.stub()
    const subject = testbed.render({ onHighlightOption })

    subject.find('li').first().simulate('mouseEnter')
    expect(onHighlightOption).to.have.been.called
  })

  it('should call onStaticClick when static option is selected', () => {
    const onStaticClick = testbed.stub()
    const subject = testbed.render({
      options: [],
      emptyOption: 'no results',
      onStaticClick
    })

    const empty = subject.find('li')
    expect(empty.length).to.equal(1)
    expect(empty.text().trim()).to.equal('no results')

    empty.simulate('click')
    expect(onStaticClick).to.have.been.called
  })

  it('should not allow disabled options to be selected', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      options: [
        {
          label: 'Alabama',
          value: '0',
          id: '0',
          children: 'Alabama',
          disabled: true
        },
        {
          label: 'Alaska',
          value: '1',
          id: '1',
          children: 'Alaska'
        },
        {
          label: 'America',
          value: '2',
          id: '2',
          children: 'America'
        }
      ],
      onSelect
    })

    subject.find('li').first().simulate('click')
    expect(onSelect).to.not.have.been.called
  })
})
