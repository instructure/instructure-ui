---
category: packages
---

## media-capture

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add @instructure/media-capture
```

[npm]: https://img.shields.io/npm/v/@instructure/media-capture.svg
[npm-url]: https://npmjs.com/package/@instructure/media-capture

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md


### Browser Support

- Chrome, Firefox

### Usage

```javascript
import React, { Component } from 'react'
import { canUseMediaCapture, mediaCaptureStates }, MediaCapture from '@instructure/media-capture'

export default class Container extends Component {
  saveFile (file) {
    // do something with the file
  },
  
  mediaCaptureClosed (state) {
    if (state === mediaCaptureStates.RECORDING) {
      alert('Recording canceled.')
    }
  },

  render () {
    return (
      { canUseMediaCapture() ?
        <MediaCapture
          onCompleted={this.saveFile}
          onCancel={this.mediaCaptureClosed}
          onClose={this.mediaCaptureClosed}
        /> : null
      }
    )
  }
}

```
