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
  Control,
  ControlType,
  PropEditorConfig,
  PropValue,
  ReactDocgenProp,
  ReactDocgenProps
} from './props'

/**
 * Props react-docgen surfaces that are internal plumbing rather than public
 * API — the same ones the docs props table hides (see `src/Properties`).
 */
const INTERNAL_PROPS = ['styles', 'makeStyles', 'dir', 'elementRef']

/** Strips a single layer of surrounding single/double quotes. */
function stripQuotes(raw: string): string {
  return raw.replace(/^['"]|['"]$/g, '')
}

/**
 * Turns a react-docgen `defaultValue.value` (a raw source string like
 * `"'secondary'"`, `"true"`, `"42"`) into a concrete form value.
 */
function parseDefault(raw: string | undefined, type: ControlType): PropValue {
  if (raw === undefined || raw === 'undefined') return undefined
  if (type === 'boolean') return raw === 'true'
  if (type === 'number') {
    const n = Number(raw)
    return Number.isNaN(n) ? undefined : n
  }
  return stripQuotes(raw)
}

/**
 * A union whose every element is a string literal maps cleanly to a select.
 */
function unionOptions(prop: ReactDocgenProp): string[] | null {
  const els = prop.tsType?.elements
  if (!els || els.length === 0) return null
  const allLiterals = els.every(
    (el) => el.name === 'literal' && typeof el.value === 'string'
  )
  if (!allLiterals) return null
  return els.map((el) => stripQuotes(el.value as string))
}

/**
 * Picks a control type from a prop's TS type. Returns `null` for anything the
 * auto-generated form can't sensibly edit (functions, objects, complex unions).
 */
function inferControlType(prop: ReactDocgenProp): ControlType | null {
  const tsName = prop.tsType?.name
  if (tsName === 'boolean') return 'boolean'
  if (tsName === 'number') return 'number'
  if (tsName === 'union' && unionOptions(prop)) return 'select'
  if (tsName === 'string' || tsName === 'ReactReactNode') return 'text'
  return null
}

/**
 * Builds the list of form controls from react-docgen prop metadata, applying
 * any author-supplied config. Props that can't be auto-edited are returned in
 * `skipped` so the UI can disclose them rather than silently dropping them.
 */
export function generateControls(
  docgenProps: ReactDocgenProps,
  config: PropEditorConfig = {}
): { controls: Control[]; skipped: string[] } {
  const { include, exclude = [], sampleChildren, overrides = {} } = config

  const names = Object.keys(docgenProps).filter((name) => {
    if (INTERNAL_PROPS.includes(name)) return false
    if (include && !include.includes(name)) return false
    if (exclude.includes(name)) return false
    return true
  })

  const controls: Control[] = []
  const skipped: string[] = []

  for (const name of names) {
    const prop = docgenProps[name]
    const override = overrides[name] || {}

    const type = override.control ?? inferControlType(prop)
    if (!type) {
      skipped.push(name)
      continue
    }

    const options =
      type === 'select'
        ? override.options ?? unionOptions(prop) ?? []
        : undefined

    let initialValue =
      override.default !== undefined
        ? override.default
        : parseDefault(prop.defaultValue?.value, type)

    // `children` has no meaningful default — seed it so the preview isn't empty.
    if (name === 'children' && initialValue === undefined) {
      initialValue = sampleChildren
    }

    controls.push({
      name,
      type,
      options,
      required: Boolean(prop.required),
      description: prop.description,
      initialValue
    })
  }

  return { controls, skipped }
}

/**
 * Escapes a value for use inside a double-quoted JSX attribute.
 */
function attrString(value: string): string {
  return value.replace(/"/g, '&quot;')
}

/**
 * Serializes the current form values into a JSX snippet for `<Name .../>`.
 * Props left at their default are omitted (so the snippet stays minimal and
 * the preview relies on the component's own defaults — which are identical).
 */
export function serializeJsx(
  displayName: string,
  controls: Control[],
  values: Record<string, PropValue>
): string {
  const attrs: string[] = []
  let childrenText = ''

  for (const control of controls) {
    const value = values[control.name]

    if (control.name === 'children') {
      childrenText = value == null ? '' : String(value)
      continue
    }

    if (value === undefined || value === '') continue
    if (value === control.initialValue) continue

    if (control.type === 'boolean') {
      attrs.push(value === true ? control.name : `${control.name}={false}`)
    } else if (control.type === 'number') {
      attrs.push(`${control.name}={${value}}`)
    } else {
      attrs.push(`${control.name}="${attrString(String(value))}"`)
    }
  }

  const attrStr = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''

  return childrenText
    ? `<${displayName}${attrStr}>${childrenText}</${displayName}>`
    : `<${displayName}${attrStr} />`
}
