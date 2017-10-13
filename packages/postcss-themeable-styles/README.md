---
category: packages
---

## @instructure/postcss-themeable-styles

[npm]: https://img.shields.io/npm/v/@instructure/postcss-themeable-styles.svg
[npm-url]: https://npmjs.com/package/@instructure/postcss-themeable-styles

[![npm][npm]][npm-url]

For use with [@instructure/babel-plugin-themeable-styles](#babel-plugin-themeable-styles),
converts CSS variables into ES template tokens:

Given:

```css
/* style.css */
.root {
  background: var(--background);
  color: var(--color);

  &:hover {
    background: var(--hoverBackground);
    color: var(--hoverColor);
  }
}
```

Output:

```css
/* style.css */
.root {
  background: ${theme.background};
  color: ${theme.color};

  &:hover {
    background: ${theme.hoverBackground};
    color: ${theme.hoverColor};
  }
}
```


### Installation

```sh
yarn add --dev @instructure/postcss-themeable-styles
```

### Usage

```js
postcss([ require('@instructure/postcss-themeable-styles') ])
```
