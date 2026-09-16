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

import { INTERNAL_PROPS, NON_PREVIEWABLE_PROPS } from '../hiddenProps'

import type {
  Control,
  ControlType,
  PropEditorConfig,
  PropValue,
  ReactDocgenProp,
  ReactDocgenProps
} from './props'

/** Props the playground never offers a control for. */
const HIDDEN_PROPS = [...INTERNAL_PROPS, ...NON_PREVIEWABLE_PROPS]

/**
 * Props a component reads only while mounting, beyond the `default*` family:
 * timers and animations started from `componentDidMount`. Setting one of these
 * on an element that is already rendered does nothing.
 */
const MOUNT_ONLY_PROPS = [
  // Alert's auto-dismiss timer.
  'timeout',
  // Spinner's show-after-delay timer (a `useEffect` on `delay` in v2, but
  // mount-only in v1, which the docs still serve).
  'delay',
  // ProgressCircle seeds its mount animation from both of these in the
  // constructor.
  'shouldAnimateOnMount',
  'animationDelay'
]

/**
 * Whether a component only reads this prop at mount time. The preview has to be
 * remounted for a new value to have any effect — see `PropEditor`'s
 * `previewKey` — otherwise the control looks broken.
 */
function isMountOnly(name: string): boolean {
  // The uncontrolled seeds: `defaultChecked`, `defaultValue`, `defaultExpanded`,
  // `defaultPageIndex`, `defaultMinimized`, `defaultToFirstOption`, …
  return name.startsWith('default') || MOUNT_ONLY_PROPS.includes(name)
}

/** Strips a single layer of surrounding single/double quotes. */
function stripQuotes(raw: string): string {
  return raw.replace(/^['"]|['"]$/g, '')
}

/**
 * Turns a react-docgen `defaultValue.value` (a raw source string like
 * `"'secondary'"`, `"true"`, `"42"`) into a concrete form value.
 */
function parseDefault(raw: string | undefined, type: ControlType): PropValue {
  if (raw === undefined || raw === 'undefined' || raw === 'null')
    return undefined
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
  // react-docgen spells a node type either way depending on how the component
  // imports React (`React.ReactNode` vs a bare `ReactNode`); both take text.
  if (
    tsName === 'string' ||
    tsName === 'ReactReactNode' ||
    tsName === 'ReactNode'
  ) {
    return 'text'
  }
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
  const { include, exclude = [], defaults = {}, overrides = {} } = config

  const names = Object.keys(docgenProps).filter((name) => {
    if (HIDDEN_PROPS.includes(name)) return false
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

    // A registered default wins over the component's own: it's there because
    // the component renders nothing (or nothing useful) without it.
    const seeded = defaults[name] !== undefined
    const initialValue = seeded
      ? defaults[name]
      : parseDefault(prop.defaultValue?.value, type)

    controls.push({
      name,
      type,
      options,
      required: Boolean(prop.required),
      description: prop.description,
      initialValue,
      seeded,
      mountOnly: isMountOnly(name)
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
 * Serializes the current values into a JSX attribute string (no leading or
 * trailing space, `children` excluded), e.g. `placement="bottom" disabled`.
 *
 * A prop still at the component's own default is omitted, so the snippet stays
 * minimal and leans on the same defaults the preview does. A seeded prop is
 * always written, even untouched: it's part of the authored example (often a
 * required `label`), so leaving it out would print a snippet that doesn't
 * render what the preview shows.
 */
export function serializeAttrs(
  controls: Control[],
  values: Record<string, PropValue>
): string {
  const attrs: string[] = []

  for (const control of controls) {
    if (control.name === 'children') continue

    const value = values[control.name]
    if (value === undefined || value === '') continue
    if (value === control.initialValue && !control.seeded) continue

    if (control.type === 'boolean') {
      attrs.push(value === true ? control.name : `${control.name}={false}`)
    } else if (control.type === 'number') {
      attrs.push(`${control.name}={${value}}`)
    } else {
      attrs.push(`${control.name}="${attrString(String(value))}"`)
    }
  }

  return attrs.join(' ')
}

/** Escapes a placeholder token for use inside a regular expression. */
function escapeRegExp(raw: string): string {
  return raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Replaces every occurrence of `token` with `value`.
 *
 * An empty `value` has to take its surroundings with it, or the template is
 * left with stray whitespace. The two cases are handled separately, rather
 * than by cleaning up the finished string: a global whitespace pass also eats
 * the blank lines and line breaks the templates deliberately contain.
 */
function substitute(source: string, token: string, value: string): string {
  if (value !== '') return source.split(token).join(value)

  return (
    source
      // A placeholder alone on its line takes the whole line with it.
      .replace(
        new RegExp(`^[ \\t]*${escapeRegExp(token)}[ \\t]*\\r?\\n`, 'gm'),
        ''
      )
      // Inline, it leaves behind the space that separated it from the previous
      // attribute: `<Menu {{Menu}}>` → `<Menu>`.
      .split(` ${token}`)
      .join('')
      // Anything left (a placeholder with no leading space, e.g. the children
      // slot in `>{{Id:children}}<`) just goes.
      .split(token)
      .join('')
  )
}

/**
 * Fills a template's placeholders with the live form values. Each section
 * contributes two:
 *
 *  - `{{id}}` → that element's attributes
 *  - `{{id:children}}` → that element's `children` text, when the section
 *    exposes a control for it (the default single-element template does;
 *    hand-written templates usually author children statically instead)
 */
export function serializeComposition(
  template: string,
  sections: Array<{ id: string; controls: Control[] }>,
  values: Record<string, Record<string, PropValue>>
): string {
  let out = template

  for (const section of sections) {
    const sectionValues = values[section.id] || {}

    out = substitute(
      out,
      `{{${section.id}}}`,
      serializeAttrs(section.controls, sectionValues)
    )

    const childrenValue = section.controls.some((c) => c.name === 'children')
      ? sectionValues.children
      : undefined
    out = substitute(
      out,
      `{{${section.id}:children}}`,
      childrenValue == null ? '' : String(childrenValue)
    )
  }

  // An element left with an empty body is identical self-closed, and reads
  // better in the snippet: `<Avatar name="Sarah" ></Avatar>` → `<Avatar
  // name="Sarah" />`. Attribute values containing `>` (an arrow function)
  // simply don't match, which leaves valid JSX either way.
  return out.replace(
    /<([A-Za-z][\w.]*)((?:"[^"]*"|[^<>])*?)><\/\1>/g,
    '<$1$2 />'
  )
}
