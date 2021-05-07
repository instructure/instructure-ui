---
category: packages
---

## ui-a11y-content

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

Utility components that help provide a good experience for users who navigate the web with a screen reader or keyboard.

### Components

The `ui-a11y-content` package contains the following components:

- [AccessibleContent](#AccessibleContent)
- [PresentationContent](#PresentationContent)
- [ScreenReaderContent](#ScreenReaderContent)

### Installation

```sh
yarn add @instructure/ui-a11y-content
```

### Usage

```jsx
---
example: false
---
<AccessibleContent
  alt="Alternative text for a screen reader only"
>
  <Text>
    Presentational content goes here
  </Text>
</AccessibleContent>
```

```jsx
---
example: false
---
<PresentationContent>
  <Text>
    Presentational content here
  </Text>
</PresentationContent>
```

```jsx
---
example: false
---
<ScreenReaderContent>
  This content is not visible.
</ScreenReaderContent>
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-a11y-content.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-a11y-content
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
