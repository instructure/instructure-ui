# HydrationGate

Lets class components know whether the page has hydrated. It works with or
without a `HydrationProvider` above it.

```jsx
<HydrationGate>
  {(isHydrated) => (isHydrated ? <Content /> : <Placeholder />)}
</HydrationGate>
```

### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| HydrationGate | children | `(isHydrated: boolean) => ReactNode` | Yes | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-react-utils
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { HydrationGate } from '@instructure/ui-react-utils'
```

