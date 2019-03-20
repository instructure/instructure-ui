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

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import ComponentIdentifier from '@instructure/ui-utils/lib/react/ComponentIdentifier'
import { Children } from '@instructure/ui-prop-types'

import IconCheckMark from '@instructure/ui-icons/lib/Solid/IconCheckMark'
import IconNo from '@instructure/ui-icons/lib/Solid/IconNo'
import IconA11y from '@instructure/ui-icons/lib/Solid/IconA11y'

import Heading from '@instructure/ui-elements/lib/components/Heading'
import List, { ListItem } from '@instructure/ui-elements/lib/components/List'
import View from '@instructure/ui-layout/lib/components/View'
import Responsive from '@instructure/ui-layout/lib/components/Responsive'

import styles from './styles.css'
import theme from './theme'

class FigureItem extends ComponentIdentifier {
  static displayName = 'FigureItem'
}

@themeable(theme, styles)
export default class Figure extends Component {

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

  get recommendationIcon () {
    if (this.props.recommendation === 'yes') {
      return IconCheckMark
    } else if (this.props.recommendation === 'no') {
      return IconNo
    } else if (this.props.recommendation === 'a11y') {
      return IconA11y
    } else {
      return null
    }
  }

  renderFigure (props) {
    const mergedProps = {...this.props, ...props}
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
        {caption != null ?
          <figcaption className={styles.caption}>
            {caption}
          </figcaption>  : null
        }
        <span className={styles.content}>
          {recommendation !== 'none' ?
            <span className={styles.iconContainer}>
              <this.recommendationIcon
                title={iconTitle}
                size="x-small"
                inline={false}
                className={styles.icon}
              />
            </span> : null}
            <Heading level="h3" as="h4" margin="medium 0 small small">
              {title}
            </Heading>
            <List itemSpacing="small" margin="0 0 small 0">
              {React.Children.map(children, child => {
                return (
                  <ListItem>{child}</ListItem>
                )
              })}
            </List>
        </span>
      </View>
    )
  }

  render () {
    const {
      float
    } = this.props

    if (float !== 'none') {
      return (
        <Responsive
          query={{ small: { maxWidth: '40rem' }, large: { minWidth: '40rem' }}}
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

export { FigureItem }
