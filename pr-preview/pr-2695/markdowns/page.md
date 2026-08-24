# MixPage

Renders several scenarios on one page, chosen with repeated `c` query params:

  /mix?c=text-input&c=table&c=truncate-text

The measurement panel reports one CLS for the whole page, which is the number
that matters when the question is "how bad is a real page", not "how bad is
this one component".

### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| MixPage | searchParams | `Promise<Record<string, string \| string[] \| undefined>>` | Yes | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ssr-lab
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { MixPage } from '@instructure/ssr-lab'
```

