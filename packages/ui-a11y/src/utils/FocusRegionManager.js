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
import error from '@instructure/ui-utils/lib/error'
import FocusRegion from './FocusRegion'

let ENTRIES = []

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
export default class FocusRegionManager {
  static focusRegion = (element, idOrOptions = {}) => {
    let entry
    if (typeof idOrOptions === 'string' ) {
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
        'FocusRegionManager',
        `Could not focus region with element: ${element}`
      )
    }
  }

  static activateRegion = (element, options) => {
    const { region } = FocusRegionManager.addEntry(element, options)
    return region
  }

  static getActiveEntry = () => {
    return ENTRIES.find(({ region }) => region.focused)
  }

  static findEntry = (element, id) => {
    let index
    if (id) {
      index = ENTRIES.findIndex((entry) => entry.id === id)
    } else {
      index = ENTRIES.findIndex((entry) => entry.element === element)
    }
    return index
  }

  static getEntry = (element, id) => {
    return ENTRIES[FocusRegionManager.findEntry(element, id)]
  }

  static addEntry = (element, options = {}) => {
    const region = new FocusRegion(element, options)
    const activeEntry = FocusRegionManager.getActiveEntry()
    ENTRIES.forEach(({ region }) => {
      region && region.deactivate()
    })
    region.activate()

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

  static removeEntry = (element, id) => {
    const index = FocusRegionManager.findEntry(element, id)
    const entry = ENTRIES[index]

    if (index > -1) {
      ENTRIES.splice(index, 1)
    }

    return entry
  }

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

  static blurRegion = (element, id) => {
    const entry = FocusRegionManager.removeEntry(element, id)

    if (entry) {
      const { children, region, parent } = entry

      // deactivate the region...
      region && region.deactivate()

      // and any regions created from it
      if (children) {
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
