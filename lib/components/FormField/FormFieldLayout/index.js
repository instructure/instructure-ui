import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../../util/themeable'
import { omitProps, pickProps } from '../../../util/passthroughProps'
import hasVisibleContent from '../../../util/hasVisibleContent'
import getElementType from '../../../util/getElementType'
import FormFieldLabel from '../FormFieldLabel'
import FormFieldMessages from '../FormFieldMessages'
import shortid from 'shortid'
import Grid, { GridCol, GridRow } from '../../Grid'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
class FormFieldLayout extends Component {
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
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    children: PropTypes.node,
    isBlock: PropTypes.bool,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    labelRef: PropTypes.func
  };

  static defaultProps = {
    isBlock: true,
    layout: 'stacked',
    as: 'label',
    labelRef: function (el) {}
  };

  constructor (props) {
    super()

    this._messagesId = 'FormFieldLayout__messages-' + shortid.generate()
  }

  get hasLabel () {
    return this.props.label && hasVisibleContent(this.props.label)
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  renderLabel () {
    return this.hasLabel ? (
      <GridCol textAlign="right" width={3}>
        <FormFieldLabel
          as={(this.props.as === 'fieldset') ? 'legend' : undefined}
          ref={this.props.labelRef}
        >
          {this.props.label}
        </FormFieldLabel>
      </GridCol>
    ) : null
  }

  renderMessages () {
    return this.hasMessages ? (
      <GridRow>
        <GridCol offset={3}>
          <FormFieldMessages id={this._messagesId} messages={this.props.messages} />
        </GridCol>
      </GridRow>
    ) : null
  }

  render () {
    const ElementType = getElementType(FormFieldLayout, this.props)

    const classes = {
      [styles.root]: true,
      [styles['is-block']]: this.props.isBlock
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
          startAt={this.props.layout === 'inline' && this.hasLabel ? 'tablet' : null}
          {...pickProps(this.props, Grid.propTypes)}
        >
          <GridRow>
            { this.renderLabel() }
            <GridCol>
              {this.props.children}
            </GridCol>
          </GridRow>
          { this.renderMessages() }
        </Grid>
      </ElementType>
    )
  }
}

export default FormFieldLayout
