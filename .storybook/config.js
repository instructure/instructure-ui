import { configure } from '@storybook/react'
import { setOptions } from "@storybook/addon-options";
import { getStorybook } from '@storybook/react'

import '../packages/ui-themes/src/canvas'

setOptions({
  name: "Instructure UI",
  url: "http://instructure.github.io/instructure-ui/#index",
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: false,
  showSearchBox: false
})

// automatically import all stories.js files in the packages
const req = require.context('../packages', true, /stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)

export { getStorybook }
