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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import hasVisibleChildren from '../../../utils/hasVisibleChildren'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: FormField
---

This is a helper component that is used by most of the custom form
components. In most cases it shouldn't be used directly.

```js
---
example: true
---
<FormFieldLabel>Hello</FormFieldLabel>
```

**/
@themeable(theme, styles)
export default class FormFieldLabel extends Component {
  static propTypes = {
    as: CustomPropTypes.elementType,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    as: 'span'
  };

  render () {
    const ElementType = getElementType(FormFieldLabel, this.props)

    const classes = {
      [styles.root]: true,
      [styles['has-content']]: hasVisibleChildren(this.props.children)
    }

    return (
      <ElementType
        {...omitProps(this.props, FormFieldLabel.propTypes)}
        className={classnames(classes)}
      >
        {this.props.children}
      </ElementType>
    )
  }
}
