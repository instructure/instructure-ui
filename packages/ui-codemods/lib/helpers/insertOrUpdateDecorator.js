const getClassDeclarations = require('../util/getClassDeclarations')

/**
  * Insert a new @deprecated decorator for a Component,
  * or update the existing one with newly deprecated props
  * if the decorator already exists.
  *
  * Example:
  *  @deprecated('2.1.0', { ... })
  *  @deprecated('3.0.0', { ... })
  *  MyComponent extends React.Component { ... }
  */
module.exports = function insertOrUpdateDecorator (j, root, config) {
  const hasModifications = false

  getClassDeclarations(j, root, config)
    .forEach(path => {
      const name = path.value.id.name

      // Iterate versions
      Object.keys(config[name]).forEach((v) => {
        // Add @deprecated decorator
        let decorator

        // Find the decorator for this version iteration
        if (path.value.decorators) {
          decorator = path.value.decorators.filter((d) => d.expression.arguments[0].value === v)[0]
        }

        // Add the decorator
        if (!decorator) {
          decorator = j.decorator(
            j.callExpression(
              j.identifier('deprecated'),
              [
                j.literal(v),
                j.objectExpression([])
              ]
            )
          )

          if (!Array.isArray(path.value.decorators)) {
            path.value.decorators = [] // eslint-disable-line no-param-reassign
          }

          // path.value.decorators.push(decorator)
        }

        // Add deprecated props
        // config[name][v].forEach((p) => {
        //   decorator.expression.arguments[1].properties.push(
        //     j.property(
        //       j.identifier(p.old),
        //       j.literal(p.new)
        //     )
        //   )
        // })

        // console.log(decorator.expression.arguments)
      })
    })

  return hasModifications
}
