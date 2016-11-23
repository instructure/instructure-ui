module.exports = function requirePath (filepath) {
  return 'require(' + JSON.stringify(filepath) + ')'
}
