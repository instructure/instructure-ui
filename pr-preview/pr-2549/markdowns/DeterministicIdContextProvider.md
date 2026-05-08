# DeterministicIdContextProvider

WARNING: providing the `instanceCounterMap` prop will result in unexpected behaviour. DO NOT USE IT!

DEPRECATED: the `instanceCounterMap` prop is deprecated. You don't need to supply the
`instanceCounterMap` to the component. It handles it internally.

This utility component is for wrapping components with `DeterministicIdContext.Provider`
See detailed documentation about how to use it: [InstUISettingsProvider](/#InstUISettingsProvider)

### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DeterministicIdContextProvider | instanceCounterMap | `` | No | `generateInstanceCounterMap()` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-react-utils
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DeterministicIdContextProvider } from '@instructure/ui-react-utils'
```

