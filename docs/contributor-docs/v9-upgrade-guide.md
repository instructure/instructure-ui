---
title: Upgrade Guide for Version 9.0
category: Guides
order: 7
---

# Upgrade Guide for Version 9

Please read this guide carefully if you plan to update your app to this release.

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 7.x to 9.x, then migrate first to 8.x and then to version 9.

The tables below show what is removed and what they are replaced with. We also marked if there are [codemods](#ui-codemods) available.

### CommonJS build has been deprecated in v9

Since CommonJS style imports `require(..)` have been superseded by ES6 style imports `import … from …` and are well supported both in browsers and in node.js we decided to no longer support packages with CommonJS style imports in our releases.

Some of our internal toolings require commonjs still and the refactor takes a long time. We decided to deprecate but leave in the CommonJS build for the time being, but - since it's deprecated - we will remove it without a breaking change notice or major release in the future.

**IMPORTANT!**\
**tl;dr: Even so the CommonJS build is still available, please do not use it, it will be removed anytime**

### Deprecated and Removed Components

| Component                 | Substitute / Notes                                                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CodeEditor](#CodeEditor) | CodeEditor stays deprecated in v9. Use [SourceCodeEditor](#SourceCodeEditor) instead, which is the wrapper for the newer version of the CodeMirror code editor. |
| Navigation                | Navigation has been removed in v9. Use the new [SideNavBar](#SideNavBar) instead.                                                                               |

### Removed Utilities

| Utility              | Substitute / Notes                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addResizeListener    | Use the native [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) utility. Example usage: [here](#addResizeListener)                       |
| ApplyTextDirection   | Use [InstUISettingsProvider](#InstUISettingsProvider) instead to configure text direction.                                                                                |
| bidirectional        | It has been renamed to [textDirectionContextConsumer](#textDirectionContextConsumer), functionality remains the same.                                                     |
| Browser              | It has been removed in v9.                                                                                                                                                |
| ComponentIdentifier  | This util has been removed because it is not used by InstUI and other Instructure projects. If you need it, just copy & paste their code.                                 |
| elementMatches       | This polyfill is only needed for old, unsupported browsers.                                                                                                               |
| EmotionThemeProvider | It has been renamed to [InstUISettingsProvider](#InstUISettingsProvider) and can now also configure text direction. [Codemod](#ui-codemods) is available for this change. |
| isEdge               | It has been removed in v9.                                                                                                                                                |
| isIE11               | It has been removed in v9.                                                                                                                                                |

### Removed Properties

For more information, click the name of the component to see its full documentation.

| Component                      | Old Property       | New Property | Notes                                                                                                                                         |
| ------------------------------ | ------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mask](#Mask)                  | onDismiss          | -            | This prop hasn't been used by the component for a long time, it has been removed in V9.                                                       |
| [Overlay](#Overlay)            | applicationElement | -            | This prop is passed to Dialog, but it has been removed from Dialog in V6, so this prop has been removed too in V9.                            |
| [TopNavBar.Layout](#TopNavBar) | desktopConfig      | -            | From v9, actionUserSeparator has to be visible at all times. This made the `desktopConfig` prop obsolete since it only had this single field. |
| [TopNavBar.Brand](#TopNavBar)  | renderName         | -            | From v9 `TopNavBar.Brand` should only contain the brand logo, not the name.                                                                   |
| [TopNavBar.Brand](#TopNavBar)  | nameBackground     | -            | This prop set the background color of the brand name which is no longer supported in v9.                                                      |

### Deprecated Property Values

For more information, click the name of the component to see its full documentation.

| Component                   | Property | Old Value | New Value | Notes                                                                                                             |
| --------------------------- | -------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| [BaseButton](#BaseButton)   | tabIndex | `string`  | `number`  | Now only accepts `number` and not `string`.                                                                       |
| [CloseButton](#CloseButton) | tabIndex | `string`  | `number`  | Now only accepts `number` and not `string`.                                                                       |
| [Text](#Text)               | color    | warning   | -         | The `warning` color variant doesn't have sufficient color contrast with the background (4.5:1) required for text. |

### Removed packages and scripts

- InstUI-CLI's `create-app`, `create-component` and `create-package` commands: Just follow the instructions in the [usage](#usage) docs.
- The `template-component`, `template-package` and `template-app` packages have been removed.

### Removal of deprecated legacy reference attributes from components

Some of our components had reference properties to the underlying html elements which were meant to be used internally within the component itself. These properties has been removed.

If you wish to get access to the html elements please refer [this](https://instructure.design/#accessing-the-dom) page which will explain how to do it with examples.
