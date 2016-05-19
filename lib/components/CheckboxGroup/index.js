import React, { Children, Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import Checkbox from '../Checkbox'
import safeCloneElement from '../../util/safeCloneElement'
import createChainedFunction from '../../util/createChainedFunction'

import styles from './CheckboxGroup.css'
import themeVariables from './theme/CheckboxGroup'
import themeStyles from './theme/CheckboxGroup.css'

/**
  A `<CheckboxGroup/>` is a group of [Checkbox](#Checkbox) components that share the same name. You can
  set an array `value` for the entire group and it will handle setting the `checked` and `name` props for you.

  ```jsx_example
  <CheckboxGroup name="sports"
    onChange={function (value) { console.log(value) }}
    defaultValue={['football', 'volleyball']}
    description="Select your favorite sports">
    <Checkbox label="Football" value="football" />
    <Checkbox label="Basketball" value="basketball" />
    <Checkbox label="Volleyball" value="volleyball" />
    <Checkbox label="Other" value="other" />
  </CheckboxGroup>
  ```
**/

@themeable(themeVariables, themeStyles)
export default class CheckboxGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.array,
    /**
    * the selected values (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.array),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    /**
    * children of type 'Checkbox'
    **/
    children: CustomPropTypes.validChildren([Checkbox]),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    size: 'medium'
  };

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }
  }

  handleChange = (e) => {
    const value = this.value || []

    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (e.target.checked) {
      value.push(e.target.value)
    } else {
      value.splice(value.indexOf(e.target.value), 1)
    }

    if (this.props.value === undefined) {
      this.setState({value})
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  };

  get value () {
    return (this.props.value === undefined) ? this.state.value : this.props.value
  }

  renderChildren () {
    const {
      children,
      name,
      size,
      disabled
    } = this.props

    const value = this.value || []

    return Children.map(children, (child, index) => {
      if (child && child.type === Checkbox) {
        const { onChange } = child.props
        return safeCloneElement(child, {
          ...child.props,
          name,
          disabled: (disabled || child.props.disabled),
          size,
          checked: (value && value.indexOf(child.props.value) > -1),
          onChange: createChainedFunction(onChange, this.handleChange)
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  renderErrors () {
    const {errors} = this.props
    if (errors) {
      return errors.map((msg, i) => {
        return <div key={'error' + i} className={styles.errors}>{msg}</div>
      })
    }
  }

  renderDescription () {
    const {description} = this.props
    if (description) {
      return <div className={styles.description}>{description}</div>
    }
  }

  render () {
    const classes = {
      [styles.root]: true
    }

    return (
      <fieldset role="group" className={classnames(classes)}>
        <legend className={styles.label}>
          {this.renderDescription()}
          {this.renderErrors()}
        </legend>
        <div className={styles.root}>
          {this.renderChildren()}
        </div>
      </fieldset>
    )
  }
}
