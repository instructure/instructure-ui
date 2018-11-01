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
import PropTypes from 'prop-types'
import { expect, mount, wait } from '@instructure/ui-test-utils'
import containerQuery from '../containerQuery'

const query = {
  width_between_251_and_300: { minWidth: '15.6875rem', maxWidth: '300px' },
  width_less_than_200: { maxWidth: 200 },
  width_less_than_2em: { maxWidth: '2em' }
}

@containerQuery(query)
class ContainerComponent extends React.Component {
  static propTypes = {
    width: PropTypes.string
  }
  static defaultProps = {
    width: 'auto'
  }
  render () {
    const style = {
      width: this.props.width,
      backgroundColor: 'yellow'
    }
    return <div style={style}>Hello World</div>
  }
}

describe('@containerQuery', () => {
  it('adds attributes to the container element based on its dimensions and the query', async () => {
    const subject = await mount(<ContainerComponent />)

    expect(subject.getDOMNode().getAttribute('data-width_less_than_200')).to.not.exist()

    subject.setProps({
      width: '100px'
    })

    await wait(() => {
      expect(subject.getDOMNode().getAttribute('data-width_less_than_200')).to.exist()
    })
  })

  it('converts rem units in the query to pixels', async () => {
    const subject = await mount(<ContainerComponent />)

    expect(subject.getDOMNode().getAttribute('data-width_between_251_and_300')).to.not.exist()

    subject.setProps({
      width: '275px'
    })

    await wait(() => {
      expect(subject.getDOMNode().getAttribute('data-width_between_251_and_300')).to.exist()
    })
  })

  it('converts em units in the query to pixels', async () => {
    const subject = await mount(<ContainerComponent />)

    expect(subject.getDOMNode().getAttribute('data-width_less_than_2em')).to.not.exist()

    subject.setProps({
      width: '30px'
    })

    await wait(() => {
      expect(subject.getDOMNode().getAttribute('data-width_less_than_2em')).to.exist()
    })
  })

  it('parses pixels from strings in the query', async () => {
    const subject = await mount(<ContainerComponent width="300px" />)

    expect(subject.getDOMNode().getAttribute('data-width_between_251_and_300')).to.exist()

    subject.setProps({
      width: '301px'
    })

    await wait(() => {
      expect(subject.getDOMNode().getAttribute('data-width_between_251_and_300')).to.not.exist()
    })
  })
})
