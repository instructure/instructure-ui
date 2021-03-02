---
title: Button Upgrade for Version 8.0
category: Guides
order: 2
---

# Button Upgrade for Version 8.0

As we've built out our library, we've learned a lot about component APIs. Button was among the first components added to the library, and we made some decisions about the prop naming that have prevented the component from meeting the needs of our evolving design system.

- [Props that need to be upgraded](#button-upgrade-guide/#button-upgrade-for-version-8.0-props-that-need-to-be-upgraded)
- [Upgrading buttons **with visible text**](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-default,-primary,-success,-danger,-light,-ghost,-or-ghost-inverse)

  - [Upgrade examples with visibile text](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-default,-primary,-success,-danger,-light,-ghost,-or-ghost-inverse-upgrade-examples-with-visible-text)

- [Upgrading **icon only** buttons, no visible text](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-icon,-icon-inverse,-circle-default,-circle-primary,-or-circle-danger)

  - [Upgrade examples for "icon" or "icon-inverse"](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-icon,-icon-inverse,-circle-default,-circle-primary,-or-circle-danger-upgrade-examples-for-icon-or-icon-inverse)
  - [Upgrade examples for "circle-default", "circle-primary", or "circle-danger"](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-icon,-icon-inverse,-circle-default,-circle-primary,-or-circle-danger-upgrade-examples-for-circle-default,-circle-primary,-or-circle-danger)

- [Upgrading **link variant** values](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-link-or-link-inverse)
  - [Upgrade examples for variant=”link” and has "padding overrides plus href"](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-link-or-link-inverse-upgrade-examples-for-link-variant-with-an-href-attribute-and-padding-overrides)
  - [Upgrade examples for variant="link" and has "padding overrides and no href"](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-link-or-link-inverse-upgrade-examples-for-link-variant-with-no-href-attribute-and-padding-overrides)
  - [Upgrade examples for variant="link" and has "no padding overrides and no href"](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-link-or-link-inverse-upgrade-example-for-link-variant-with-no-href-attribute-and-no-padding-overrides)
- [Upgrading **CloseButton**](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-closebutton)
  - [Upgrade examples for **CloseButton**](#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-closebutton-upgrade-examples-for-closebutton)

### Props that need to be upgraded

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Creating a shared language"
>
  <ToggleBlockquote.Paragraph>
    When a prop is controlling a visual state, the naming should use language that is descriptive enough to be easily understood across disciplines. As we talked about Buttons with newcomers to our design system, they regularly used words like "color" and "shape" to describe the differences. We looked to leverage that same terminology in the component API to ease communication between all parties.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

The following props will need to be upgraded. They have been changed to be consistent with our [API guidelines](#api-guidelines).

| Previous     | Upgraded                                                                       | Codemods Available?                                                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`    | See the following sections for upgrade steps for each particular variant value | Partial: See [example section](#button-upgrade-guide/#v8-button-upgrade-guide-upgrading-variant-default,-primary,-success,-danger,-light,-ghost,-or-ghost-inverse-upgrade-examples-with-visible-text) for details |
| `buttonRef`  | Change prop name to `elementRef`                                               | Yes                                                                                                                                                                                                               |
| `fluidWidth` | Set `display="block"` and `textAlign="start"`                                  | Partial: `textAlign` will need to be set to `start` manually (it will be `center` by default)                                                                                                                     |
| `icon`       | Change prop name to `renderIcon`                                               | Yes                                                                                                                                                                                                               |

<!-- /////////////////////////////////////////////// -->
<!-- THIS IS WHERE THE VARIANT VS COLOR STUFF STARTS -->
<!-- /////////////////////////////////////////////// -->

### Upgrading variant default, primary, success, danger, light, ghost, or ghost-inverse

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Problems with the variant prop"
>
  <ToggleBlockquote.Paragraph>
    In the early stages of our library, <code>variant</code> was used when a component allowed multiple visual states. The Button <code>variant</code> prop initially controlled the color, but we soon needed things like icon-only buttons, buttons with a circular shape, and buttons without backgrounds or borders. Each time we needed a slight visual change in the button we had to tack on another <code>variant</code>. The list has grown to 14 variant types so far and counting. Names like <code>circle-danger</code> and <code>ghost-inverse</code> reflect the complex problem of trying to precisely capture multiple visual states in a single variant name. Some of these descriptions are incomplete. For example, when the variant is set to <code>icon</code>, having an icon as children is implied by the name. In contrast, <code>circle-danger</code> also expects only an icon as children but the variant name only describes the color and the shape. Should the name have actually been <code>icon-circle-danger</code>? Obviously not. This naming convention will become increasingly ridiculous as more and more attributes are added over time.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    Variant names that look like this are symptomatic of a component API that lacks specificity. By using precise and descriptive props, we can create naming conventions that are sustainable. The following sections detail these changes in the Button component. They describe how to remove the <code>variant</code> prop and replace it with more specific attributes.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

This table describes the upgrade process. If the `variant prop` is set to one of the following values, these changes will be necessary.

| Previous                  | Upgraded                                                                               | Codemods Available?                                               |
| ------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `variant="default"`       | `color="secondary"` (or remove the `variant` prop as `secondary` is the default value) | Yes                                                               |
| `variant="primary"`       | `color="primary"`                                                                      | Yes                                                               |
| `variant="success"`       | `color="success"`                                                                      | Yes                                                               |
| `variant="danger"`        | `color="danger"`                                                                       | Yes                                                               |
| `variant="light"`         | `color="primary-inverse"`                                                              | Yes                                                               |
| `variant="ghost"`         | `color="primary"` and set `withBackground={false}`                                     | Partial: `withBackground` will need to be set to `false` manually |
| `variant="ghost-inverse"` | `color="primary-inverse"` and set `withBackground={false}`                             | Partial: `withBackground` will need to be set to `false` manually |

#### Upgrade examples with visible text

```javascript
---
embed: true
---
<div>
<Button margin="medium small small 0">Default</Button><Button margin="medium 0 small 0" renderIcon={IconHeartLine}>Default</Button>
</div>
```

```js
/* Previous */
<Button variant="default">Hello</Button>
<Button variant="default" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button>Hello</Button>
<Button renderIcon={IconHeartLine}>Hello</Button>
```

```javascript
---
embed: true
---
<div>
<Button color="primary" margin="medium small small 0">Primary</Button><Button color="primary" margin="medium 0 small 0" renderIcon={IconHeartLine}>Primary</Button>
</div>
```

```js
/* Previous */
<Button variant="primary">Hello</Button>
<Button variant="primary" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button color="primary">Hello</Button>
<Button color="primary" renderIcon={IconHeartLine}>Hello</Button>
```

```javascript
---
embed: true
---
<div>
<Button color="success" margin="medium small small 0">Success</Button><Button color="success" margin="medium 0 small 0" renderIcon={IconHeartLine}>Success</Button>
</div>
```

```js
/* Previous */
<Button variant="success">Hello</Button>
<Button variant="success" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button color="success">Hello</Button>
<Button color="success" renderIcon={IconHeartLine}>Hello</Button>
```

```javascript
---
embed: true
theme: 'canvas'
---
<div>
<Button color="danger" margin="medium small small 0">Danger</Button><Button color="danger" margin="medium 0 small 0" renderIcon={IconHeartLine}>Danger</Button>
</div>
```

```js
/* Previous */
<Button variant="danger">Hello</Button>
<Button variant="danger" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button color="danger">Hello</Button>
<Button color="danger" renderIcon={IconHeartLine}>Hello</Button>
```

```javascript
---
embed: true
---
<div>
<Button color="primary-inverse" margin="medium small small 0">Primary Inverse</Button><Button color="primary-inverse" margin="medium 0 small 0" renderIcon={IconHeartLine}>Primary Inverse</Button>
</div>
```

```js
/* Previous */
<Button variant="light">Hello</Button>
<Button variant="light" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button color="primary-inverse">Hello</Button>
<Button color="primary-inverse" renderIcon={IconHeartLine}>Hello</Button>
```

```javascript
---
embed: true
---
<div>
<Button color="primary" withBackground={false} margin="medium small small 0">Ghost</Button><Button color="primary" withBackground={false} margin="medium 0 small 0" renderIcon={IconHeartLine}>Ghost</Button>
</div>
```

```js
/* Previous */
<Button variant="ghost">Hello</Button>
<Button variant="ghost" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button color="primary" withBackground={false}>Hello</Button>
<Button color="primary" withBackground={false} renderIcon={IconHeartLine}>Hello</Button>
```

```javascript
---
embed: true
---
<View display="inline-block" padding="small" margin="medium 0 small 0" background="primary-inverse">
<Button color="primary-inverse" withBackground={false} margin="0 small 0 0">Ghost Inverse</Button><Button color="primary-inverse" withBackground={false} renderIcon={IconHeartLine}>Ghost Inverse</Button>
</View>
```

```js
/* Previous */
<Button variant="ghost-inverse">Hello</Button>
<Button variant="ghost-inverse" icon={IconHeartLine}>Hello</Button>

/* Upgraded */
<Button color="primary-inverse" withBackground={false}>Hello</Button>
<Button color="primary-inverse" withBackground={false} renderICon={IconHeartLine}>Hello</Button>
```

<!-- /////////////////////////////////////////////// -->
<!-- THIS IS WHERE THE ICON-ONLY BUTTON STUFF STARTS -->
<!-- /////////////////////////////////////////////// -->

### Upgrading variant icon, icon-inverse, circle-default, circle-primary, or circle-danger

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="IconButton and separation of concerns"
>
  <ToggleBlockquote.Paragraph>
    Buttons with only an icon as visible children have some notable differences from Buttons with visible text. The shape of an icon-only button can be a circle or a square. It cannot be rendered to fill the entire width of the screen like a button with visible text. Additionally, icon-only buttons need descriptive text to provide context for assistive technologies. Building all this functionality into a single component becomes convoluted (a prop like <code>shape</code> would not do anything for buttons with visible text which would be confusing). Additionally, we wanted to make the requirement for <code>screenReaderLabel</code> explicit when using buttons with no visual text for improved accessibility. With these things in mind, the icon-only variants (<code>icon</code>, <code>icon-inverse</code>, <code>circle-default</code>, <code>circle-primary</code>, <code>circle-danger</code>) were moved to their own <Link href="#IconButton">IconButton</Link> component.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

This table describes the upgrade process if the `variant="icon"` prop is set but **no visible children/text** are provided. These updates will also apply to any buttons with `variant="circle-` values. The following changes will be necessary.

| Previous                   | Upgraded                                                                                                                                                        | Codemods Available                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `variant="icon"`           | **<IconButton />**`color="secondary"` (or remove the `variant` prop as `secondary` is the default value), set `withBorder={false}` and `withBackground={false}` | Partial: `color` only, others will need to be set manually |
| `variant="icon-inverse"`   | `color="primary-inverse"`, set `withBorder={false}` and `withBackground={false}`                                                                                | Partial: `color` only, others will need to be set manually |
| `variant="circle-default"` | `color="secondary"` (or remove the `variant` prop as `secondary` is the default value), set `shape="circle"`                                                    | Partial: `color` only, others will need to be set manually |
| `variant="circle-primary"` | `color="primary"`, set `shape="circle"`                                                                                                                         | Partial: `color` only, others will need to be set manually |
| `variant="circle-danger"`  | `color="danger"`, set `shape="circle"`                                                                                                                          | Partial: `color` only, others will need to be set manually |

#### Upgrade examples for icon or icon-inverse

Note, the same `color` values described in the previous section would apply to **IconButton**.

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} screenReaderLabel="Do something" withBorder={false} withBackground={false} margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="icon"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  withBorder={false}
  withBackground={false}
  screenReaderLabel="Close something"
/>
```

```javascript
---
embed: true
---
<View display="inline-block" margin="medium 0 small 0" padding="small" background="primary-inverse">
  <IconButton color="primary-inverse" renderIcon={IconXSolid} screenReaderLabel="Do something" withBorder={false} withBackground={false}/>
</View>
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="icon-inverse"
 >
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  color="primary-inverse"
  withBorder={false}
  withBackground={false}
  screenReaderLabel="Close something"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} screenReaderLabel="Do something" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="default"
 >
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} color="primary" screenReaderLabel="Do something" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="primary"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="primary"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} color="success" screenReaderLabel="Do something" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="success"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="success"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} color="danger" screenReaderLabel="Do something" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="danger"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="danger"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} color="primary-inverse" screenReaderLabel="Do something" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="light"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="primary-inverse"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} color="primary" withBackground={false} screenReaderLabel="Do something" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="light"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="primary"
  withBackground={false}
/>
```

```javascript
---
embed: true
---
<View display="inline-block" padding="x-small" margin="medium 0 small 0" background="primary-inverse">
<IconButton renderIcon={IconXSolid} color="primary-inverse" withBackground={false} screenReaderLabel="Do something" margin="small" />
</View>
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="light"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="primary-inverse"
  withBackground={false}
/>
```

#### Upgrade examples for circle-default, circle-primary, or circle-danger

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} screenReaderLabel="Close something" shape="circle" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="circle-default"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  shape="circle"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} screenReaderLabel="Close something" color="primary" shape="circle" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="circle-primary"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="primary"
  shape="circle"
/>
```

```javascript
---
embed: true
---
<IconButton renderIcon={IconXSolid} screenReaderLabel="Close something" color="danger" shape="circle" margin="medium 0 small 0" />
```

```js
/* Previous */
<Button
  icon={IconXSolid}
  variant="circle-danger"
>
  <ScreenReaderContent>Close something</ScreenReaderContent>
</Button>

/* Upgraded */
<IconButton
  renderIcon={IconXSolid}
  screenReaderLabel="Close something"
  color="danger"
  shape="circle"
/>
```

<!-- ///////////////////////////////////////////// -->
<!-- THIS IS WHERE THE LINK VS BUTTON STUFF STARTS -->
<!-- ///////////////////////////////////////////// -->

### Upgrading variant link or link-inverse

There are a few upgrade possibilities depending on the situation when replacing the `link` variant. Because of this, we did not provide codemods as the update will depend on the judgment of the consumer.

One of the primary reasons the “link” variant was removed was to mitigate the confusion between using buttons and links. If an `href` attribute is assigned, the Button will exhibit linking behavior. **The recommended upgrade path in this case is to use the [Link](#Link) component instead**. Link utilizes an underline style which is an important signifier to the user when an element is going to take them to a different location.

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Clearing up the confusion between buttons and links"
>
  <ToggleBlockquote.Paragraph>
    Sometimes our UI contains buttons that share aesthetic similarities with links. The <code>link</code> variant was created to be used in these situations. Unfortunately, we've found that this variant has done nothing to help clarify the important functional differences between links and buttons. A button variant that underlines on hover is poor user experience as it signifies to the user linking behavior while in reality it behaves as a standard html button. With that in mind, the <code>link</code> variant will go away in version 8.0.0 in favor of alternative configurations that are detailed below. For further reading, <Link href="https://marcysutton.com/links-vs-buttons-in-modern-web-applications">Marcy Sutton does a fantastic job detailing use cases for buttons and links in this article.</Link>
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

This table describes the upgrade process if the `variant="link"` prop is set, and **an href is provided**. The following changes will be necessary.

| Previous                 | Upgraded                                                                                                                                                   | Codemods Available               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `variant="link"`         | `<Link isWithinText={false} href="#">` (when Link needs to appear without surrounding text, the default underline can be configured to only show on hover) | No, will need to be set manually |
| `variant="link-inverse"` | `<Link isWithinText={false} color="link-inverse" href="#">`                                                                                                | No, will need to be set manually |

#### Upgrade examples for link variant with an href attribute and padding overrides

When a button with the `link` variant set needed to align with other content or fit into a tight space, the recommendation at one point was to override theme variables in order to remove the padding. It should be noted that for this situation, [Link](#Link) now supports an `isWithinText` prop which, when set to `false`, does not underline the link by default (only on hover) giving you the same behavior that you were getting previously by using button with variant set to `link`.

```javascript
---
embed: true
---
<View display="inline-block" padding="medium" margin="medium 0 small 0" borderWidth="small">
  Some description of something<br />
  <Link href="#" isWithinText={false}>A link that aligns with the above text</Link>
</View>
```

```js
/* Previous */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <Button variant="link" href="#"
    theme={{ mediumPadding: '0rem', mediumHeight: '1.25rem' }}
  >
    A link that aligns with the above text
  </Button>
</View>

/* Upgraded */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <Link href="#" isWithinText={false}>
    A link that aligns with the above text
  </Link>
</View>
```

```javascript
---
embed: true
---
<View display="inline-block" padding="medium" margin="medium 0 small 0" background="primary-inverse">
  Some description of something
  <br />
  <Link href="#" color="link-inverse" isWithinText={false}>A link that aligns with the above text</Link>
</View>
```

```js
/* Previous */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <Button variant="link-inverse" href="#"
    theme={{ mediumPadding: '0rem', mediumHeight: '1.25rem' }}
  >
    A link that aligns with the above text
  </Button>
</View>

/* Upgraded */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <Link href="#" color="link-inverse"
    isWithinText={false}
  >
    A link that aligns with the above text
  </Link>
</View>
```

#### Upgrade examples for link variant with no href attribute and padding overrides

If the button has padding overrides as described above, but does not have an `href` supplied, it should be replaced with the [CondensedButton](#CondensedButton) component. This button has been designed to fit into tight spaces and align with other content. It displays hover and active states consistent with other buttons instead of displaying the underline. Using the underline in a button was confusing for users as it visually signified linking behavior when it was actually just behaving as a button.

```javascript
---
embed: true
---
 <View display="inline-block" padding="medium" margin="medium 0 small 0" borderWidth="small">
   Some description of something
   <br />
   <CondensedButton>A button that aligns with the above text</CondensedButton>
 </View>
```

```js
/* Previous */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <Button variant="link"
    theme={{ mediumPadding: '0rem', mediumHeight: '1.25rem' }}
  >
    A button that aligns with the above text
  </Button>
</View>

/* Upgraded */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <CondensedButton>A button that aligns with the above text</CondensedButton>
</View>
```

```javascript
---
embed: true
---
<View display="inline-block" padding="medium" margin="medium 0 small 0" background="primary-inverse">
  Some description of something
  <br />
  <CondensedButton color="primary-inverse">A button that aligns with the above text</CondensedButton>
</View>
```

```js
/* Previous */
<View display="inline-block" padding="medium">
  Some description of something
  <br />
  <Button variant="link-inverse" theme={{ mediumPadding: '0rem', mediumHeight: '1.25rem' }}>A button that aligns with the above text</Button>
</View>

/* Upgraded */
<View display="inline-block" padding="medium" background="primary-inverse">
  Some description of something
  <br />
  <CondensedButton color="primary-inverse">A button that aligns with the above text</CondensedButton>
</View>
```

#### Upgrade example for link variant with no href attribute and no padding overrides

Consider using a Button with the `color` set to "primary" or "primary-inverse" and `withBackground` set to false

```javascript
---
embed: true
---
<Button color="primary" withBackground={false} margin="small">Hello</Button>
```

```js
/* Previous */
<Button variant="link" margin="small">Hello</Button>

/* Upgraded */
<Button color="primary" withBackground={false} margin="small">Hello</Button>
```

```javascript
---
embed: true
---
<View display="inline-block" background="primary-inverse" margin="medium 0 small 0" >
  <Button color="primary-inverse" withBackground={false} margin="small">Hello</Button>
</View>
```

```js
/* Previous */
<View display="inline-block" background="primary-inverse">
  <Button variant="link-inverse" margin="small">Hello</Button>
</View>

/* Upgraded */
<View display="inline-block" background="primary-inverse">
 <Button color="primary-inverse" withBackground={false} margin="small">Hello</Button>
</View>
```

### Upgrading CloseButton

The following table describes the upgrade process for [CloseButton](#CloseButton). Most of these changes are covered by automated codemods, except `children` will need to be changed to `screenReaderLabel` manually.

| Previous                 | Upgraded                                                                           | Codemods Available                   |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------ |
| `buttonRef`              | Change prop name to `elementRef`                                                   | Yes                                  |
| `children`               | Pass children to the `screenReaderLabel` prop instead                              | No, will need to be changed manually |
| `variant="icon"`         | `color="primary"` (or remove the `variant` prop as `primary` is the default value) | Yes                                  |
| `variant="icon-inverse"` | `color="primary-inverse"`                                                          | Yes                                  |

#### Upgrade examples for CloseButton

```javascript
---
embed: true
---
<CloseButton color="primary" margin="small" screenReaderLabel="Close" />
```

```js
/* Previous */
<CloseButton variant="icon">Close</CloseButton>

/* Upgraded */
<CloseButton color="primary" screenReaderLabel="Close" />
```

```javascript
---
embed: true
---
<View display="inline-block" background="primary-inverse" margin="medium 0 small 0">
  <CloseButton color="primary-inverse" margin="small" screenReaderLabel="Close" />
</View>
```

```js
/* Previous */
<CloseButton variant="icon-inverse">Close</CloseButton>

/* Upgraded */
<CloseButton color="primary-inverse" screenReaderLabel="Close" />
```
