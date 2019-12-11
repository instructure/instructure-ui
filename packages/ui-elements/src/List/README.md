---
describes: DeprecatedList
id: DeprecatedList__README
---
**DEPRECATED:** List will be removed from `ui-elements` in version 7.0.0. Use the [List](#List) from [ui-list](#ui-list) instead. Codemods are available to automatically update imports to the new package.
***

By default, `<List>` creates an unordered list of its children. Change the `as` prop to
create an ordered list instead.

`<List>` accepts only `<List.Item>` as a child.

```js
---
example: true
---
<div>
  <DeprecatedList margin="0 0 small">
    <DeprecatedList.Item>List item 1</DeprecatedList.Item>
    <DeprecatedList.Item>List item 2</DeprecatedList.Item>
    <DeprecatedList.Item>List item 3</DeprecatedList.Item>
  </DeprecatedList>
  <DeprecatedList as="ol">
    <DeprecatedList.Item>List item 1</DeprecatedList.Item>
    <DeprecatedList.Item>List item 2</DeprecatedList.Item>
    <DeprecatedList.Item>List item 3</DeprecatedList.Item>
  </DeprecatedList>
</div>
```

### `unstyled`

The `unstyled` variant renders an unstyled list with minimal styling -- useful for presenting lists of
links, etc.

```js
---
example: true
---
<DeprecatedList variant="unstyled">
  <DeprecatedList.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></DeprecatedList.Item>
  <DeprecatedList.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></DeprecatedList.Item>
  <DeprecatedList.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></DeprecatedList.Item>
</DeprecatedList>
```

### `delimiter`

The `delimiter` lets you set a separator between items of the list.

```js
---
example: true
---
<DeprecatedList delimiter="solid">
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
</DeprecatedList>
```

For a dashed line, set `delimiter` to `dashed`:

```js
---
example: true
---
<DeprecatedList delimiter="dashed" variant="unstyled">
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
</DeprecatedList>
```

### `inline`

The `inline` variant renders a horizontal list of items. You can separate each `List.Item` with a delimiter by setting the `delimiter` prop.

```js
---
example: true
---
<DeprecatedList variant="inline" size="small">
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>10pts</DeprecatedList.Item>
  <DeprecatedList.Item><b>Due:</b> Jan 17, 2018</DeprecatedList.Item>
  <DeprecatedList.Item><Link href="#">Submitted</Link></DeprecatedList.Item>
</DeprecatedList>
```

Inline list with a `pipe` delimiter.

```js
---
example: true
---
<DeprecatedList variant="inline" delimiter="pipe" size="small">
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>10pts</DeprecatedList.Item>
  <DeprecatedList.Item><b>Due:</b> Jan 17, 2018</DeprecatedList.Item>
  <DeprecatedList.Item><Link href="#">Submitted</Link></DeprecatedList.Item>
</DeprecatedList>
```

Inline list with a `slash` delimiter.

```js
---
example: true
---
<DeprecatedList variant="inline" delimiter="slash" size="small">
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>10pts</DeprecatedList.Item>
  <DeprecatedList.Item><b>Due:</b> Jan 17, 2018</DeprecatedList.Item>
  <DeprecatedList.Item><Link href="#">Submitted</Link></DeprecatedList.Item>
</DeprecatedList>
```

Inline list with a `arrow` delimiter.

```js
---
example: true
---
<DeprecatedList variant="inline" delimiter="arrow" size="small">
  <DeprecatedList.Item>{lorem.sentence()}</DeprecatedList.Item>
  <DeprecatedList.Item>10pts</DeprecatedList.Item>
  <DeprecatedList.Item><b>Due:</b> Jan 17, 2018</DeprecatedList.Item>
  <DeprecatedList.Item><Link href="#">Submitted</Link></DeprecatedList.Item>
</DeprecatedList>
```

### Adding margin between List.Items

Use the `itemSpacing` prop to add margin around your list's items. To avoid unwanted excess margin
at the top/bottom or start/end of a List, the _first_ and _last_ List.Items will not receive margin via `itemSpacing`. ** `itemSpacing` has no effect on List.Items inside Lists with the `delimiter` prop set to anything other than `none`. **

```js
---
example: true
---
<div>
  <DeprecatedList variant="unstyled" itemSpacing="small">
    <DeprecatedList.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></DeprecatedList.Item>
    <DeprecatedList.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></DeprecatedList.Item>
    <DeprecatedList.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></DeprecatedList.Item>
  </DeprecatedList>
  <DeprecatedList variant="inline" margin="large 0 0" itemSpacing="large">
    <DeprecatedList.Item><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></DeprecatedList.Item>
    <DeprecatedList.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></DeprecatedList.Item>
    <DeprecatedList.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></DeprecatedList.Item>
  </DeprecatedList>
</div>
```

Note that individual List.Items also accept the same `margin` prop as List, in the event
you need different spacing around certain List.Items in the List.

```js
---
example: true
---
<DeprecatedList variant="unstyled" itemSpacing="small">
  <DeprecatedList.Item margin="x-large"><Link href="https://www.canvaslms.com/try-canvas">Canvas by Instructure</Link></DeprecatedList.Item>
  <DeprecatedList.Item><Link href="https://www.getbridge.com">Bridge by Instructure</Link></DeprecatedList.Item>
  <DeprecatedList.Item><Link href="https://www.arcmedia.com">Arc by Instructure</Link></DeprecatedList.Item>
</DeprecatedList>
```
