---
describes: Avatar
---

An Avatar component:

```js
---
example: true
---
<Avatar name="Sarah Robinson" src={avatarSquare} />
```

When an image src is not supplied the user's initials will display.

```js
---
example: true
---
<Avatar name="Kyle Montgomery" />
```

The `size` prop allows you to select from `x-small`, `small`, `medium`, `large`, and `x-large` for
default sizes. If the `auto` prop is set, the avatar size will adjust according to the font-size
of its container. Use the `margin` prop to add space between Avatar and other content.

```js
---
example: true
---
<div>
  <Avatar name="James Arias" size="x-small" margin="0 small 0 0" />
  <Avatar name="Charles Kimball" size="small" margin="0 small 0 0" />
  <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0" />
  <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0" />
  <Avatar name="David Herbert" size="x-large" />
</div>
```

The avatar can be `circle` or `rectangle` shaped.

```js
---
example: true
---
<Avatar alt="Grant Mitchell" name="Grant Mitchell" size="x-large" variant="rectangle" />
```
