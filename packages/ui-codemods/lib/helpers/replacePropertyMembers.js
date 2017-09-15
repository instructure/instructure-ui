const getClassDeclarations = require('../util/getClassDeclarations')
const findDeprecatedProp = require('../util/findDeprecatedProp')

/**
  * Find and replace property members
  *
  * Example:
  *  this.props[name]
  *  props[name]
  */
module.exports = function replacePropertyMembers (j, root, config) {
  let hasModifications = false

  getClassDeclarations(j, root, config)
    .forEach(path => {
      const name = path.value.id.name

      j(path)
        .find(j.MemberExpression)
        .forEach((me) => {
          const prop = me.value.property.name
          const match = findDeprecatedProp(config, name, prop)

          if (match) {
            // Find the object (should be `this.props` or `props`)
            if (me.value.object.name === 'props' ||
                me.value.object.property.name === 'props') {
              // Find the actual identifier
              j(me)
                .find(j.Identifier)
                .forEach((i) => {
                  if (i.value.name === prop) {
                    hasModifications = true
                    j(i).replaceWith(j.identifier(match.new))
                  }
                })
            }
          }
        })
    })


  return hasModifications
}
