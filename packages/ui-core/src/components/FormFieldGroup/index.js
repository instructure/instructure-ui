import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import Grid, { GridCol, GridRow } from '../Grid'
import { FormFieldLayout } from '../FormField'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/forms
---
**/
@themeable(theme, styles)
export default class FormFieldGroup extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    description: PropTypes.node.isRequired,
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    /**
    * id for the form field messages
    */
    messagesId: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    layout: PropTypes.oneOf(['stacked', 'columns', 'inline']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'fieldset',
    disabled: false,
    rowSpacing: 'medium',
    colSpacing: 'small',
    vAlign: 'middle',
    messagesId: undefined
  }

  get invalid () {
    return (
      this.props.messages &&
      this.props.messages.findIndex(message => {
        return message.type === 'error'
      }) >= 0
    )
  }

  renderColumns () {
    return Children.map(this.props.children, (child, index) => {
      return child
        ? <GridCol width={child.props && child.props.width ? 'auto' : null} key={index}>
          {child}
        </GridCol>
        : null
    })
  }

  renderChildren () {
    return (
      <Grid
        colSpacing={this.props.colSpacing}
        rowSpacing={this.props.rowSpacing}
        vAlign={this.props.vAlign}
        startAt={this.props.startAt || (this.props.layout === 'columns' ? 'medium' : null)}
      >
        <GridRow>
          {this.renderColumns()}
        </GridRow>
      </Grid>
    )
  }

  renderFields () {
    return (
      <span
        key="fields"
        className={classnames({
          [styles.fields]: true,
          [styles.invalid]: this.invalid,
          [styles.disabled]: this.props.disabled
        })}
      >
        {this.renderChildren()}
      </span>
    )
  }

  render () {
    return (
      <FormFieldLayout
        {...omitProps(this.props, FormFieldGroup.propTypes)}
        {...pickProps(this.props, FormFieldLayout.propTypes)}
        vAlign={this.props.vAlign}
        layout={this.props.layout === 'inline' ? 'inline' : 'stacked'}
        label={this.props.description}
        aria-disabled={this.props.disabled ? 'true' : null}
        aria-invalid={this.invalid ? 'true' : null}
      >
        {this.renderFields()}
      </FormFieldLayout>
    )
  }
}
