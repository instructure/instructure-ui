# FormField


This is a helper component that is used by most of the custom form
components. In most cases it shouldn't be used directly.

```js
---
type: example
---
<div>
  <FormField id="_foo121" label="Stacked layout" width="400px" layout="stacked"
             messages={[{type:'success', text: 'This is a success message'}, {type:'newError', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo121"/>
  </FormField>
  test
  <hr/>
  <FormField id="_foo122" label="Stacked layout (inline=true)" width="400px" layout="stacked" inline
             messages={[{type:'success', text: 'This is a success message'}, {type:'newError', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo122"/>
  </FormField>
  test
  <hr/>
  <FormField id="_foo123" label="Inline layout" width="400px" layout="inline"
             messages={[{type:'success', text: 'success!'}, {type:'newError', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo123"/>
  </FormField>
  test
  <hr/>
  <FormField id="_foo124" label="Inline layout (inline=true)" width="400px" layout="inline" inline
             messages={[{type:'success', text: 'success!'}, {type:'newError', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo124"/>
  </FormField>
  test
  <hr/>
  <FormField id="_foo121" label={<ScreenReaderContent>hidden text</ScreenReaderContent>} width="400px" layout="stacked">
    <TextInput id="_foo121" />
  </FormField>
  test
  <hr/>
</div>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| FormField | label | `ReactReactNode` | Yes | - |  |
| FormField | id | `string` | Yes | - | the id of the input (to link it to its label for a11y). Applied as the `for` HTML prop on the label. |
| FormField | messages | `Array` | No | - | Array of objects with shape: `{ text: React.ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| FormField | messagesId | `string` | No | - | id for the form field messages |
| FormField | children | `ReactReactNode` | No | - |  |
| FormField | inline | `boolean` | No | `false` |  |
| FormField | layout | `union` | No | `'stacked'` |  |
| FormField | labelAlign | `union` | No | `'end'` |  |
| FormField | vAlign | `union` | No | `'middle'` |  |
| FormField | width | `string` | No | - |  |
| FormField | inputContainerRef | `signature` | No | - |  |
| FormField | elementRef | `signature` | No | - | provides a reference to the underlying html root element |
| FormField | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |
| FormField.FormFieldLabel | children | `ReactReactNode` | Yes | - |  |
| FormField.FormFieldLabel | as | `union` | No | `'span'` |  |
| FormField.FormFieldLayout | label | `ReactReactNode` | Yes | - |  |
| FormField.FormFieldLayout | id | `string` | No | - | the id of the input (to link it to its label for a11y) |
| FormField.FormFieldLayout | as | `union` | No | `'label'` | the element type to render as |
| FormField.FormFieldLayout | messages | `Array` | No | - | Array of objects with shape: `{ text: React.ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| FormField.FormFieldLayout | messagesId | `string` | No | - | id for the form field messages |
| FormField.FormFieldLayout | children | `ReactReactNode` | No | - |  |
| FormField.FormFieldLayout | inline | `boolean` | No | `false` | If `true` use an inline layout -- content will flow on the left/right side of this component |
| FormField.FormFieldLayout | layout | `union` | No | `'stacked'` | In `stacked` mode the container is below the label, in `inline` mode the container is to the right/left (depending on text direction) |
| FormField.FormFieldLayout | labelAlign | `union` | No | `'end'` | The horizontal alignment of the label. Only works in `inline` layout |
| FormField.FormFieldLayout | vAlign | `union` | No | - | The vertical alignment of the label and the controls. "top" by default |
| FormField.FormFieldLayout | width | `string` | No | - |  |
| FormField.FormFieldLayout | inputContainerRef | `signature` | No | - | Provides a reference to the container that holds the input element @param element The element that holds the input control as its children |
| FormField.FormFieldLayout | elementRef | `signature` | No | - | provides a reference to the underlying html root element |
| FormField.FormFieldLayout | isGroup | `boolean` | No | - |  |
| FormField.FormFieldLayout | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |
| FormField.FormFieldMessage | variant | `union` | No | `'hint'` |  |
| FormField.FormFieldMessage | children | `ReactReactNode` | No | - |  |
| FormField.FormFieldMessages | messages | `Array` | No | - | Array of objects with shape: `{ text: React.ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| FormField.FormFieldMessages | gridArea | `string` | No | - | Specifies the size and location if inside a CSS grid, see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area |

### Usage

Install the package:

```shell
npm install @instructure/ui-form-field
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { FormField } from '@instructure/ui-form-field'
```

