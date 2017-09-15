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
category: forms
---
  This is a helper component that is used by most of the custom form
  components. Perfect if you need to wrap a complex group of form fields
  (<em>Play with the different properties inside the various < > code editor
  to see how they affect the overall look and feel</em>). The first example
  sets the `layout to inline` and sets the `vAlign to middle` and `small
  rowSpacing`

  ```jsx_example
    <FormFieldGroup
      description="Breakfast"
      rowSpacing="small"
      layout="inline"
      vAlign="middle"
    >
      <TextInput label="Favorite Breakfast Eatery"
        messages={[
        { text: 'Invalid name', type: 'error' }
        ]}
        />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
      <RadioInputGroup
        name="beverage"
        description="Beverage of Choice"
        defaultValue="coffee"
        layout="columns"
      >
        <RadioInput label="Juice" value="juice" />
        <RadioInput label="Water" value="water" />
        <RadioInput label="Coffee" value="coffee" />
        <RadioInput label="Milk" value="milk" />
        <RadioInput label="Soda" value="soda" />
        <RadioInput label="Hot Tea" value="tea" />
      </RadioInputGroup>
    </FormFieldGroup>
  ```

  This example sets the `layout to columns` and sets the `vAlign to top`
  and the `colSpacing to medium`
  ```jsx_example
    <FormFieldGroup
      description="Lunch"
      colSpacing="medium"
      layout="columns"
      vAlign="top"
    >
      <Select label="Select Your Dining Style">
        <option value="fast-food">Fast Food</option>
        <option value="buffet">Buffet</option>
        <option value="bistro">Brasserie / Bistro</option>
        <option value="cafe">Cafe Style</option>
        <option value="destination">Destination / Formal Dining</option>
      </Select>
      <TextInput label="Favorite Lunch Outing"
        />
      <CheckboxGroup name="times"
        layout="stacked"
        onChange={function (value) { console.log(value) }}
        defaultValue={['afternoon']}
        description="Best Time to Head Out for Lunch"
      >
        <Checkbox label="Between 11:00 and 11:30" value="morning" />
        <Checkbox label="Between 11:30 and Noon" value="early-afternoon" />
        <Checkbox label="Between Noon and 1:00" value="afternoon" />
        <Checkbox label="Between 1:00 and 2:00" value="late-afternoon" />
      </CheckboxGroup>
    </FormFieldGroup>
  ```

  This example sets the `layout to stacked` and sets the `rowSpacing to large`
  ```jsx_example
    <FormFieldGroup
      description="Dinner"
      layout="stacked"
      rowSpacing="large"
      messages={[
      { text: 'Complete All Fields', type: 'error' }
      ]}
    >
      <RadioInputGroup
        name="diningstyle"
        description="Size of Your Meal"
        defaultValue="grill"
        layout="stacked"
      >
        <RadioInput label="Keep it light" value="light" />
        <RadioInput label="Anything cooked on the grill" value="grill" />
        <RadioInput label="Bring it on... Ready for the full course" value="full-course" />
        <RadioInput label="Breakfast for dinner" value="breakfast" />
      </RadioInputGroup>
      <TextInput label="If Not At Home - I'd LIke To Eat Dinner At"
        />
      <Checkbox label="Love to Eat Dessert After Dinner" value="medium" variant="toggle" />
    </FormFieldGroup>
  ```

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
