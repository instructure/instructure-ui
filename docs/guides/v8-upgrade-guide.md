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

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Why we switched from emotion to themeable"
>
  <ToggleBlockquote.Paragraph>
    We feel that it is very important that InstUI is easy to use and learn. To accomplish this, we try to use well-known open source solutions whenever possible.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    The previous, custom made theming solution did not fit into this vision (for its defense it was added when there weren't widely used alternatives)
    so we decided to switch to a broadly adopted one. The two main candidates were <Link href="https://emotion.sh">emotion.sh</Link> and <Link href="https://styled-components.com">styled components</Link>, we decided to use emotion.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    If you are interested in our detailed reasoning you can read it <Link href="https://gist.github.com/serikjensen/4ba00b653efac1dbf80543c529adabbc">here</Link>.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

## Before you upgrade to v8.0

There are a few steps you need to do before you start the migration process. **First, upgrade to the latest v7.x release to have access to all the new components and features.**

You can find the legacy v7 documentation on [legacy.instructure.design](https://legacy.instructure.design).

### Removal of deprecated components and properties

One of the features of v8.0. is that we deleted all components and properties marked as `deprecated` in v7. Since these are not backwards compatible anymore, please make sure to update everything.

**We made a list of all the affected components and props on [Deprecated Properties and Components in Version 7.0](https://legacy.instructure.design/#v7-deprecated-props-and-components) page to have a clear overview of the changes, removals, substitutes.** You can also find these changes in our [CHANGELOG](#CHANGELOG).

### Codemods

We provide codemods to ease the upgrade process, you can read the details [TODO add link]()

See the [ui-codemods](#ui-codemods) package docs for more information about codemods.

## Main changes

### Github as the main source code repository

We have moved the development of the library fully to Github. Please file your bug reports or pull requests [here](https://github.com/instructure/instructure-ui).

### Migrating theming from Themeable to Emotion

We prepared a detailed guide on how to migrate the theming of your app to emotion: [Themeable to Emotion Migration Guide for Version 8.0](#themeable-to-emotion-migration-guide)

### Removal of themeable-related packages

With the introduction of the new theming solution, the `ui-themeable` package was deleted. Since themeable was based on CSS styling, there were some other packages that supported themeable, but are no longer needed for the JS-based styling.

We have removed the following packages:

| Package name                                                                                                           | Reason                            |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [@instructure/ui-themeable](https://www.npmjs.com/package/@instructure/ui-themeable)                                   | Themeable was replaced by emotion |
| [@instructure/babel-plugin-themeable-styles](https://www.npmjs.com/package/@instructure/babel-plugin-themeable-styles) | Babel plugin used by themeable    |
| [@instructure/postcss-themeable-styles](https://www.npmjs.com/package/@instructure/postcss-themeable-styles)           | CSS transformer used by themeable |
| [@instructure/ui-postcss-config](https://www.npmjs.com/package/@instructure/ui-postcss-config)                         | PostCSS config used by themeable  |
| [@instructure/ui-stylesheet](https://www.npmjs.com/package/@instructure/ui-stylesheet)                                 | Used by themeable                 |

**Note:** In case you need them, the 7.x versions are still on npm, but they will not receive further feature updates.
You can still file bugs, and we will likely fix them or submit pull requests if you want to see a new feature in them.

### Other changes

##### Node version

InstUI now needs node.js version >12.20 to build.

##### Legacy Context

Updated React legacy context to the new context API in the components that use it (e.g. `DrawerLayout`).

##### TreeBrowser

New `TreeBrowser.Node` component for rendering the `renderBeforeItems` and `renderAfterItems` in the `TreeBrowser`.

##### Tabs

We wanted to keep the colors of normal and secondary tabs consistent. In v7.4.1 we made the color of the un-selected tabs the same as the selected ones in the "secondary" variant too.

In v8, the `secondarySelectedColor` theme variable will be removed.

##### Checkbox

Visual fix: fixed the error of having no spacing between a single checkbox and its error/info messages.

##### Other

- Upgraded Storybook from 5.2 to 6.1
- New [legacy.instructure.design](https://legacy.instructure.design) for storing the documentation of the last major release (v7 in this case)
- Updated some of our guides (e.g.: [Contributing](#contributing))
- Development builds are called now `snapshot`
- Improved a bit on the performance and speed of the [Iconography](#iconography) page
