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

/** @jsx jsx */
import { Component, Children } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@instructure/ui-grid'
import { pickProps, omitProps } from '@instructure/ui-react-utils'
import { withStyle, jsx } from '@instructure/emotion'

import { FormFieldLayout } from '../FormFieldLayout'
import { FormPropTypes } from '../FormPropTypes'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  description: React.ReactNode
  as?: React.ReactElement
  messages?: any[] // TODO: FormPropTypes.message
  messagesId?: string
  disabled?: boolean
  layout?: 'stacked' | 'columns' | 'inline'
  rowSpacing?: 'none' | 'small' | 'medium' | 'large'
  colSpacing?: 'none' | 'small' | 'medium' | 'large'
  vAlign?: 'top' | 'middle' | 'bottom'
  startAt?: any // TODO: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null])
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class FormFieldGroup extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
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

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  get makeStylesVariables() {
    return { invalid: this.invalid }
  }

  get invalid() {
    return (
      this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  renderColumns() {
    return Children.map(this.props.children, (child, index) => {
      return child ? (
        <Grid.Col
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
          width={child.props && child.props.width ? 'auto' : null}
          key={index}
        >
          {child}
        </Grid.Col>
      ) : null
    })
  }

  renderChildren() {
    return (
      <Grid
        colSpacing={this.props.colSpacing}
        rowSpacing={this.props.rowSpacing}
        vAlign={this.props.vAlign}
        startAt={
          this.props.startAt ||
          (this.props.layout === 'columns' ? 'medium' : null)
        }
      >
        <Grid.Row>{this.renderColumns()}</Grid.Row>
      </Grid>
    )
  }

  renderFields() {
    const { styles } = this.props

    return (
      <span key="fields" css={styles.formFieldGroup}>
        {this.renderChildren()}
      </span>
    )
  }

  render() {
    const { styles, makeStyles, ...props } = this.props

    return (
      <FormFieldLayout
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...omitProps(props, FormFieldGroup.propTypes)}
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...pickProps(props, FormFieldLayout.propTypes)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; vAlign: "top" | "middle... Remove this comment to see the full error message
        vAlign={props.vAlign}
        layout={props.layout === 'inline' ? 'inline' : 'stacked'}
        label={props.description}
        aria-disabled={props.disabled ? 'true' : null}
        aria-invalid={this.invalid ? 'true' : null}
      >
        {this.renderFields()}
      </FormFieldLayout>
    )
  }
}

export default FormFieldGroup
export { FormFieldGroup }
