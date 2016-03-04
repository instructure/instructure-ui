// this is a hack so that we can test for prop type validation errors in our tests

/* eslint-disable no-console */
const consoleError = console.error

console.error = function (firstMessage, ...rest) {
  if (firstMessage.startsWith('Warning:')) {
    throw new Error(`Unexpected React Warning: ${firstMessage}`)
  }

  return consoleError(firstMessage, ...rest)
}

process.once('unhandledRejection', (error) => {
  console.error(`Unhandled rejection: ${error.stack}`)
  process.exit(1)
})
/* eslint-enable no-console */
