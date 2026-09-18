## ui-skeleton

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Skeleton loaders that render a correctly sized placeholder straight from server HTML.

The point is layout, not decoration. Every dimension comes from tokens, props, or
CSS intrinsic sizing, so a skeleton reserves exactly the space its content will
occupy without measuring anything — which is the only way to size a placeholder
before hydration.

### Components

The `ui-skeleton` package contains the following:

- [SkeletonLoader](SkeletonLoader)

### Installation

```sh
npm install @instructure/ui-skeleton
```

### Usage

```jsx
import React from 'react'
import { SkeletonLoader } from '@instructure/ui-skeleton'

const CourseList = ({ isLoading, courses }) => {
  return (
    <SkeletonLoader
      isLoading={isLoading}
      loadingLabel="Loading courses"
      loadedLabel={`${courses.length} courses`}
      skeleton={<SkeletonLoader.Shape shape="text" lines={5} />}
    >
      <ul>
        {courses.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </SkeletonLoader>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-skeleton.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-skeleton
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
