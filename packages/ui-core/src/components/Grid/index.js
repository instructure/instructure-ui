import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import capitalizeFirstLetter from '@instructure/ui-utils/lib/capitalizeFirstLetter'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import GridRow from './GridRow'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/layout
---
  ### Create a basic column layout

  Simply create a `<Grid>` with some `<GridRow>` and `GridCol` children, and
  the component will evenly distribute its columns.

  Note the `visualDebug` prop you can set if you're wondering
  exactly where your grid columns are.

  ```jsx_example
  <div>
    <Grid visualDebug>
      <GridRow>
        <GridCol>
          {lorem.paragraph()}
        </GridCol>
        <GridCol>
          {lorem.paragraph()}
        </GridCol>
        <GridCol>
          {lorem.paragraph()}
        </GridCol>
      </GridRow>
    </Grid>
    <p>
      {lorem.paragraph()}
    </p>
  </div>
  ```

  ### Make the grid stack until a certain breakpoint/screen width

  Often you will want to stack your `<GridCol>`s until you reach a certain
  screen width. To do this, use the `startAt` prop.

  Reduce the screen width and see how the grid below only displays its
  columns inline after it hits the `large` breakpoint. Note that by
  default, stacked columns have bottom margin for visual separation.

  ```jsx_example
  <Grid startAt="large" visualDebug>
    <GridRow>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
    </GridRow>
  </Grid>
  ```

  ### Control the width of each column

  You can control the width of the `<GridCol>` columns for each
  breakpoint with the `width` prop. Please note the following:

  + If you don't need complex responsive behavior, you can just set
    the width property to a single value for all breakpoints after
    and including the breakpoint set via the `startAt` prop. e.g.
    `<GridCol width={2}>`

  + The grid is made up of **12 columns**. If the columns' total
    width exceeds 12, the layout will break.

  + In addition to accepting the numerical values `1, 2, 3 ... 12`,
    columns can also accept an `auto` value. This tells the column
    to expand to the width of its content. (See the final example grid
    to see how this can be useful for right-aligning column content.)

  + The `startAt` prop setting supercedes any `<GridCol>` width props. For
    example, if you set `width={{small: 2}}` on a column, but the `startAt` prop
    on your `<Grid>` is set to `medium`, the `width={{small: 2}}` will be ignored.

  ```jsx_example
  <Grid visualDebug>
    <GridRow>
      <GridCol width={{small: 4, medium: 6, large: 3, xLarge: 6}}>
        {lorem.paragraph()}
      </GridCol>
      <GridCol width={{small: 4, medium: 4, large: 3, xLarge: 5}}>
        {lorem.paragraph()}
      </GridCol>
      <GridCol width={{small: 4, medium: 2, large: 6, xLarge: 1}}>
        {lorem.paragraph()}
      </GridCol>
    </GridRow>
  </Grid>
  ```

  ### Add space/gutter between columns and rows

  By default there is uniform spacing between grid columns and rows, use the `colSpacing` and
  `rowSpacing` props, which accept `small`, `medium`, and `large` as values, you can change amount of spacing,
  or remove it with `none`.

  ```jsx_example
  <Grid colSpacing="large" rowSpacing="small" visualDebug>
    <GridRow>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
      <GridCol>
        {lorem.paragraph()}
      </GridCol>
    </GridRow>
  </Grid>
  ```

  Another useful method for spacing out `<GridCol>` elements is to use the `hAlign`
  prop together with set widths on the columns. `hAlign` accepts the following
  values: `start`, `center`, `end`, `space-around`, and `space-between`.

  #### `hAlign="space-between"`

  ```jsx_example
    <Grid hAlign="space-between" visualDebug>
      <GridRow>
        <GridCol width={2}>
          {lorem.paragraph()}
        </GridCol>
        <GridCol width={4}>
          {lorem.paragraph()}
        </GridCol>
        <GridCol width={2}>
          {lorem.paragraph()}
        </GridCol>
      </GridRow>
    </Grid>
  ```

  #### `hAlign="space-around"`

  ```jsx_example
    <Grid hAlign="space-around" visualDebug>
      <GridRow>
        <GridCol width={2}>
          {lorem.paragraph()}
        </GridCol>
        <GridCol width={4}>
          {lorem.paragraph()}
        </GridCol>
        <GridCol width={2}>
          {lorem.paragraph()}
        </GridCol>
      </GridRow>
    </Grid>
  ```

  ### Vertically align your columns

  Align your columns along the vertical axis with the `vAlign` prop. In the example
  below the grid is set to vertically center its columns.

  ```jsx_example
    <Grid vAlign="middle" visualDebug>
      <GridRow>
        <GridCol>
          {lorem.paragraph()}
        </GridCol>
        <GridCol>
          {lorem.paragraph()}
        </GridCol>
        <GridCol>
          {lorem.paragraph()}
        </GridCol>
      </GridRow>
    </Grid>
  ```

  ### Putting it all together

  Let's use `<Grid>` to create a page header with a heading on the left side
  and some action buttons on the right. In addition, let's say that on small
  screens &#151; like smalls &#151; we want the header to stack the heading and
  the buttons.

  Use `startAt="medium"` to make the grid only affect most tablets and above. To align
  the buttons to the right, add `width="auto"` to their `<GridCol>`. This will
  make the column only expand to fit the width of the buttons. Because the
  `<GridCol>` containing the heading has no set width, it will expand by default
  to take up all the width it can, pinning the columns containing the buttons
  to the right.

  ```jsx_example
    <Grid startAt="medium" vAlign="middle" colSpacing="none">
      <GridRow>
        <GridCol>
          <Heading>I am a fairly lengthy heading for the page</Heading>
        </GridCol>
        <GridCol width="auto">
          <Button>Cancel</Button>
          &nbsp;
          <Button variant="primary">+ Widget</Button>
        </GridCol>
      </GridRow>
    </Grid>
  ```
**/
@themeable(theme, styles)
export default class Grid extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: CustomPropTypes.Children.oneOf([GridRow]),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
    visualDebug: PropTypes.bool
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    colSpacing: 'medium',
    rowSpacing: 'medium',
    hAlign: 'start',
    startAt: 'small',
    vAlign: 'top',
    visualDebug: false
  };

  startAtClass () {
    return !!this.props.startAt && (`startAt${capitalizeFirstLetter(this.props.startAt)}`)
  }

  renderChildren () {
    const children = Children.toArray(this.props.children)

    return children.map((child, index) => {
      if (matchComponentTypes(child, [GridRow])) {
        return safeCloneElement(child, {
          ...pickProps(this.props, Grid.propTypes),
          ...child.props, /* child props should override parent */
          isLastRow: ((index + 1) === children.length)
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.startAtClass()]]: !!this.props.startAt,
      [styles.visualDebug]: this.props.visualDebug
    }

    const props = omitProps(this.props, Grid.propTypes)

    return (
      <span
        {...props}
        className={classnames(classes)}
      >
        {this.renderChildren()}
      </span>
    )
  }
}

export { default as GridCol } from './GridCol'
export { default as GridRow } from './GridRow'
