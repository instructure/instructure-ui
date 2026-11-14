# PresentationContent

@module PresentationContent
A component that _tries_ to hide itself from screen readers, absolutely
expecting that you're providing a more accessible version of the resource
using something like a ScreenReaderContent component.

Be warned that this does not totally prevent all screen readers from
seeing this content in all modes. For example, VoiceOver in OS X will
still see this element when running in the "Say-All" mode and read it
along with the accessible version you're providing.

Use of this component is discouraged unless there's no alternative
(e.g. for data visualizations)

```js
---
type: example
---
<PresentationContent>
  <Text>
    Presentational content here
  </Text>
</PresentationContent>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| PresentationContent | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'span'` | the element type to render as |
| PresentationContent | children | `React.ReactNode` | No | `null` |  |
| PresentationContent | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-a11y-content
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { PresentationContent } from '@instructure/ui-a11y-content'
```

