/**
  * Find the deprecated prop for a component
  *
  * @param {object} config Deprecated property configuration
  * @param {string} comp Component name
  * @param {string} prop Property name
  * @return {object} Object if a match is found, otherwise null
  */
module.exports = function findDeprecatedProp (config, comp, prop) {
  if (config && comp && prop && config[comp]) {
    const component = config[comp]

    // Iterate versions
    const versions = Object.keys(component)
    for (let i = 0; i < versions.length; i++) {
      const props = component[versions[i]]

      // Iterate properties
      for (let j = 0; j < props.length; j++) {
        const match = props[j]

        if (prop === match.old) {
          return match
        }
      }
    }
  }

  return null
}
