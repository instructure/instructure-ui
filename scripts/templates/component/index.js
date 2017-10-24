import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
class ${COMPONENT} extends Component {
  static propTypes = {
    /**
    * description of replaceMe prop
    */
    replaceMe: PropTypes.string
  }

  static defaultProps = {
    replaceMe: 'hello world'
  }

  render () {
    const props = omitProps(this.props, ${COMPONENT}.propTypes)
    return (
      <div {...props} className={styles.root}>
        Hello World
      </div>
    )
  }
}

export default ${COMPONENT}
