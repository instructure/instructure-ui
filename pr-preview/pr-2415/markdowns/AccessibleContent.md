# AccessibleContent

This component hides its children from screenreaders, they will read the text
specified by the `alt` prop instead
@module AccessibleContent
AccessibleContent provides a textual alternative to the presentational content it is wrapping. It utilizes the `alt` prop that is very similar in concept to the 'alt' attribute of an HTML <img> tag.

The content should be descriptive enough that a screen reader user gets the gist purely through text. Note the caveats on hiding content from screen readers. (see [PresentationContent](PresentationContent))

```js
---
type: example
---
<AccessibleContent alt="Alternative text for a screen reader only">
  <Text>
    Presentational content goes here
  </Text>
</AccessibleContent>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| AccessibleContent | alt | `string` | No | - | The text that screenreaders will read. Will not be visible. |
| AccessibleContent | as | `AsElementType` | No | `'span'` | the element type to render the screen reader content as |
| AccessibleContent | children | `React.ReactNode` | No | `null` | Content that will be hidden from screenreaders (via `aria-hidden` set to `true`) |

### Usage

Install the package:

```shell
npm install @instructure/ui-a11y-content
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { AccessibleContent } from '@instructure/ui-a11y-content'
```

