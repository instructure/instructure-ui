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
