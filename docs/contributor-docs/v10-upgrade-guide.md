---
title: Upgrade Guide for Version 10.0
category: Guides
order: 7
---

# Upgrade Guide for Version 10

## Introduction

InstUI v10 is a major release with a new theming color system. It has been simplified and rewritten to make our design language easier to understand and more uniform.

With the new system some old designs could be more challenging or very hard to implement. This is intentional, we wanted
to avoid situations when someone really changes the look and feel of their application.
In these cases, make sure you talk with your designer and update the UI according to the new designs.

The revised designs should result in better accessibility ([WCAG 2.1](https://www.w3.org/TR/WCAG21/) compliance!), less theming code and more uniform look and feel.

## Step-by-step guide

We recommend upgrading your application for each major version gradually, e.g. if you plan to update from 8.x to 10.x,
then migrate first to the latest 9.x and then to version 10.

The places where your code can break during the upgrade are related to theme overrides, color props and color utilities.
Please check the [theming components](#theming-components) guide to understand the new color system.

If you override the theme colors, you must use the new colors provided either in the `canvas-high-contrast` or in the `canvas` theme object.
The previous color system has been removed, the old color names are no longer available.

### `Instructure` theme is removed

Instructure theme (`@instructure/instructure-theme`) is no longer maintained and not compatible with InstUI v10.
If you were using it, you need to switch to the `canvas` or the `canvas-high-contrast` theme.

### Component level color overrides

If you had component level overrides of colors you need to migrate using the following table
(codemods to automate this are coming soon):

| Old                | New (v10)                     |
| ------------------ | ----------------------------- |
| `colors.Brand`     | `colors.contrasts.blue4570`   |
| `colors.Link`      | `colors.contrasts.blue4570`   |
| `colors.Electric`  | `colors.contrasts.blue4570`   |
| `colors.Shamrock`  | `colors.contrasts.green4570`  |
| `colors.Barney`    | `colors.contrasts.blue4570`   |
| `colors.Crimson`   | `colors.contrasts.red4570`    |
| `colors.Fire`      | `colors.contrasts.orange4570` |
| `colors.Licorice`  | `colors.contrasts.grey125125` |
| `colors.Oxford`    | `colors.contrasts.grey100100` |
| `colors.Ash`       | `colors.contrasts.grey4570`   |
| `colors.Slate`     | `colors.contrasts.grey4570`   |
| `colors.Tiara`     | `colors.contrasts.grey1214`   |
| `colors.Porcelain` | `colors.contrasts.grey1111`   |
| `colors.White`     | `colors.contrasts.white1010`  |

InstUI v9:

```jsx
---
type: code
---
<Heading level="h3" color="primary"
         themeOverride={{primaryColor: canvas.colors.brand}}>
    I have nice color!
</Heading>
```

InstUI v10:

```jsx
---
type: code
---
<Heading level="h3" margin="small small" color="primary"
         themeOverride={{primaryColor: canvas.colors.contrasts.blue4570}}>
    some nice blue text.
</Heading>
```

Notice, that the new values use `colors.contrasts`. Please do not use `colors.primitives` for anything.

### Theme level color overrides

InstUI v9 theme level properties `text`, `background`, `border` (for example `backgroundLightest` or `textDarkest`) have been removed.
To upgrade these props you need to find and override component level theme variables for each component that used the replaced property.
**This is heavily discouraged, upcoming designs should not necessitate theme overrides.**

For example, if you had `backgroundLightest` overridden on the theme level, you need to find every component whose theme
utilizes `backgroundLightest` and override them individually in each component. Some of these components are `Alert`, `Avatar`, `Billboard`, `View` and many more.

InstUI v9:

```jsx
---
type: code
---

<InstUISettingsProvider
  theme={{
    themeOverrides: {
      canvas: {
        colors: { backgroundLightest: 'orange' }
      }
    }
  }}
>
```

InstUI v10:

```jsx
---
type: code
---

<Alert themeOverride={{background: 'orange'}}></Alert>
<Avatar themeOverride={{background: 'orange'}}></Avatar>
<Billboard themeOverride={{background: 'orange'}}></Billboard>
<Tabs themeOverride={{defaultBackground: 'orange', scrollFadeColor:'orange'}}></Tabs>
//...and all other components that use color.backgroundLightest
```
