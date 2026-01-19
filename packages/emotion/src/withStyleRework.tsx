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
  GenerateComponentTheme,
  GenerateStyle,
  Props
} from './EmotionTypes'

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
 * used for old (v11 and eariler) theming system
 * TODO delete when the theme migration is complete
 */
const withStyleRework = decorator(
  (
    ComposedComponent: WithStyleComponent,
    generateStyle: GenerateStyle,
    generateComponentTheme: GenerateComponentTheme
  ) => {
    const displayName = ComposedComponent.displayName || ComposedComponent.name

    const WithStyle: ForwardRefExoticComponent<
      PropsWithoutRef<Props> & RefAttributes<any>
    > & {
      generateComponentTheme?: GenerateComponentTheme
      allowedProps?: string[]
      originalType?: WithStyleComponent
      defaultProps?: Partial<any>
    } = forwardRef((props, ref) => {
      const theme = useTheme()

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

      let componentTheme: ComponentTheme =
        typeof generateComponentTheme === 'function'
          ? generateComponentTheme(theme as BaseTheme)
          : {}

      const themeOverride = getComponentThemeOverride(
        theme,
        displayName,
        ComposedComponent.componentId,
        (componentProps as ThemeOverrideProp).themeOverride,
        componentTheme
      )

      componentTheme = { ...componentTheme, ...themeOverride }

      const [styles, setStyles] = useState(
        generateStyle ? generateStyle(componentTheme, componentProps, {}) : {}
      )

      const makeStyleHandler: WithStyleProps['makeStyles'] = (extraArgs) => {
        const calculatedStyles = generateStyle(
          componentTheme,
          componentProps,
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

    // we are exposing the theme generator for the docs generation
    WithStyle.generateComponentTheme = generateComponentTheme

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

export default withStyleRework
export { withStyleRework }
export type { WithStyleProps }
