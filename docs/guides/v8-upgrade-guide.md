---
title: Upgrade Guide for Version 8.0
category: Guides
order: 1
---

# Upgrade Guide for Version 8.0

Hi!

Please read this guide carefully if you plan to update your app to this release.
The main feature for this release is the switch of the theming engine, we replaced the in-house `themeable` theming with the popular [emotion.js](https://emotion.sh/)

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 5.x to 8.x migrate first to 6.x, then 7.x and finally to version 8.

## Why we switched from emotion to themeable

We feel that it is very important that InstUI is easy to use and learn, to accomplish this we try to use well-known open source solutions whenever possible.
The previous, custom made theming solution did not fit into this vision (for its defense it was added when there weren't widely used alternatives)
so we decided to switch to a broadly adopted one. The two main candidates were [emotion.sh](https://emotion.sh) and [styled components](https://styled-components.com), we decided to use emotion. If you are interested in our detailed reasoning you can read it [here](https://gist.github.com/serikjensen/4ba00b653efac1dbf80543c529adabbc).

### Codemods

We provide codemods to ease the upgrade process, you can read the details [TODO add link]()

### Github as the main source code repository

We have moved the development of the library fully to Github. Please file here bugs or pull requests.

### Migrating theming from Themeable to Emotion

We prepared a detailed guide on how to migrate the theming of your app to emotion [TODO add link here.](TODO add link)

### Removal of deprecated properties

Properties that were marked as deprecated in 7.x got removed in 8.0. On what to use as substitutes please read the 7.x docs at https://legacy.instructure.design

### Removal of deprecated packages

We have removed the following packages:

| Package name                                                                                                           | Reason                            |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [@instructure/ui-themeable](https://www.npmjs.com/package/@instructure/ui-themeable)                                   | Themeable was replaced by emotion |
| [@instructure/babel-plugin-themeable-styles](https://www.npmjs.com/package/@instructure/babel-plugin-themeable-styles) | Babel plugin used by themeable    |
| [@instructure/postcss-themeable-styles](https://www.npmjs.com/package/@instructure/postcss-themeable-styles)           | CSS transformer used by themeable |
| [@instructure/ui-postcss-config](https://www.npmjs.com/package/@instructure/ui-postcss-config)                         | PostCSS config used by themeable  |

The 7.x versions are still on npm, but they will not receive further feature updates.
You can still file bugs, and we will likely fix them or submit pull requests if you want to see a new feature in them.

### Other smaller changes

- InstUI now needs node.js version >12.20 to build
- Upgraded Storybook from 5.2 to 6.1
- Development builds are called now `snapshot`
- Updated React legacy context to the new context API in the components that use it (e.g. `DrawerLayout`)
