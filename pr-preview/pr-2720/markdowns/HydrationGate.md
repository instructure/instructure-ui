# HydrationGate

Render-prop form of `useIsHydratedContext`, for class components.

A class can read context directly, but it cannot fall back to computing the
value when no provider is mounted, which would leave it stuck in the
pre-hydration branch forever. Going through this component gets both.

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

