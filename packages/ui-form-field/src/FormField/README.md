---
describes: FormField
---

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
