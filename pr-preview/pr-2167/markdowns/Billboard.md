# Billboard


### Static Billboard

Used for empty states, 404 pages, redirects, etc.

```js
---
type: example
---
<Billboard
  size="medium"
  heading="Well, this is awkward."
  message="Think there should be something here?"
  hero={<Img src={placeholderImage(900, 500)} />}
/>
```

### Structure

- If Billboard has an `href` prop set, it will render as a link;
  if an `onClick` prop is set, the component will render as a button.
- Use the `message` prop for your link or button text/call to action (Note:
  don't pass interactive content to the `message` prop if you have set the `href`
  or `onClick` props).
- Use the `size` prop to adjust the size of the icon and text.
- Pass [Instructure icons](icons-react) to the `hero` property via a function
  _(see examples)_, and they will be sized correctly based on the Billboard's
  `size`.

```js
---
type: example
---
<View as="div" width="400px" withVisualDebug>
  <Billboard
    margin="large"
    heading="404"
    message="Billboard is now a button"
    size="small"
    onClick={function () {
      alert('This Billboard was clicked!')
    }}
    hero={(size) => <IconUserLine size={size} />}
  />
</View>
```

```js
---
type: example
---
<View as="div" width="600px" withVisualDebug>
  <Billboard
    margin="large"
    message="Click this link"
    href="http://instructure.com"
    hero={(size) => <IconGradebookLine size={size} />}
  />
</View>
```

```js
---
type: example
---
<Billboard
  readOnly
  message="Create a new Module"
  size="large"
  onClick={function () {
    alert('This Billboard was clicked!')
  }}
  hero={(size) => <IconPlusLine size={size} />}
/>
```

### Disabled Billboard

```js
---
type: example
---
<Billboard
  size="small"
  heading="This is disabled"
  onClick={function () {
    alert('This Billboard was clicked!')
  }}
  hero={(size) => <IconUserLine size={size} />}
  disabled
/>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Billboard | hero | `React.ReactElement \| ((iconSize: HeroIconSize) => React.ReactElement)` | No | - | Provide an <Img> component or Instructure Icon for the hero image |
| Billboard | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | If you're using an icon, this prop will size it. Also sets the font-size of the headline and message. |
| Billboard | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'span'` | the element type to render as |
| Billboard | elementRef | `(element: Element \| null) => void` | No | `() => {}` | provides a reference to the underlying html root element |
| Billboard | heading | `string` | No | - | The headline for the Billboard. Is styled as an h1 element by default |
| Billboard | headingAs | `'h1' \| 'h2' \| 'h3' \| 'span'` | No | `'span'` | Choose the appropriately semantic tag for the heading |
| Billboard | headingLevel | `'h1' \| 'h2' \| 'h3' \| 'h4'` | No | `'h1'` | Choose the font-size for the heading (see the Heading component) |
| Billboard | message | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Instructions or information for the Billboard. Note: you should not pass interactive content to this prop if you are also providing an `href` or `onClick`. That would cause the Billboard to render as a button or link and would result in nested interactive content. |
| Billboard | onClick | `(e: MouseEvent<ViewProps>) => void` | No | - | If you add an onClick prop, the Billboard renders as a clickable button |
| Billboard | href | `string` | No | - | If `href` is provided, Billboard will render as a link |
| Billboard | disabled | `boolean` | No | `false` | Whether or not to disable the billboard |
| Billboard | readOnly | `boolean` | No | `false` | Works just like disabled but keeps the same styles as if it were active |
| Billboard | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |

### Usage

Install the package:

```shell
npm install @instructure/ui-billboard
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Billboard } from '@instructure/ui-billboard'
```

