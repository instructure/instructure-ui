import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import GridCol from './GridCol'

import styles from './Grid.css'
import themeVariables from './theme/Grid'
import themeStyles from './theme/Grid.css'

/**

  ### Create a basic column layout

  Simply create a `<Grid>` with some `<GridCol>` children, and
  the component will evenly distribute its columns.

  Note the `visualDebug` prop you can set if you're wondering
  exactly where your grid columns are.

  ```jsx_example
  <Grid visualDebug>
    <GridCol>
      Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
      loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
      belly tenderloin short ribs tri-tip ham hock jowl.
    </GridCol>
    <GridCol>
      Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
      shank ham chuck short loin beef meatloaf pork loin.
    </GridCol>
    <GridCol>
      Frankfurter drumstick strip steak chicken venison. Sausage filet mignon
      pork picanha, pancetta bacon turducken short ribs.
    </GridCol>
  </Grid>
  ```

  ### Make the grid stack until a certain breakpoint/screen width

  Often you will want to stack your `<GridCol>`s until you reach a certain
  screen width. To do this, use the `startAt` prop. It accepts the following
  values: `phone`, `tablet`, `desktop`, and `wide`. These values correspond to
  the breakpoints that are set in the `theme/config/breakpoints.js` file.

  Reduce the screen width and see how the grid below only displays its
  columns inline after it hits the `desktop` breakpoint. Note that by
  default, stacked columns have bottom margin for visual separation.

  ```jsx_example
  <Grid startAt="desktop" visualDebug>
    <GridCol>
      Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
      loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
      belly tenderloin short ribs tri-tip ham hock jowl.
    </GridCol>
    <GridCol>
      Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
      shank ham chuck short loin beef meatloaf pork loin.
    </GridCol>
  </Grid>
  ```

  ### Control the width of each column

  You can control the width of the `<GridCol>` columns for each InstUI
  breakpoint. These widths persist until they are overwritten by a
  wider breakpoint. Please note the following:

  + The grid is made up of **10 columns**. If the columns' total
  width exceeds 10, the layout will break.

  + In addition to accepting the numerical values `1, 2, 3 ... 10`,
    columns can also accept an `auto` value. This tells the column
    to expand to the width of its content. (See the final example grid
    to see how this can be useful for right-aligning column content.)

  + The `startAt` prop setting supercedes any `<GridCol>` width props. For
    example, if you set `phone={2}` on a column, but the `startAt` prop
    on your `<Grid>` is set to `tablet`, the `phone={2}` will be ignored.

  ```jsx_example
  <Grid visualDebug>
    <GridCol phone={1} tablet={5} desktop={2} wide={6}>
      Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
      loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
      belly tenderloin short ribs tri-tip ham hock jowl.
    </GridCol>
    <GridCol phone={3} tablet={1} desktop={5} wide={2}>
      Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
      shank ham chuck short loin beef meatloaf pork loin.
    </GridCol>
    <GridCol phone={6} tablet={4} desktop={3} wide={2}>
      Frankfurter drumstick strip steak chicken venison. Sausage filet mignon
      pork picanha, pancetta bacon turducken short ribs.
    </GridCol>
  </Grid>
  ```

  ### Add space/gutter between columns

  To add uniform left- and right-padding inside grid columns, use the `gutter` prop,
  which accepts `small`, `medium`, and `large` as values. These values come from the
  `lib/theme/config/spacing.js` file, to ensure spacing that is consistent with
  that of other InstUI components.

  ```jsx_example
  <Grid gutter="medium" visualDebug>
    <GridCol>
      Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
      loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
      belly tenderloin short ribs tri-tip ham hock jowl.
    </GridCol>
    <GridCol>
      Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
      shank ham chuck short loin beef meatloaf pork loin.
    </GridCol>
    <GridCol>
      Frankfurter drumstick strip steak chicken venison. Sausage filet mignon
      pork picanha, pancetta bacon turducken short ribs.
    </GridCol>
  </Grid>
  ```

  Another useful method for spacing out `<GridCol>` elements is to use the `halign`
  prop together with set widths on the columns. `halign` accepts the following
  values: `left`, `center`, `right`, `spaceAround`, and `spaceBetween`.

  #### `halign="spaceBetween"`

  ```jsx_example
    <Grid halign="spaceBetween" visualDebug>
      <GridCol phone={3}>
        Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
        loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
        belly tenderloin short ribs tri-tip ham hock jowl.
      </GridCol>
      <GridCol phone={3}>
        Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
        shank ham chuck short loin beef meatloaf pork loin.
      </GridCol>
      <GridCol phone={3}>
        Frankfurter drumstick strip steak chicken venison. Sausage filet mignon
        pork picanha, pancetta bacon turducken short ribs.
      </GridCol>
    </Grid>
  ```
  #### `halign="spaceAround"`

  ```jsx_example
    <Grid halign="spaceAround" visualDebug>
      <GridCol phone={2}>
        Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
        loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
        belly tenderloin short ribs tri-tip ham hock jowl.
      </GridCol>
      <GridCol phone={4}>
        Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
        shank ham chuck short loin beef meatloaf pork loin.
      </GridCol>
      <GridCol phone={2}>
        Frankfurter drumstick strip steak chicken venison. Sausage filet mignon
        pork picanha, pancetta bacon turducken short ribs.
      </GridCol>
    </Grid>
  ```

  ### Vertically align your columns

  Align your columns along the vertical axis with the `valign` prop. In the example
  below the grid is set to vertically center its columns.

  ```jsx_example
    <Grid valign="center" visualDebug>
      <GridCol>
        Bacon ipsum dolor amet pancetta cow tri-tip picanha brisket cupim pork
        loin beef ribs. Hamburger landjaeger flank, beef ribs prosciutto pork
        belly tenderloin short ribs tri-tip ham hock jowl.
      </GridCol>
      <GridCol>
        Tenderloin ham hock pastrami, bresaola beef ribs tail landjaeger pork
        shank ham chuck short loin beef meatloaf pork loin.
      </GridCol>
      <GridCol>
        Frankfurter drumstick strip steak chicken venison. Sausage filet mignon
        pork picanha, pancetta bacon turducken short ribs.
      </GridCol>
    </Grid>
  ```

  ### Putting it all together

  Let's use `<Grid>` to create a page header with a heading on the left side
  and some action buttons on the right. In addition, let's say that on small
  screens &#151; like phones &#151; we want the header to stack the heading and
  the buttons.

  Use `startAt="tablet"` to make the grid only affect tablets and above. To align
  the buttons to the right, add `tablet="auto"` to their `<GridCol>`. This will
  make the column only expand to fit the width of the buttons. Because the
  `<GridCol>` containing the heading has no set width, it will expand by default
  to take up all the width it can, pinning the columns containing the buttons
  to the right.

  ```jsx_example
    <Grid startAt="tablet" valign="center" visualDebug>
      <GridCol>
        <Heading>I am a fairly lengthy heading for the page</Heading>
      </GridCol>
      <GridCol tablet="auto">
        <Button>Cancel</Button>
        &nbsp;
        <Button style="primary">+ Widget</Button>
      </GridCol>
    </Grid>
  ```
**/

@themeable(themeVariables, themeStyles)
export default class Grid extends Component {
  static propTypes = {
    children: CustomPropTypes.validChildren([GridCol]),
    gutter: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    halign: PropTypes.oneOf(['left', 'center', 'right', 'spaceAround', 'spaceBetween']),
    startAt: PropTypes.oneOf(['phone', 'tablet', 'desktop', 'wide']),
    valign: PropTypes.oneOf(['top', 'center', 'bottom']),
    visualDebug: PropTypes.bool
  };

  static defaultProps = {
    gutter: 'none',
    halign: 'left',
    startAt: 'phone',
    valign: 'top',
    visualDebug: false
  };

  handleStartAt () {
    return (
      'startAt' + (this.props.startAt).charAt(0).toUpperCase() + (this.props.startAt).slice(1)
    )
  }

  handleVAlign () {
    if (this.props.valign === 'center') {
      return 'vAlignCenter'
    } else {
      return this.props.valign
    }
  }

  renderChildren () {
    const {
      children,
      gutter,
      startAt,
      visualDebug
    } = this.props

    return React.Children.map(children, (child) => {
      if (child && child.type === GridCol) {
        return (
          <GridCol {...child.props}
            gutter={gutter}
            startAt={startAt}
            visualDebug={visualDebug}
          />
        )
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const {
      children,
      halign,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    const classes = {
      [styles.root]: true,
      [styles[halign]]: true,
      [styles[this.handleVAlign()]]: true,
      [styles[this.handleStartAt()]]: true
    }

    return (
      <div className={classnames(classes)}>
        {this.renderChildren()}
      </div>
    )
  }
}

export { default as GridCol } from './GridCol'
