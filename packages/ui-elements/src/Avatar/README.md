---
describes: DeprecatedAvatar
id: DeprecatedAvatar__README
---

**DEPRECATED:** Avatar will be removed from `ui-elements` in version 7.0.0. Use the [avatar from ui-avatar](#Avatar) instead.

### Important Upgrade Notes
Codemods are available to automatically update imports to the new package as well as any props that have changed. These changes and other things to note are described below.

- **variant** has been updated to `shape`
- the boolean **inline** has been updated to `display` with options ('inline-block', 'block)

***

When an image src is not supplied the user's initials will display. The avatar can be `circle` _(default)_ or `rectangle`. Use the `margin` prop to add space between Avatar and other content.

```js
---
example: true
---
<div>
  <DeprecatedAvatar name="Sarah Robinson" src={avatarSquare} margin="0 small 0 0" />
  <DeprecatedAvatar name="Sarah Robinson" margin="0 small 0 0" />
  <DeprecatedAvatar name="Kyle Montgomery" src={avatarSquare} variant="rectangle" margin="0 small 0 0" />
  <DeprecatedAvatar name="Kyle Montgomery" variant="rectangle" />
</div>
```

The `size` prop allows you to select from `x-small`, `small`, `medium`, `large`, and `x-large`. If the `auto` prop is set, the avatar size will adjust according to the font-size
of its container.

```js
---
example: true
---
<div>
  <DeprecatedAvatar name="James Arias" size="x-small" margin="0 small 0 0" />
  <DeprecatedAvatar name="Charles Kimball" size="small" margin="0 small 0 0" />
  <DeprecatedAvatar name="Melissa Reed" size="medium" margin="0 small 0 0" />
  <DeprecatedAvatar name="Heather Wheeler" size="large" margin="0 small 0 0" />
  <DeprecatedAvatar name="David Herbert" size="x-large" />
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

