---
category: Getting Started/RFCs
id: ViewRFC
title: View
---


## View Component
Replaces Container and ContextBox. Package: ui-layout.

### Summary
Similar to the [React Native View component](https://facebook.github.io/react-native/docs/view.html), this component is
the most fundamental component for building a UI. Many of the other components
will inherit some or all of the `View` component props.

`View` provides layout (e.g. margin, padding, etc.) and decoration (e.g. border, background, shadow, etc.). For more complex layout, use the `Flex` component.


### Use Cases
To add any of the shared styles to a component, it can render a `View`.


### Other Implementations
n/a


### Functional Requirements and API
n/a


### Examples
```javascript
<View
  as="div"
  display="inline-block"
  margin="small"
  padding="medium small"
  height="30rem"
  border="small"
  background="inverse"
  shadow={2}
>
...
</View>
```

### Properties

| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| as | elementType | 'span' | default to span to prevent invalid markup |
| elementRef | func | undefined | returns a ref to the underlying DOM element |
| display | oneOf: 'block', 'inline-block', 'flex', 'inline-flex', 'auto' | 'auto' | 'auto' inherits the display of the element (set via the `as` prop)|
| margin | oneOf: '0', 'none', 'auto', 'xxx-small', 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large' | 'none' | see Container (should be the same) |
| padding | oneOf: '0', 'none', 'auto', 'xxx-small', 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large' | 'none' | see Container (should be the same) |
| height | oneOfType: string, number | 'auto' | |
| width | oneOfType: string, number | 'auto' | |
| maxHeight | oneOfType: string, number | 'auto' | |
| maxWidth | oneOfType: string, number | 'auto' | |
| minHeight | oneOfType: string, number | 'auto' | |
| minWidth | oneOfType: string, number | 'auto' | |
| borderWidth | oneOf: 'small', 'medium', 'large', 'none', 0 | 'none' | sets border width. can use CSS shorthand style like 'small 0 0 0' |
| borderRadius | oneOf: '0', 'none', 'small', 'medium', 'large' | 'none' | |
| textAlign | oneOf: '0', 'start', 'center', 'end' | 'start' | |
| background | oneOf: 'default', 'inverse', 'transparent' | 'transparent' ||
| shadow | oneOf: 1, 2, 3 | undefined | the depth of the shadow, no shadow if undefined |
| debug | bool | false | adds an outline for debugging layouts |

Notes:

- We are not going to support the size prop from Container, we'll just use width and height
- Width and height can be any valid css value (rem, em, px, %) and will get passed to the underlying element
- Border prop will actually be separated into two props: borderWidth and borderRadius
- We are going to support the textAlign prop
- For now, border color will be set and modified via theming. If the need arises in the future, we can modify
to include a borderColor prop with enumerated values
- arrow will not be defined here, it will be defined in ContextView. Popovers that need to support the `withArrow`
prop will conditionally render a if `withArrow` is false `View` or `ContextView`
- In the future we may need to add an overflow/scroll prop or props
- Sizing is `box-sizing: border-box`?
- We should warn if `margin` prop is set and `as` is set to 'span'
- We should probably set text color based on the `background` so that we can ensure contrast.
- Maybe we should come up with better naming scheme for the shadows (e.g. above, higher, topmost)?
- We need to pass down the following style props (from Position): `position`, `left`, `right`.

### Dependencies
- ui-themeable


### Theme Variables

- margin, padding will use space variables
- border will use border and color variables
- shadow will use shadow variables


### Accessibility Requirements
n/a


### Internationalization Requirements
n/a


### Other Things to Consider
- ContextBox and Container will be deprecated and remain in ui-core until they can
  be removed.
- We'll need to replace all usage of these 2 components in the codebase as well.
