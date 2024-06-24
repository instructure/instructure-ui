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
  ClassicComponent,
  ClassicComponentClass,
  ClassType,
  Component,
  ComponentClass,
  ComponentElement,
  ComponentState,
  ReactHTML,
  ReactNode,
  ReactElement,
  ReactSVG
} from 'react'

/** Element func parameter, mainly for the `findDOMNode` util */
export type UIElement =
  | Node
  | Window
  | ReactElement
  | Component
  | (() => Node | Window | null | undefined)
  | null

/** Type that is renderable by `callRenderProp` */
export type Renderable<P = never> =
  | keyof ReactHTML
  | keyof ReactSVG
  | ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>
  | ComponentClass
  | ReactNode
  | ((data: P) => ReactNode | Element)
  | (() => ReactNode | Element)
  | Element

/**
 * Union type helper for the "children" prop.
 * The argument has to be type of, or union of type of
 * React.ComponentElement<any, any> */
export type ChildrenOfType<T extends ComponentElement<any, any>> =
  | T
  | undefined
  | null
  | ChildrenOfType<T>[]

/**
 * A DOM element or an array of DOM elements or a method that returns a DOM
 * element, that represents the part of the DOM that is not hidden from the
 * screen reader
 */
export type LiveRegion =
  | (() => (Element | null)[])
  | (() => Element | null)
  | (Element | null)[]
  | Element
  | null

interface InstUIBaseComponent {
  componentId?: string
  allowedProps?: string[]
}
export interface InstUIComponent
  extends ComponentClass<any, any>,
    InstUIBaseComponent {
  originalType?: any
}

export type Themes = 'contrast45' | 'contrast70'
