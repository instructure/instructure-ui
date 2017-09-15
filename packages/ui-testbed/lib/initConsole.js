module.exports = function () {
  // clear the console before rebundling.
  /* eslint-disable no-console */
  if (typeof console.clear === 'function') {
    console.clear()
  }
  /* eslint-enable no-console */

  // this is a hack so that we can test for prop type validation errors in our tests
  const consoleError = console.error

  console.error = function (firstMessage, ...rest) {
    if (typeof firstMessage === 'string' && firstMessage.startsWith('Warning:')) {
      throw new Error(`Unexpected React Warning: ${firstMessage}`)
    }

    return consoleError(firstMessage, ...rest)
  }

  process.once('unhandledRejection', (error) => {
    console.error(`Unhandled rejection: ${error.stack}`)
    process.exit(1)
  })
}
