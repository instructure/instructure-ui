
## Using Icons

Icons from `@instructure/ui-icons` are available as `<Name>InstUIIcon` components — browse them
in the [Icons gallery](#icons). Legacy class-component icons (`IconHeartLine`, `IconSearchLine`,
etc.) are still available for backwards compatibility but are deprecated — see
[Legacy Icons](#legacy-icons) below.

### Accessibility

Without a `title` prop the icon is decorative: `aria-hidden="true"` and `role="presentation"` are
set automatically. When a `title` is provided, the icon becomes meaningful: `aria-label` is set to
the title value and `role="img"` is added.

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Text as="div" size="large">I <HeartInstUIIcon size="md" color="errorColor" title="Love" /> New York</Text>
</View>
```

### Size

Use the `size` prop with a semantic size token. Stroke width scales automatically with the size.

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap" alignItems="center" gap="small">
    <Flex.Item><Text>xs</Text> <SearchInstUIIcon size="xs" /></Flex.Item>
    <Flex.Item><Text>sm</Text> <SearchInstUIIcon size="sm" /></Flex.Item>
    <Flex.Item><Text>md</Text> <SearchInstUIIcon size="md" /></Flex.Item>
    <Flex.Item><Text>lg</Text> <SearchInstUIIcon size="lg" /></Flex.Item>
    <Flex.Item><Text>xl</Text> <SearchInstUIIcon size="xl" /></Flex.Item>
    <Flex.Item><Text>2xl</Text> <SearchInstUIIcon size="2xl" /></Flex.Item>
  </Flex>
</View>
```

Illustration sizes (`illu-sm`, `illu-md`, `illu-lg`) are intended for larger decorative contexts.

### Color

Use the `color` prop with a semantic color token. `inherit` passes `currentColor` through from
the parent element. `ai` renders the icon with an AI gradient.

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap" alignItems="center" gap="small">
    <Flex.Item><HeartInstUIIcon size="lg" color="baseColor" /></Flex.Item>
    <Flex.Item><HeartInstUIIcon size="lg" color="mutedColor" /></Flex.Item>
    <Flex.Item><HeartInstUIIcon size="lg" color="successColor" /></Flex.Item>
    <Flex.Item><HeartInstUIIcon size="lg" color="errorColor" /></Flex.Item>
    <Flex.Item><HeartInstUIIcon size="lg" color="warningColor" /></Flex.Item>
    <Flex.Item><HeartInstUIIcon size="lg" color="infoColor" /></Flex.Item>
    <Flex.Item><AiInfoInstUIIcon size="lg" color="ai" /></Flex.Item>
  </Flex>
</View>
```

### Rotate

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap" alignItems="center" gap="small">
    <Flex.Item><ChevronUpInstUIIcon size="lg" rotate="0" /></Flex.Item>
    <Flex.Item><ChevronUpInstUIIcon size="lg" rotate="90" /></Flex.Item>
    <Flex.Item><ChevronUpInstUIIcon size="lg" rotate="180" /></Flex.Item>
    <Flex.Item><ChevronUpInstUIIcon size="lg" rotate="270" /></Flex.Item>
  </Flex>
</View>
```

### Stroke vs Filled

Lucide icons are stroke-based. Several custom icons come in a filled variant, identified by the
`Solid` suffix in their export name (e.g. `BellInstUIIcon` vs `BellSolidInstUIIcon`).

```js
---
type: example
---
<View as="div" margin="small">
  <Flex gap="small" alignItems="center">
    <Flex.Item><Text>Stroke</Text> <HeartInstUIIcon size="lg" color="errorColor" /></Flex.Item>
    <Flex.Item><Text>Filled</Text> <HeartSolidInstUIIcon size="lg" color="errorColor" /></Flex.Item>
  </Flex>
</View>
```

---

## Legacy Icons

> **Deprecated.** The legacy icon set (`IconHeartLine`, `IconSearchLine`, etc.) is kept for
> backwards compatibility. Use the `InstUIIcon` components above for new code.
> To migrate existing usage run:
>
> ```
> npx @instructure/ui-codemods migrateToNewIcons <path>
> ```

### Accessibility

By default, the icon's `role` is set to `presentation`. However, when the `title` prop is set, the role attribute is set to `img`. Include the `description` prop to further describe the icon.

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Text as="div" size="large">I <IconHeartLine color="error" title="Love" /> New York</Text>
</View>
```

### Line vs Solid

The default choice for icons are the `Line` version. However, when an icon appears on a dark or colored background, the `Solid` version should be used.

```js
---
type: example
---
<View as="div" margin="small">
  <Button margin="small" renderIcon={IconEyeLine}>Preview</Button>
  <Button color="primary" margin="small" renderIcon={IconEyeSolid}>Preview</Button>
  <View margin="small" display="inline-block" width="20rem" background="primary-inverse" padding="small" textAlign="end">
    <IconExpandSolid size="small" />
  </View>
</View>
```

### Changing the Icon Size

By default, icons are set to a size of 1em, so they will scale to match the font-size of their parent element. To change the size of the icon, use one of the predefined options for the `size` prop. If you need a size that is not offered via the size prop, adjust the font-size on the icon's parent element.

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap">
    <Flex.Item padding="small" shouldGrow>
      <Heading>I <IconHeartLine /> the size of my parent heading </Heading>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am an <b>x-small</b> icon <IconHeartLine size="x-small" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am a <b>small</b> icon <IconHeartLine size="small" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am a <b>medium</b> icon <IconHeartLine size="medium" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">I am a <b>large</b> icon <IconHeartLine size="large" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am an <b>x-large</b> icon <IconHeartLine size="x-large" /> overriding my parent font-size.</Text>
    </Flex.Item>
  </Flex>
</View>
```

### Changing the Icon Color

To change the color of the icon, use one of the predefined options for the `color` prop. By default the icon inherits the color of its parent element. However, it can be changed by setting the icon to one of the theme colors via the color property.

```js
---
type: example
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap">
    <Flex.Item padding="small" shouldGrow>
      <Text color="brand">I am inheriting my parent's color <IconHeartLine /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be primary <IconHeartLine color="primary" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be secondary <IconHeartLine color="secondary" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be brand <IconHeartLine color="brand" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be success <IconHeartLine color="success" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be error <IconHeartLine color="error" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be warning <IconHeartLine color="warning" /></Text>
    </Flex.Item>
  </Flex>
</View>
```


