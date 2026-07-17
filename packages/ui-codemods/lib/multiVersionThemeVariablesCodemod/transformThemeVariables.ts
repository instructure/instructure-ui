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
import { findElement, findImport, printWarning } from '../utils/codemodHelpers'
import { namedTypes } from 'ast-types'
import { THEME_VARIABLE_MAPPINGS } from './themeVariableMappings'
import type { ComponentMapping } from './themeVariableMappings'

/**
 * Renames/removes component theme variables to their new (multi-version) names.
 */
const transformThemeVariables: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(
    transformThemeVariablesCodemod,
    file,
    api,
    options
  )
}
/**
 * Returns the name of an object property key whether it is written as an
 * identifier (`Spinner: …`, `smallSize: …`) or a quoted string literal
 * (`'Spinner': …`, `'List.Item': …`, `'smallSize': …`). Component and token
 * keys can legally be either form, so the codemod has to handle both.
 */
const getKeyName = (
  key: namedTypes.ObjectProperty['key']
): string | undefined => {
  if (key.type === 'Identifier') return key.name
  if (
    (key.type === 'Literal' || (key.type as string) === 'StringLiteral') &&
    'value' in key &&
    typeof key.value === 'string'
  ) {
    return key.value
  }
  return undefined
}

/**
 * Renames an object property key in place, preserving whether it is an
 * identifier or a quoted string literal.
 */
const setKeyName = (
  key: namedTypes.ObjectProperty['key'],
  name: string
): void => {
  if (key.type === 'Identifier') {
    // eslint-disable-next-line no-param-reassign
    key.name = name
  } else if (
    key.type === 'Literal' ||
    (key.type as string) === 'StringLiteral'
  ) {
    // eslint-disable-next-line no-param-reassign
    ;(key as namedTypes.Literal).value = name
  }
}

type ResolvedVariant = 'simple' | 'toggle' | 'ambiguous'

/**
 * Resolves a component's `variant` prop from its JSX element, for tokens whose
 * migration depends on it (Checkbox). Returns 'simple' for the default checkbox
 * (no `variant`, or `variant="simple"`), 'toggle' for `variant="toggle"`, and
 * 'ambiguous' when `variant` is a dynamic expression that can't be read
 * statically (a variable, conditional, spread, ...).
 */
const getResolvedVariant = (
  openingElement: namedTypes.JSXOpeningElement
): ResolvedVariant => {
  const attr = openingElement.attributes?.find(
    (a): a is namedTypes.JSXAttribute =>
      isJSXAttribute(a) && a.name.name === 'variant'
  )
  if (!attr) {
    // No explicit `variant`. A spread (`{...props}`) could still set it, so we
    // can't assume the default - treat it as ambiguous (variant-dependent tokens
    // are then left unchanged + warned, rather than guessing the wrong slot).
    const hasSpread = openingElement.attributes?.some(
      (a) => a.type === 'JSXSpreadAttribute'
    )
    return hasSpread ? 'ambiguous' : 'simple'
  }

  const readString = (node: unknown): string | undefined => {
    const n = node as { type?: string; value?: unknown } | null | undefined
    if (
      (n?.type === 'Literal' || (n?.type as string) === 'StringLiteral') &&
      typeof n?.value === 'string'
    ) {
      return n.value
    }
    return undefined
  }

  // `variant="toggle"` (string attribute) or `variant={'toggle'}` (literal expr)
  let value = readString(attr.value)
  if (value === undefined && attr.value?.type === 'JSXExpressionContainer') {
    value = readString(attr.value.expression)
  }
  if (value === undefined) return 'ambiguous'
  return value === 'toggle' ? 'toggle' : 'simple'
}

/**
 * Updates theme tokens for a component based on the mappings
 * Returns true if any modifications were made
 */
const updateComponentThemeTokens = (
  themeObject: namedTypes.ObjectExpression,
  componentName: string,
  filePath: string
): boolean => {
  const componentConfig = THEME_VARIABLE_MAPPINGS[componentName]
  if (!componentConfig) return false

  let wasModified = false
  const originalProperties = [...themeObject.properties]

  // Pre-scan to find rename targets that would collide - i.e. a new token name
  // produced by more than one old token present in this override (e.g. both
  // `primaryInverseColor` and `secondaryInverseColor` rename to `inverseColor`),
  // or a new name that already exists here as a different key. Colliding renames
  // are left unchanged and warned about, so no value is arbitrarily dropped.
  const existingKeys = new Set<string>()
  const renameSources: Record<string, string[]> = {}
  originalProperties.forEach((property) => {
    if (property.type === 'ObjectProperty') {
      const name = getKeyName(property.key)
      if (!name) return
      existingKeys.add(name)
      const r = componentConfig.renamed?.[name]
      if (r) (renameSources[r.to] ||= []).push(name)
    }
  })
  const isCollidingRename = (target: string, sourceName: string): boolean =>
    // more than one present token renames to `target`...
    (renameSources[target]?.length || 0) > 1 ||
    // ...or `target` already exists as a different key that is NOT itself being
    // renamed away (a swap like `primaryColor`->`baseColor` +
    // `brandColor`->`primaryColor` vacates `primaryColor`, so it is safe).
    (existingKeys.has(target) &&
      target !== sourceName &&
      !componentConfig.renamed?.[target])
  // Track targets already warned about so a collision is reported once, not once
  // per colliding token.
  const warnedTargets = new Set<string>()

  // Process each property in the theme object - filter out removed tokens, rename others
  // eslint-disable-next-line no-param-reassign
  themeObject.properties = originalProperties.filter((property) => {
    // Only process simple key-value pairs (ignore spread operators, methods, etc.)
    if (property.type === 'ObjectProperty') {
      // token key may be an identifier or a quoted string literal
      const tokenName = getKeyName(property.key)
      if (!tokenName) return true

      const renamed = componentConfig.renamed?.[tokenName]
      const removed = componentConfig.removed?.[tokenName]
      const warned = componentConfig.warned?.[tokenName]

      // Renamed - update the key name, surfacing any note.
      if (renamed) {
        // Multiple old tokens in this override map to the same new token (or the
        // new name is already set here). Renaming would clobber a value, so leave
        // it untouched and warn the user (once per target) to consolidate by hand.
        if (isCollidingRename(renamed.to, tokenName)) {
          if (!warnedTargets.has(renamed.to)) {
            warnedTargets.add(renamed.to)
            const sources = renameSources[renamed.to] || [tokenName]
            const sourceList = sources.map((s) => `\`${s}\``).join(', ')
            printWarning(
              filePath,
              property.loc?.start.line,
              sources.length > 1
                ? `Multiple tokens (${sourceList}) rename to \`${renamed.to}\`; left unchanged - consolidate them into a single \`${renamed.to}\` manually.`
                : `\`${tokenName}\` renames to \`${renamed.to}\`, which is already set in this override; left unchanged - consolidate them into a single \`${renamed.to}\` manually.`
            )
          }
          return true
        }
        wasModified = true
        if (renamed.to !== tokenName) {
          setKeyName(property.key, renamed.to)
        }
        if (renamed.warning) {
          printWarning(filePath, property.loc?.start.line, renamed.warning)
        }
        return true
      }

      // Removed - drop it, surfacing its replacement note if any.
      if (removed) {
        wasModified = true
        if (removed.warning) {
          printWarning(filePath, property.loc?.start.line, removed.warning)
        }
        return false
      }

      // Warned - kept under the same name, but warn the user to review it. This
      // does not change the AST, so it does not set `wasModified`.
      if (warned) {
        printWarning(filePath, property.loc?.start.line, warned.warning)
        return true
      }

      // Not in our migration mapping - keep it unchanged.
      return true
    }
    return true
  })

  return wasModified
}

/**
 * Applies variant-dependent token migrations (currently Checkbox `variant`) to a
 * per-instance `themeOverride` object. The same v1 token renames to a different
 * v2 token per variant, so the outcome is chosen from the resolved variant.
 * An ambiguous (dynamic) variant leaves the token unchanged and warns.
 * Returns true if the object was modified.
 */
const applyVariantDependentTokens = (
  themeObject: namedTypes.ObjectExpression,
  componentName: string,
  filePath: string,
  variant: ResolvedVariant
): boolean => {
  const variantDependent =
    THEME_VARIABLE_MAPPINGS[componentName]?.variantDependent
  if (!variantDependent) return false

  let wasModified = false
  // Ambiguous-variant tokens are collected and warned about once (listing them
  // all), rather than one warning per token.
  const ambiguousTokens: string[] = []
  let ambiguousLine: number | undefined
  // eslint-disable-next-line no-param-reassign
  themeObject.properties = themeObject.properties.filter((property) => {
    if (property.type !== 'ObjectProperty') return true
    const tokenName = getKeyName(property.key)
    if (!tokenName) return true
    const entry = variantDependent[tokenName]
    if (!entry) return true

    // Variant couldn't be read statically - we can't tell which v2 token this
    // maps to, so leave it untouched and flag it (consolidated after the loop).
    if (variant === 'ambiguous') {
      ambiguousTokens.push(tokenName)
      if (ambiguousLine === undefined) ambiguousLine = property.loc?.start.line
      return true
    }

    const outcome = entry[variant]
    // A rename carries a `to`; `keep` leaves the token as-is; otherwise removal.
    if ('to' in outcome && outcome.to) {
      setKeyName(property.key, outcome.to)
      if (outcome.warning) {
        printWarning(filePath, property.loc?.start.line, outcome.warning)
      }
      wasModified = true
      return true
    }
    if ('keep' in outcome) {
      // Unchanged for this variant - leave it exactly as-is.
      return true
    }
    if (outcome.warning) {
      printWarning(filePath, property.loc?.start.line, outcome.warning)
    }
    wasModified = true
    return false
  })

  if (ambiguousTokens.length > 0) {
    const tokenList = ambiguousTokens.map((t) => `\`${t}\``).join(', ')
    printWarning(
      filePath,
      ambiguousLine,
      `Variant-dependent theme variables for ${componentName} could not be migrated because the \`variant\` prop could not be read statically (they map to different tokens for the \`toggle\` vs \`simple\` variant); left unchanged - update these manually: ${tokenList}.`
    )
  }

  return wasModified
}

/**
 * Finds which mapped tokens are present in a theme object
 */
const findMappedTokensInObject = (
  themeObject: namedTypes.ObjectExpression,
  componentMapping: ComponentMapping
): string[] => {
  const tokenNames: string[] = []
  themeObject.properties.forEach((prop) => {
    if (prop.type === 'ObjectProperty') {
      const name = getKeyName(prop.key)
      if (
        name &&
        (componentMapping.renamed?.[name] ||
          componentMapping.removed?.[name] ||
          componentMapping.warned?.[name])
      ) {
        tokenNames.push(name)
      }
    }
  })
  return tokenNames
}

/**
 * Handles complex theme overrides that can't be automatically processed
 */
const handleComplexThemeOverride = (
  filePath: string,
  line: number | undefined,
  componentName: string,
  context: 'themeOverride prop' | 'InstUISettingsProvider',
  reason: string
) => {
  const componentConfig = THEME_VARIABLE_MAPPINGS[componentName]
  const allAffectedTokens = [
    ...new Set([
      ...Object.keys(componentConfig?.renamed || {}),
      ...Object.keys(componentConfig?.removed || {}),
      ...Object.keys(componentConfig?.warned || {}),
      ...Object.keys(componentConfig?.variantDependent || {})
    ])
  ]
  if (allAffectedTokens.length === 0) return

  // One warning per element, listing every token that changed for this
  // component (we can't see which are actually used inside the dynamic/spread
  // value), rather than one warning per token.
  const tokenList = allAffectedTokens.map((t) => `\`${t}\``).join(', ')
  printWarning(
    filePath,
    line,
    `Theme variables for ${componentName} could not be migrated automatically because ${reason} is used in ${context}. Manually check these affected tokens in the expression: ${tokenList}.`
  )
}

/**
 * Processes a themeOverride JSX attribute for a component
 */
const processThemeOverrideAttribute = (
  filePath: string,
  attribute: namedTypes.JSXAttribute,
  componentName: string,
  variant?: ResolvedVariant
): { hasModifications: boolean; shouldKeepAttribute: boolean } => {
  const componentMapping = THEME_VARIABLE_MAPPINGS[componentName]
  if (!componentMapping) {
    return { hasModifications: false, shouldKeepAttribute: true }
  }

  const line = attribute.loc?.start.line
  const hasModifications = false
  const shouldKeepAttribute = true

  // --- Combined Case: Dynamic expressions OR object literals with spreads ---
  if (attribute.value?.type === 'JSXExpressionContainer') {
    const expr = attribute.value.expression
    const isDynamicExpression = [
      'CallExpression',
      'Identifier',
      'ConditionalExpression',
      'ArrowFunctionExpression',
      'FunctionExpression',
      'LogicalExpression',
      'MemberExpression',
      'TemplateLiteral',
      'ArrayExpression',
      'ObjectPattern'
    ].includes(expr?.type)

    const isObjectWithSpread =
      expr?.type === 'ObjectExpression' &&
      expr.properties.some((prop) => prop.type === 'SpreadElement')

    if (isDynamicExpression || isObjectWithSpread) {
      // Process tokens if it’s an object with spreads
      let result = { hasModifications: false, shouldKeepAttribute: true }
      if (isObjectWithSpread) {
        result = processThemeObject(expr, componentName, filePath, variant)
      }

      handleComplexThemeOverride(
        filePath,
        line,
        componentName,
        'themeOverride prop',
        isObjectWithSpread ? 'a spread element (`...`)' : 'a dynamic expression'
      )

      return result
    }
  }

  if (
    attribute.value?.type === 'JSXExpressionContainer' &&
    attribute.value.expression?.type === 'ObjectExpression'
  ) {
    return processThemeObject(
      attribute.value.expression,
      componentName,
      filePath,
      variant
    )
  }

  return { hasModifications, shouldKeepAttribute }
}

/**
 * Processes a theme object and applies the token migrations
 */
const processThemeObject = (
  themeObject: namedTypes.ObjectExpression,
  componentName: string,
  filePath: string,
  variant?: ResolvedVariant
): { hasModifications: boolean; shouldKeepAttribute: boolean } => {
  const componentMapping = THEME_VARIABLE_MAPPINGS[componentName]
  let hasModifications = false
  let shouldKeepAttribute = true

  // Find which mapped tokens are actually present
  const presentTokens = findMappedTokensInObject(themeObject, componentMapping)

  // Process the theme object if there are mappable tokens
  if (presentTokens.length > 0) {
    hasModifications = updateComponentThemeTokens(
      themeObject,
      componentName,
      filePath
    )
  }

  // Variant-dependent tokens (Checkbox): resolved from the element's `variant`.
  // Only available for per-instance themeOverride props (where `variant` was
  // read off the element); skipped for InstUISettingsProvider overrides.
  if (componentMapping.variantDependent && variant) {
    const changed = applyVariantDependentTokens(
      themeObject,
      componentName,
      filePath,
      variant
    )
    hasModifications = hasModifications || changed
  }

  // Remove entire attribute if the theme object was emptied out by a migration.
  if (hasModifications && themeObject.properties.length === 0) {
    shouldKeepAttribute = false
  }

  return { hasModifications, shouldKeepAttribute }
}

/**
 * Processes InstUISettingsProvider theme overrides
 */
const processInstUISettingsProviderTheme = (
  themeObject: namedTypes.ObjectExpression,
  onModification: () => void,
  filePath: string
): boolean => {
  let themeBecameEmpty = false

  const componentOverrides = themeObject.properties.find(
    (p) =>
      p.type === 'ObjectProperty' &&
      p.key.type === 'Identifier' &&
      p.key.name === 'componentOverrides'
  )

  if (
    componentOverrides &&
    'value' in componentOverrides &&
    componentOverrides.value?.type === 'ObjectExpression'
  ) {
    // Process each component override. The component key may be an identifier
    // (`Spinner: …`) or a quoted string literal (`'Spinner': …`,
    // `'List.Item': …`), so resolve it via getKeyName.
    componentOverrides.value.properties =
      componentOverrides.value.properties.filter((overrideProp) => {
        if (
          overrideProp.type === 'ObjectProperty' &&
          'value' in overrideProp &&
          overrideProp.value?.type === 'ObjectExpression'
        ) {
          const componentName = getKeyName(overrideProp.key)
          if (componentName && THEME_VARIABLE_MAPPINGS[componentName]) {
            const wasModified = updateComponentThemeTokens(
              overrideProp.value,
              componentName,
              filePath
            )

            if (wasModified) onModification()

            // Keep the override only if it still has properties
            return overrideProp.value.properties.length > 0
          }
        }
        return true
      })

    // Remove componentOverrides if it became empty
    if (componentOverrides.value.properties.length === 0) {
      // eslint-disable-next-line no-param-reassign
      themeObject.properties = themeObject.properties.filter(
        (p) => p !== componentOverrides
      )
    }
  }

  // Check if theme became completely empty
  if (themeObject.properties.length === 0) {
    themeBecameEmpty = true
  }

  return themeBecameEmpty
}

// Main codemod logic
const transformThemeVariablesCodemod: InstUICodemod = (
  j: JSCodeshift,
  root: Collection,
  filePath: string
) => {
  let hasModifications = false

  // Part 1: Process component themeOverride props
  Object.keys(THEME_VARIABLE_MAPPINGS).forEach((componentName) => {
    const componentMapping = THEME_VARIABLE_MAPPINGS[componentName]

    // Dotted component names (`Modal.Body`) render as a member expression
    // `<Modal.Body>`. The import to resolve is the base object (`Modal`); the
    // JSX tag is then `<localName.Child>`, where `localName` respects an
    // aliased import (`import { Modal as M }` -> `<M.Body>`).
    const [baseName, childName] = componentName.split('.')
    // Only the v2 (`/v11_7`, `/latest`) entry points use the new theming system;
    // the bare path and `/v11_6` are v1 (old theming) and must be left alone.
    const componentImport = findImport(j, root, baseName, [
      `${componentMapping.import}/v11_7`,
      `${componentMapping.import}/latest`,
      '@instructure/ui/v11_7',
      '@instructure/ui/latest'
    ])

    if (componentImport) {
      const tagName = childName
        ? `${componentImport}.${childName}`
        : componentImport
      // Find elements with themeOverride prop
      // Suppress the generic spread warning when the element has an explicit
      // `themeOverride` (we migrate that directly); when it's absent, emit a
      // theme-specific warning, since a `themeOverride` could be hidden in the
      // spread and its tokens would then not be migrated.
      const elements = findElement(
        filePath,
        j,
        root,
        tagName,
        { name: 'themeOverride' },
        true,
        `\`${componentName}\` has a spread (\`{...}\`) and no explicit \`themeOverride\`. If the spread sets a \`themeOverride\`, its theme tokens could not be inspected and were not migrated - review it manually.`
      )

      elements.forEach((element) => {
        // Tokens that migrate differently per `variant` (Checkbox) need the
        // variant read off this element; resolve it once per element.
        const variant = componentMapping.variantDependent
          ? getResolvedVariant(element.value.openingElement)
          : undefined
        // eslint-disable-next-line no-param-reassign
        element.value.openingElement.attributes =
          element.value.openingElement.attributes?.filter((attr) => {
            if (isJSXAttribute(attr) && attr.name.name === 'themeOverride') {
              const result = processThemeOverrideAttribute(
                filePath,
                attr,
                componentName,
                variant
              )
              hasModifications = hasModifications || result.hasModifications
              return result.shouldKeepAttribute
            }
            return true
          })
      })
    }
  })

  // Part 2: Process InstUISettingsProvider theme overrides. InstUISettingsProvider-level
  // `componentOverrides` always migrate (token renames here + relocation to
  // `themeOverride.components` in the migrate leg), regardless of which versions
  // the file imports. v1 (v11.6 or earlier) components still read the legacy
  // channel, so the migrate leg warns that their overrides will stop applying.
  const providerImport = findImport(j, root, 'InstUISettingsProvider', [
    '@instructure/ui',
    '@instructure/emotion'
  ])

  if (providerImport) {
    root.findJSXElements(providerImport).forEach((provider) => {
      let themeBecameEmpty = false

      provider.node.openingElement.attributes?.forEach((attr) => {
        if (!isJSXAttribute(attr) || attr.name.name !== 'theme') return

        const line = attr.loc?.start.line
        const expr =
          attr.value?.type === 'JSXExpressionContainer'
            ? attr.value.expression
            : undefined
        if (!expr) return

        if (expr.type === 'ObjectExpression') {
          // Object theme: rename any component theme variables we can see.
          // A theme with nothing for us to rename is a no-op, with no warning.
          const empty = processInstUISettingsProviderTheme(
            expr,
            () => {
              hasModifications = true
            },
            filePath
          )
          themeBecameEmpty = themeBecameEmpty || empty

          // A spread at the theme level (`{ ...x }`) is opaque - if `x` sets
          // component theme variables we can't see them to rename, so warn once
          // per InstUISettingsProvider.
          if (expr.properties.some((p) => p.type === 'SpreadElement')) {
            printWarning(
              filePath,
              line,
              "InstUISettingsProvider 'theme' spreads an object (`...`) that may " +
                'set component theme variables that have changed. These could ' +
                'not be updated automatically - please review and update them ' +
                'manually.'
            )
          }
        } else if (expr.type !== 'Identifier') {
          // A computed/dynamic theme (function, function call, ternary, member
          // access, ...) may override component theme variables that have
          // changed, but we cannot inspect it statically to rename them. Warn
          // once per InstUISettingsProvider so the user reviews it manually. A bare identifier
          // (`theme={canvas}`) is a named theme switch with nothing to rename,
          // so it stays silent.
          printWarning(
            filePath,
            line,
            "InstUISettingsProvider 'theme' is set dynamically and may override " +
              'component theme variables that have changed. These could not be ' +
              'updated automatically - please review and update them manually.'
          )
        }
        // A bare identifier (e.g. `theme={canvas}`) is a named theme switch -
        // nothing to rename, intentionally left untouched and silent.
      })

      if (themeBecameEmpty) {
        // The InstUISettingsProvider has no theme left, so unwrap it (hoist its children in
        // place of the element). `replaceWith(children)` fails with "Could not
        // replace path" when the InstUISettingsProvider sits in an expression position (e.g.
        // a sole `return (<InstUISettingsProvider>…</InstUISettingsProvider>)`) because the children array
        // includes whitespace JSXText around the element - multiple nodes can't
        // replace a single expression. So collapse to the meaningful children:
        // one element replaces the InstUISettingsProvider directly; several are wrapped in a
        // fragment; none removes the InstUISettingsProvider outright.
        const children = provider.node.children || []
        const meaningful = children.filter(
          (c) => !(c.type === 'JSXText' && c.value.trim() === '')
        )
        if (meaningful.length === 0) {
          j(provider).remove()
        } else if (meaningful.length === 1) {
          j(provider).replaceWith(meaningful[0])
        } else {
          j(provider).replaceWith(
            j.jsxFragment(
              j.jsxOpeningFragment(),
              j.jsxClosingFragment(),
              children
            )
          )
        }
        hasModifications = true
      }
    })
  }

  return hasModifications
}

// NOTE: intentionally NOT a default export. `jscodeshift -t <file>` only runs a
// module's default export, so omitting it prevents this codemod from being run
// on its own - which would rename tokens but leave them in the legacy
// `componentOverrides` location (dead on v2 components). Run it via the
// `multiVersionThemeVariablesCodemod` entry point, which also relocates the overrides.
export { transformThemeVariables, transformThemeVariablesCodemod }
