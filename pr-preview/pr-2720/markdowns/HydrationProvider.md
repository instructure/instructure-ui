# HydrationProvider

Reads the hydration state **once per page** and hands it to every descendant
through context.

Doing it here rather than in each component matters for three reasons:
 - class components can consume context but cannot call hooks, so this is what
   lets `View` participate without being rewritten
 - every consumer flips in the same commit, which is what keeps multiple
   skeletons animating in step instead of drifting apart
 - it gives us one place to mirror the state onto the DOM for CSS-only consumers

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

