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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Grid, GridCol, GridRow } from '@instructure/ui-layout'
import { themeable } from '@instructure/ui-themeable'
import { pickProps, omitProps } from '@instructure/ui-react-utils'

import { FormFieldLayout } from '../FormFieldLayout'
import { FormPropTypes } from '../FormPropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
class FormFieldGroup extends Component {
  static propTypes = {
    description: PropTypes.node.isRequired,
    /**
    * the element type to render as
    */
    as: PropTypes.elementType,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
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

  static defaultProps = {
    children: null,
    layout: undefined,
    startAt: undefined,
    messages: undefined,
    messagesId: undefined,
    as: 'fieldset',
    disabled: false,
    rowSpacing: 'medium',
    colSpacing: 'small',
    vAlign: 'middle'
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

export default FormFieldGroup
export { FormFieldGroup }
