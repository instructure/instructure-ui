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

/**
 * A single value the editor tracks for a prop. Complex values (functions,
 * elements) are out of scope for the auto-generated form.
 */
export type PropValue = string | number | boolean | undefined

export type ControlType = 'select' | 'boolean' | 'text' | 'number'

/**
 * The subset of a react-docgen prop descriptor the editor consumes. Mirrors
 * the JSON shape emitted to `__build__/docs/<version>/<Component>.json`.
 */
export type ReactDocgenTsType = {
  name: string
  raw?: string
  elements?: Array<{ name: string; value?: string }>
}

export type ReactDocgenProp = {
  required?: boolean
  tsType?: ReactDocgenTsType
  description?: string
  defaultValue?: { value: string; computed: boolean }
}

export type ReactDocgenProps = Record<string, ReactDocgenProp>

/**
 * A resolved control ready to render as a form field.
 */
export type Control = {
  name: string
  type: ControlType
  /** Select options (bare string values, quotes stripped). */
  options?: string[]
  required: boolean
  description?: string
  /** The component's default for this prop; also the initial form value. */
  initialValue: PropValue
}

/**
 * Per-prop override, letting a doc author tune the auto-generated form.
 */
export type PropOverride = {
  control?: ControlType
  options?: string[]
  default?: PropValue
}

/**
 * Optional configuration passed from a README to adjust the generated form.
 * Everything is optional — with no config the form is derived entirely from
 * the component's prop metadata.
 */
export type PropEditorConfig = {
  /** If set, only these props get controls. */
  include?: string[]
  /** These props never get controls. */
  exclude?: string[]
  /** Default text used for the `children` control. */
  sampleChildren?: string
  /** Per-prop control overrides, keyed by prop name. */
  overrides?: Record<string, PropOverride>
}

export type PropEditorProps = {
  /**
   * The component's name. Used both to fetch its prop metadata (the doc JSON
   * file name) and as the tag rendered in the preview, so it must match a
   * component registered in the docs globals (e.g. `"Button"`, `"Avatar"`).
   */
  componentId: string
  config?: PropEditorConfig
}
