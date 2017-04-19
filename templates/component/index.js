import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

/**
  A ${COMPONENT} component [WIP]

  ```jsx_example
  <${COMPONENT} />
  ```
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
