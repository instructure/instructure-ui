/**
  * Get all class declarations that match a component which has deprecated properties
  *
  * @param {object} j jscodeshift API
  * @param {object} root AST root node
  * @param {object} config Deprecated property configuration
  * @return {array} Filtered collection of component class declarations
  */
module.exports = function getClassDeclarations (j, root, config) {
  return root
    .find(j.ClassDeclaration)
    .filter((path) => typeof config[path.value.id.name] !== 'undefined')
}
