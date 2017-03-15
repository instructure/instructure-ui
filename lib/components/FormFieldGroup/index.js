import React, { Component, PropTypes, Children } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import themeable from '../../themeable'
import { omitProps, pickProps } from '../../util/passthroughProps'
import classnames from 'classnames'
import Grid, { GridCol, GridRow } from '../Grid'
import { FormFieldLayout } from '../FormField'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: forms
---
  This is a helper component that is used by most of the custom form
  components. In most cases it shouldn't be used directly, but if you need to
  wrap a complex group of form fields (as in the following example) it can be handy.

  ```jsx_example
  <FormFieldGroup
    layout="columns"
    description="Questions (select the correct answer)"
    messages={[
      { text: 'Invalid name', type: 'error' }
    ]}
  >
    <FormFieldGroup
      startAt="small"
      colSpacing="none"
      rowSpacing="none"
      description={<ScreenReaderContent>Question One</ScreenReaderContent>}
      layout="columns"
    >
          <RadioInput name="fruit" value="Apple" width="auto" label={
              <ScreenReaderContent>Apple</ScreenReaderContent>
            }
          />
          <TextInput label={
            <ScreenReaderContent>Edit fruit</ScreenReaderContent>
            } defaultValue="Apple"
          />
    </FormFieldGroup>
    <FormFieldGroup
      startAt="small"
      colSpacing="none"
      rowSpacing="none"
      description={<ScreenReaderContent>Question Two</ScreenReaderContent>}
      layout="columns"
    >
      <RadioInput name="fruit" value="orange" width="auto" label={
          <ScreenReaderContent>Orange</ScreenReaderContent>
        }
      />
      <TextInput label={
        <ScreenReaderContent>Edit fruit</ScreenReaderContent>
        } defaultValue="Orange"
      />
    </FormFieldGroup>
    <FormFieldGroup
      startAt="small"
      colSpacing="none"
      rowSpacing="none"
      description={<ScreenReaderContent>Question Two</ScreenReaderContent>}
      layout="columns"
    >
      <RadioInput name="fruit" value="banana" width="auto" label={
          <ScreenReaderContent>Banana</ScreenReaderContent>
        }
      />
      <TextInput label={
        <ScreenReaderContent>Edit fruit</ScreenReaderContent>
        } defaultValue="Banana"
      />
    </FormFieldGroup>
  </FormFieldGroup>
  ```
**/
@themeable(theme, styles)
export default class FormFieldGroup extends Component {
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
    disabled: PropTypes.bool,
    children: PropTypes.node,
    layout: PropTypes.oneOf(['stacked', 'columns', 'inline']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null])
  }

  static defaultProps = {
    as: 'fieldset',
    disabled: false,
    rowSpacing: 'medium',
    colSpacing: 'small',
    vAlign: 'middle'
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  renderColumns () {
    return Children.map(this.props.children, (child, index) => {
      return (
        <GridCol width={child.props && child.props.width ? 'auto' : null} key={index}>
          {child}
        </GridCol>
      )
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
      <span key="fields" className={classnames({
        [styles.fields]: true,
        [styles.invalid]: this.invalid,
        [styles.disabled]: this.props.disabled
      })}>
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
