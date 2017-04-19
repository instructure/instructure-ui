import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import classnames from 'classnames'
import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme.js'

/**
  ## Option 1: Use our styles and build your own table markup

  Note that the `caption` prop is required for accessibilty. If you would
  rather hide the caption, wrap it inside a
  [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <Table
    caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}>
    <thead>
      <tr>
        <th>Band</th>
        <th>Best Album</th>
        <th>Best Song</th>
        <th>Record Label</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Beach House</td>
        <td>Depression Cherry</td>
        <td>Zebra</td>
        <td>Sub Pop</td>
      </tr>
      <tr>
        <td>Pixies</td>
        <td>Surfer Rosa</td>
        <td>Debaser</td>
        <td>4AD</td>
      </tr>
      <tr>
        <td>Falco</td>
        <td>Falco III</td>
        <td>Rock Me Amadeus</td>
        <td>Capitol Europe</td>
      </tr>
    </tbody>
  </Table>
  ```
  ## Option 2: Use our API

  Add the table data or the table headers via the `tableData` and
  `colHeaders` props.

  ```jsx_example
  <Table
    caption="Some great records"
    colHeaders={["Band", "Best Album", "Best Song", "Record Label"]}
    tableData={[
      {
        band: 'Fleetwood Mac',
        bestAlbum: 'Rumors',
        bestSong: 'Songbird',
        recordLabel: 'Island'
      },
      {
        band: 'R.E.M.',
        bestAlbum: 'Dead Letter Office',
        bestSong: 'Hairshirt',
        recordLabel: 'Warner Bros.'
      },
      {
        band: 'Modest Mouse',
        bestAlbum: 'Lonesome Crowded West',
        bestSong: 'Doin\' the Cockroach',
        recordLabel: 'Epic'
      }
    ]}
  />
  ```
  If you want the cells in the first column of the table to be `<th>` elements
  with `scope="row"`, turn on the `rowHeaders` prop.

  ```jsx_example
  <Table
    caption="Some great records"
    colHeaders={["Band", "Best Album", "Best Song", "Record Label"]}
    rowHeaders
    tableData={[
      {
        band: 'Fleetwood Mac',
        bestAlbum: 'Rumors',
        bestSong: 'Songbird',
        recordLabel: 'Island'
      },
      {
        band: 'R.E.M.',
        bestAlbum: 'Dead Letter Office',
        bestSong: 'Hairshirt',
        recordLabel: 'Warner Bros.'
      },
      {
        band: 'Modest Mouse',
        bestAlbum: 'Lonesome Crowded West',
        bestSong: 'Doin\' the Cockroach',
        recordLabel: 'Epic'
      }
    ]}
  />
  ```
  ### Table style variants

  Use the `striped` prop to give the table row- or column-stripes. The `size`
  prop changes the font-size and cell padding of the table. Turn on the `hover`
  prop to get highlight the row the user is hovering over. Use the `margin`
  prop to add space around the table.

  ```jsx_example
  <Table
    caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}
    size="large"
    hover
    striped="rows"
    margin="xLarge none"
    colHeaders={["Band", "Best Album", "Best Song", "Record Label"]}
    tableData={[
      {
        band: 'Fleetwood Mac',
        bestAlbum: 'Rumors',
        bestSong: 'Songbird',
        recordLabel: 'Island'
      },
      {
        band: 'R.E.M.',
        bestAlbum: 'Dead Letter Office',
        bestSong: 'Hairshirt',
        recordLabel: 'Warner Bros.'
      },
      {
        band: 'Modest Mouse',
        bestAlbum: 'Lonesome Crowded West',
        bestSong: 'Doin\' the Cockroach',
        recordLabel: 'Epic'
      }
    ]}
  />
  ```
  ```jsx_example
  <Table
    caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}
    rowHeaders
    size="small"
    striped="columns"
    margin="small none large none"
    colHeaders={["Band", "Best Album", "Best Song", "Record Label"]}
    tableData={[
      {
        band: 'Fleetwood Mac',
        bestAlbum: 'Rumors',
        bestSong: 'Songbird',
        recordLabel: 'Island'
      },
      {
        band: 'R.E.M.',
        bestAlbum: 'Dead Letter Office',
        bestSong: 'Hairshirt',
        recordLabel: 'Warner Bros.'
      },
      {
        band: 'Modest Mouse',
        bestAlbum: 'Lonesome Crowded West',
        bestSong: 'Doin\' the Cockroach',
        recordLabel: 'Epic'
      },
      {
        band: 'Supergrass',
        bestAlbum: 'I Should Coco',
        bestSong: 'Caught by the Fuzz',
        recordLabel: 'Parlophone'
      },
      {
        band: 'Guided by Voices',
        bestAlbum: 'Under the Bushes Under the Stars',
        bestSong: 'Don\'t Stop Now',
        recordLabel: 'Matador'
      }
    ]}
  />
  ```
**/

@themeable(theme, styles)
class Table extends Component {
  static propTypes = {
    /**
    * Set the table's caption element (its label)
    */
    caption: PropTypes.node.isRequired,
    /**
    * Manually build the table markup via the children prop,
    * or supply the table data via the tableData and colHeaders props
    */
    children: PropTypes.node,
    /**
    * Supply the table's column headers
    */
    colHeaders: PropTypes.arrayOf(PropTypes.string),
    /**
    * Highlight each row on hover
    */
    hover: PropTypes.bool,
    /**
    * The table data
    */
    tableData: PropTypes.array,
    /**
    * Make items in the first column table headers
    */
    rowHeaders: PropTypes.bool,
    /**
    * Controls the padding and font-size of table cells
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Add a light background color to alternate rows or columns
    */
    striped: PropTypes.oneOf(['columns', 'rows']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }

  static defaultProps = {
    hover: false,
    rowHeaders: false,
    size: 'medium'
  }

  renderHeaders () {
    return this.props.colHeaders.map((header, i) => {
      return (
        <th key={i} scope="col">
          {header}
        </th>
      )
    })
  }

  renderRows () {
    return (
      this.props.tableData.map((row, rowIndex) =>
        <tr key={rowIndex}>
          {
            Object.keys(row).map((col, colIndex) =>
              (colIndex === 0 && this.props.rowHeaders)
                ? <th scope="row" key={colIndex}>{row[col]}</th>
                : <td key={colIndex}>{row[col]}</td>
            )
          }
        </tr>
      )
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles.rowStriped]: this.props.striped === 'rows',
      [styles.colStriped]: this.props.striped === 'columns',
      [styles.hover]: this.props.hover,
      [styles.rowHeaders]: this.props.rowHeaders
    }

    return (
      <Container
        as="table"
        className={classnames(classes)}
        margin={this.props.margin}
        display={null}
      >
        <caption>{this.props.caption}</caption>
        { this.props.colHeaders
          ? <thead><tr>{this.renderHeaders()}</tr></thead> : null
        }
        { this.props.tableData
          ? <tbody>{this.renderRows()}</tbody> : null
        }
        { this.props.children
          ? this.props.children : null
        }
      </Container>
    )
  }
}

export default Table
