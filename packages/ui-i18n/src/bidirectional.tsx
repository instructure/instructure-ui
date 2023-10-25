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
import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react'
import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { decorator } from '@instructure/ui-decorator'
import { DIRECTION, TextDirectionContext } from './TextDirectionContext'
import hoistNonReactStatics from 'hoist-non-react-statics'

// This is a workaround because TS cannot take type information from
// decorators into account. This type needs to be added to every component,
// that uses the bidirectional decorator.
// see https://github.com/microsoft/TypeScript/issues/4881
export type BidirectionalProps = PropsWithChildren<{
  dir?: 'ltr' | 'rtl'
}>

type BidirectionalInternalProps = {
  forwardedRef: ForwardedRef<any>
}

type BidirectionalType = {
  // TODO likely this can be typed better.
  (): (ComposedComponent: any) => any
  DIRECTION: typeof DIRECTION
}
/**
 * ---
 * category: utilities/i18n
 * ---
 *
 * #### DEPRECATED: This has been renamed to `textDirectionContextConsumer`, its functionality remains similar.
 *
 * A decorator or higher order component that makes a component `bidirectional`.
 *
 * As a HOC:
 *
 * ```js
 * import { bidirectional } from '@instructure/ui-i18n'
 *
 * class Example extends React.Component {
 *   render () {
 *     return this.props.dir === bidirectional.DIRECTION.rtl ? <div>rtl</div> : <div>ltr</div>
 *   }
 * }
 *
 * export default bidirectional()(Example)
 * ```
 *
 * When used as a child of [InstUISettingsProvider](#InstUISettingsProvider), bidirectional components use
 * the direction provided in `TextDirectionContext`. When used without [InstUISettingsProvider](#InstUISettingsProvider),
 * the direction can be supplied explicitly via the `dir` prop. If no `dir` prop is provided,
 * bidirectional components query the documentElement for the `dir` attribute, defaulting to `ltr`
 * if it is not present.
 *
 * @module bidirectional
 * @return The decorator that composes the bidirectional component.
 */
const bidirectional: BidirectionalType = decorator((ComposedComponent) => {
  class BidirectionalComponent extends React.Component<BidirectionalInternalProps> {
    render() {
      const { forwardedRef, ...rest } = this.props
      // Quite complex code, this is the priority order of applying the `dir` prop:
      // 1. The highest priority is adding it via a prop
      // 2. If there is a <TextDirectionContext.Provider> (or <ApplyTextDirection>
      //    which uses it) above the @bidirectional in the DOM, use its value.
      // 3. If TextDirectionContext.Provider was called without params
      //    TextDirectionContext calls getTextDirection() which returns
      //    the 'dir' prop of the HTML document element.
      return (
        <TextDirectionContext.Consumer>
          {(dir) => {
            if (process.env.NODE_ENV !== 'production' && dir === 'auto') {
              console.warn(
                "'auto' is not an supported value for the 'dir' prop. Please pass 'ltr' or 'rtl'"
              )
            }
            return <ComposedComponent ref={forwardedRef} dir={dir} {...rest} />
          }}
        </TextDirectionContext.Consumer>
      )
    }
  }

  const BidirectionalForwardingRef: ForwardRefExoticComponent<
    PropsWithoutRef<Record<string, unknown>> & RefAttributes<any>
  > & {
    originalType?: React.ComponentClass
  } = forwardRef<any, BidirectionalProps>((props, ref) => (
    <BidirectionalComponent {...props} forwardedRef={ref} />
  ))
  if (process.env.NODE_ENV !== 'production') {
    const displayName = ComposedComponent.displayName || ComposedComponent.name
    BidirectionalForwardingRef.displayName = `BidirectionalForwardingRef(${displayName})`
  }
  hoistNonReactStatics(BidirectionalForwardingRef, ComposedComponent)
  BidirectionalForwardingRef.defaultProps = ComposedComponent.defaultProps
  // eslint-disable-next-line react/forbid-foreign-prop-types
  BidirectionalForwardingRef.propTypes = ComposedComponent.propTypes
  // @ts-expect-error These static fields exist on InstUI components
  BidirectionalForwardingRef.allowedProps = ComposedComponent.allowedProps

  // added so it can be tested with ReactTestUtils
  // more info: https://github.com/facebook/react/issues/13455
  BidirectionalForwardingRef.originalType = ComposedComponent

  return BidirectionalForwardingRef
}) as BidirectionalType

bidirectional.DIRECTION = DIRECTION

export default bidirectional
export { bidirectional }
