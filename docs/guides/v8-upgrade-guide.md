---
title: Upgrade Guide for Version 8.0
category: Guides
order: 2
---

# Upgrade Guide for Version 8.0

Please read this guide carefully if you plan to update your app to this release.
The main feature for version 8 is the switch of the theming engine, we replaced the in-house `themeable` theming with the popular [emotion.js](https://emotion.sh/)

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 5.x to 8.x, then migrate first to 6.x, then 7.x and finally to version 8.

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Why we switched from Themeable to Emotion"
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

There are a few steps you need to do before you start the migration process. **First, upgrade to the latest v7.x release to be able to follow this guide.**

You can find the legacy v7 documentation in the dropdown in the left sidebar.

### Removal of deprecated components and properties

One of the changes of v8.0 is that we deleted all components and properties marked as `deprecated` in v7. Since these are not backwards compatible anymore, please make sure to update everything.

**We made a list of all the affected components and props on [Deprecated Properties and Components in Version 7.0](https://instructure.design/v7/#v7-deprecated-props-and-components) page to have a clear overview of the changes, removals, substitutes.** You can also find these changes in our [CHANGELOG](#CHANGELOG).

### Upgrade step-by-step

We strongly recommend to use codemods to ease your update process. To run these please install `jscodeshift` (v0.13 or newer) to your terminal and add [`@instructure/ui-codemods`](https://www.npmjs.com/package/@instructure/ui-codemods) and `@instructure/instui-config` with the latest version 8.x as a `devDependency` to your `package.json` You can push your code after each of these steps, it should fully work. Start the upgrade with the latest InstUI v7 version.

#### 1. Run the v7 `updatePropNames` codemod:

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updatePropNames.js <path> --config=node_modules/@instructure/instui-config/codemod-configs/v7/propNames.config.json
```

This will do most of the simple upgrades (renaming props, deleting props).

#### 2. Run the `updateV7Props` codemod:

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV7Props.js <path>
```

This will update more complex components (e.g. Buttons), and will tell you if it needs a manual update in the terminal. Fix what is needed manually.

#### 3. Update your dependencies latest InstUI 8 and then run

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateV8Breaking.js <path>
```

This will update the breaking changes from themeable to emotion:

1. `<ApplyTheme` -> `<InstUISettingsProvider`
2. `Menu.theme` -> `Menu.componentId` (for every InstUI component)
3. Renames components `theme={...}` prop to `themeOverride={...}`

Then run

```sh
jscodeshift -t node_modules/@instructure/ui-codemods/lib/updateImports.js <path> --config=node_modules/@instructure/instui-config/codemod-configs/v8/imports.config.js
```

This will update change the imports of 'ThemeablePropValues', 'ThemeablePropTypes' 'makeThemeVars', 'getShorthandPropValue', 'mirrorShorthandCorners', 'mirrorShorthandEdges' from `@instructure/ui-themeable` to `@instructure/emotion`.

After this you will need to manually update you custom components according to the [Emotion migration guide](#themeable-to-emotion-migration-guide). If you are done migrating you can remove `@instructure/ui-codemods` from your dependencies.

### Configuration and build scripts are private

These scripts are used for building and configuring InstUI, thus have frequent internal changes. If you depend on one of these packages we suggest to copy & paste their code to your project at the version you are currently using them:

```
cz-lerna-changelog
eslint-plugin-instructure-ui
instui-config
pkg-utils
ui-babel-preset
ui-codemods
ui-component-examples
ui-eslint-config
ui-icons-build
ui-karma-config
ui-polyfill-loader
ui-scripts
ui-stylelint-config
ui-template-scripts
ui-token-scripts
ui-upgrade-scripts
ui-webpack-config
```

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

### Added `DateTimeInput` (from v8.12.0)

We have (re)added a [DateTimeInput](https://instructure.design/#DateTimeInput) component. It should be used when one needs to enter a date and a time value, this component existed in V6 but was removed in V7, its API is slightly different from the V6 version, e.g. it has now default values for all non-text properties.

### TypeScript

InstUI has been converted to TypeScript. This will result in much better autocomplete for most cases, and you might see new errors when you are using something incorrectly (e.g. you set an enum to a non-permitted value). Note that this is a work-in-progress, so you might not get warned if you do something wrong.

### Other changes

##### Node version

InstUI now needs `node.js` version >12.20 to build.

##### Legacy Context

Updated React legacy context to the new context API in the components that use it (e.g. `DrawerLayout`).

##### Tabs

We wanted to keep the colors of normal and secondary tabs consistent. In v7.4.1 we made the color of the un-selected tabs the same as the selected ones in the "secondary" variant too.

In v8, the `secondarySelectedColor` theme variable is removed.

##### Checkbox

Visual fix: fixed the error of having no spacing between a single checkbox and its error/info messages.

##### Other

You can access the documentation for older InstUI versions (from v6) from the dropdown in the left sidebar.

- Updated some of our guides (e.g.: [Contributing](#contributing))
- Development builds are called now `snapshot`
