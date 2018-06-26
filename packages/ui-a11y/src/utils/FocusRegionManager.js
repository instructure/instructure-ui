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
  static focusRegion = (element, options) => {
    const region = new FocusRegion(element, options)
    const activeEntry = FocusRegionManager.getActiveEntry()

    ENTRIES.forEach(({ region }) => {
      region && region.teardown()
    })

    region.setup()
    region.focus()

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

    return region
  }

  static getActiveEntry = () => {
    return ENTRIES.find(({ region }) => region.focused)
  }

  static removeEntry = (element, id) => {
    let index
    if (id) {
      index = ENTRIES.findIndex((entry) => entry.id === id)
    } else {
      index = ENTRIES.findIndex((entry) => entry.element === element)
    }
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

      // teardown the region...
      region && region.teardown()

      // and any regions created from it
      if (children) {
        children.forEach(({ id, element }) => {
          const entry = FocusRegionManager.removeEntry(element, id)
          entry && entry.region && entry.region.teardown()
        })
      }

      // setup the region's parent if it exists
      parent && parent.region && parent.region.setup()

      region && region.blur() // this should focus the parent region
    }
  }
}
