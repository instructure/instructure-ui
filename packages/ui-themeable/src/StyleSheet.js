import { StyleSheet as GlamorStyleSheet } from 'glamor/lib/sheet'
import canUseDOM from '@instructure/ui-utils/lib/dom/canUseDOM'

import { toRules } from './utils/transformCss'

const debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development'

const STYLES = {}
let THEMEABLE_STYLESHEET

/**
* ---
* category: utilities/themes
* ---
* A utility for the [themeable](#themeable) component HOC that wraps a
* [Glamor StyleSheet](https://github.com/threepointone/glamor/blob/master/src/sheet.js)
* @module StyleSheet
*/
export default {
  /**
  * Inject the `cssText` into the document
  * @param {String} id - a unique id for the set of styles
  * @param {String} cssText - some CSS to inject into the document
  */
  mount (id, cssText) {
    if (!STYLES[id]) {
      STYLES[id] = {
        cssText,
        rules: insert(toRules(cssText))
      }
    }
  }
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
  let sheet = canUseDOM ? window.THEMEABLE_STYLESHEET : THEMEABLE_STYLESHEET

  if (!sheet) {
    sheet = THEMEABLE_STYLESHEET = createSheet()

    if (canUseDOM) {
      window.THEMEABLE_STYLESHEET = sheet
    }
  }

  return sheet
}

function createSheet () {
  const sheet = new GlamorStyleSheet({ speedy: !debug, maxLength: 40 })
  sheet.inject()
  return sheet
}
