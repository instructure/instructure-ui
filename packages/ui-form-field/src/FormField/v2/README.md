---
describes: FormField
---

This is a helper component that is used by most of the custom form
components. In most cases it shouldn't be used directly.

### Accessibility

`FormField` renders a `<label>` that wraps the label text, and links it to
the form control via its `for` attribute. Make sure that you mind the following:

- The control needs to have the same `id` as the one passed to `FormField` via `labelId`.
  you can also use `aria-labelledby` on your control to read the label.
- Messages aren't part of the control's accessible name. To have screen readers
  announce them, pass a function as `children`. It receives `{ describedBy }`,
  the id of the rendered messages (or `undefined` when none are shown), which
  you add to the control's `aria-describedby`.

```js
---
type: code
---
<FormField id="email" label="Email" messages={messages}>
  {({ describedBy }) => (
    <input id="email" type="email" aria-describedby={describedBy} />
  )}
</FormField>
```

Clicking non-interactive content around the control (e.g. icons or padding)
focuses and clicks the control, like clicking the label does.

```js
---
type: example
---
<div>
  <FormField id="_foo121" label="Stacked layout" width="400px" layout="stacked"
             messages={[{type:'success', text: 'This is a success message'}, {type:'error', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo121"/>
  </FormField>
  <hr/>
  <FormField id="_foo122" label="Stacked layout (inline=true)" width="400px" layout="stacked" inline
             messages={[{type:'success', text: 'This is a success message'}, {type:'error', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo122"/>
  </FormField>
  <hr/>
  <FormField id="_foo123" label="Inline layout" width="400px" layout="inline"
             messages={[{type:'success', text: 'success!'}, {type:'error', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo123"/>
  </FormField>
  <hr/>
  <FormField id="_foo124" label="Inline layout (inline=true)" width="400px" layout="inline" inline
             messages={[{type:'success', text: 'success!'}, {type:'error', text: 'An error message. It will wrap if the text is longer than the width of the container.'}]}>
    <TextInput id="_foo124"/>
  </FormField>
  <hr/>
  <FormField id="_foo125" label={<ScreenReaderContent>hidden text</ScreenReaderContent>} width="400px" layout="stacked">
    <TextInput id="_foo125" />
  </FormField>
  <hr/>
</div>
```
