/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'
import SelectOptionsList from '../index'
import styles from '../styles.css'

describe('<SelectOptionsList />', () => {
  const testbed = new Testbed(
    <SelectOptionsList
      expanded
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
    expect(subject).to.be.present()
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
    expect(onSelect).to.have.been.called()
  })

  it('should call onHighlightOption', () => {
    const onHighlightOption = testbed.stub()
    const subject = testbed.render({ onHighlightOption })

    subject.find('li').first().simulate('mouseEnter')
    expect(onHighlightOption).to.have.been.called()
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
    expect(onStaticClick).to.have.been.called()
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
    expect(onSelect).to.not.have.been.called()
  })
})
