export function after (extraBehavior) {
  return function (original) {
    return function () {
      let returnValue

      if (original) {
        returnValue = original.apply(this, arguments)
      }

      extraBehavior.apply(this, arguments)

      return returnValue
    }
  }
}

export function override (object, methodName, callback) {
  object[methodName] = callback(object[methodName]) // eslint-disable-line no-param-reassign
}
