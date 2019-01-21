import path from 'path'

import { configure } from '@storybook/react'
import { getStorybook, storiesOf } from '@storybook/react'
import generateExamples from '@instructure/generate-examples/lib/generateExamples'

import '@instructure/ui-themes/lib/canvas'

import renderExample from '../renderExample'

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
