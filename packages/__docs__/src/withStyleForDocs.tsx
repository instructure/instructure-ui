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

import { forwardRef, useState } from 'react'
import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react'

import hoistNonReactStatics from 'hoist-non-react-statics'

import { deepEqual as isEqual, mergeDeep } from '@instructure/ui-utils'
import { decorator } from '@instructure/ui-decorator'
import { applyColorModifiers, useTheme } from '@instructure/emotion'
import type { ComponentStyle } from '@instructure/emotion'
import type { Light, SharedTokens, Theme } from '@instructure/ui-themes'

/**
 * The theme's semantic tokens.
 */
type Semantics = ReturnType<Light['semantics']>

/**
 * Docs components are not registered in the theme's component map, so they read
 * what they need from here instead of from a `theme.ts`.
 */
type DocsTokens = {
  semantics: Semantics
  sharedTokens: SharedTokens
}

type Props = Record<string, unknown>

type GenerateStyle = (
  props: any,
  tokens: DocsTokens,
  extraArgs?: Record<string, unknown>
) => ComponentStyle

const defaultValues = {
  styles: {},
  makeStyles: () => {}
}

/**
 * ---
 * private: true
 * ---
 * Styling decorator for the docs app's own components.
 *
 * Docs components live outside `@instructure/ui-themes`, so they have no entry
 * in `theme.newTheme.components` and cannot get a `componentTheme` the way
 * library components do. This decorator resolves the theme the same way
 * `withStyleNew` does — `primitives -> semantics -> sharedTokens` and passes the result
 * straight to `generateStyle`.
 *
 * ```js-code
 * import { withStyleForDocs } from '../withStyleForDocs'
 * import generateStyle from './styles'
 *
 * export default withStyleForDocs(generateStyle)(ExampleComponent)
 * ```
 *
 * @param generateStyle Returns the component's style object
 */
const withStyleForDocs = decorator(
  (ComposedComponent: any, generateStyle: GenerateStyle) => {
    const displayName = ComposedComponent.displayName || ComposedComponent.name

    const WithStyle: ForwardRefExoticComponent<
      PropsWithoutRef<Props> & RefAttributes<any>
    > & {
      allowedProps?: string[]
      originalType?: any
      defaultProps?: Partial<any>
    } = forwardRef((props, ref) => {
      const theme = useTheme() as Theme
      const themeOverride = theme.themeOverride

      const componentProps: Props = {
        ...ComposedComponent.defaultProps,
        ...props,
        ...defaultValues
      }

      // same resolution order as withStyleNew, so InstUISettingsProvider-level
      // primitives/semantics/sharedTokens overrides apply here too
      const primitives = mergeDeep(
        theme.newTheme.primitives,
        themeOverride?.primitives ?? {}
      )

      const semantics = applyColorModifiers(
        mergeDeep(
          theme.newTheme.semantics?.(primitives),
          themeOverride?.semantics ?? {}
        )
      ) as Semantics

      const sharedTokens = applyColorModifiers(
        mergeDeep(
          theme.newTheme.sharedTokens?.(semantics),
          (themeOverride?.sharedTokens ?? {}) as Record<string, unknown>
        )
      ) as SharedTokens

      const tokens: DocsTokens = { semantics, sharedTokens }

      const [styles, setStyles] = useState(
        generateStyle ? generateStyle(componentProps, tokens, {}) : {}
      )

      const makeStyleHandler = (extraArgs?: Record<string, unknown>) => {
        const calculatedStyles = generateStyle(
          componentProps,
          tokens,
          extraArgs
        )
        if (!isEqual(calculatedStyles, styles)) {
          setStyles(calculatedStyles)
        }
      }

      return (
        <ComposedComponent
          ref={ref}
          {...props}
          makeStyles={makeStyleHandler}
          styles={styles}
        />
      )
    })

    hoistNonReactStatics(WithStyle, ComposedComponent)

    // added so it can be tested with ReactTestUtils
    // more info: https://github.com/facebook/react/issues/13455
    WithStyle.originalType = ComposedComponent.originalType || ComposedComponent

    WithStyle.defaultProps = ComposedComponent.defaultProps
    WithStyle.allowedProps = ComposedComponent.allowedProps

    // eslint-disable-next-line no-param-reassign
    ComposedComponent.defaultProps = {
      ...ComposedComponent.defaultProps,
      makeStyles: defaultValues.makeStyles,
      styles: defaultValues.styles
    }

    WithStyle.displayName = `WithStyle(${displayName})`

    return WithStyle
  }
)

export default withStyleForDocs
export { withStyleForDocs }
export type { DocsTokens, Semantics }
