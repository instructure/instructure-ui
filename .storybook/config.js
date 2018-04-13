import { configure } from '@storybook/react'
import { setOptions } from "@storybook/addon-options";
import { getStorybook } from '@storybook/react'

import '../packages/ui-themes/src/canvas'

setOptions({
  name: "Instructure UI",
  url: "http://instructure.github.io/instructure-ui/#index",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false
})

// automatically import all files ending in *.stories.js from the src folders
const req = require.context('../packages', true, /stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)

export { getStorybook }
