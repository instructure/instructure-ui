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
import { DIRECTION } from '@instructure/ui-i18n'
import { pickProps } from '@instructure/ui-react-utils'

const getOffsetStyle = ({
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'insetBlockStart' implicitly has a... Remove this comment to see the full error message
  insetBlockStart,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'insetBlockEnd' implicitly has an ... Remove this comment to see the full error message
  insetBlockEnd,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'insetInlineStart' implicitly has ... Remove this comment to see the full error message
  insetInlineStart,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'insetInlineEnd' implicitly has an... Remove this comment to see the full error message
  insetInlineEnd,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dir' implicitly has an 'any' type... Remove this comment to see the full error message
  dir
}) => {
  const isRtlDirection = dir === DIRECTION.rtl

  const blockStart = {
    top: insetBlockStart,
    insetBlockStart
  }

  const blockEnd = {
    bottom: insetBlockEnd,
    insetBlockEnd
  }

  const horizontalOffsets = {
    left: isRtlDirection ? insetInlineEnd : insetInlineStart,
    right: isRtlDirection ? insetInlineStart : insetInlineEnd
  }

  return {
    ...blockStart,
    ...blockEnd,
    ...horizontalOffsets
  }
}

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cursor' implicitly has an 'any' t... Remove this comment to see the full error message
const getStyleProps = ({ cursor, style }) => {
  const whitelisted = pickProps(style || {}, {}, [
    // Position/calculateElementPosition:
    'top',
    'left',
    'position',
    'display',
    'transform',
    'overflow',
    'minWidth',
    'minHeight',
    // Img:
    'filter',
    // Flex.Item:
    'flexBasis',
    // Avatar:
    'backgroundImage',
    // Popover:
    'pointerEvents'
  ])

  if (cursor) {
    whitelisted.cursor = cursor
  }

  return whitelisted
}

const staticStyles = {
  view: {
    boxSizing: 'border-box',
    maxWidth: '100%',
    overflow: 'visible'
  },
  display: {
    inline: {
      display: 'inline'
    },
    block: {
      display: 'block'
    },
    'inline-block': {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    flex: {
      display: 'flex'
    },
    'inline-flex': {
      display: 'inline-flex',
      verticalAlign: 'middle'
    }
  },
  textAlign: {
    start: { textAlign: 'start' },
    center: { textAlign: 'center' },
    end: { textAlign: 'end' }
  },
  overFlowX: {
    auto: { overflowX: 'auto' },
    hidden: { overflowX: 'hidden' },
    visible: {}
  },
  overFlowY: {
    auto: { overflowY: 'auto' },
    hidden: { overflowY: 'hidden' },
    visible: {}
  },
  position: {
    static: {},
    absolute: { position: 'absolute' },
    relative: { position: 'relative' },
    sticky: { position: 'sticky' },
    fixed: { position: 'fixed' }
  }
}

export default staticStyles
export { staticStyles, getOffsetStyle, getStyleProps }
