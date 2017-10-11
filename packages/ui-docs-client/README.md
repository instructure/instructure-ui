---
category: packages
---

## @instructure/ui-docs-client

A client application to display documentation made by Instructure Inc.

[npm]: https://img.shields.io/npm/v/@instructure/ui-docs-client.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-docs-client

[![npm][npm]][npm-url]

### Installation

```sh
yarn add @instructure/ui-docs-client
```

### Usage

```js
import renderDocsClient from '@instructure/ui-docs-client'

const data = {}

renderDocsClient(data, document.getElementById('app'))
```

### Development

From the root of the `instructure-ui` repo:

1. Run `yarn`
1. Run `yarn build:dev`
1. Run `yarn start:watch`
1. Open [http://localhost:8080](http://localhost:8080) in your browser
1. You'll need to run `yarn build:dev --scope @instructure/ui-docs-client` when you make changes.
