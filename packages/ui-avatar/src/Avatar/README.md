---
describes: Avatar
---

The avatar component can be used to display a user's avatar. When an image src is not supplied the user's initials will display. The avatar can be `circle` _(default)_ or `rectangle`. Use the `margin` prop to add space between Avatar and other content.

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

### Size

The `size` prop allows you to select from `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, and `xx-large`. If the `auto` prop is set, the avatar size will adjust according to the font-size
of its container.

```js
---
example: true
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="0 small 0 0" />
    <Avatar name="James Arias" size="x-small" margin="0 small 0 0" />
    <Avatar name="Charles Kimball" size="small" margin="0 small 0 0" />
    <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0" />
    <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0" />
    <Avatar name="David Herbert" size="x-large" margin="0 small 0 0" />
    <Avatar name="Isaac Asimov" size="xx-large" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="James Arias" size="x-small" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Charles Kimball" size="small" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="David Herbert" size="x-large" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Isaac Asimov" size="xx-large"  src={avatarSquare} />
  </View>
</div>
```

### Color of the initials

The color of the initials can be set with the `color` prop, and it allows you to select from `default`, `shamrock`, `barney`, `crimson`, `fire`, `licorice` and `ash`.

```js
---
example: true
---
<div>
  <Avatar name="Arthur C. Clarke" margin="0 small 0 0" />
  <Avatar name="James Arias" color="shamrock" margin="0 small 0 0" />
  <Avatar name="Charles Kimball" color="barney" margin="0 small 0 0" />
  <Avatar name="Melissa Reed" color="crimson" margin="0 small 0 0" />
  <Avatar name="Heather Wheeler" color="fire" margin="0 small 0 0" />
  <Avatar name="David Herbert" color="licorice" margin="0 small 0 0" />
  <Avatar name="Isaac Asimov" color="ash" />
</div>
```

In case you need more control over the color, feel free to use the `themeOverride` prop, and override the default theme variables.

```js
---
example: true
---
<div>
  <Avatar name="Isaac Asimov" themeOverride={{ color: '#efb410' }} margin="0 small 0 0" />
  <Avatar name="Heather Wheeler" color="fire" themeOverride={{ colorFire: 'magenta' }} />
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
