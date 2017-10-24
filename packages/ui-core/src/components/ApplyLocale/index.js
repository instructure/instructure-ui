import { Component } from 'react'
import PropTypes from 'prop-types'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'

/**
---
category: components/utilities
---
**/
export default class ApplyLocale extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
      A standard language id
    **/
    locale: PropTypes.string,
    /**
      A timezone identifier in the format: Area/Location
    **/
    timezone: PropTypes.string,
    /**
    * accepts only one child (children must be wrapped in a single component/element)
    */
    children: PropTypes.node
  }
  /* eslint-enable react/require-default-props */

  static childContextTypes = {
    locale: PropTypes.string,
    timezone: PropTypes.string
  }

  getChildContext () {
    return {
      locale: this.props.locale,
      timezone: this.props.timezone
    }
  }

  render () {
    return ensureSingleChild(this.props.children)
  }
}
