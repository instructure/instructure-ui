'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.wrapLucideIcon = wrapLucideIcon
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
)
var _react = _interopRequireWildcard(require('react'))
var _emotion = require('@instructure/emotion')
var _passthroughProps = require('@instructure/ui-react-utils/lib/passthroughProps.js')
var _IconPropsProvider = require('../IconPropsProvider')
var _styles = _interopRequireDefault(require('./styles'))
var _jsxRuntime = require('@emotion/react/jsx-runtime')
const _excluded = [
  'size',
  'color',
  'rotate',
  'bidirectional',
  'inline',
  'title',
  'elementRef',
  'themeOverride'
]
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
/**
 * Wraps a Lucide icon with InstUI theming, RTL support, and semantic sizing.
 * Only accepts InstUI semantic tokens (size="lg", color="baseColor").
 * Stroke width is automatically derived from size for consistent visual weight.
 * Numeric and custom CSS values are not supported.
 */
function wrapLucideIcon(Icon) {
  const iconDisplayName = `InstUIIcon_${Icon.displayName}`
  const WrappedIcon = (props) => {
    var _contextProps$size, _contextProps$color
    const size = props.size,
      color = props.color,
      _props$rotate = props.rotate,
      rotate = _props$rotate === void 0 ? '0' : _props$rotate,
      _props$bidirectional = props.bidirectional,
      bidirectional =
        _props$bidirectional === void 0 ? true : _props$bidirectional,
      _props$inline = props.inline,
      inline = _props$inline === void 0 ? true : _props$inline,
      title = props.title,
      elementRef = props.elementRef,
      themeOverride = props.themeOverride,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded)

    // Get icon props from context (if available)
    const contextProps = (0, _react.useContext)(
      _IconPropsProvider.IconPropsContext
    )

    // Merge props: context props take precedence over direct props
    const finalSize =
      (_contextProps$size =
        contextProps === null || contextProps === void 0
          ? void 0
          : contextProps.size) !== null && _contextProps$size !== void 0
        ? _contextProps$size
        : size
    const finalColor =
      (_contextProps$color =
        contextProps === null || contextProps === void 0
          ? void 0
          : contextProps.color) !== null && _contextProps$color !== void 0
        ? _contextProps$color
        : color
    const handleElementRef = (el) => {
      if (typeof elementRef === 'function') {
        elementRef(el)
      }
    }
    const styles = (0, _emotion.useStyle)({
      componentId: 'Icon',
      generateStyle: _styles.default,
      themeOverride,
      params: {
        size: finalSize,
        color: finalColor,
        rotate,
        bidirectional,
        inline
      },
      displayName: iconDisplayName
    })
    const accessibilityProps = {}
    if (title) {
      accessibilityProps['aria-label'] = title
      accessibilityProps['role'] = 'img'
    } else {
      accessibilityProps['aria-hidden'] = 'true'
      accessibilityProps['role'] = 'presentation'
    }
    const gradientId = (0, _react.useId)()

    // AI Gradient Implementation:
    // SVG gradients must be defined BEFORE they're referenced. Since Lucide renders
    // icon paths before any children we pass, we inject the gradient in a separate
    // hidden SVG element that comes BEFORE the icon in the DOM. We use
    // gradientUnits="userSpaceOnUse" with coordinates (0,0) to (24,24) matching
    // Lucide's viewBox, ensuring one gradient spans the entire icon space rather
    // than scaling separately for each shape (which causes small elements to lose
    // gradient visibility). The icon then references this gradient via stroke="url(#id)".
    if (styles.gradientColors) {
      // Use viewBox coordinates for gradient (Lucide icons use 0 0 24 24 viewBox)
      const gradientSize = 24
      return (0, _jsxRuntime.jsxs)('span', {
        css: styles.lucideIcon,
        children: [
          (0, _jsxRuntime.jsx)('svg', {
            width: 0,
            height: 0,
            style: {
              position: 'absolute'
            },
            children: (0, _jsxRuntime.jsx)('defs', {
              children: (0, _jsxRuntime.jsxs)('linearGradient', {
                id: gradientId,
                x1: '0',
                y1: '0',
                x2: gradientSize,
                y2: gradientSize,
                gradientUnits: 'userSpaceOnUse',
                children: [
                  (0, _jsxRuntime.jsx)('stop', {
                    offset: '0%',
                    stopColor: styles.gradientColors.top
                  }),
                  (0, _jsxRuntime.jsx)('stop', {
                    offset: '100%',
                    stopColor: styles.gradientColors.bottom
                  })
                ]
              })
            })
          }),
          (0, _jsxRuntime.jsx)(Icon, {
            ...(0, _passthroughProps.passthroughProps)(rest),
            name: Icon.displayName,
            ref: handleElementRef,
            size: styles.numericSize,
            color: `url(#${gradientId})`,
            strokeWidth: styles.numericStrokeWidth,
            absoluteStrokeWidth: true,
            ...accessibilityProps
          })
        ]
      })
    }

    // Normal rendering (non-gradient)
    return (0, _jsxRuntime.jsx)('span', {
      css: styles.lucideIcon,
      children: (0, _jsxRuntime.jsx)(Icon, {
        ...(0, _passthroughProps.passthroughProps)(rest),
        name: Icon.displayName,
        ref: handleElementRef,
        size: styles.numericSize,
        color: styles.resolvedColor,
        strokeWidth: styles.numericStrokeWidth,
        absoluteStrokeWidth: true,
        ...accessibilityProps
      })
    })
  }
  WrappedIcon.displayName = iconDisplayName
  return WrappedIcon
}
