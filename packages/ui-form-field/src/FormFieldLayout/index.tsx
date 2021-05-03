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
import { Component } from 'react'
import PropTypes from 'prop-types'

import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { Grid } from '@instructure/ui-grid'
import { logError as error } from '@instructure/console'
import {
  omitProps,
  pickProps,
  getElementType
} from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'

import { withStyle, jsx } from '@instructure/emotion'

import { FormFieldLabel } from '../FormFieldLabel'
import { FormFieldMessages } from '../FormFieldMessages'
import { FormPropTypes } from '../FormPropTypes'

import generateStyle from './styles'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  label: React.ReactNode
  id?: string
  as?: React.ReactElement
  messages?: any[] // TODO: FormPropTypes.message
  messagesId?: string
  inline?: boolean
  layout?: 'stacked' | 'inline'
  labelAlign?: 'start' | 'end'
  width?: string
  inputContainerRef?: (...args: any[]) => any
}

/**
---
parent: FormField
---
**/
@withStyle(generateStyle)
class FormFieldLayout extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    label: PropTypes.node.isRequired,
    /**
     * the id of the input (to link it to its label for a11y)
     */
    id: PropTypes.string,
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
    children: PropTypes.node,
    inline: PropTypes.bool,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    labelAlign: PropTypes.oneOf(['start', 'end']),
    width: PropTypes.string,
    inputContainerRef: PropTypes.func
  }

  static defaultProps = {
    id: undefined,
    width: undefined,
    messages: undefined,
    messagesId: undefined,
    children: null,
    inline: false,
    layout: 'stacked',
    as: 'label',
    labelAlign: 'end',
    inputContainerRef: undefined
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'For... Remove this comment to see the full error message
    this._messagesId = props.messagesId || uid('FormFieldLayout-messages')

    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
    error(
      typeof props.width !== 'undefined' ||
        !props.inline ||
        props.layout !== 'inline',
      `[FormFieldLayout] The 'inline' prop is true, and the 'layout' is set to 'inline'.
      This will cause a layout issue in Internet Explorer 11 unless you also add a value for the 'width' prop.`
    )
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  get hasVisibleLabel() {
    return this.props.label && hasVisibleChildren(this.props.label)
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  get elementType() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    return getElementType(FormFieldLayout, this.props)
  }

  get inlineContainerAndLabel() {
    // Return if both the component container and label will display inline
    return this.props.inline && this.props.layout === 'inline'
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleInputContainerRef = (node) => {
    if (this.props.inputContainerRef) {
      this.props.inputContainerRef(node)
    }
  }

  renderLabel() {
    if (this.hasVisibleLabel) {
      return (
        <Grid.Col
          textAlign={this.props.labelAlign}
          width={this.inlineContainerAndLabel ? 'auto' : 3}
        >
          <FormFieldLabel
            aria-hidden={this.elementType === 'fieldset' ? 'true' : null}
          >
            {this.props.label}
          </FormFieldLabel>
        </Grid.Col>
      )
    } else if (this.elementType !== 'fieldset') {
      // to avoid duplicate label/legend content
      return this.props.label
    } else {
      return null
    }
  }

  renderLegend() {
    // note: the legend element must be the first child of a fieldset element for SR
    // so we render it twice in that case (once for SR-only and one that is visible)
    return (
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ScreenReaderContent as="legend">
        {this.props.label}
        {this.hasMessages && (
          <FormFieldMessages messages={this.props.messages} />
        )}
      </ScreenReaderContent>
    )
  }

  renderVisibleMessages() {
    return this.hasMessages ? (
      <Grid.Row>
        <Grid.Col
          offset={this.inlineContainerAndLabel ? null : 3}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          textAlign={this.inlineContainerAndLabel ? 'end' : null}
        >
          <FormFieldMessages
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            id={this._messagesId}
            messages={this.props.messages}
          />
        </Grid.Col>
      </Grid.Row>
    ) : null
  }

  render() {
    const ElementType = this.elementType

    const { makeStyles, styles, ...props } = this.props

    const { width, layout, children } = props

    return (
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: (false | Element)[]; css: any; s... Remove this comment to see the full error message
      <ElementType
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...omitProps(props, {
          ...FormFieldLayout.propTypes,
          ...Grid.propTypes
        })}
        css={styles.formFieldLayout}
        style={{ width }}
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'For... Remove this comment to see the full error message
        aria-describedby={this.hasMessages ? this._messagesId : null}
      >
        {this.elementType === 'fieldset' && this.renderLegend()}
        <Grid
          rowSpacing="small"
          colSpacing="small"
          startAt={
            layout === 'inline' && this.hasVisibleLabel ? 'medium' : null
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          {...pickProps(props, Grid.propTypes)}
        >
          <Grid.Row>
            {this.renderLabel()}
            <Grid.Col
              width={this.inlineContainerAndLabel ? 'auto' : null}
              elementRef={this.handleInputContainerRef}
            >
              {children}
            </Grid.Col>
          </Grid.Row>
          {this.renderVisibleMessages()}
        </Grid>
      </ElementType>
    )
  }
}

export default FormFieldLayout
export { FormFieldLayout }
