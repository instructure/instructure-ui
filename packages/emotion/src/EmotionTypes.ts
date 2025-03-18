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

import type {
  BaseTheme,
  ComponentTheme,
  ComponentThemeMap,
  DeepPartial
} from '@instructure/shared-types'

/**
 * A theme object where every prop is optional
 */
type PartialTheme = DeepPartial<Omit<BaseTheme, 'key'>>

/**
 * Keys are component IDs, values are their theme props.
 * Key can be an arbitrary string to support custom components
 */
type ComponentOverride = {
  [otherComponent: string]: ComponentTheme
} & DeepPartial<ComponentThemeMap>

/**
 * Overrides for a specific theme, e.g. Canvas
 * The `ComponentOverride` type as value is needed to be able to type
 * componentOverrides properly, see
 * https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 */
type SpecificThemeOverride = {
  [key: string]:
    | undefined
    | ComponentOverride
    | (PartialTheme & { componentOverrides?: ComponentOverride })
  componentOverrides?: ComponentOverride
}

/**
 * Can take up one of more of the following:
 * - parts of a theme object like `{typography: {fontFamily: 'Arial'}}`
 * - overrides for specific components in a `componentOverrides` prop
 * - overrides for a specific theme like `{canvas: {...}}`
 */
type ThemeOverride = PartialTheme | SpecificThemeOverride

type Overrides = {
  /**
   * Override theme variables, Keys are props of theme objects, values are their
   * overridden values, e.g.:
   * ```
   * themeOverrides: {
   *   typography: {
   *     fontFamily: 'Brush Script MT'
   *   },
   *   colors: {
   *     contrasts: {
   *       white1010: '#ff00ff'
   *     }
   *   },
   *   componentOverrides: {
   *     'Tabs.Tab': {
   *       fontSize: '5rem'
   *     }
   *   }
   * }
   * ```
   */
  themeOverrides?: ThemeOverride
  /**
   * Override individual components. Keys are component IDs,
   * values are objects with the theme variables for the given object, e.g.
   * ```
   * componentOverrides: {
   *   'Tabs.Tab': {
   *     fontSize: '5rem'
   *   }
   * }
   * ```
   */
  componentOverrides?: ComponentOverride
}

type ThemeOrOverride = BaseTheme | PartialTheme | Overrides

type Props = Record<string, unknown>
type State = Record<string, unknown>

type GenerateComponentTheme = (
  theme: BaseTheme | PartialTheme
) => ComponentTheme

type GenerateStyle = (
  componentTheme: ComponentTheme,
  props: Props,
  state?: State
) => StyleObject

type GenerateStyleFunctional = (
  componentTheme: ComponentTheme,
  params: Record<string, unknown>
) => StyleObject

type ComponentStyle<Keys extends string = string> = Record<
  Keys,
  StyleObject | string | number | undefined
>

/**
 * Style object returned by the generateStyle method of the components
 */
export interface StyleObject {
  [key: string]: StyleObject | string | number | undefined
}

export type {
  ThemeOrOverride,
  Overrides,
  ComponentOverride,
  SpecificThemeOverride,
  ThemeOverride,
  PartialTheme,
  Props,
  State,
  GenerateComponentTheme,
  GenerateStyle,
  GenerateStyleFunctional,
  ComponentStyle
}
/*
const _typeTest0: Overrides = {
  //aswssdf: 'ff00',
  themeOverrides: {
    typography: {
      //wefwef:4, // should error
      fontFamily: 'Brush Script MT' // works
    }
  }
}

const _typeTest: Overrides = {
  //aswssdf: 'ff00',
  themeOverrides: {
    fgrfg:{},
    canvas: {
      typography: {
        //iugiub: '',
        fontFamily: 'Brush Script MT' // works
      },
      colors: {
        contrasts: {
          white1010: '#ff00ff' // works
        }
      },
      componentOverrides: {
        'Tabs.Tab': {
          fontSize: '5rem' // works
        }
      },
    },
    componentOverrides: {
      shouldWork: {iubib:7}, // works
      'Tabs.Tab': {
        fontFamily: 'hhg',
        fontSize: '5rem'// works
      }
    },
    typography: {
      //wefwef:4, // should error
      fontFamily: 'Brush Script MT' // works
    },
    colors: {
      primitives: {
        green12: 'orange'
      },
      contrasts: {
        white1010: '#ff00ff' //works
      }
    }
  },
  componentOverrides: {
    'er':{},
    'Tabs.Tab': {
      fontSize: '5rem'
    }
  }
}
*/
