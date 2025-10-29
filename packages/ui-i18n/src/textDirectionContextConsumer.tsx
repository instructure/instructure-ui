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
import {
  ComponentClass,
  Component,
  ForwardedRef,
  forwardRef,
  PropsWithChildren
} from 'react'
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
// that uses the TextDirectionContextConsumer decorator.
// see https://github.com/microsoft/TypeScript/issues/4881
export type TextDirectionContextConsumerProps = PropsWithChildren<{
  dir?: 'ltr' | 'rtl'
}>

type TextDirectionContextConsumerInternalProps = {
  forwardedRef: ForwardedRef<any>
}

type TextDirectionContextConsumerType = {
  // TODO likely this can be typed better.
  (): (ComposedComponent: any) => any
  DIRECTION: typeof DIRECTION
}

interface ForwardRefComponentWithStatics
  extends ForwardRefExoticComponent<
    PropsWithoutRef<Record<string, unknown>> & RefAttributes<any>
  > {
  originalType?: ComponentClass
  defaultProps?: any
  propTypes?: any
  allowedProps?: any
}
/**
 * ---
 * category: utilities/i18n
 * ---
 *
 * A decorator or higher order component that supplies the text direction to
 * components.
 *
 * As a HOC:
 *
 * ```js-code
 * import { textDirectionContextConsumer } from '@instructure/ui-i18n'
 *
 * class Example extends Component {
 *   render () {
 *     return this.props.dir === textDirectionContextConsumer.DIRECTION.rtl ? <div>rtl</div> : <div>ltr</div>
 *   }
 * }
 *
 * export default textDirectionContextConsumer()(Example)
 * ```
 *
 * When used as a child of [InstUISettingsProvider](#InstUISettingsProvider), textDirectionContextConsumer components use
 * the direction provided in `TextDirectionContext`. When used without [InstUISettingsProvider](#InstUISettingsProvider),
 * the direction can be supplied explicitly via the `dir` prop. If no `dir` prop is provided,
 * textDirectionContextConsumer components query the documentElement for the `dir` attribute, defaulting to `ltr`
 * if it is not present.
 *
 * @module textDirectionContextConsumer
 * @return The decorator that composes the textDirectionContextConsumer component.
 */
const textDirectionContextConsumer: TextDirectionContextConsumerType =
  decorator(
    (
      ComposedComponent: ComponentClass<any> & {
        displayName?: string
        name?: string
        defaultProps?: any
        propTypes?: any
        allowedProps?: any
        originalType?: ComponentClass<any>
      }
    ) => {
      class TextDirectionContextConsumerComponent extends Component<TextDirectionContextConsumerInternalProps> {
        render() {
          const { forwardedRef, ...rest } = this.props
          // Quite complex code, this is the priority order of applying the `dir` prop:
          // 1. The highest priority is adding it via a prop
          // 2. If there is a <TextDirectionContext.Provider> (or <ApplyTextDirection>
          //    which uses it) above the @textDirectionContextConsumer in the DOM, use its value.
          // 3. If TextDirectionContext.Provider was called without params
          //    TextDirectionContext calls getTextDirection() which returns
          //    the 'dir' prop of the HTML document element.
          return (
            <TextDirectionContext.Consumer>
              {(dir) => {
                if (
                  (process.env.NODE_ENV !== 'production' ||
                    process.env.GITHUB_PULL_REQUEST_PREVIEW === 'true') &&
                  dir === 'auto'
                ) {
                  console.warn(
                    "'auto' is not an supported value for the 'dir' prop. Please pass 'ltr' or 'rtl'"
                  )
                }
                return (
                  <ComposedComponent ref={forwardedRef} dir={dir} {...rest} />
                )
              }}
            </TextDirectionContext.Consumer>
          )
        }
      }
      const TextDirectionContextConsumerForwardingRef: ForwardRefComponentWithStatics =
        forwardRef<any, TextDirectionContextConsumerProps>((props, ref) => (
          <TextDirectionContextConsumerComponent
            {...props}
            forwardedRef={ref}
          />
        ))

      // const TextDirectionContextConsumerForwardingRef: ForwardRefExoticComponent<
      //   PropsWithoutRef<Record<string, unknown>> & RefAttributes<any>
      // > & {
      //   originalType?: ComponentClass
      // } = forwardRef<any, TextDirectionContextConsumerProps>((props, ref) => (
      //   <TextDirectionContextConsumerComponent {...props} forwardedRef={ref} />
      // ))
      if (process.env.NODE_ENV !== 'production') {
        const displayName =
          ComposedComponent.displayName || ComposedComponent.name
        TextDirectionContextConsumerForwardingRef.displayName = `TextDirectionContextConsumerForwardingRef(${displayName})`
      }
      hoistNonReactStatics(
        TextDirectionContextConsumerForwardingRef,
        ComposedComponent
      )
      TextDirectionContextConsumerForwardingRef.defaultProps =
        ComposedComponent.defaultProps
      TextDirectionContextConsumerForwardingRef.propTypes =
        // eslint-disable-next-line react/forbid-foreign-prop-types
        ComposedComponent.propTypes
      TextDirectionContextConsumerForwardingRef.allowedProps =
        ComposedComponent.allowedProps

      // added so it can be tested with ReactTestUtils
      // more info: https://github.com/facebook/react/issues/13455
      TextDirectionContextConsumerForwardingRef.originalType =
        (ComposedComponent as any).originalType || ComposedComponent

      return TextDirectionContextConsumerForwardingRef
    }
  ) as TextDirectionContextConsumerType

textDirectionContextConsumer.DIRECTION = DIRECTION

export default textDirectionContextConsumer
export { textDirectionContextConsumer }
