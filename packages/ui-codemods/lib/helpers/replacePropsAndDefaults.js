const getClassDeclarations = require('../utils/getClassDeclarations')
const findDeprecatedProp = require('../utils/findDeprecatedProp')

/**
  * Find and replace deprecated propTypes and defaultProps
  *
  * Example:
  *  static propTypes {
  *    [name]: PropTypes.bool
  *  }
  *
  *  static defaultProps {
  *    [name]: true
  *  }
  */
module.exports = function replacePropsAndDefaults (j, root, config) {
  let hasModifications = false

  getClassDeclarations(j, root, config)
    .forEach(path => {
      const name = path.value.id.name

      j(path)
        .find(j.ClassProperty)
        .forEach((cp) => {
          if (['propTypes', 'defaultProps'].indexOf(cp.value.key.name) > -1) {
            // Find deprecated props
            j(cp)
              .find(j.Identifier)
              .forEach((i) => {
                const prop = i.value.name
                const match = findDeprecatedProp(config, name, prop)

                if (match) {
                  hasModifications = true
                  j(i).replaceWith(j.identifier(match.new))
                }
              })
          }
        })
    })

  return hasModifications
}
