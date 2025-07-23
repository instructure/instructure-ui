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

import { Children, Component, PropsWithChildren } from 'react'

import { omitProps, ensureSingleChild } from '@instructure/ui-react-utils'
import {
  IconCheckMarkSolid,
  IconNoSolid,
  IconA11ySolid
} from '@instructure/ui-icons'
import { List } from '@instructure/ui-list'
import { Responsive } from '@instructure/ui-responsive'
import { View } from '@instructure/ui-view'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Heading } from '../Heading'
import type { FigureProps } from './props'
import { allowedProps } from './props'

class FigureItem extends Component<PropsWithChildren> {
  static displayName = 'FigureItem'

  static defaultProps = {
    children: null
  }

  render() {
    const { children, ...props } = this.props

    return ensureSingleChild(children, props)
  }
}

@withStyle(generateStyle, generateComponentTheme)
class Figure extends Component<FigureProps> {

  static allowedProps = allowedProps

  static defaultProps = {
    recommendation: 'none',
    float: 'none',
    title: undefined,
    caption: undefined,
    iconTitle: undefined,
    children: null
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  static Item = FigureItem

  get recommendationIcon() {
    if (this.props.recommendation === 'yes') {
      return IconCheckMarkSolid
    } else if (this.props.recommendation === 'no') {
      return IconNoSolid
    } else if (this.props.recommendation === 'a11y') {
      return IconA11ySolid
    }
    return IconNoSolid
  }

  renderFigure(props?: FigureProps) {
    const { styles } = this.props
    const mergedProps = { ...this.props, ...props }
    const { title, caption, recommendation, iconTitle, children } = mergedProps
    const RecommendationIcon = this.recommendationIcon

    return (
      <View
        {...omitProps(mergedProps, Figure.allowedProps, ['padding'])}
        as="figure"
        css={styles?.figure}
      >
        {caption != null ? (
          <figcaption css={styles?.caption}>{caption}</figcaption>
        ) : null}
        <span css={styles?.content}>
          {recommendation !== 'none' ? (
            <span css={styles?.iconContainer}>
              <RecommendationIcon
                title={iconTitle}
                size="x-small"
                inline={false}
              />
            </span>
          ) : null}
          <Heading level="h3" as="h4" margin="medium 0 small small">
            {title}
          </Heading>
          <List itemSpacing="small" margin="0 0 small 0">
            {Children.map(children, (child) => {
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
          render={(props) => {
            return this.renderFigure(props as FigureProps)
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
