---
describes: List
---

By default, `<List>` creates an unordered list of its children. Change the `as` prop to
create an ordered list instead.

`<List>` accepts only `<ListItem>` as a child.

```js
---
example: true
---
<div>
  <List margin="0 0 small">
    <ListItem>List item 1</ListItem>
    <ListItem>List item 2</ListItem>
    <ListItem>List item 3</ListItem>
  </List>
  <List as="ol">
    <ListItem>List item 1</ListItem>
    <ListItem>List item 2</ListItem>
    <ListItem>List item 3</ListItem>
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
  <ListItem><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></ListItem>
  <ListItem><Link href="https://www.getbridge.com">Bridge by Instructure</Link></ListItem>
  <ListItem><Link href="https://www.arcmedia.com">Arc by Instructure</Link></ListItem>
</List>
```
### `inline`

The `inline` variant renders a horizontal list of items. You can separate each `ListItem` with a delimiter by setting the `delimiter` prop.

```js
---
example: true
---
<List variant="inline" size="small">
  <ListItem>{lorem.sentence()}</ListItem>
  <ListItem>10pts</ListItem>
  <ListItem><b>Due:</b> Jan 17, 2018</ListItem>
  <ListItem><Link href="#">Submitted</Link></ListItem>
</List>
```

Inline list with a `pipe` delimiter.

```js
---
example: true
---
<List variant="inline" delimiter="pipe" size="small">
  <ListItem>{lorem.sentence()}</ListItem>
  <ListItem>10pts</ListItem>
  <ListItem><b>Due:</b> Jan 17, 2018</ListItem>
  <ListItem><Link href="#">Submitted</Link></ListItem>
</List>
```

Inline list with a `slash` delimiter.

```js
---
example: true
---
<List variant="inline" delimiter="slash" size="small">
  <ListItem>{lorem.sentence()}</ListItem>
  <ListItem>10pts</ListItem>
  <ListItem><b>Due:</b> Jan 17, 2018</ListItem>
  <ListItem><Link href="#">Submitted</Link></ListItem>
</List>
```

Inline list with a `arrow` delimiter.

```js
---
example: true
---
<List variant="inline" delimiter="arrow" size="small">
  <ListItem>{lorem.sentence()}</ListItem>
  <ListItem>10pts</ListItem>
  <ListItem><b>Due:</b> Jan 17, 2018</ListItem>
  <ListItem><Link href="#">Submitted</Link></ListItem>
</List>
```
