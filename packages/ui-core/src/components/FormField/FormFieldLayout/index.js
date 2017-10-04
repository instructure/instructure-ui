import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'

import hasVisibleChildren from '../../../utils/hasVisibleChildren'

import FormFieldLabel from '../FormFieldLabel'
import FormFieldMessages from '../FormFieldMessages'
import ScreenReaderContent from '../../ScreenReaderContent'
import Grid, { GridCol, GridRow } from '../../Grid'

import styles from './styles.css'
import theme from './theme'

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
    layout: PropTypes.oneOf(['stacked', 'inline'])
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    inline: false,
    layout: 'stacked',
    as: 'label',
    messagesId: undefined
  };

  constructor (props) {
    super()

    this._messagesId = props.messagesId || `FormFieldLayout__messages-${shortid.generate()}`
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
      <GridCol textAlign="end" width={3}>
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
        <GridCol offset={3}>
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
            <GridCol>
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
