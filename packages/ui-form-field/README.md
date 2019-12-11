---
category: packages
---

## ui-form-field

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

Form layout components.
### Components
The `ui-form-field` package contains the following:
- [FormField](#FormField)
- [FormFieldGroup](#FormFieldGroup)
- [FormFieldLabel](#FormFieldLabel)
- [FormFieldLayout](#FormFieldLayout)
- [FormFieldMessage](#FormFieldMessage)
- [FormFieldMessages](#FormFieldMessages)
  

### Installation

```sh
yarn add @instructure/ui-form-field
```

### Usage

```js
import React from 'react'
import { FormField } from '@instructure/ui-form-field'

const MyFormField = () => {
  return (
    <FormField label="Label" layout="inline">
      ...
    </FormField>
  )
}
```
For detailed usage and documentation, see individual components.


[npm]: https://img.shields.io/npm/v/@instructure/ui-form-field.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-form-field

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
