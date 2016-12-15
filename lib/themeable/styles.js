import entries from 'object.entries'
import shortid from 'shortid'

const MOUNTED = []
const STYLES = {}

let TAG
let RAF

const setCssText = function (tag, cssText) {
  if ('textContent' in tag) {
    tag.textContent = cssText // eslint-disable-line no-param-reassign
  } else {
    tag.styleSheet.cssText = cssText // eslint-disable-line no-param-reassign
  }
}

const makeStyleTag = function (cssText) {
  const tag = document.createElement('style')
  const head = document.head || document.getElementByTagName('head')[0]

  tag.type = 'text/css'
  tag.id = 's__' + shortid.generate()

  setCssText(tag, cssText)

  head.insertBefore(tag, head.childNodes[0])

  return tag
}

const renderComponentStyle = function ([id, cssText]) {
  return `
/******* ${id} ******/

${cssText}

`
}

const render = function () {
  window.cancelAnimationFrame(RAF)
  RAF = window.requestAnimationFrame(() => {
    RAF = null

    const cssText = entries(STYLES)
      .map(entry => renderComponentStyle(entry))
      .join('\n\n')

    if (!TAG) {
      TAG = makeStyleTag(cssText)
    } else {
      setCssText(TAG, cssText)
    }
  })
}

export function mount (id, cssText) {
  if (!STYLES[id]) {
    MOUNTED[id] = 1
  } else {
    MOUNTED[id]++
  }

  STYLES[id] = cssText

  render()
}

export function update (id, cssText) {
  STYLES[id] = cssText

  render()
}

export function unmount (id) {
  if (!STYLES[id]) {
    return
  }

  MOUNTED[id]--

  if (!MOUNTED[id]) {
    delete STYLES[id]
  }

  // don't bother rendering (it will be removed on the next update)
}
