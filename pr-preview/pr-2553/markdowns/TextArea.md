# TextArea


TextArea renders a standard HTML `textarea` element. By default, TextArea will
resize to fit its content. Use the `maxHeight` property to set a limit on the
component's height.

```js
---
type: example
---
<div>
  <TextArea
    label="Enter/delete text to see TextArea resize"
  />
  <br />
  <TextArea
    label="I can't go any higher than 10rem (160px)"
    maxHeight="10rem"
  />
</div>
```

To allow the user to manually resize TextArea (in supported browsers), use the
`resize` property.

```js
---
type: example
---
<TextArea label="Description" resize="vertical" />
```

A `TextArea` with errors:

```js
---
type: example
---
<TextArea messages={[{ text: 'Invalid description', type: 'newError' }]} label="Description" />
```

A disabled `TextArea`:

```js
---
type: example
---
<TextArea label="Description" disabled />
```

A `TextArea` with a screenreader only label:

```js
---
type: example
---
<TextArea
  label={<ScreenReaderContent>Description</ScreenReaderContent>}
  placeholder="describe something"
/>
```

An inline `TextArea` with a fixed width, initial height and maxHeight.

```js
---
type: example
---
<div style={{ display: 'flex', alignItems: 'center' }}>
  <TextArea
    label={<ScreenReaderContent>Label</ScreenReaderContent>}
    inline
    width="10em"
    height="10em"
    maxHeight="250px"
  />
</div>
```

A 'controlled' TextArea:

```js
---
type: example
---
  const Example = () => {
    const [description, setDescription] = useState('Hello World')

    const handleChange = (e) => setDescription(e.target.value)

    return (
      <TextArea
        label="Description"
        value={description}
        onChange={handleChange}
      />
    )
  }

  render(<Example />)
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Align text to the left</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Repeat label text if using placeholder text</Figure.Item>
    <Figure.Item>Use for rich text editing</Figure.Item>
    <Figure.Item>Allow resizing of the TextArea to break the layout of a page</Figure.Item>
    <Figure.Item>Place labels to the right of the TextArea</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Alert
    variant="info"
    margin="small"
  >
    Every non-listed prop will be passed down to the underlying 'textarea' element, such as 'onBlur' and any other prop
  </Alert>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| TextArea | label | `React.ReactNode` | Yes | - |  |
| TextArea | id | `string` | No | - |  |
| TextArea | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | sets the font-size for the textarea |
| TextArea | layout | `'stacked' \| 'inline'` | No | `'stacked'` |  |
| TextArea | autoGrow | `boolean` | No | `true` | the textarea will expand vertically to fit the height of the content, unless its content exceeds `maxHeight` |
| TextArea | resize | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | No | `'none'` | is the textarea resizable (in supported browsers) |
| TextArea | width | `string` | No | - | a fixed width for the textarea |
| TextArea | height | `string` | No | - | Initial height for the textarea (if autoGrow is true it will grow vertically) Accepts CSS units, e.g. '55px' |
| TextArea | maxHeight | `number \| string` | No | - | when autoGrow is true, the textarea will never grow beyond this value |
| TextArea | messages | `FormMessage[]` | No | `[]` | Array of objects with shape: `{ text: React.ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| TextArea | inline | `boolean` | No | `false` |  |
| TextArea | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| TextArea | disabled | `boolean` | No | `false` | Whether or not to disable the textarea |
| TextArea | readOnly | `boolean` | No | `false` | Works just like disabled but keeps the same styles as if it were active |
| TextArea | required | `boolean` | No | `false` | Sets the required property on the underlying native textArea |
| TextArea | textareaRef | `(textarea: HTMLTextAreaElement \| null) => void` | No | - | a function that provides a reference to the actual textarea element |
| TextArea | defaultValue | `string` | No | - | value to set on initial render |
| TextArea | value | `string` | No | - | the selected value (must be accompanied by an `onChange` prop) |
| TextArea | onChange | `(event: React.ChangeEvent<HTMLTextAreaElement>) => void` | No | - | when used with the `value` prop, the component will not control its own state |
| TextArea | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |

### Usage

Install the package:

```shell
npm install @instructure/ui-text-area
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { TextArea } from '@instructure/ui-text-area'
```

