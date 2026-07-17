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
import { JSCodeshift, Collection, Transform } from 'jscodeshift'
import instUICodemodExecutor from '../utils/instUICodemodExecutor'
import type { InstUICodemod } from '../utils/instUICodemodExecutor'
import { isJSXAttribute } from '../utils/codemodTypeCheckers'
import { findImport, printWarning } from '../utils/codemodHelpers'
import { namedTypes } from 'ast-types'

/**
 * Migrates the legacy provider-level theme override
 *   <InstUISettingsProvider theme={{ componentOverrides: { Comp: {...} } }} />
 * to the new theming-system shape
 *   <InstUISettingsProvider themeOverride={{ components: { Comp: {...} } }} />
 *
 * This is purely structural: v2 components (`withStyleNew`) only read overrides
 * from `themeOverride.components`, never from the legacy `theme.componentOverrides`
 * channel, so every component override must move - regardless of whether its
 * tokens have changed. Token renames are handled separately by
 * `transformThemeVariables`.
 */
const migrateComponentOverridesToThemeOverride: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(
    migrateComponentOverridesToThemeOverrideCodemod,
    file,
    api,
    options
  )
}

type ObjectExpression = namedTypes.ObjectExpression
type ObjectProperty = namedTypes.ObjectProperty

/**
 * Finds a direct, simple `key: { ... }` property on an object expression.
 */
const findObjectProperty = (
  obj: ObjectExpression,
  name: string
): ObjectProperty | undefined => {
  return obj.properties.find(
    (p): p is ObjectProperty =>
      p.type === 'ObjectProperty' &&
      p.key.type === 'Identifier' &&
      p.key.name === name
  )
}

/**
 * Resolves a token key name whether written as an identifier (`padding`) or a
 * quoted string literal (`'padding'`).
 */
const getTokenKeyName = (key: ObjectProperty['key']): string | undefined => {
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' || (key.type as string) === 'StringLiteral') {
    const value = (key as namedTypes.Literal).value
    if (typeof value === 'string') return value
  }
  return undefined
}

/**
 * Appends `source`'s token properties into `target`, skipping any whose key is
 * already present in `target`. Two overrides can't be merged into a single token
 * key (a duplicate object key would silently clobber the first at runtime), so
 * the first value is kept and each dropped duplicate is warned about with
 * `reason` for manual reconciliation.
 */
const mergeTokenPropsDeduped = (
  target: ObjectExpression,
  source: ObjectExpression,
  slotName: string,
  filePath: string,
  reason: string
) => {
  const seenTokens = new Set(
    target.properties
      .map((p) =>
        p.type === 'ObjectProperty' ? getTokenKeyName(p.key) : undefined
      )
      .filter((n): n is string => !!n)
  )
  source.properties.forEach((sourceProp) => {
    const name =
      sourceProp.type === 'ObjectProperty'
        ? getTokenKeyName(sourceProp.key)
        : undefined
    if (name && seenTokens.has(name)) {
      printWarning(
        filePath,
        sourceProp.loc?.start.line,
        `Duplicate \`${name}\` override for \`${slotName}\`: ${reason} Kept the ` +
          `first value and dropped this one - these overrides can no longer differ ` +
          `for \`${name}\`, so reconcile it manually.`
      )
      return
    }
    if (name) seenTokens.add(name)
    target.properties.push(sourceProp)
  })
}

/**
 * Merges the `components` entries of `source` into `target`. If a component key
 * already exists in `target`, the relocated token properties are appended to it
 * (duplicate token keys dropped + warned); otherwise the whole entry is added.
 */
const mergeComponentEntries = (
  target: ObjectExpression,
  source: ObjectExpression,
  filePath: string
) => {
  source.properties.forEach((sourceProp) => {
    if (
      sourceProp.type !== 'ObjectProperty' ||
      sourceProp.key.type !== 'Identifier'
    ) {
      // spreads / computed keys: just carry them over untouched
      target.properties.push(sourceProp)
      return
    }
    const existing = findObjectProperty(target, sourceProp.key.name)
    if (
      existing &&
      existing.value.type === 'ObjectExpression' &&
      sourceProp.value.type === 'ObjectExpression'
    ) {
      mergeTokenPropsDeduped(
        existing.value,
        sourceProp.value,
        sourceProp.key.name,
        filePath,
        `the relocated \`theme.componentOverrides\` and the existing ` +
          `\`themeOverride.components\` both set it.`
      )
    } else {
      target.properties.push(sourceProp)
    }
  })
}

/**
 * Combines entries in the SAME `components` object that share a key. The v1
 * `Checkbox` and `CheckboxFacade` are one and the same `Checkbox` component in
 * v2, so re-keying `CheckboxFacade` -> `Checkbox` leaves two `Checkbox` entries.
 * A duplicate object key silently clobbers the first at runtime, so we merge
 * their token objects into one.
 */
const dedupeComponentKeys = (
  components: ObjectExpression,
  filePath: string
) => {
  const seen = new Map<string, ObjectProperty>()
  const merged: ObjectExpression['properties'] = []
  components.properties.forEach((prop) => {
    if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
      const existing = seen.get(prop.key.name)
      if (
        existing &&
        existing.value.type === 'ObjectExpression' &&
        prop.value.type === 'ObjectExpression'
      ) {
        mergeTokenPropsDeduped(
          existing.value,
          prop.value,
          prop.key.name,
          filePath,
          `two override keys resolve to the same \`themeOverride.components\` key ` +
            `(\`${prop.key.name}\`) - e.g. both a dotted (\`X.Y\`) and dot-stripped ` +
            `(\`XY\`) form were set - and each set it.`
        )
        return
      }
      seen.set(prop.key.name, prop)
    }
    merged.push(prop)
  })
  // eslint-disable-next-line no-param-reassign
  components.properties = merged
}

const SPREAD_WARNING =
  'A spread (`...`) inside `componentOverrides` could not be inspected - theme ' +
  'variable renames and child-component key changes inside it were not applied. ' +
  'Please review it manually.'

/**
 * Provider overrides are always relocated to the new `themeOverride.components`
 * channel. But v1 components (imported from v11.6 or earlier) still read the
 * legacy `theme.componentOverrides` channel, so their overrides stop applying
 * after the move. A `componentOverrides` key is a plain string with no version
 * info, so we can't tell which keys are v1 - warn unconditionally whenever a
 * provider's overrides are relocated.
 */
const V1_OVERRIDE_WARNING =
  'Component overrides were moved from `theme.componentOverrides` to ' +
  '`themeOverride.components`. Components imported from v11.6 or earlier still ' +
  'read the legacy `theme.componentOverrides` channel, so any such component ' +
  'inside this provider will no longer receive its override - upgrade those ' +
  'components to v11.7 or `latest`.'

/**
 * Converts dotted child-component keys to the dot-stripped `componentId` form
 * the new theming system expects (e.g. `'List.Item'` -> `ListItem`,
 * `'Table.RowHeader'` -> `TableRowHeader`), matching `withStyleNew`'s
 * `componentId.replace('.', '')`. v2 reads `themeOverride.components[componentId]`
 * with the dot removed, so a relocated dotted key would otherwise be dead.
 * Non-dotted keys are left untouched.
 */
const normalizeComponentKeys = (
  j: JSCodeshift,
  components: ObjectExpression,
  filePath: string
) => {
  components.properties.forEach((prop) => {
    // A spread at the componentOverrides level (`{ ...x, Comp: {} }`) may hide
    // component overrides we can't see - warn.
    if (prop.type === 'SpreadElement') {
      printWarning(filePath, prop.loc?.start.line, SPREAD_WARNING)
      return
    }
    if (prop.type !== 'ObjectProperty') return
    const { key } = prop

    // Computed keys (e.g. `[List.Item.componentId]`) are runtime values we
    // can't resolve statically. The new theming system keys components by the
    // dot-stripped componentId, so a computed key would be dead in v2 - warn
    // and leave it for the developer to convert manually.
    if (prop.computed) {
      printWarning(
        filePath,
        prop.loc?.start.line,
        'Computed component key in `componentOverrides` could not be migrated ' +
          'automatically. The new theming system keys `themeOverride.components` ' +
          'by the dot-stripped componentId (e.g. `ListItem`); convert this key ' +
          'manually.'
      )
      return
    }

    // A spread inside a component's token object (`Comp: { ...x, token }`) may
    // hide theme variables we can't rename - warn.
    if (
      prop.value?.type === 'ObjectExpression' &&
      prop.value.properties.some((p) => p.type === 'SpreadElement')
    ) {
      printWarning(filePath, prop.value.loc?.start.line, SPREAD_WARNING)
    }

    let name: string | undefined
    if (key.type === 'Identifier') {
      name = key.name
    } else if (
      key.type === 'Literal' ||
      (key.type as string) === 'StringLiteral'
    ) {
      const value = (key as namedTypes.Literal).value
      if (typeof value === 'string') name = value
    }
    if (name) {
      // Dot-strip child-component keys to the v2 componentId form
      // (`List.Item` -> `ListItem`). Every v2 component reads its own
      // dot-stripped slot, so there is no cross-component re-keying.
      const newName = name.replace('.', '')
      if (newName !== name) {
        // eslint-disable-next-line no-param-reassign
        prop.key = j.identifier(newName)
      }
    }
  })

  // Dot-stripping may have produced two entries with the same key (e.g. a file
  // with both `'List.Item'` and `ListItem`); merge them.
  dedupeComponentKeys(components, filePath)
}

// Main codemod logic
const migrateComponentOverridesToThemeOverrideCodemod: InstUICodemod = (
  j: JSCodeshift,
  root: Collection,
  filePath: string
) => {
  let hasModifications = false

  const providerImport = findImport(j, root, 'InstUISettingsProvider', [
    '@instructure/ui',
    '@instructure/emotion'
  ])
  if (!providerImport) {
    return false
  }

  root.findJSXElements(providerImport).forEach((provider) => {
    const attributes = provider.node.openingElement.attributes
    if (!attributes) return

    const themeAttr = attributes.find(
      (attr) => isJSXAttribute(attr) && attr.name.name === 'theme'
    ) as namedTypes.JSXAttribute | undefined

    // Case 3: no static `theme={{ ... }}` object -> nothing to migrate.
    // (Dynamic themes - functions, identifiers - are left untouched; the
    // token codemod warns about those.)
    if (
      !themeAttr ||
      themeAttr.value?.type !== 'JSXExpressionContainer' ||
      themeAttr.value.expression?.type !== 'ObjectExpression'
    ) {
      return
    }

    const themeObject = themeAttr.value.expression

    // Theme-name-scoped overrides (`theme.themeOverrides.<themeName>`) apply only
    // when that named theme is active. The new theming system's `themeOverride`
    // is unconditional - there is no "override only under theme X" equivalent -
    // so this can't be migrated. Leave it untouched and warn.
    const themeOverridesProp = findObjectProperty(themeObject, 'themeOverrides')
    if (themeOverridesProp) {
      printWarning(
        filePath,
        themeOverridesProp.loc?.start.line,
        'Theme-specific overrides (`theme.themeOverrides.<themeName>`) are no ' +
          'longer supported - the new theming system applies `themeOverride` ' +
          'unconditionally, with no per-theme equivalent. Left unchanged; ' +
          'migrate it manually.'
      )
    }

    const coProp = findObjectProperty(themeObject, 'componentOverrides')

    // Case 3 (cont.): theme has no `componentOverrides` key -> leave it.
    if (!coProp) {
      return
    }

    const componentsValue = coProp.value

    // An empty static override has nothing to move (Case 4); a non-static value
    // is always relocated.
    const hasOverrides =
      componentsValue.type !== 'ObjectExpression' ||
      componentsValue.properties.length > 0

    // Case 5 needs an existing `themeOverride` that is an object literal to merge
    // into. If one is present but opaque (a variable, call, ternary...), we can
    // neither merge into it nor add a second `themeOverride` (two of the same
    // attribute is invalid JSX - the later one silently wins). Leave everything
    // untouched and warn so the developer moves the overrides manually.
    const existingThemeOverride = attributes.find(
      (attr) => isJSXAttribute(attr) && attr.name.name === 'themeOverride'
    ) as namedTypes.JSXAttribute | undefined

    const existingIsMergeableObject =
      existingThemeOverride?.value?.type === 'JSXExpressionContainer' &&
      existingThemeOverride.value.expression?.type === 'ObjectExpression'

    if (hasOverrides && existingThemeOverride && !existingIsMergeableObject) {
      printWarning(
        filePath,
        coProp.loc?.start.line,
        '`componentOverrides` could not be moved to the ' +
          '`themeOverride.components` prop because this InstUISettingsProvider ' +
          'already has a `themeOverride` whose value is not an object literal, ' +
          'so the two could not be merged. Please move the overrides manually.'
      )
      return
    }

    if (componentsValue.type === 'ObjectExpression') {
      // Child-component keys must use the dot-stripped componentId in v2.
      normalizeComponentKeys(j, componentsValue, filePath)
    } else {
      // A non-static componentOverrides value (a variable/expression) is still
      // relocated to the new channel, but we can't rename tokens or fix child
      // keys inside it - warn so the developer checks it.
      printWarning(
        filePath,
        coProp.loc?.start.line,
        '`componentOverrides` was relocated to the `themeOverride.components` ' +
          'prop, but its value is not a static object - theme variable renames ' +
          'and child-component key changes inside it could not be applied. ' +
          'Please review it manually.'
      )
    }

    // Remove `componentOverrides` from the theme object.
    themeObject.properties = themeObject.properties.filter((p) => p !== coProp)
    hasModifications = true

    // Overrides were relocated to the new channel; warn that any component
    // imported from v11.6 or earlier will no longer pick them up.
    if (hasOverrides) {
      printWarning(filePath, coProp.loc?.start.line, V1_OVERRIDE_WARNING)
    }

    // Case 5: element already has an object-literal `themeOverride` -> merge.
    if (
      hasOverrides &&
      existingThemeOverride?.value?.type === 'JSXExpressionContainer' &&
      existingThemeOverride.value.expression?.type === 'ObjectExpression'
    ) {
      const toObject = existingThemeOverride.value.expression
      const componentsProp = findObjectProperty(toObject, 'components')
      if (componentsProp && componentsProp.value.type === 'ObjectExpression') {
        if (componentsValue.type === 'ObjectExpression') {
          mergeComponentEntries(componentsProp.value, componentsValue, filePath)
        } else {
          // opaque value: spread it into the existing components object
          componentsProp.value.properties.push(
            j.spreadElement(
              componentsValue as Parameters<typeof j.spreadElement>[0]
            )
          )
        }
      } else {
        toObject.properties.push(
          j.objectProperty(j.identifier('components'), componentsValue)
        )
      }
    } else if (hasOverrides) {
      // Build a fresh `themeOverride={{ components: { ... } }}` attribute.
      const newAttr = j.jsxAttribute(
        j.jsxIdentifier('themeOverride'),
        j.jsxExpressionContainer(
          j.objectExpression([
            j.objectProperty(j.identifier('components'), componentsValue)
          ])
        )
      )
      // Insert right after `theme` so attribute order stays natural.
      const themeIndex = attributes.indexOf(themeAttr)
      attributes.splice(themeIndex + 1, 0, newAttr)
    }

    // Cases 1 & 2: drop the `theme` prop entirely if it is now empty,
    // otherwise keep the remaining theme keys (e.g. `{ ...canvas }`).
    if (themeObject.properties.length === 0) {
      // eslint-disable-next-line no-param-reassign
      provider.node.openingElement.attributes = attributes.filter(
        (attr) => attr !== themeAttr
      )
    }
  })

  return hasModifications
}

// NOTE: intentionally NOT a default export, so `jscodeshift -t <file>` cannot run
// it standalone. It is one step of the multi-version migration; run it via the
// `multiVersionThemeVariablesCodemod` entry point.
export {
  migrateComponentOverridesToThemeOverride,
  migrateComponentOverridesToThemeOverrideCodemod
}
