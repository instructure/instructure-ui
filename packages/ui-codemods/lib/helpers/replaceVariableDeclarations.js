const getClassDeclarations = require('../util/getClassDeclarations')
const findDeprecatedProp = require('../util/findDeprecatedProp')

/**
  * Find and replace variable declarations
  *
  * Example:
  *  const [name] = this.props[name]
  *  const { [name] } = this.props
  */
module.exports = function replaceVariableDeclarations (j, root, config) {
  let hasModifications = false

  getClassDeclarations(j, root, config)
    .forEach(path => {
      const name = path.value.id.name

      j(path)
        .find(j.VariableDeclarator)
        .forEach((v) => {
          // const [name] = this.props[name]
          if (v.value.id.name) {
            const prop = v.value.id.name
            const match = findDeprecatedProp(config, name, prop)

            if (match) {
              // Find the init object (should be `this.props` or `props`)
              if (v.value.init.object.name === 'props' ||
                  v.value.init.object.property.name === 'props') {
                // Find the actual identifier
                j(v)
                  .find(j.Identifier)
                  .forEach((i) => {
                    if (i.value.name === prop) {
                      hasModifications = true
                      j(i).replaceWith(j.identifier(match.new))
                    }
                  })
              }
            }
          }

          // const { [name] } = this.props[name]
          if (v.value.id.properties) {
            // Find destructured properties
            j(v.value.id)
              .find(j.Property)
              .forEach((p) => {
                const prop = p.value.value.name
                const match = findDeprecatedProp(config, name, prop)

                if (match) {
                  // Find the init object (should be `this.props` or `props`)
                  if (v.value.init.name === 'props' ||
                      v.value.init.property.name === 'props') {
                    // Find the actual identifier
                    j(p)
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
          }
        })
    })

  return hasModifications
}
