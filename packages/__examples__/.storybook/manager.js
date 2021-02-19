import addons from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'InstUI storybook',
    name: 'instructure-ui',
    brandUrl: 'https://instructure.design',
    brandImage: 'https://www.instructure.com/themes/custom/themekit/logo.svg'
  })
})
