import findDOMNode from './findDOMNode'

let classListShimmed = false

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Produces a classList object containing functions
 * for both adding and removing classes from an element.
 * Also provides a contains function to query if the
 * element contains a specified class name.
 *
 * @param {ReactComponent|DomNode} element - component or DOM node
 * @return {Object} object containing classList functions 'contains', 'add', and 'remove'
 */
export default function getClassList (element) {
  const node = findDOMNode(element)

  return {
    contains (className) {
      return node && hasClass(node, className)
    },

    add (className) {
      shimClassListForIE()

      if (node && node.classList) {
        node.classList.add(className)
      } else if (node && !hasClass(node)) {
        node.className = `${node.className} ${className}`
      }
    },

    remove (className) {
      shimClassListForIE()

      if (node && node.classList) {
        node.classList.remove(className)
      } else if (node) {
        node.className = node.className // eslint-disable-line no-param-reassign
          .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, 'g'), '$1')
          .replace(/\s+/g, ' ')
          .replace(/^\s*|\s*$/g, '')
      }
    }
  }
}

function hasClass (node, className) {
  shimClassListForIE()
  if (node.classList) {
    return !!className && node.classList.contains(className)
  } else {
    return ` ${node.className} `.indexOf(` ${className} `) !== -1
  }
}

function shimClassListForIE () { // IE 11 doesn't support classList on SVG elements
  /* istanbul ignore if */
  if (!classListShimmed && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    const descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList')
    Object.defineProperty(SVGElement.prototype, 'classList', descr)
    classListShimmed = true
  }
}
