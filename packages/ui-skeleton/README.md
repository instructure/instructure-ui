## ui-skeleton

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Placeholders to show while content loads. They're sized with CSS only, so they
also work in server-rendered HTML.

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
      skeleton={<SkeletonLoader.Text lines={5} />}
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
