---
category: packages
---

## @instructure/babel-plugin-transform-class-display-name

[npm]: https://img.shields.io/npm/v/@instructure/babel-plugin-transform-class-display-name.svg
[npm-url]: https://npmjs.com/package/@instructure/babel-plugin-transform-class-display-name

[![npm][npm]][npm-url]

**DEPRECATED:** use [@instructure/babel-plugin-themeable-styles](#babel-plugin-themeable-styles) instead.

A transform to add a displayName to React components. This is required for
[@instructure/ui-themeable](#ui-themeable) because it uses the displayName to
scope the CSS variables.

### Installation

```sh
yarn add --dev @instructure/babel-plugin-transform-class-display-name
```

### Usage

In your `.babelrc` file:

```json
{
  "plugins": ["@instructure/babel-plugin-transform-class-display-name"]
}
```
