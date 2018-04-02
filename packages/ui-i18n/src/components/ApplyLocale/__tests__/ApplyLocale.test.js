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
import ApplyLocale from '../index'

class LocalizableComponent extends React.Component {
  static contextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  render () {
    return <div />
  }
}

describe('<ApplyLocale />', () => {
  const testbed = new Testbed(
    <ApplyLocale locale="fr" timezone="Europe/Paris">
      <LocalizableComponent />
    </ApplyLocale>
  )

  it('applies locale context', () => {
    const subject = testbed.render()
    expect(subject.find(LocalizableComponent).unwrap().context).to.include({locale: 'fr'})
  })

  it('applies timezone context', () => {
    const subject = testbed.render()
    expect(subject.find(LocalizableComponent).unwrap().context).to.include({timezone: 'Europe/Paris'})
  })
})
