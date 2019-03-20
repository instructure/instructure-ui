---
category: packages
---

## ui-forms

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/ui-forms
```

### Usage

```js
import React from 'react'
import TextInput from '@instructure/ui-forms/lib/components/TextInput'

export default MyTextInput = function () {
  return (
    <TextInput label="Name" placeholder="Doe, John Doe" />
  )
}
```

### Components
The `ui-forms` package contains the following components:
- [Checkbox](#Checkbox)
- [CheckboxGroup](#CheckboxGroup)
- [DateInput](#DateInput)
- [DateTimeInput](#DateTimeInput)
- [FileDrop](#FileDrop)
- [RadioInput](#RadioInput)
- [RadioInputGroup](#RadioInputGroup)
- [RangeInput](#RangeInput)
- [Select](#Select)
- [TextArea](#TextArea)
- [TextInput](#TextInput)
- [TimeInput](#TimeInput)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[npm]: https://img.shields.io/npm/v/@instructure/ui-forms.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-forms

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
