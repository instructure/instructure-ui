---
category: packages
---

## @instructure/ui-core

[npm]: https://img.shields.io/npm/v/@instructure/ui-core.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-core

[![npm][npm]][npm-url]

### Installation

```sh
yarn add @instructure/ui-core
```

### Usage

```js
import React from 'react'
import Heading from '@instructure/ui-core/lib/components/Heading'

export default MyHeading = function () {
  return (
    <Heading>Hello World</Heading>
  )
}
```

```jsx_example
  <Button variant="primary" margin="0 x-small 0 0">
    Primary button
  </Button>
```

For the default theme you'll also need to include the ['Lato' font](http://www.google.com/fonts#UsePlace:use/Collection:Lato:300,400,400i,700,700i) in your application.

### Customization

Coming soon. For now see the [ApplyTheme](http://instructure.github.io/@instructure/ui-core/#ApplyTheme) component docs.

### Browser Support

- Internet Explorer 11 and Edge
- Chrome, Safari, Firefox (last two versions)

### Contribute

See the [contributing guidelines](http://instructure.github.io/@instructure/ui-core/#contributing) for details.

### License

[MIT](LICENSE)
