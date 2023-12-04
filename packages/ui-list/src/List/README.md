---
describes: List
---

> ### What about 'inline' lists?
>
> For inline lists use the [InlineList](#InlineList) component.

`<List>` accepts only `<List.Item>` as a child.

```js
---
type: example
---
<div>
  <List margin="0 0 medium">
    <List.Item>List item 1</List.Item>
    <List.Item>List item 2</List.Item>
    <List.Item>List item 3</List.Item>
  </List>
  <List as="ol" margin="0 0 medium">
    <List.Item>List item 1</List.Item>
    <List.Item>List item 2</List.Item>
    <List.Item>List item 3</List.Item>
  </List>
  <List isUnstyled>
    <List.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></List.Item>
    <List.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></List.Item>
    <List.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></List.Item>
  </List>
</div>
```

### Adding a delimiter

The `delimiter` lets you set a separator between items of the list. The predefined options are ['none', 'solid', and 'dashed'].

```js
---
type: example
---
<div>
  <List delimiter="none" margin="large 0">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>{lorem.sentence()}</List.Item>
  </List>
  <List delimiter="solid" isUnstyled margin="large 0">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>{lorem.sentence()}</List.Item>
  </List>
  <List delimiter="dashed" as="ol" margin="large 0">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>{lorem.sentence()}</List.Item>
  </List>
</div>
```

### Sizing

The `size` prop lets you adjust the font-size of the List. The predefined values are aligned with other components that use a 'size' prop for overall consistency within your application. The default is 'medium'.

```javascript
---
type: example
---
<div>
  <List size="small" margin="large 0">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>Small Size</List.Item>
    <List.Item><b>Due:</b> Oct 1, 2019</List.Item>
  </List>
  <List margin="large 0">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>Medium (default) Size</List.Item>
    <List.Item><b>Due:</b> Oct 1, 2019</List.Item>
  </List>
  <List size="large" margin="large 0">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item>Large Size</List.Item>
    <List.Item><b>Due:</b> Oct 1, 2019</List.Item>
  </List>
</div>
```

### Adding predefined space between each List.Item

Use the `itemSpacing` prop to add space around your list’s items. To avoid unwanted excess space at the start/end of a List, the first and last List.Item will not receive margin via the `itemSpacing` prop.

> NOTE: itemSpacing has no affect on an List.Item that has the `delimiter` prop set to anything other than **none**.

```js
---
type: example
---
  <List isUnstyled itemSpacing="small">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item><b>Due:</b> Oct 1, 2019</List.Item>
    <List.Item><Link href="#">itemSpacing has been set to xx-small</Link></List.Item>
  </List>
```

**itemSpacing** set to `medium`

```js
---
type: example
---
  <List itemSpacing="medium">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item><b>Due:</b>  Oct 1, 2019</List.Item>
    <List.Item><Link href="#">itemSpacing has been set to medium</Link></List.Item>
  </List>
```

**itemSpacing** set to `x-large`

```js
---
type: example
---
    <List isUnstyled itemSpacing="x-large">
    <List.Item>{lorem.sentence()}</List.Item>
    <List.Item><b>Due:</b> Oct 1, 2019</List.Item>
    <List.Item><Link href="#">itemSpacing has been set to x-large</Link></List.Item>
  </List>
```

List.Items also accept the same `margin` prop as List, in the event you need different spacing around certain List.Items in the List.

```js
---
type: example
---
<List isUnstyled itemSpacing="small">
  <List.Item margin="x-large 0"><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></List.Item>
  <List.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></List.Item>
  <List.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></List.Item>
</List>
```
