import { StyleSheet } from 'glamor/lib/sheet'
import { toRules } from './util/transformCss'

let THEMEABLE_STYLESHEET

export function mount (id, cssText) {
  insert(toRules(cssText))
}

function insert (rules) {
  const sheet = inject()

  const inserted = []
  rules.forEach((rule) => {
    if (rule) {
      inserted.push(sheet.insert(rule))
    }
  })
}

function inject () {
  if (typeof window === 'undefined') {
    return THEMEABLE_STYLESHEET || createSheet()
  } else {
    return window.THEMEABLE_STYLESHEET || createSheet()
  }
}

function createSheet () {
  const sheet = THEMEABLE_STYLESHEET = new StyleSheet({ speedy: false, maxLength: 40 })

  if (typeof window !== 'undefined') {
    window.THEMEABLE_STYLESHEET = sheet
  }

  sheet.inject()

  return sheet
}
