---
describes: List
---

By default, `<List>` creates an unordered list of its children. Change the `as` prop to
create an ordered list instead.

`<List>` accepts only `<List.Item>` as a child.

```js
---
example: true
---
<div>
  <List margin="0 0 small">
    <List.Item>List item 1</List.Item>
    <List.Item>List item 2</List.Item>
    <List.Item>List item 3</List.Item>
  </List>
  <List as="ol">
    <List.Item>List item 1</List.Item>
    <List.Item>List item 2</List.Item>
    <List.Item>List item 3</List.Item>
  </List>
</div>
```

### `unstyled`

The `unstyled` variant renders an unstyled list with minimal styling -- useful for presenting lists of
links, etc.

```js
---
example: true
---
<List variant="unstyled">
  <List.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></List.Item>
  <List.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></List.Item>
  <List.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></List.Item>
</List>
```

### `delimiter`

The `delimiter` lets you set a separator between items of the list.

```js
---
example: true
---
<List delimiter="solid">
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>{lorem.sentence()}</List.Item>
</List>
```

For a dashed line, set `delimiter` to `dashed`:

```js
---
example: true
---
<List delimiter="dashed" variant="unstyled">
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>{lorem.sentence()}</List.Item>
</List>
```

### `inline`

The `inline` variant renders a horizontal list of items. You can separate each `List.Item` with a delimiter by setting the `delimiter` prop.

```js
---
example: true
---
<List variant="inline" size="small">
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>10pts</List.Item>
  <List.Item><b>Due:</b> Jan 17, 2018</List.Item>
  <List.Item><Link href="#">Submitted</Link></List.Item>
</List>
```

Inline list with a `pipe` delimiter.

```js
---
example: true
---
<List variant="inline" delimiter="pipe" size="small">
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>10pts</List.Item>
  <List.Item><b>Due:</b> Jan 17, 2018</List.Item>
  <List.Item><Link href="#">Submitted</Link></List.Item>
</List>
```

Inline list with a `slash` delimiter.

```js
---
example: true
---
<List variant="inline" delimiter="slash" size="small">
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>10pts</List.Item>
  <List.Item><b>Due:</b> Jan 17, 2018</List.Item>
  <List.Item><Link href="#">Submitted</Link></List.Item>
</List>
```

Inline list with a `arrow` delimiter.

```js
---
example: true
---
<List variant="inline" delimiter="arrow" size="small">
  <List.Item>{lorem.sentence()}</List.Item>
  <List.Item>10pts</List.Item>
  <List.Item><b>Due:</b> Jan 17, 2018</List.Item>
  <List.Item><Link href="#">Submitted</Link></List.Item>
</List>
```

### Adding margin between List.Items

Use the `itemSpacing` prop to add margin around your list's items. To avoid unwanted excess margin
at the top/bottom or start/end of a List, the _first_ and _last_ List.Items will not receive margin via `itemSpacing`. ** `itemSpacing` has no effect on List.Items inside Lists with the `delimiter` prop set to anything other than `none`. **

```js
---
example: true
---
<div>
  <List variant="unstyled" itemSpacing="small">
    <List.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></List.Item>
    <List.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></List.Item>
    <List.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></List.Item>
  </List>
  <List variant="inline" margin="large 0 0" itemSpacing="large">
    <List.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></List.Item>
    <List.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></List.Item>
    <List.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></List.Item>
  </List>
</div>
```

Note that individual List.Items also accept the same `margin` prop as List, in the event
you need different spacing around certain List.Items in the List.

```js
---
example: true
---
<List variant="unstyled" itemSpacing="small">
  <List.Item margin="x-large"><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></List.Item>
  <List.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></List.Item>
  <List.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></List.Item>
</List>
```
