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
    <Avatar name="Arthur C. Clarke" />
    <Avatar name="James Arias" color="accent2" />
    <Avatar name="Charles Kimball" color="accent3" />
    <Avatar name="Melissa Reed" color="accent4" />
    <Avatar name="Heather Wheeler" color="accent5" />
    <Avatar name="David Herbert" color="accent6" />
    <Avatar name="Isaac Asimov" color="accent1" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" hasInverseColor />
    <Avatar name="James Arias" color="accent2" hasInverseColor />
    <Avatar name="Charles Kimball" color="accent3" hasInverseColor />
    <Avatar name="Melissa Reed" color="accent4" hasInverseColor />
    <Avatar name="Heather Wheeler" color="accent5" hasInverseColor />
    <Avatar name="David Herbert" color="accent6" hasInverseColor />
    <Avatar name="Isaac Asimov" color="accent1" hasInverseColor />
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
  <Avatar size="xx-small" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
  <Avatar size="x-small" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
  <Avatar size="small" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
  <Avatar size="medium" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
  <Avatar size="large" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
  <Avatar size="x-large" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
  <Avatar size="xx-large" color="ai" name="AI Assistant" renderIcon={IconAiSolid} />
</View>
```

### Using Lucide Icons

Lucide icons in Avatar are automatically sized and colored according to the Avatar's `size` and `color` props, so manual adjustments are not needed on the icon itself.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="User Avatar" size="xx-small" renderIcon={UserInstUIIcon} />
    <Avatar name="User Avatar" size="x-small" renderIcon={UserInstUIIcon} />
    <Avatar name="User Avatar" size="small" renderIcon={UserInstUIIcon} />
    <Avatar name="User Avatar" size="medium" renderIcon={UserInstUIIcon} />
    <Avatar name="User Avatar" size="large" renderIcon={UserInstUIIcon} />
    <Avatar name="User Avatar" size="x-large" renderIcon={UserInstUIIcon} />
    <Avatar name="User Avatar" size="xx-large" renderIcon={UserInstUIIcon} />
  </View>
  <View display="block" padding="small medium">
    <Avatar name="Profile" size="small" color="accent2" renderIcon={<CircleUserInstUIIcon />} />
    <Avatar name="Group" size="medium" color="accent3" renderIcon={<UsersInstUIIcon />} />
    <Avatar name="Settings" size="large" color="accent4" renderIcon={<SettingsInstUIIcon />} />
  </View>
  <View display="block" padding="small medium">
    <Avatar name="Profile" size="large" color="accent4" renderIcon={()=><CircleUserInstUIIcon />} />
    <Avatar name="Group" size="x-large" color="accent5" renderIcon={()=><UsersInstUIIcon />} />
    <Avatar name="Settings" size="xx-large" color="accent6" renderIcon={()=><SettingsInstUIIcon />} />
  </View>
</div>
```

### Size

The `size` prop allows you to select from `xx-small`, `x-small`, `small`, `medium` _(default)_, `large`, `x-large`, and `xx-large`. Each size has predefined dimensions and typography scales.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" size="xx-small" />
    <Avatar name="James Arias" size="x-small" />
    <Avatar name="Charles Kimball" size="small" />
    <Avatar name="Melissa Reed" size="medium" />
    <Avatar name="Heather Wheeler" size="large" />
    <Avatar name="David Herbert" size="x-large" />
    <Avatar name="Isaac Asimov" size="xx-large" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" size="xx-small" src={avatarSquare} />
    <Avatar name="James Arias" size="x-small" src={avatarSquare} />
    <Avatar name="Charles Kimball" size="small" src={avatarSquare} />
    <Avatar name="Melissa Reed" size="medium" src={avatarSquare} />
    <Avatar name="Heather Wheeler" size="large" src={avatarSquare} />
    <Avatar name="David Herbert" size="x-large" src={avatarSquare} />
    <Avatar name="Isaac Asimov" size="xx-large" src={avatarSquare} />
  </View>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" renderIcon={UsersInstUIIcon} size="xx-small" />
    <Avatar name="James Arias" renderIcon={UsersInstUIIcon} size="x-small" />
    <Avatar name="Charles Kimball" renderIcon={UsersInstUIIcon} size="small" />
    <Avatar name="Melissa Reed" renderIcon={UsersInstUIIcon} size="medium" />
    <Avatar name="Heather Wheeler" renderIcon={UsersInstUIIcon} size="large" />
    <Avatar name="David Herbert" renderIcon={UsersInstUIIcon} size="x-large" />
    <Avatar name="Isaac Asimov" renderIcon={UsersInstUIIcon} size="xx-large" />
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
    <Avatar name="Arthur C. Clarke" />
    <Avatar name="James Arias" color="accent2" />
    <Avatar name="Charles Kimball" color="accent3" />
    <Avatar name="Melissa Reed" color="accent4" />
    <Avatar name="Heather Wheeler" color="accent5" />
    <Avatar name="David Herbert" color="accent6" />
    <Avatar name="Isaac Asimov" color="accent1" />
  </View>
  <View display="block" padding="small medium">
    <Avatar renderIcon={UsersInstUIIcon} name="Arthur C. Clarke" />
    <Avatar renderIcon={UsersInstUIIcon} name="James Arias" color="accent2" />
    <Avatar renderIcon={UsersInstUIIcon} name="Charles Kimball" color="accent3" />
    <Avatar renderIcon={UsersInstUIIcon} name="Melissa Reed" color="accent4" />
    <Avatar renderIcon={UsersInstUIIcon} name="Heather Wheeler" color="accent5" />
    <Avatar renderIcon={UsersInstUIIcon} name="David Herbert" color="accent6" />
    <Avatar renderIcon={UsersInstUIIcon} name="Isaac Asimov" color="accent1" />
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
    <Avatar name="Arthur C. Clarke" hasInverseColor />
    <Avatar name="James Arias" color="accent2" hasInverseColor />
    <Avatar name="Charles Kimball" color="accent3" hasInverseColor />
    <Avatar name="Melissa Reed" color="accent4" hasInverseColor />
    <Avatar name="Heather Wheeler" color="accent5" hasInverseColor />
    <Avatar name="David Herbert" color="accent6" hasInverseColor />
    <Avatar name="Isaac Asimov" color="accent1" hasInverseColor />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar renderIcon={UsersInstUIIcon} name="Arthur C. Clarke" hasInverseColor />
    <Avatar renderIcon={UsersInstUIIcon} name="James Arias" color="accent2" hasInverseColor />
    <Avatar renderIcon={UsersInstUIIcon} name="Charles Kimball" color="accent3" hasInverseColor />
    <Avatar renderIcon={UsersInstUIIcon} name="Melissa Reed" color="accent4" hasInverseColor />
    <Avatar renderIcon={UsersInstUIIcon} name="Heather Wheeler" color="accent5" hasInverseColor />
    <Avatar renderIcon={UsersInstUIIcon} name="David Herbert" color="accent6" hasInverseColor />
    <Avatar renderIcon={UsersInstUIIcon} name="Isaac Asimov" color="accent1" hasInverseColor />
  </View>
</div>
```

In case you need more control over the color, feel free to use the `themeOverride` prop, and override the default theme variables.

```js
---
type: example
---
<div>
  <Avatar name="Isaac Asimov" renderIcon={UsersInstUIIcon} themeOverride={{ accent1TextColor: '#efb410' }} />
  <Avatar name="Heather Wheeler" color="accent5" themeOverride={{ accent5TextColor: 'magenta' }} />
  <Avatar name="Charles Kimball" renderIcon={UsersInstUIIcon} hasInverseColor themeOverride={{ textOnColor: 'lightblue', backgroundColor: 'black' }} />
  <Avatar name="David Herbert" hasInverseColor color="accent5" themeOverride={{ accent5BackgroundColor: '#efb410' }} />
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
  <Avatar name="John Doe" size="small" display="inline" />
  <Avatar name="Jane Smith" size="small" display="inline" />
  <Text> are displayed inline with text.</Text>

  <div style={{ marginTop: '1rem' }}>
    <Text>Block avatars:</Text>
    <Avatar name="John Doe" size="small" display="block" />
    <Avatar name="Jane Smith" size="small" display="block" />
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
  <Avatar name="Sarah Robinson" src={avatarSquare} showBorder="always" />
  <Avatar name="Sarah Robinson" renderIcon={UsersInstUIIcon} showBorder="never" />
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
    renderIcon={UsersInstUIIcon}
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
| Avatar | size | `keyof typeof avatarSizeToIconSize` | No | - |  |
| Avatar | color | `\| 'accent1' \| 'accent2' \| 'accent3' \| 'accent4' \| 'accent5' \| 'accent6' \| 'ai'` | No | - |  |
| Avatar | hasInverseColor | `boolean` | No | - | In inverse color mode the background and text/icon colors are inverted |
| Avatar | showBorder | `'auto' \| 'always' \| 'never'` | No | - | `auto` only shows a border when there is no source image. This prop can force to always or never show that border. |
| Avatar | shape | `'circle' \| 'rectangle'` | No | - |  |
| Avatar | display | `'inline' \| 'block'` | No | - |  |
| Avatar | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `margin="small auto large"`. |
| Avatar | onImageLoaded | `(event?: SyntheticEvent) => void` | No | - | Callback fired when the avatar image has loaded. `event` can be `undefined`, if its already loaded when the page renders (can happen in SSR) |
| Avatar | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | The element type to render as |
| Avatar | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Avatar | renderIcon | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | An icon, or function that returns an icon that gets displayed. If the `src` prop is provided, `src` will have priority. When using Lucide icons, Avatar will automatically pass the appropriate size and color props based on the Avatar's size and color. |
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

