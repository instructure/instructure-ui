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
import PropTypes from 'prop-types'

/**
 * ---
 * category: utilities/i18n
 * ---
 * @module TextDirectionContext
 */
const CONTEXT_KEY = '@@bidirectional'

const DIRECTION = {
  ltr: 'ltr',
  rtl: 'rtl'
}

const TextDirectionContext = {
  CONTEXT_KEY,
  DIRECTION,

  /**
   * React context types for [bidirectional](#bidirectional) components and
   * the [ApplyTextDirection](#ApplyTextDirection) component.
   */
  types: {
    [CONTEXT_KEY]: PropTypes.shape({
      dir: PropTypes.oneOf(Object.values(DIRECTION))
    })
  },

  /**
   * create direction context
   * @param {string} dir
   */
  makeTextDirectionContext(dir) {
    return {
      [CONTEXT_KEY]: {
        dir
      }
    }
  },

  /**
   * get a direction context from a context object
   * @param {ReactContext} context React context object
   * @returns {Object} a direction context object
   */
  getTextDirectionContext(context) {
    if (context) {
      return context[CONTEXT_KEY]
    }
  }
}

export default TextDirectionContext
export { TextDirectionContext }
