---
category: packages
---

## ui-code-editor

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A code editor component.

### Components

The `ui-code-editor` package contains the following:

- [CodeEditor](#CodeEditor)
- [CodeEditorV2](#CodeEditorV2)

### Installation

```sh
yarn add @instructure/ui-code-editor
```

### Usage

```js
import React from 'react'
import { CodeEditor, CodeEditorV2 } from '@instructure/ui-code-editor'

const MyCodeEditor = () => {
  return (
    <CodeEditor
      label="code editor"
      defaultValue='{"foo": "bar"}'
      language="javascript"
      readOnly
    />
  )
}

const MyCodeEditorV2 = () => {
  return (
    <CodeEditorV2
      label="code editor"
      defaultValue='{"foo": "bar"}'
      language="javascript"
      readOnly
    />
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-code-editor.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-code-editor
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
