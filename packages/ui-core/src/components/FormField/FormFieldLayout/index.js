import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import warning from '@instructure/ui-utils/lib/warning'
import themeable from '@instructure/ui-themeable'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import uid from '@instructure/ui-utils/lib/uid'

import hasVisibleChildren from '../../../utils/hasVisibleChildren'

import FormFieldLabel from '../FormFieldLabel'
import FormFieldMessages from '../FormFieldMessages'
import ScreenReaderContent from '../../ScreenReaderContent'
import Grid, { GridCol, GridRow } from '../../Grid'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: FormField
---
**/
@themeable(theme, styles)
class FormFieldLayout extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.node.isRequired,
    /**
    * the id of the input (to link it to its label for a11y)
    */
    id: PropTypes.string,
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
    children: PropTypes.node,
    inline: PropTypes.bool,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    labelAlign: PropTypes.oneOf(['start', 'end']),
    width: PropTypes.string
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    inline: false,
    layout: 'stacked',
    as: 'label',
    labelAlign: 'end',
    messagesId: undefined
  };

  constructor (props) {
    super()

    this._messagesId = props.messagesId || `FormFieldLayout__messages-${uid()}`

    if (props.inline && props.layout === 'inline') {
      warning(
        !!props.width,
        `[FormFieldLayout] The inline prop is true, and the layout is set to inline.
        This will cause a layout issue in Internet Explorer 11 unless you also add a
        value for the width prop.`
      )
    }
  }

  get hasVisibleLabel () {
    return this.props.label && hasVisibleChildren(this.props.label)
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  get elementType () {
    return getElementType(FormFieldLayout, this.props)
  }

  get inlineContainerAndLabel () {
    // Return if both the component container and label will display inline
    return this.props.inline && this.props.layout === 'inline'
  }

  renderLabel () {
    const isLegend = this.elementType === 'fieldset'

    return (
      <FormFieldLabel
        as={isLegend ? 'legend' : undefined}
      >
        { this.props.label }
        { isLegend && this.renderScreenReaderMessages() }
      </FormFieldLabel>
    )
  }

  renderVisibleLabel () {
    return this.hasVisibleLabel ? (
      <GridCol
        textAlign={this.props.labelAlign}
        width={(this.inlineContainerAndLabel) ? 'auto' : 3}
      >
        { this.renderLabel() }
      </GridCol>
    ) : null
  }

  renderScreenReaderLabel () {
    // label with no visible content should render inside GridCol
    return !this.hasVisibleLabel ? (
      <ScreenReaderContent>
        { this.renderLabel() }
      </ScreenReaderContent>
    ) : null
  }

  renderMessages () {
    return (
      <FormFieldMessages id={this._messagesId} messages={this.props.messages} />
    )
  }

  renderVisibleMessages () {
    return this.hasMessages ? (
      <GridRow>
        <GridCol
          offset={(this.inlineContainerAndLabel) ? null : 3}
          textAlign={(this.inlineContainerAndLabel) ? 'end' : null}
        >
          <FormFieldMessages id={this._messagesId} messages={this.props.messages} />
        </GridCol>
      </GridRow>
    ) : null
  }

  renderScreenReaderMessages () {
    return this.hasMessages ? (
      <ScreenReaderContent>
        <FormFieldMessages messages={this.props.messages} />
      </ScreenReaderContent>
    ) : null
  }

  render () {
    const ElementType = this.elementType

    const classes = {
      [styles.root]: true,
      [styles.inline]: this.props.inline
    }

    return (
      <ElementType
        {...omitProps(this.props, {...FormFieldLayout.propTypes, ...Grid.propTypes})}
        className={classnames(classes)}
        aria-describedby={this.hasMessages ? this._messagesId : null}
      >
        <Grid
          rowSpacing="small"
          colSpacing="small"
          startAt={this.props.layout === 'inline' && this.hasVisibleLabel ? 'medium' : null}
          {...pickProps(this.props, Grid.propTypes)}
        >
          <GridRow>
            { this.renderVisibleLabel() }
            <GridCol width={(this.inlineContainerAndLabel) ? 'auto' : null}>
              { this.renderScreenReaderLabel() }
              { this.props.children }
            </GridCol>
          </GridRow>
          { this.renderVisibleMessages() }
        </Grid>
      </ElementType>
    )
  }
}

export default FormFieldLayout
