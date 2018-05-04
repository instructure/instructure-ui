import path from 'path'
import { configure } from '@storybook/react'
import { setOptions } from "@storybook/addon-options";
import { getStorybook, storiesOf } from '@storybook/react'
import { initializeRTL } from 'storybook-addon-rtl'

import '../packages/ui-themes/src/canvas'

setOptions({
  name: "Instructure UI",
  url: "http://instructure.github.io/instructure-ui/#index",
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false
})

initializeRTL()

configure(() => {
  // Automatically import all example js files
  const req = require.context('../packages', true,  /src\/\S+\/examples\.js$/)

  req.keys().forEach((pathToExamples) => {
    const Examples = req(pathToExamples)
    const component = getComponentNameFromDirectory(pathToExamples)
    const stories = storiesOf(component, module)
    Object.keys(Examples).forEach((example) => {
      stories.add(example, Examples[example])
    })
  })
}, module)

export { getStorybook }

function getComponentNameFromDirectory (filePath) {
  const directories = path.dirname(filePath)
    .split(path.sep)
    .filter(part => part !== '__tests__')
  return directories.pop()
}
