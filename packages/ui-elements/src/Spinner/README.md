---
describes: DeprecatedSpinner
id: DeprecatedSpinner__README
---

**Deprecated** Spinner will be removed from `ui-elements` in version 7.0.0. Use [Spinner from ui-spinner](#Spinner) instead.

### Important upgrade notes
Codemods are available to automatically update imports to the new package.

### Choose from four sizes and add margin as needed

The `size` prop allows you to select from `x-small`, `small`, `medium` and `large`
-sized spinners. Margin can be added as needed using the `margin` prop.

```js
---
example: true
---
<div>
  <DeprecatedSpinner renderTitle="Loading" size="x-small" />
  <DeprecatedSpinner renderTitle="Loading" size="small" margin="0 0 0 medium" />
  <DeprecatedSpinner renderTitle="Loading" margin="0 0 0 medium" />
  <DeprecatedSpinner renderTitle="Loading" size="large" margin="0 0 0 medium" />
</div>
```

### Different color schemes for use with light and dark backgrounds

The Spinner component defaults to `lightBg`. However, there is also an `inverse`
color scheme designed to be more visible on dark backgrounds.

```js
---
example: true
background: 'checkerboard-inverse'
---
<DeprecatedSpinner renderTitle="Loading" variant="inverse" />
```

### Translating the Screen Reader Title

The component supports using React component in the `renderTitle` prop, which is read to screen readers.
This allows for translating the title text with another React component.

```js
---
example: true
---
<DeprecatedSpinner renderTitle={() => "I'm translated!"} />
```

### Internet Explorer

As of mid-2016, Internet Explorer doesn't support animations inside inline SVGs.
IE users will simply see a rotating circle, minus the "morphing" of the spinner.
