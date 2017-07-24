module.exports = {
  generateScopedName: function ({ env }) { // for css modules class names
    return (env === 'production') ? '[hash:base64:7]' : '[folder]__[local]'
  }
}
