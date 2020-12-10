/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable } from '@instructure/ui-themeable'
import { omitProps, ComponentIdentifier } from '@instructure/ui-react-utils'
import { Children } from '@instructure/ui-prop-types'
import {
  IconCheckMarkSolid,
  IconNoSolid,
  IconA11ySolid
} from '@instructure/ui-icons'
import { List } from '@instructure/ui-list'
import { Responsive } from '@instructure/ui-responsive'
import { View } from '@instructure/ui-view'

import { Heading } from '../Heading'

import styles from './styles.css'
import theme from './theme'

class FigureItem extends ComponentIdentifier {
  static displayName = 'FigureItem'
}

@themeable(theme, styles)
class Figure extends Component {
  static propTypes = {
    title: PropTypes.node,
    caption: PropTypes.node,
    recommendation: PropTypes.oneOf(['yes', 'no', 'a11y', 'none']),
    iconTitle: PropTypes.string,
    float: PropTypes.oneOf(['start', 'end', 'none']),
    children: Children.oneOf(['FigureItem'])
  }

  static defaultProps = {
    recommendation: 'none',
    float: 'none',
    title: undefined,
    caption: undefined,
    iconTitle: undefined,
    children: null
  }

  static Item = FigureItem

  get recommendationIcon() {
    if (this.props.recommendation === 'yes') {
      return IconCheckMarkSolid
    } else if (this.props.recommendation === 'no') {
      return IconNoSolid
    } else if (this.props.recommendation === 'a11y') {
      return IconA11ySolid
    } else {
      return null
    }
  }

  renderFigure(props) {
    const mergedProps = { ...this.props, ...props }
    const {
      title,
      caption,
      recommendation,
      iconTitle,
      float,
      children
    } = mergedProps

    const classes = {
      [styles.root]: true,
      [styles[`float--${float}`]]: float !== 'none',
      [styles[`recommendation--${recommendation}`]]: recommendation !== 'none'
    }

    return (
      <View
        {...omitProps(mergedProps, Figure.propTypes, ['padding'])}
        as="figure"
        className={classnames(classes)}
      >
        {caption != null ? (
          <figcaption className={styles.caption}>{caption}</figcaption>
        ) : null}
        <span className={styles.content}>
          {recommendation !== 'none' ? (
            <span className={styles.iconContainer}>
              <this.recommendationIcon
                title={iconTitle}
                size="x-small"
                inline={false}
                className={styles.icon}
              />
            </span>
          ) : null}
          <Heading level="h3" as="h4" margin="medium 0 small small">
            {title}
          </Heading>
          <List itemSpacing="small" margin="0 0 small 0">
            {React.Children.map(children, (child) => {
              return <List.Item>{child}</List.Item>
            })}
          </List>
        </span>
      </View>
    )
  }

  render() {
    const { float } = this.props

    if (float !== 'none') {
      return (
        <Responsive
          query={{ small: { maxWidth: '40rem' }, large: { minWidth: '40rem' } }}
          props={{
            small: { float: 'none' },
            large: { float: float }
          }}
          match="media"
          render={(props, matches) => {
            return this.renderFigure(props)
          }}
        />
      )
    } else {
      return this.renderFigure()
    }
  }
}

export default Figure
export { Figure, FigureItem }
