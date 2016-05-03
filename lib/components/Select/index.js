import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import shortid from 'shortid'
import classnames from 'classnames'
import CustomPropTypes from '../../util/CustomPropTypes'

import IconArrowDown from './IconArrowDown'

import styles from './Select.css'
import themeVariables from './theme/Select'
import themeStyles from './theme/Select.css'

/**
  An accessible and easily stylable select component.

  ### Select size variants

  Default is `medium`.

  ```jsx_example
  <div>
  <Select size="small" label="Small">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select label="Medium">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select size="large" label="Large">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  </div>
  ```

  ### Select with an error message

  ```jsx_example
  <Select label="What would you like for a snack?" errors={['You need to make a selection']}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  ```

  ### Select with the label visible only to screenreaders

  ```jsx_example
  <Select label={<ScreenReaderContent>What would you like for a snack?</ScreenReaderContent>}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  ```
**/
@themeable(themeVariables, themeStyles)
export default class Select extends Component {
  static propTypes = {
    /**
    * Children must be option tags.
    */
    children: CustomPropTypes.validChildren(['option']),
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    id: PropTypes.string,
    label: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    required: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    size: 'medium'
  };

  constructor (props) {
    super()

    this.defaultId = 'Select' + shortid.generate()
    this.descriptionId = 'SelectDescription' + shortid.generate()
  }

  renderErrors () {
    const {errors} = this.props
    if (errors) {
      const messages = errors.map((msg, i) => {
        return <li key={'error' + i} className={styles.errorMsg}>{msg}</li>
      })

      return (
        <ul className={styles.errors} id={this.errorsId}>
          {messages}
        </ul>
      )
    }
  }

  renderDescription () {
    const {
      errors
    } = this.props

    return (errors && errors.length > 0) ? (
      <div id={this.descriptionId}>
        {this.renderErrors()}
      </div>
    ) : null
  }

  render () {
    const {
      label,
      errors,
      size,
      children,
      ...props
    } = this.props

    const hasErrors = errors && errors.length > 0

    const classes = {
      [styles.root]: true,
      [styles.disabled]: props.disabled,
      [styles.required]: props.required,
      [styles[size]]: size
    }

    const id = this.props.id || this.defaultId
    return (
      <div className={classnames(classes)}>
        <label htmlFor={id} className={styles.label}>
          <div className={styles.labelLayout}>
            {label}
          </div>
          <div className={styles.selectLayout}>
            <select
              id={id}
              className={styles.select}
              aria-describedby={hasErrors ? this.descriptionId : null}
              aria-invalid={hasErrors ? 'true' : null}
              {...props}>
              {children}
            </select>
            <IconArrowDown className={styles.arrowDownIcon} />
          </div>
        </label>
        {this.renderDescription()}
      </div>
    )
  }
}
