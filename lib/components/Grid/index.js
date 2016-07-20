import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import capitalizeFirstLetter from '../../util/capitalizeFirstLetter'
import safeCloneElement from '../../util/safeCloneElement'
import styleable from '../../util/styleable'

import GridRow from './GridRow'

import styles from './styles.css'

/**

  ### Create a basic column layout

  Simply create a `<Grid>` with some `<GridRow>` and `GridCol` children, and
  the component will evenly distribute its columns.

  Note the `visualDebug` prop you can set if you're wondering
  exactly where your grid columns are.

  ```jsx_example
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
  ```

  ### Make the grid stack until a certain breakpoint/screen width

  Often you will want to stack your `<GridCol>`s until you reach a certain
  screen width. To do this, use the `startAt` prop.

  Reduce the screen width and see how the grid below only displays its
  columns inline after it hits the `desktop` breakpoint. Note that by
  default, stacked columns have bottom margin for visual separation.

  ```jsx_example
  <Grid startAt="desktop" visualDebug>
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
    example, if you set `width={{phone: 2}}` on a column, but the `startAt` prop
    on your `<Grid>` is set to `tablet`, the `width={{phone: 2}}` will be ignored.

  ```jsx_example
  <Grid visualDebug>
    <GridRow>
      <GridCol width={{phone: 4, tablet: 6, desktop: 3, wide: 6}}>
        {lorem.paragraph()}
      </GridCol>
      <GridCol width={{phone: 4, tablet: 4, desktop: 3, wide: 5}}>
        {lorem.paragraph()}
      </GridCol>
      <GridCol width={{phone: 4, tablet: 2, desktop: 6, wide: 1}}>
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
  values: `start`, `center`, `end`, `spaceAround`, and `spaceBetween`.

  #### `hAlign="spaceBetween"`

  ```jsx_example
    <Grid hAlign="spaceBetween" visualDebug>
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
  #### `hAlign="spaceAround"`

  ```jsx_example
    <Grid hAlign="spaceAround" visualDebug>
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
  screens &#151; like phones &#151; we want the header to stack the heading and
  the buttons.

  Use `startAt="tablet"` to make the grid only affect tablets and above. To align
  the buttons to the right, add `width="auto"` to their `<GridCol>`. This will
  make the column only expand to fit the width of the buttons. Because the
  `<GridCol>` containing the heading has no set width, it will expand by default
  to take up all the width it can, pinning the columns containing the buttons
  to the right.

  ```jsx_example
    <Grid startAt="tablet" vAlign="middle" visualDebug>
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
@styleable(styles)
export default class Grid extends Component {
  static propTypes = {
    children: CustomPropTypes.validChildren([GridRow]),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'spaceAround', 'spaceBetween']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['phone', 'tablet', 'desktop', 'wide']),
    visualDebug: PropTypes.bool
  };

  static defaultProps = {
    colSpacing: 'medium',
    rowSpacing: 'medium',
    hAlign: 'start',
    startAt: 'phone',
    vAlign: 'top',
    visualDebug: false
  };

  colSpacingClass () {
    return (
      'colSpacing' + capitalizeFirstLetter(this.props.colSpacing)
    )
  }

  startAtClass () {
    return (
      'startAt' + capitalizeFirstLetter(this.props.startAt)
    )
  }

  renderChildren () {
    const {
      children,
      ...props
    } = this.props

    return React.Children.map(children, (child) => {
      if (child && child.type === GridRow) {
        return safeCloneElement(child, {
          ...props,
          ...child.props /* child props should override parent */
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles[this.colSpacingClass()]]: true,
      [styles[this.startAtClass()]]: true,
      [styles.visualDebug]: this.props.visualDebug
    }

    return (
      <div className={classnames(classes)}>
        {this.renderChildren()}
      </div>
    )
  }
}

export { default as GridCol } from './GridCol'
export { default as GridRow } from './GridRow'
