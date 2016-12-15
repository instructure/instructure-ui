import { StyleSheet } from 'glamor/lib/sheet'
import { toRules } from './util/transformCss'

// const MOUNTED = []
const STYLES = {}
const SHEET = new StyleSheet({ speedy: !process.env.DEBUG, maxLength: 40 })

SHEET.inject()

export function mount (id, cssText) {
  if (cssText) {
    if (!STYLES[id]) {
      // MOUNTED[id] = 1

      STYLES[id] = {
        cssText,
        rules: insert(toRules(cssText))
      }
    } else {
      // MOUNTED[id]++
    }
  }
}

export function unmount (id) {
  if (!STYLES[id]) {
    return
  }
  // MOUNTED[id]--

  // if (!MOUNTED[id]) {
  //   remove(STYLES[id]) // TODO: remove styles (glamor doesn't currently support this)
  //   delete STYLES[id]
  // }
}

function insert (rules) {
  const inserted = []
  rules.forEach((rule) => {
    if (rule) {
      inserted.push(SHEET.insert(rule))
    }
  })
  return inserted
}
