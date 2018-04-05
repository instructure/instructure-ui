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

import cleanData from '../cleanData'

describe('cleanData', () => {
  it('should remove spaces from the end of character data', () => {
    const data = [['T','e','s','t',' ','...']]
    const options = {
      truncate: 'character',
      ellipsis: '...',
      ignore: [' ']
    }

    const newData = cleanData(data, options)
    expect(newData[0].join('')).to.equal('Test...')
  })

  it('should remove spaces from the end of word data', () => {
    const data = [['Test ','...']]
    const options = {
      truncate: 'word',
      ellipsis: '...',
      ignore: [' ']
    }

    const newData = cleanData(data, options)
    expect(newData[0].join('')).to.equal('Test...')
  })

  it('should remove spaces from the middle of character data', () => {
    const data = [['H','e','l','l','o',' ','...',' ','w','o','r','l','d']]
    const options = {
      truncate: 'character',
      ellipsis: '...',
      ignore: [' ']
    }

    const newData = cleanData(data, options)
    expect(newData[0].join('')).to.equal('Hello...world')
  })

  it('should remove spaces from the middle of word data', () => {
    const data = [['Hello ','...','world']]
    const options = {
      truncate: 'word',
      ellipsis: '...',
      ignore: [' ']
    }

    const newData = cleanData(data, options)
    expect(newData[0].join('')).to.equal('Hello...world')
  })

  it('should do a thorough cleaning', () => {
    const data = [['T','e','s','t','.',' ','...']]
    const options = {
      truncate: 'character',
      ellipsis: '...',
      ignore: [' ','.']
    }

    const newData = cleanData(data, options, true)
    expect(newData[0].join('')).to.equal('Test...')
  })

  it('should remove spaces from the end of complex character data', () => {
    let data = [['H','e','l','l','o',' '],['...']]
    const options = {
      truncate: 'character',
      ellipsis: '...',
      ignore: [' ']
    }

    let newData = cleanData(data, options)
    const text = newData[0].join('') + newData[1].join('')

    data = [['H','e','l','l','o',' '],['w','o','r','l','d',' ','...']]
    newData = cleanData(data, options)
    const text2 = newData[0].join('') + newData[1].join('')

    expect(text).to.equal('Hello...')
    expect(text2).to.equal('Hello world...')
  })

  it('should remove spaces from the middle of complex word data', () => {
    let data = [['Hello ', '...'],['world']]
    const options = {
      truncate: 'word',
      ellipsis: '...',
      ignore: [' ']
    }

    let newData = cleanData(data, options)
    const text = newData[0].join('') + newData[1].join('')

    data = [['Hello '],['...', 'world']]
    newData = cleanData(data, options)
    const text2 = newData[0].join('') + newData[1].join('')

    expect(text).to.equal('Hello...world')
    expect(text2).to.equal('Hello...world')
  })

})
