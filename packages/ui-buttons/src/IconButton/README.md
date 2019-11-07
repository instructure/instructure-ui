---
describes: IconButton
---

An IconButton can be used when the Button only renders an Icon and does not have other visual elements or text content.

```js
---
example: true
---
<IconButton screenReaderLabel="Add User"><IconAddLine /></IconButton>
```

### Accessibility

Because the IconButton visually only renders an icon, a description is necessary for assistive technologies. The `screenReaderLabel` prop is required for this purpose, and should consist of a complete description of the action.

```js
---
example: true
---
<IconButton color="primary" screenReaderLabel="Add blog post"><IconAddLine /></IconButton>
```

Using [Tooltip](#Tooltip) in conjunction with IconButton can also provide necessary context when the IconButton alone would be insufficient.

```js
---
example: true
---
<Tooltip
  renderTip="View user profile"
  on={['hover', 'focus']}
  placement="bottom"
>
  <IconButton screenReaderLabel="View user profile"><IconUserLine /></IconButton>
</Tooltip>
```

### Shaping

The `shape` prop specifies if the IconButton will render as a `rectangle` or `circle`.

```js
---
example: true
---
<View display="block">
  <IconButton shape="rectangle" screenReaderLabel="Delete tag" margin="small"><IconXSolid /></IconButton>
  <IconButton shape="circle" screenReaderLabel="Delete tag" margin="small"><IconXSolid /></IconButton>
</View>
```

### Rendering only the icon

The background and border can be optionally removed as needed by setting the `withBorder` and `withBackground` props to `false`

```js
---
example: true
---
<View display="block">
  <View display="inline-block" background="primary">
    <IconButton withBackground={false} withBorder={false} screenReaderLabel="Delete tag" margin="large">
      <IconXSolid />
    </IconButton>
  </View>
  <View display="inline-block" background="primary-inverse">
    <IconButton withBackground={false} withBorder={false} color="primary-inverse" screenReaderLabel="Delete tag" margin="large">
      <IconXSolid />
    </IconButton>
  </View>
</View>
```