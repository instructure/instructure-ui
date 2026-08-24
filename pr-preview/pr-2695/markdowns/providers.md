# Providers

Only the provider is a client component; the surrounding html/body shell stays
on the server. This mirrors how a real Next.js App Router consumer would wire
InstUI in.

Note there is deliberately no theme switching in an effect here. The
regression-test app does that so its static export and hydration agree, but
changing the theme after mount re-renders every component and produces a
layout shift of its own — which would pollute every measurement this app
makes.

### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Providers | children | `ReactNode` | Yes | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ssr-lab
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Providers } from '@instructure/ssr-lab'
```

