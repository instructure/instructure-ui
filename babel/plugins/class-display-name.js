module.exports = function ({types: t}) {
  /**
   * Determine if an AST node is likely a class extending React.Component
   */
  function isReactClass (node) {
    if (!node || !t.isCallExpression(node)) return false

    // not _createClass call
    if (!node.callee || node.callee.name !== '_createClass') return false

    // no call arguments
    let args = node.arguments
    if (!args || args.length !== 2) return false
    if (!t.isIdentifier(args[0])) return false
    if (!t.isArrayExpression(args[1])) return false
    
    // no render method
    if (!args[1].elements || !args[1].elements.some((el) => {
      return isRenderMethod(el.properties)
    })) return false

    return true
  }
 
  /**
   * Determine if a property definition is for a render method
   */
  function isRenderMethod (props) {
    return props.some((prop) => {
	    return prop.key.name === 'key' && prop.value.value === 'render'
      }) && props.some((prop) => {
        return prop.key.name === 'value' && t.isFunctionExpression(prop.value)
      })
  }

  /**
   * Insert a static displayName for the identifier
   */
  function insertDisplayName (path, id) {
    // console.log(' insertDisplayName:', id)
    path.insertAfter(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier(id),
          t.identifier('displayName')
        ),
        t.stringLiteral(id)
      )
    )
  }

  return {
    visitor: {
      CallExpression (path) {
        let { node } = path

        if (isReactClass(node)) {
          insertDisplayName(path, node.arguments[0].name)
        }
      }
    }
  }
}

