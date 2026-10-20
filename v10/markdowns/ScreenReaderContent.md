# ScreenReaderContent

@module ScreenReaderContent
The ScreenReaderContent component renders content that is accessible to
screen readers, but is not visible.

```js
---
type: example
---
<ScreenReaderContent>
  This content is not visible.
</ScreenReaderContent>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ScreenReaderContent | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'span'` | the element type to render as |
| ScreenReaderContent | children | `ReactNode` | No | `null` | content meant for screen readers only |
| ScreenReaderContent | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-a11y-content
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
```

