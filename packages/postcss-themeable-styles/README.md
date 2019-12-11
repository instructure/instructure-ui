---
category: packages
---

## postcss-themeable-styles

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

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

[npm]: https://img.shields.io/npm/v/@instructure/postcss-themeable-styles.svg
[npm-url]: https://npmjs.com/package/@instructure/postcss-themeable-styles

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
