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

import { deepEqual as isEqual } from '@instructure/ui-utils'
import { warn } from '@instructure/console'
import { decorator } from '@instructure/ui-decorator'

import { getComponentThemeOverride } from './getComponentThemeOverride'
import { useTheme } from './useTheme'

import type {
  BaseTheme,
  ComponentTheme,
  InstUIComponent
} from '@instructure/shared-types'
import type {
  ComponentStyle,
  ComponentOverride,
  GenerateStyleRework,
  Props
} from './EmotionTypes'

import type { NewComponentTypes, Theme } from '@instructure/ui-themes'

// Extract is needed because it would allow number otherwise
// https://stackoverflow.com/a/51808262/319473

// Unique name of an InstUI component
type ComponentName = Extract<keyof ComponentOverride, string>

interface WithStyleComponent extends InstUIComponent {
  componentId?: ComponentName
}

type WithStylePrivateProps<
  Style extends ComponentStyle | null = ComponentStyle
> = Style extends null
  ? object
  : {
      styles?: Style
      makeStyles?: (extraArgs?: Record<string, unknown>) => void
    }

type ThemeOverrideProp<Theme extends ComponentTheme | null = ComponentTheme> = {
  themeOverride?:
    | Partial<Theme>
    | ((componentTheme: Theme, currentTheme: BaseTheme) => Partial<Theme>)
}

type WithStyleProps<
  Theme extends ComponentTheme | null = ComponentTheme,
  Style extends ComponentStyle | null = ComponentStyle
> = Theme extends null
  ? WithStylePrivateProps<Style>
  : WithStylePrivateProps<Style> & ThemeOverrideProp<Theme>

const defaultValues = {
  styles: {},
  makeStyles: () => {}
}

/**
 * ---
 * category: utilities/themes
 * ---
 *
 * A decorator or higher order component that makes a component themeable.
 *
 * It adds a `makeStyles` function and the generated `styles` object to the decorated Component's props. If it has an own theme, it also adds the `themeOverride` prop to the component.
 *
 * As a HOC:
 *
 * ```js-code
 * import { withStyle } from '@instructure/emotion'
 * import generateStyle from './styles'
 *
 * export default withStyle(generateStyle)(ExampleComponent)
 * ```
 *
 * Themeable components inject their themed styles into the document
 * when they are mounted.
 *
 * ### Applying themes
 *
 * A themeable component’s theme can be configured via wrapping it in an
 * [InstUISettingsProvider](InstUISettingsProvider) component, and/or set
 * explicitly via its `themeOverride` prop.
 *
 * InstUISettingsProvider provides a theme object (e.g. the [canvas theme](/#canvas)).
 * These variables are mapped to the component's own variables in `theme.js` (see [theming](theming-basics) for more info).
 *
 * With the `themeOverride` prop you can directly set/override the component theme variables declared in theme.js. It accepts an object or a function. The function has the component's theme and the currently active main theme as its parameter.
 *
 * See more about the overrides on the [Using theme overrides](/#using-theme-overrides) docs page.
 *
 * ```jsx-code
 * {// global theme override}
 * <InstUISettingsProvider theme={{
 *   colors: { backgroundMedium: '#888' }
 * }}>
 *  {// component theme override}
 *   <ExampleComponent themeOverride={{ hoverColor: '#eee' }} />
 *
 *  {// component theme override with function}
 *   <ExampleComponent themeOverride={(componentTheme, currentTheme) => ({
 *     hoverBackground: componentTheme.background,
 *     activeBackground: currentTheme.colors.backgroundBrand
 *   })} />
 * </InstUISettingsProvider>
 * ```
 *
 * @module withStyle
 *
 * @param {function} generateStyle - The function that returns the component's style object
 * @returns {ReactElement} The decorated WithStyle Component
 */
const withStyle = decorator(
  (
    ComposedComponent: WithStyleComponent,
    generateStyle: GenerateStyleRework,
    useTokensFrom?: keyof NewComponentTypes
  ) => {
    const displayName = ComposedComponent.displayName || ComposedComponent.name

    const componentId = ComposedComponent.componentId?.replace('.', '')

    const WithStyle: ForwardRefExoticComponent<
      PropsWithoutRef<Props> & RefAttributes<any>
    > & {
      allowedProps?: string[]
      originalType?: WithStyleComponent
      defaultProps?: Partial<any>
    } = forwardRef((props, ref) => {
      const theme = useTheme() as Theme

      if (props.styles) {
        warn(
          false,
          `Manually passing the "styles" property is not allowed on the ${displayName} component. Using the default styles calculated by the @withStyle decorator instead.\n`,
          props.styles
        )
      }

      if (props.makeStyles) {
        warn(
          false,
          `Manually passing the "makeStyles" property is not allowed on the ${displayName} component. Styles are calculated by the @withStyle decorator.`
        )
      }

      const componentProps: Props = {
        ...ComposedComponent.defaultProps,
        ...props,
        ...defaultValues
      }

      const componentWithTokensId = useTokensFrom ?? componentId

      const baseComponentTheme =
        theme.newTheme.components[
          componentWithTokensId as keyof NewComponentTypes
        ]

      const themeOverride = getComponentThemeOverride(
        theme,
        displayName,
        ComposedComponent.componentId,
        (componentProps as ThemeOverrideProp).themeOverride,
        baseComponentTheme
      )

      const componentTheme = { ...baseComponentTheme, ...themeOverride }

      // TODO do not call here generateStyle, it does not receive the extraArgs
      const [styles, setStyles] = useState(
        generateStyle
          ? generateStyle(
              componentTheme,
              componentProps,
              (theme as Theme).newTheme.sharedTokens,
              {}
            )
          : {}
      )

      const makeStyleHandler: WithStyleProps['makeStyles'] = (extraArgs) => {
        const calculatedStyles = generateStyle(
          componentTheme,
          componentProps,
          (theme as Theme).newTheme.sharedTokens,
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
          // passing themeOverrides is needed for components like Button
          // that have no makeStyles of their own and only pass themeOverrides
          // to the underlying component (e.g.: BaseButton)
          themeOverride={themeOverride}
        />
      )
    })

    hoistNonReactStatics(WithStyle, ComposedComponent)

    // added so it can be tested with ReactTestUtils
    // more info: https://github.com/facebook/react/issues/13455
    WithStyle.originalType = ComposedComponent.originalType || ComposedComponent

    WithStyle.defaultProps = ComposedComponent.defaultProps
    // These static fields exist on InstUI components
    WithStyle.allowedProps = ComposedComponent.allowedProps

    // we have to add defaults to makeStyles and styles added by this decorator
    // eslint-disable-next-line no-param-reassign
    ComposedComponent.defaultProps = {
      ...ComposedComponent.defaultProps,
      makeStyles: defaultValues.makeStyles,
      styles: defaultValues.styles
    }

    if (process.env.NODE_ENV !== 'production') {
      WithStyle.displayName = `WithStyle(${displayName})`
    }

    return WithStyle
  }
)

export default withStyle
export { withStyle }
export type { WithStyleProps, ThemeOverrideProp }
