---
describes: Avatar
---

When an image src is not supplied the user's initials will display. The avatar can be `circle` _(default)_ or `rectangle`. Use the `margin` prop to add space between Avatar and other content.

```js
---
example: true
---
<div>
  <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 small 0 0" />
  <Avatar name="Sarah Robinson" margin="0 small 0 0" />
  <Avatar name="Kyle Montgomery" src={avatarSquare} shape="rectangle" margin="0 small 0 0" />
  <Avatar name="Kyle Montgomery" shape="rectangle" />
</div>
```

The `size` prop allows you to select from `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, and `xx-large`. If the `auto` prop is set, the avatar size will adjust according to the font-size
of its container.

```js
---
example: true
---
<div>
  <Avatar name="Arthr C. Clarke" size="xx-small" margin="0 small 0 0" />
  <Avatar name="James Arias" size="x-small" margin="0 small 0 0" />
  <Avatar name="Charles Kimball" size="small" margin="0 small 0 0" />
  <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0" />
  <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0" />
  <Avatar name="David Herbert" size="x-large" margin="0 small 0 0" />
  <Avatar name="Isaac Asimov" size="xx-large" />
</div>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Ensure the appropriate size is being used for its placement (in a table, stand-alone, etc…)</Figure.Item>
    <Figure.Item>Use circle variant in Canvas</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use inline in sentence</Figure.Item>
  </Figure>
</Guidelines>
```
