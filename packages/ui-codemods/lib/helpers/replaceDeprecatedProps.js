const findDeprecatedProp = require('../utils/findDeprecatedProp')

/**
  * Find JSX attributes (props)
  *
  * Example:
  *  <MyComponent [name] />
  */
module.exports = function replaceDeprecatedProps (j, root, config) {
  let hasModifications = false

  // Find JSX Elements
  //
  // Rewrite usages of deprecated props for a Component.
  root
    .find(j.JSXOpeningElement)
    .forEach((el) => {
      const name = el.value.name.name

      // Make sure we're working with a Component that we need to modify
      if (config[name]) {
        j(el)
          .find(j.JSXAttribute)
          .forEach((attr) => {
            // Find identifiers
            j(attr)
              .find(j.JSXIdentifier)
              .forEach((i) => {
                const prop = i.value.name
                const match = findDeprecatedProp(config, name, prop)

                if (match) {
                  hasModifications = true
                  j(i).replaceWith(j.jsxIdentifier(match.new))
                }
              })
          })
      }
    })

  return hasModifications
}
