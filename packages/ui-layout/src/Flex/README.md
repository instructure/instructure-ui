---
describes: DeprecatedFlex
id: DeprecatedFlex__README
---

**DEPRECATED:** Flex will be removed from `ui-layout` in version 7.0.0. Use the [Flex from ui-flex](#Flex) instead.

### Important Upgrade Notes
Codemods are available to automatically update imports to the new package and handle the prop name changes listed below.

These props have updated names:
- The `inline` boolean prop has been changed to `display: ['flex', 'inline-flex']`
- The `wrapItems` boolean prop has been changed to `wrap: ['wrap', 'no-wrap', 'wrap-reverse']`
- `visualDebug` has been changed to `withVisualDebug`

### Layout direction

**Note:** Use the `visualDebug` property to see the borders of Flex/DeprecatedFlex.Item while developing!

Flex defaults to a `direction` of `row`, creating a horizontal layout. Change `direction` to
`column` to stack your Flex.Items.

> **Unless your layout has a specific/finite height, you probably don't need `direction="column"`.** To create a
layout of stacked elements, it is simpler to use multiple [View](#View) components with `display="block"`.

```js
---
example: true
---
<div>
  <DeprecatedFlex visualDebug margin="none none large">
    <DeprecatedFlex.Item>One</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Two</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Three</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Four</DeprecatedFlex.Item>
  </DeprecatedFlex>
  <DeprecatedFlex visualDebug direction="column" margin="none none large">
    <DeprecatedFlex.Item>One</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Two</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Three</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Four</DeprecatedFlex.Item>
  </DeprecatedFlex>
  <DeprecatedFlex visualDebug direction="row-reverse" margin="none none large">
    <DeprecatedFlex.Item>One</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Two</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Three</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Four</DeprecatedFlex.Item>
  </DeprecatedFlex>
  <DeprecatedFlex visualDebug direction="column-reverse">
    <DeprecatedFlex.Item>One</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Two</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Three</DeprecatedFlex.Item>
    <DeprecatedFlex.Item>Four</DeprecatedFlex.Item>
  </DeprecatedFlex>
</div>
```

### Sizing Flex.Items

By default, Flex.Items **expand to fit their contents**, even if that means overflowing
their container.

```js
---
example: true
---
<DeprecatedFlex visualDebug>
  <DeprecatedFlex.Item padding="x-small">
    Villum dolore eu fugiat nulla pariatur.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small">
    Duis aute irure.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

Adding the `shrink` property forces the Flex.Item to shrink as needed to fit inside its
container.

```js
---
example: true
---
<DeprecatedFlex visualDebug>
  <DeprecatedFlex.Item padding="x-small" shrink>
    Villum dolore eu fugiat nulla pariatur.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small" shrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small" shrink>
    Duis aute irure.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small" shrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

The `grow` property forces the Flex.Item to expand to fill in any available space.

```js
---
example: true
---
<DeprecatedFlex visualDebug>
  <DeprecatedFlex.Item padding="x-small" shrink grow>
    I am growing and shrinking!
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item>
    I am not shrinking or growing.
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

The `size` property sets the base size (accepts px, em, rem) for the Flex.Item. If the
`direction` property is `row`, this is the item's **width**. If `direction` is `column`,
then it is the item's **height**. Flex.Items can `grow` beyond their `size`, but cannot
`shrink` to less than their `size`.

```js
---
example: true
---
<DeprecatedFlex visualDebug>
  <DeprecatedFlex.Item padding="x-small" size="200px">
    I am always 200px.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small" shrink grow size="200px">
    I can grow, and shrink down to 200px.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item padding="x-small" size="25%">
    I am always 25%.
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

### Aligning Flex.Items
By default, Flex aligns its Flex.Items along the `center` of the axis. Use the `alignItems`
property to change this behavior.

`alignItems` can be overridden on individual Flex.Items through Flex.Item's `align` property.

```js
---
example: true
---
<DeprecatedFlex alignItems="end" visualDebug>
  <DeprecatedFlex.Item>
    <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item grow shrink>
    I should be aligned to the bottom of the Avatar.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item>
    Me, too.
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item align="start">
    I am aligning myself to the top.
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

### Justifying Flex.Items
Use the `justifyItems` property to change the justification of Flex.Items.

```js
---
example: true
---
<div>
  <DeprecatedFlex justifyItems="center" margin="0 0 large" visualDebug>
    <DeprecatedFlex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </DeprecatedFlex.Item>
    <DeprecatedFlex.Item>
      We are all centered!
    </DeprecatedFlex.Item>
    <DeprecatedFlex.Item>
      Yeah!
    </DeprecatedFlex.Item>
  </DeprecatedFlex>

  <DeprecatedFlex justifyItems="space-between" visualDebug margin="0 0 large">
    <DeprecatedFlex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </DeprecatedFlex.Item>
    <DeprecatedFlex.Item>
      Ah, a little more space.
    </DeprecatedFlex.Item>
    <DeprecatedFlex.Item>
      Totally.
    </DeprecatedFlex.Item>
  </DeprecatedFlex>

  <DeprecatedFlex justifyItems="end" visualDebug>
    <DeprecatedFlex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </DeprecatedFlex.Item>
    <DeprecatedFlex.Item>
      Smooshed again.
    </DeprecatedFlex.Item>
    <DeprecatedFlex.Item>
      Ugh.
    </DeprecatedFlex.Item>
  </DeprecatedFlex>
</div>
```

### Handling overflow
When `direction` is set to `column`, Flex.Items' `overflowY` property is automagically set
to `auto` to account for content overflow with a vertical scrollbar.

> To override this default, simply set `overflowY` on the Flex.Item to either `visible` or `hidden`.

```js
---
example: true
---
<DeprecatedFlex
  visualDebug
  direction="column"
>
  <DeprecatedFlex.Item padding="small">
    <Heading>Pandas are cute, right?</Heading>
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item size="150px" padding="small">
    <Img src={avatarSquare} />
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

### A few common layouts

#### Heading and button combination

```js
---
example: true
---
<DeprecatedFlex>
  <DeprecatedFlex.Item grow shrink padding="none medium none none">
    <Heading>Lorem ipsum dolor sit amet consectetur dolor sit</Heading>
  </DeprecatedFlex.Item>
  <DeprecatedFlex.Item>
    <Button margin="none x-small none none">
      Cancel
    </Button>
    <Button variant="success" icon={IconUserSolid}>
      Add user
    </Button>
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

#### Centered content (note the nested Flex components and use of the `wrapItems` property)

```js
---
example: true
---
<DeprecatedFlex height="32rem" justifyItems="center" padding="large" visualDebug>
  <DeprecatedFlex.Item shrink grow textAlign="center">

    <Heading level="h1" margin="0 0 medium">An amazing thing!</Heading>

    <DeprecatedFlex visualDebug wrapItems justifyItems="space-around" margin="0 0 medium">
      <DeprecatedFlex.Item padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </DeprecatedFlex.Item>
      <DeprecatedFlex.Item padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </DeprecatedFlex.Item>
      <DeprecatedFlex.Item padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </DeprecatedFlex.Item>
    </DeprecatedFlex>

    <div>
      <Button variant="primary" size="large">Sign up now!</Button>
    </div>

  </DeprecatedFlex.Item>
</DeprecatedFlex>
```

#### Quick and dirty mobile app layout

```js
---
example: true
---

<DeprecatedFlex height="400px" width="300px" as="div" direction="column" visualDebug>

  <DeprecatedFlex.Item padding="small" as="header" textAlign="center">
    <Heading level="h3">App</Heading>
  </DeprecatedFlex.Item>

  <DeprecatedFlex.Item grow shrink padding="small" as="main">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </DeprecatedFlex.Item>

  <DeprecatedFlex.Item padding="small" as="footer">

    <DeprecatedFlex visualDebug justifyItems="space-between">
      <DeprecatedFlex.Item>
        <IconButton
          renderIcon={IconEmailLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </DeprecatedFlex.Item>
      <DeprecatedFlex.Item>
        <IconButton
          renderIcon={IconPrinterLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </DeprecatedFlex.Item>
      <DeprecatedFlex.Item>
        <IconButton
          renderIcon={IconCalendarDayLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </DeprecatedFlex.Item>
      <DeprecatedFlex.Item>
        <IconButton
          renderIcon={IconSettingsLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </DeprecatedFlex.Item>
    </DeprecatedFlex>
  </DeprecatedFlex.Item>
</DeprecatedFlex>
```
