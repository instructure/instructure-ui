---
category: Contributing/RFCs
id: ButtonVariantsRFC
title: Button Variants
---

## Summary
This RFC shows how we can make components with many variants, like Button,
easier to maintain by breaking it down into a number of smaller components,
instead of tacking on more and more variants.

### Use Cases
If approved, we will create the smaller Button components mentioned above
and deprecate the original Button component.

### Other Implementations
Material Design: seems to use a single component with multiple variants |
https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js

React Toolbox: Splits out buttons into multiple components like we are proposing here |
https://github.com/react-toolbox/react-toolbox/tree/dev/components/button

Semantic UI: Single, large button component |
https://react.semantic-ui.com/elements/button#variations-social

### **External API** button components

#### Icon buttons
* Visually contains only an icon.
* Requires a hidden label for screen readers.
* Always has equal width and height.
* Appears as a square with rounded corners or a circle.
* Doesn't allow for a `display` prop (is always `inline-block`)

```javascript
<DefaultIconButton
  icon={IconUserSolid}
  variant="default|warning|success|danger|primary"
  label="screen reader only label text" // or children prop
  shape="circle|square"
  size="small|medium|large"
  margin="small" // this is a View prop
/>
```

These support a `variant` prop:
`<DefaultIconButton/>`
`<LightIconButton/>`
`<GhostInverseIconButton/>`

These do not support a `variant` prop or an `inverse` prop:
`<PrimaryIconButton/>`
`<SuccessIconButton/>`
`<DangerIconButton/>`

These support an `inverse` prop and a `variant` prop:
`<GhostIconButton inverse/>`
`<BorderlessIconButton inverse/>`

#### Text buttons
* Contains either a text label (required) or a text label
and an icon.
* Appears as a rectangle with rounded corners.
* Takes up 100% width of its container when `display` is `block`.
* Does not wrap text and handles text overflow with ellipsis.

*Note on `fluidWidth`:* The left-aligned, text-wrapping button seems to be
a legacy-Canvas-only requirement. Recommendation is to deprecate this property and use
`<Button display="block" />` for Buttons that need to display block level.

```javascript
<Button
  icon={IconUserSolid}
  label="label text" // or children prop
  size="small|medium|large"
  margin="small" // this is a View prop
  variant="default|primary|success|danger|light|ghost|ghost-inverse|link|link-inverse" // deprecate icon and circle variants
  display="block|inline"
/>
```

These variants do not support an `inverse` prop:
`<DefaultButton/>`
`<PrimaryButton/>`
`<SuccessButton/>`
`<DangerButton/>`
`<LightButton/>`

These variants support an `inverse` prop:
`<GhostButton inverse/>`
`<LinkButton inverse/>`


### **Internal API** Button views

The internal view components control the button's color scheme, like the
`variant` property does now, dictating the button's background color, text
color, border color, hover/active background color, and focus ring color.

#### Button View component properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| focused | bool | false | get value from FocusableController |
| icon | oneOf: func, element | | |
| shape | oneOf: 'circle', 'square' | 'square' | |
| display | oneOf: 'block', 'inline' | 'inline' |  |
| size | oneOf: 'small', 'medium', 'large' | 'medium' |  |
| buttonRef | func |  |  |
| href | string | |  |
| margin | custom | |  |
| disabled | bool |  | |
| readOnly | bool |  | |
| onClick | func |  | |
| type | oneOf: 'button', 'submit', 'reset' | 'button' | |


Render function for `<DefaultButtonView />`:
```javascript
render () {
  return (
  <FocusableView
    type={this.props.type}
    as={getElementType(DefaultButtonView, this.props)}
    href={this.props.href}
    margin={this.props.margin}
    disabled={this.props.disabled}
    readOnly={this.props.readOnly}
    elementRef={this.props.buttonRef}
    onClick={this.props.onClick}
    focused={this.props.focused}
    shape={this.props.shape}
    display={this.props.display === 'inline' ? 'inline-block' : 'block'}
  >
  // render the button view (everything but the focus ring which FocusableView handles)
  </FocusableView>
  )
}
```


#### `<DefaultButtonView />`
```javascript
---
example: true
---
<div>
  <Button margin="small">Default Button</Button>
  <Button margin="small" icon={IconPlus.Solid}>
    <ScreenReaderContent>Default Button</ScreenReaderContent>
  </Button>
  <Button margin="small" icon={IconPlus.Solid} variant="circle-default" >
    <ScreenReaderContent>Default Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<PrimaryButtonView/>`
```javascript
---
example: true
---
<div>
  <Button margin="small" variant="primary">Primary Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="primary">
    <ScreenReaderContent>Primary Button</ScreenReaderContent>
  </Button>
  <Button margin="small" icon={IconPlus.Solid} variant="circle-primary" >
    <ScreenReaderContent>Primary Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<DangerButtonView/>`
```javascript
---
example: true
---
<div>
  <Button margin="small" variant="danger">Danger Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="danger">
    <ScreenReaderContent>Danger Button</ScreenReaderContent>
  </Button>
  <Button margin="small" icon={IconPlus.Solid} variant="circle-danger" >
    <ScreenReaderContent>Danger Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<SuccessButtonView/>`
```javascript
---
example: true
---
<div>
  <Button margin="small" variant="success">Success Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="success">
    <ScreenReaderContent>Success Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<LightButtonView/>`
```javascript
---
example: true
---
<div>
  <Button margin="small" variant="light">Light Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="light">
    <ScreenReaderContent>Light Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<LinkButtonView/>`
```javascript
---
example: true
---
<div>
  <Button margin="small" variant="link">Link Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="icon">
    <ScreenReaderContent>Link Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<LinkButtonView inverse />`
```javascript
---
example: true
inverse: true
---
<div>
  <Button margin="small" variant="link-inverse">Inverse Link Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="icon-inverse">
    <ScreenReaderContent>Inverse Link Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<GhostButtonView/>`
```javascript
---
example: true
---
<div>
  <Button margin="small" variant="ghost">Ghost Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="ghost">
    <ScreenReaderContent>Ghost Button</ScreenReaderContent>
  </Button>
</div>
```

#### `<GhostButtonView inverse />`
```javascript
---
example: true
inverse: true
---
<div>
  <Button margin="small" variant="ghost-inverse">Inverse Ghost Button</Button>
  <Button margin="small" icon={IconPlus.Solid} variant="ghost-inverse">
    <ScreenReaderContent>Inverse Ghost Button</ScreenReaderContent>
  </Button>
</div>
```

### Composing the button views

Render function for `<Button />`:
```javascript
render () {
  const ButtonView = getButtonView(this.props.variant)
  return (
    <Focusable>
      {({ focused }) => (
        <ButtonView
          focused={focused}
          icon={this.props.icon}
          borderRadius="small"
          size={this.props.size}
          display={this.props.display === 'inline' ? 'inline-block' : 'block'}
        >
          {this.props.children}
        </ButtonView>
      )}
    </Focusable>
  )
}
```

Render function for `<IconButton />`:
```javascript
render () {
  const ButtonView = getButtonView(this.props.variant)
  return (
    <Focusable>
      {({ focused }) => (
        <ButtonView
          focused={focused}
          icon={this.props.icon}
          borderRadius={this.props.shape === 'circle' ? 'circle' : 'small'}
          size={this.props.size}
          display="inline-block"
        >
          <ScreenReaderContent>
            {this.props.label}
          </ScreenReaderContent>
        </ButtonView>
      )}
    </Focusable>
  )
}
```

### **Internal API** Shared button styles

If when we break out the view components, we determine that we'd like
to share some of the styles across them, we could make a shared view, e.g.
`<ButtonLayout/>` that would handle the shared styles/theme variables.

`<ButtonLayout />` would be a view used internally in each of the view
components (or composed in the `<Button/>` and `<IconButton/>` components).

The recommendation is to start with duplicated code and only move to shared
styles once all of the views are broken out.


### Dependencies
The new components would live in ui-buttons with the existing Button
component.

### Theme Variables
The Button and IconButton components wouldn't have any theme variables and should delegate to
the view components for all display/styles.

Each Button view component would have a set of theme variables associated with it. We should
display these as tabs/child components on the Button component doc page.

### Accessibility Requirements
Nothing new from the current Button.

### Internationalization Requirements
N/A
