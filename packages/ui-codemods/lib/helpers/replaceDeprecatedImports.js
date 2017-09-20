const path = require('path')

function replace (p, j, config) {
  let hasModifications = false
  const value = p.value.value

  for (let i = 0; i < config.length; i++) {
    const c = config[i]

    // Replace import using a RegExp
    if (c.pattern && c.replace) {
      const regex = new RegExp(c.pattern)

      if (regex.test(value)) {
        j(p).replaceWith(j.literal(value.replace(regex, c.replace)))
        hasModifications = true
      }
    } // eslint-disable-line brace-style
    // Replace import using a string literal
    else if (c.oldPath && c.newPath) {
      // Process collection of modules under the path
      if (c.modules) {
        c.modules.forEach((m) => { // eslint-disable-line no-loop-func
          if (value === path.join(c.oldPath, m)) {
            j(p).replaceWith(j.literal(path.join(c.newPath, m)))
            hasModifications = true
          }
        })
      } // eslint-disable-line brace-style
      // Replace an absolute module path
      else if (value === c.oldPath) {
        j(p).replaceWith(j.literal(c.newPath))
        hasModifications = true
      }
    }
  }

  return hasModifications
}

/**
 * Find imports
 *
 * Example:
 *  import Modal from 'instructure-ui/lib/components/Modal'
 */
module.exports = function replaceDeprecatedImports (j, root, config) {
  let hasModifications = false

  // Find imports
  //
  // Rewrite usages of deprecated imports for a Component.
  root
    .find(j.ImportDeclaration)
    .find(j.Literal)
    .paths()
    .forEach((p) => {
      hasModifications = replace(p, j, config) || hasModifications
    })

  // Find require calls
  root
    .find(j.CallExpression)
    .forEach((e) => {
      const name = e.value.callee.name
      const type = e.value.callee.type

      if (type === 'Identifier' && name === 'require') {
        j(e)
          .find(j.Literal)
          .forEach((p) => {
            hasModifications = replace(p, j, config) || hasModifications
          })
      }
    })

  return hasModifications
}
