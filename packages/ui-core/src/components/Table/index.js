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
