const capitalizeFirstLetter = exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const toCamelCase = exports.toCamelCase = (string) => {
  return string.replace(/([-:]\w)/g, ($1) => { return $1.toUpperCase().replace('-', '').replace(':', '') })
}

module.exports = (name) => {
  return capitalizeFirstLetter(toCamelCase(name))
}
