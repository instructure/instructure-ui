---
id: instructure-ui
---

## instructure-ui

[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Usage

Instructure-UI has a number of beautiful and accessible React components with baked-in styles and theming and helpful utility functions.

To start using Instructure-UI React components, you must do the following:

1. Activate a style theme.
2. Import and render an Instructure-UI component.

To get the default styles as shown in the examples, use the pre-built Canvas theme.

Example:
```bash
$ yarn add @instructure/ui-themes @instructure/ui-elements
```

```javascript
import React, { Component } from 'react'
import '@instructure/canvas-theme'

import { Heading } from '@instructure/ui-elements'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>Now using Instructure-UI components with default Canvas theme!</Heading>
      </div>
    )
  }
}

export default App
```

### Contributing

Before contributing please read our [code of conduct](#CODE_OF_CONDUCT) and read the [docs/contributing](#contributing) documentation.

### React Support

Instructure-UI currently supports React 15 and higher.

### Browser Support

- Internet Explorer 11 and Edge
- Chrome, Safari, Firefox (last two versions)

### License

[MIT](LICENSE)

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
