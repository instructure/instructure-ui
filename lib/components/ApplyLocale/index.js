import React, {Component} from 'react'
import PropTypes from 'prop-types'

/**
---
category: utilities
---
  `<ApplyLocale />` Sets the locale and timezone context for children that can
  use it, such as a [DatePicker](#DatePicker)

```jsx_example
  <ApplyLocale locale="fr" timezone="Europe/Paris">
    <DatePicker />
  </ApplyLocale>
```
**/
export default class ApplyLocale extends Component {
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
    return React.Children.only(this.props.children)
  }
}
