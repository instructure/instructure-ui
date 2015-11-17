// TODO: support multiple examples files
export const examplesContext = require.context('lib/components', true, /__examples__\/index.js$/)
export default function loadExamples (componentName) {
  return examplesContext
    .keys()
    .filter(path => path.includes(`/${componentName}\/__examples__\/index.js`))
    .map((path) => {
      return {
        path,
        displayPath: path.replace('./', 'lib/components/')
      }
    })
}
