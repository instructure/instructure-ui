import path from 'path'

import { configure } from '@storybook/react'
import { setOptions } from "@storybook/addon-options";
import { getStorybook, storiesOf } from '@storybook/react'
import { initializeRTL } from 'storybook-addon-rtl'
import generateExamples from '@instructure/generate-examples/lib/generateExamples'

import '@instructure/ui-themes/lib/canvas'

import renderExample from '../renderExample'

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
  const examples = generateExamples(require('!!examples-loader!'), { renderExample })

  if (examples) {
    examples.forEach((example) => {
      const stories = storiesOf(example.name, module)

      example.sections.forEach((section) => {
        const { pages } = section

        pages.forEach((page, i) => {
          stories.add(`${section.name}${pages.length > 1 ? ` (page ${i+1})` : ''}`, () => page)
        })
      })
    })
  }
}, module)

export { getStorybook }
