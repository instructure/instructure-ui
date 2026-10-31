# HydrationProvider

Shares whether the page has hydrated with every component below it, so they
all switch from their server output at the same time. Class components read
it with `HydrationGate`.

`InstUISettingsProvider` already includes it, so you usually don't need to
add it yourself.

### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| HydrationProvider | children | `ReactNode` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-react-utils
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { HydrationProvider } from '@instructure/ui-react-utils'
```

