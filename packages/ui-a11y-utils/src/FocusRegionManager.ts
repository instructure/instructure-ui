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
import { logError as error } from '@instructure/console'
import { FocusRegion } from './FocusRegion'

// @ts-expect-error ts-migrate(7034) FIXME: Variable 'ENTRIES' implicitly has type 'any[]' in ... Remove this comment to see the full error message
let ENTRIES = []

class FocusRegionManager {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static focusRegion = (element, idOrOptions = {}) => {
    let entry
    if (typeof idOrOptions === 'string') {
      entry = FocusRegionManager.getEntry(element, idOrOptions)
    } else {
      entry = FocusRegionManager.addEntry(element, idOrOptions)
    }
    if (entry && entry.region && typeof entry.region.focus === 'function') {
      entry.region.focus()
      return entry.region
    } else {
      error(
        false,
        `[FocusRegionManager] Could not focus region with element: ${element}`
      )
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static activateRegion = (element, options) => {
    const { region } = FocusRegionManager.addEntry(element, options)
    return region
  }

  static getActiveEntry = () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
    return ENTRIES.find(({ region }) => region.focused)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static findEntry = (element, id) => {
    let index
    if (id) {
      // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
      index = ENTRIES.findIndex((entry) => entry.id === id)
    } else {
      // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
      index = ENTRIES.findIndex((entry) => entry.element === element)
    }
    return index
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static getEntry = (element, id) => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
    return ENTRIES[FocusRegionManager.findEntry(element, id)]
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static addEntry = (element, options = {}) => {
    const region = new FocusRegion(element, options)
    const activeEntry = FocusRegionManager.getActiveEntry()

    const { keyboardFocusable } = region

    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
    ENTRIES.forEach(({ region }) => {
      if (region) {
        // If the active region is triggering a new focus region that does not have
        // keyboard focusable content, don't deactivate the active region's keyboard
        // focus region
        region.deactivate(
          region.focused && !keyboardFocusable && { keyboard: false }
        )
      }
    })

    region.activate()

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldFocusOnOpen' does not exist on typ... Remove this comment to see the full error message
    if (options.shouldFocusOnOpen) {
      region.focus()
    }

    const entry = {
      id: region.id,
      element,
      region,
      children: [],
      parent: activeEntry
    }
    ENTRIES.push(entry)
    if (activeEntry) {
      activeEntry.children.push(entry)
    }
    return entry
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static removeEntry = (element, id) => {
    const index = FocusRegionManager.findEntry(element, id)
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
    const entry = ENTRIES[index]

    if (index > -1) {
      // @ts-expect-error ts-migrate(7005) FIXME: Variable 'ENTRIES' implicitly has an 'any[]' type.
      ENTRIES.splice(index, 1)
    }

    return entry
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static isFocused = (element, id) => {
    const entry = FocusRegionManager.getActiveEntry()
    if (id) {
      return entry && entry.region && entry.id === id
    } else {
      return entry && entry.region && entry.element === element
    }
  }

  static clearEntries = () => {
    ENTRIES = []
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  static blurRegion = (element, id) => {
    const entry = FocusRegionManager.removeEntry(element, id)

    if (entry) {
      const { children, region, parent } = entry

      // deactivate the region...
      region && region.deactivate()

      // and any regions created from it
      if (children) {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
        children.forEach(({ id, element }) => {
          const entry = FocusRegionManager.removeEntry(element, id)
          entry && entry.region && entry.region.deactivate()
        })
      }

      // activate the region's parent if it exists
      parent && parent.region && parent.region.activate()

      region && region.blur() // this should focus the parent region
    }
  }
}

export default FocusRegionManager
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   * @module FocusManager
   * Class for focus operations.
   * - Scoping focus within a given context,
   * - Mark active element for focus later
   * - Return focus to the marked element
   */
  FocusRegionManager
}
