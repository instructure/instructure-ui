# Avatar


The avatar component can be used to display a user's avatar. When an image src is not supplied the user's initials will display.

Instead of the initials, an SVG icon can be displayed with the `renderIcon` property. **Note: If both `src` and `renderIcon` are provided, the image (`src`) takes priority.**

The avatar can be `circle` _(default)_ or `rectangle`. The component uses flexbox layout and can be displayed as `inline` _(default)_ or `block` using the `display` prop.

```js
---
type: example
readonly: true
---

<div>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" margin="spacing.spaceXs" />
    <Avatar name="James Arias" color="accent2" margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" color="accent3" margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" color="accent4" margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" color="accent5" margin="spacing.spaceXs" />
    <Avatar name="David Herbert" color="accent6" margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" color="accent1" margin="spacing.spaceXs" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="James Arias" color="accent2" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" color="accent3" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" color="accent4" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" color="accent5" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="David Herbert" color="accent6" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" color="accent1" hasInverseColor margin="spacing.spaceXs" />
  </View>
</div>
```

### AI Avatar

There is a need for special, `ai avatars`. These have a specific look. You can achieve it the following way

```js
---
type: example
readonly: true
---
<View display="block" padding="small medium" background="primary">
  <Avatar size="xx-small" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
  <Avatar size="x-small" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
  <Avatar size="small" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
  <Avatar size="medium" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
  <Avatar size="large" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
  <Avatar size="x-large" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
  <Avatar size="xx-large" color="ai" name="AI Assistant" renderIcon={IconAiSolid} margin="spacing.spaceXs" />
</View>
```

### Size

The `size` prop allows you to select from `xx-small`, `x-small`, `small`, `medium` _(default)_, `large`, `x-large`, and `xx-large`. Each size has predefined dimensions and typography scales.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="spacing.spaceXs" />
    <Avatar name="James Arias" size="x-small" margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" size="small" margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" size="medium" margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" size="large" margin="spacing.spaceXs" />
    <Avatar name="David Herbert" size="x-large" margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" size="xx-large" margin="spacing.spaceXs" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" size="xx-small" src={avatarSquare} margin="spacing.spaceXs" />
    <Avatar name="James Arias" size="x-small" src={avatarSquare} margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" size="small" src={avatarSquare} margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" size="medium" src={avatarSquare} margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" size="large" src={avatarSquare} margin="spacing.spaceXs" />
    <Avatar name="David Herbert" size="x-large" src={avatarSquare} margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" size="xx-large" src={avatarSquare} margin="spacing.spaceXs" />
  </View>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" renderIcon={<IconGroupLine />} size="xx-small" margin="spacing.spaceXs" />
    <Avatar name="James Arias" renderIcon={<IconGroupLine />} size="x-small" margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" renderIcon={<IconGroupLine />} size="small" margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" renderIcon={<IconGroupLine />} size="medium" margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" renderIcon={<IconGroupLine />} size="large" margin="spacing.spaceXs" />
    <Avatar name="David Herbert" renderIcon={<IconGroupLine />} size="x-large" margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" renderIcon={<IconGroupLine />} size="xx-large" margin="spacing.spaceXs" />
  </View>
</div>
```

### Colors

The color of the initials and icons can be set with the `color` prop, and it allows you to select from `accent1` _(default)_, `accent2`, `accent3`, `accent4`, `accent5`, `accent6`, and `ai` _(for AI avatars with gradient background)_.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" margin="spacing.spaceXs" />
    <Avatar name="James Arias" color="accent2" margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" color="accent3" margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" color="accent4" margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" color="accent5" margin="spacing.spaceXs" />
    <Avatar name="David Herbert" color="accent6" margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" color="accent1" margin="spacing.spaceXs" />
  </View>
  <View display="block" padding="small medium">
    <Avatar renderIcon={<IconGroupLine />} name="Arthur C. Clarke" margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="James Arias" color="accent2" margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Charles Kimball" color="accent3" margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Melissa Reed" color="accent4" margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Heather Wheeler" color="accent5" margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="David Herbert" color="accent6" margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Isaac Asimov" color="accent1" margin="spacing.spaceXs" />
  </View>
</div>
```

The `hasInverseColor` prop inverts the background color and the text/icon color.

Inverted Avatars have **no border**.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="James Arias" color="accent2" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Charles Kimball" color="accent3" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Melissa Reed" color="accent4" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Heather Wheeler" color="accent5" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="David Herbert" color="accent6" hasInverseColor margin="spacing.spaceXs" />
    <Avatar name="Isaac Asimov" color="accent1" hasInverseColor margin="spacing.spaceXs" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar renderIcon={<IconGroupLine />} name="Arthur C. Clarke" hasInverseColor margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="James Arias" color="accent2" hasInverseColor margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Charles Kimball" color="accent3" hasInverseColor margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Melissa Reed" color="accent4" hasInverseColor margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Heather Wheeler" color="accent5" hasInverseColor margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="David Herbert" color="accent6" hasInverseColor margin="spacing.spaceXs" />
    <Avatar renderIcon={<IconGroupLine />} name="Isaac Asimov" color="accent1" hasInverseColor margin="spacing.spaceXs" />
  </View>
</div>
```

In case you need more control over the color, feel free to use the `themeOverride` prop, and override the default theme variables.

```js
---
type: example
---
<div>
  <Avatar name="Isaac Asimov" renderIcon={<IconGroupLine />} themeOverride={{ accent1TextColor: '#efb410' }} margin="spacing.spaceXs" />
  <Avatar name="Heather Wheeler" color="accent5" themeOverride={{ accent5TextColor: 'magenta' }} margin="spacing.spaceXs" />
  <Avatar name="Charles Kimball" renderIcon={<IconGroupLine />} hasInverseColor themeOverride={{ textOnColor: 'lightblue', backgroundColor: 'black' }} margin="spacing.spaceXs" />
  <Avatar name="David Herbert" hasInverseColor color="accent5" themeOverride={{ accent5BackgroundColor: '#efb410' }} margin="spacing.spaceXs" />
</div>
```

### Display

The `display` prop controls whether the avatar is displayed as `inline` _(default)_ or `block`. This affects the CSS display property and layout behavior.

```js
---
type: example
---
<div>
  <Text>Inline avatars: </Text>
  <Avatar name="John Doe" size="small" display="inline" margin="0 spacing.spaceXs" />
  <Avatar name="Jane Smith" size="small" display="inline" margin="0 spacing.spaceXs" />
  <Text> are displayed inline with text.</Text>

  <div style={{ marginTop: '1rem' }}>
    <Text>Block avatars:</Text>
    <Avatar name="John Doe" size="small" display="block" margin="spacing.spaceXs 0" />
    <Avatar name="Jane Smith" size="small" display="block" margin="spacing.spaceXs 0" />
    <Text>stack vertically.</Text>
  </div>
</div>
```

### Border

By default only avatars without an image have borders but you can force it to `always` or `never` show with the `showBorder` prop however you should only use it rarely in very specific occasions (e.g. displaying an avatar in the [SideNavBar](/#SideNavBar))

```js
---
type: example
---
<div>
  <Avatar name="Sarah Robinson" src={avatarSquare} showBorder="always" margin="spacing.spaceXs"/>
  <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} showBorder="never" margin="spacing.spaceXs"/>
</div>
```

### Priority and Behavior

When both `src` and `renderIcon` props are provided, the **image (`src`) takes priority** and will be displayed instead of the icon. The icon will only be shown as a fallback while the image is loading or if the image fails to load.

```js
---
type: example
---
<div>
  <Avatar
    name="John Doe"
    src={avatarSquare}
    renderIcon={<IconGroupLine />}
    margin="spacing.spaceXs"
  />
  <Text>Image takes priority over icon</Text>
</div>
```

### Accessibility

Avatars use the `aria-hidden="true"` property and therefore are hidden from screenreaders. Make sure if you are using them stand-alone it's accompanied with [ScreenReaderContent](ScreenReaderContent).

### Guidelines

```js
---
type: embed
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Avatar | name | `string` | Yes | - | The name to display. It will be automatically converted to initials. |
| Avatar | src | `string` | No | - | URL of the image to display as the background image |
| Avatar | alt | `string` | No | - | Accessible label |
| Avatar | size | `\| 'xx-small' \| 'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large' \| 'xx-large'` | No | - |  |
| Avatar | color | `\| 'accent1' \| 'accent2' \| 'accent3' \| 'accent4' \| 'accent5' \| 'accent6' \| 'ai'` | No | - |  |
| Avatar | hasInverseColor | `boolean` | No | - | In inverse color mode the background and text/icon colors are inverted |
| Avatar | showBorder | `'auto' \| 'always' \| 'never'` | No | - | `auto` only shows a border when there is no source image. This prop can force to always or never show that border. |
| Avatar | shape | `'circle' \| 'rectangle'` | No | - |  |
| Avatar | display | `'inline' \| 'block'` | No | - |  |
| Avatar | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Avatar | onImageLoaded | `(event?: SyntheticEvent) => void` | No | - | Callback fired when the avatar image has loaded. `event` can be `undefined`, if its already loaded when the page renders (can happen in SSR) |
| Avatar | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | The element type to render as |
| Avatar | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Avatar | renderIcon | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | An icon, or function that returns an icon that gets displayed. If the `src` prop is provided, `src` will have priority. |
| Avatar | themeOverride | `ThemeOverrideValue` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-avatar
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Avatar } from '@instructure/ui-avatar'
```

