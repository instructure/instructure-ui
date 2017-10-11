import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---

  Note that the `caption` prop is required for accessibilty. If you would
  rather hide the caption, wrap it inside a
  [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <Table
    caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}>
    <thead>
      <tr>
        <th scope="col">Band</th>
        <th scope="col">Best Album</th>
        <th scope="col">Best Song</th>
        <th scope="col">Record Label</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Beach House</th>
        <td>Depression Cherry</td>
        <td>Zebra</td>
        <td>Sub Pop</td>
      </tr>
      <tr>
        <th scope="row">Pixies</th>
        <td>Surfer Rosa</td>
        <td>Debaser</td>
        <td>4AD</td>
      </tr>
      <tr>
        <th scope="row">Falco</th>
        <td>Falco III</td>
        <td>Rock Me Amadeus</td>
        <td>Capitol Europe</td>
      </tr>
    </tbody>
  </Table>
  ```
  ### Table style variants

  Use the `striped` prop to give the table row- or column-stripes. The `size`
  prop changes the font-size and cell padding of the table. Turn on the `hover`
  prop to get highlight the row the user is hovering over. Use the `margin`
  prop to add space around the table.

  ```jsx_example
  <Table
    caption="Some great records"
    size="large"
    hover
    striped="rows"
    margin="x-large none"
  >
    <thead>
      <tr>
        <th scope="col">Band</th>
        <th scope="col">Best Album</th>
        <th scope="col">Best Song</th>
        <th scope="col">Record Label</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Fleetwood Mac</th>
        <td>Rumors</td>
        <td>Songbird</td>
        <td>Island</td>
      </tr>
      <tr>
        <th scope="row">R.E.M.</th>
        <td>Dead Letter Office</td>
        <td>Hairshirt</td>
        <td>Warner Bros.</td>
      </tr>
      <tr>
        <th scope="row">Modest Mouse</th>
        <td>Lonesome Crowded West</td>
        <td>Doin' the Cockroach</td>
        <td>Epic</td>
      </tr>
    </tbody>
  </Table>
  ```
  ```jsx_example
  <Table
    caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}
    size="small"
    striped="columns"
    margin="small none large none"
  >
    <thead>
      <tr>
        <th scope="col">Band</th>
        <th scope="col">Best Album</th>
        <th scope="col">Best Song</th>
        <th scope="col">Record Label</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Fleetwood Mac</th>
        <td>Rumors</td>
        <td>Songbird</td>
        <td>Island</td>
      </tr>
      <tr>
        <th scope="row">R.E.M.</th>
        <td>Dead Letter Office</td>
        <td>Hairshirt</td>
        <td>Warner Bros.</td>
      </tr>
      <tr>
        <th scope="row">Modest Mouse</th>
        <td>Lonesome Crowded West</td>
        <td>Doin' the Cockroach</td>
        <td>Epic</td>
      </tr>
      <tr>
        <th scope="row">Supergrass</th>
        <td>I Should Coco</td>
        <td>Caught by the Fuzz</td>
        <td>Parlophone</td>
      </tr>
      <tr>
        <th scope="row">Guided by Voices</th>
        <td>Under the Bushes Under the Stars</td>
        <td>Don't Stop Now</td>
        <td>Matador</td>
      </tr>
    </tbody>
  </Table>
  ```
**/

@deprecated('3.0.0', {
  tableData: true,
  rowHeaders: true,
  colHeaders: true
})

@themeable(theme, styles)
class Table extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * Set the table's caption element (its label)
    */
    caption: PropTypes.node.isRequired,
    /**
    * Build the table markup via the children prop
    */
    children: PropTypes.node,
    /**
    * Highlight each row on hover
    */
    hover: PropTypes.bool,
    /**
    * Controls the padding and font-size of table cells
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Add a light background color to alternate rows or columns
    */
    striped: PropTypes.oneOf(['columns', 'rows']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * @deprecated
    */
    tableData: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    /**
    * @deprecated
    */
    colHeaders: PropTypes.arrayOf(PropTypes.string),
    /**
    * @deprecated
    */
    rowHeaders: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    hover: false,
    size: 'medium'
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles.rowStriped]: this.props.striped === 'rows',
      [styles.colStriped]: this.props.striped === 'columns',
      [styles.hover]: this.props.hover
    }

    return (
      <Container
        {...omitProps(this.props, Table.propTypes, ['padding'])}
        as="table"
        className={classnames(classes)}
        margin={this.props.margin}
      >
        <caption>{this.props.caption}</caption>
        {this.props.children}
      </Container>
    )
  }
}

export default Table
