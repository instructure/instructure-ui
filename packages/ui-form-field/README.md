---
category: packages
---

## ui-form-field

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-form-field
```

### Usage

```js
import React from 'react'
import FormField from '@instructure/ui-form-field/lib/components/FormField'

export default function Example () {
  return (
    <FormField label="Label" layout="inline">
      ...
    </FormField>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-forms.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-forms

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
