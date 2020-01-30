---
describes: Flex
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      The <code>inline</code> boolean prop has been changed to <code>display: ['flex', 'inline-flex']</code>
    </Figure.Item>
    <Figure.Item>
      The <code>wrapItems</code> boolean prop has been changed to <code>wrap: ['wrap', 'no-wrap', 'wrap-reverse']</code>
    </Figure.Item>
    <Figure.Item>
      <code>visualDebug</code> has been changed to <code>withVisualDebug</code>
    </Figure.Item>
  </Figure>
</Guidelines>
```
The Flex component makes it simple for developers to create multi-column
layouts with flexbox.

### Layout direction

**Note:** Use the `withVisualDebug` property to see the borders of Flex/Flex.Item while developing!

Flex defaults to a `direction` of `row`, creating a horizontal layout. Change `direction` to
`column` to stack your Flex.Items.

> **Unless your layout has a specific/finite height, you probably don't need `direction="column"`.** To create a
layout of stacked elements, it is simpler to use multiple [View](#View) components with `display="block"`.

```js
---
example: true
---
<div>
  <Flex withVisualDebug margin="none none large">
    <Flex.Item>One</Flex.Item>
    <Flex.Item>Two</Flex.Item>
    <Flex.Item>Three</Flex.Item>
    <Flex.Item>Four</Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="column" margin="none none large">
    <Flex.Item>One</Flex.Item>
    <Flex.Item>Two</Flex.Item>
    <Flex.Item>Three</Flex.Item>
    <Flex.Item>Four</Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="row-reverse" margin="none none large">
    <Flex.Item>One</Flex.Item>
    <Flex.Item>Two</Flex.Item>
    <Flex.Item>Three</Flex.Item>
    <Flex.Item>Four</Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="column-reverse">
    <Flex.Item>One</Flex.Item>
    <Flex.Item>Two</Flex.Item>
    <Flex.Item>Three</Flex.Item>
    <Flex.Item>Four</Flex.Item>
  </Flex>
</div>
```

### Sizing Flex.Items

By default, Flex.Items **expand to fit their contents**, even if that means overflowing
their container.

```js
---
example: true
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small">
    Villum dolore eu fugiat nulla pariatur.
  </Flex.Item>
  <Flex.Item padding="x-small">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </Flex.Item>
  <Flex.Item padding="x-small">
    Duis aute irure.
  </Flex.Item>
  <Flex.Item padding="x-small">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Flex.Item>
</Flex>
```

Adding the `shouldShrink` property forces the Flex.Item to shrink as needed to fit inside its
container.

```js
---
example: true
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small" shouldShrink>
    Villum dolore eu fugiat nulla pariatur.
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink>
    Duis aute irure.
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Flex.Item>
</Flex>
```

The `shouldGrow` property forces the Flex.Item to expand to fill in any available space.

```js
---
example: true
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small" shouldShrink shouldGrow>
    I am growing and shrinking!
  </Flex.Item>
  <Flex.Item>
    I am not shrinking or growing.
  </Flex.Item>
</Flex>
```

The `size` property sets the base size (accepts px, em, rem) for the Flex.Item. If the
`direction` property is `row`, this is the item's **width**. If `direction` is `column`,
then it is the item's **height**. Flex.Items can grow beyond their `size`, but cannot
shrink to less than their `size`.

```js
---
example: true
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small" size="200px">
    I am always 200px.
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink shouldGrow size="200px">
    I can grow, and shrink down to 200px.
  </Flex.Item>
  <Flex.Item padding="x-small" size="25%">
    I am always 25%.
  </Flex.Item>
</Flex>
```

### Aligning Flex.Items
By default, Flex aligns its Flex.Items along the `center` of the axis. Use the `alignItems`
property to change this behavior.

`alignItems` can be overridden on individual Flex.Items through Flex.Item's `align` property.

```js
---
example: true
---
<Flex alignItems="end" withVisualDebug>
  <Flex.Item>
    <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
  </Flex.Item>
  <Flex.Item shouldGrow shouldShrink>
    I should be aligned to the bottom of the Avatar.
  </Flex.Item>
  <Flex.Item>
    Me, too.
  </Flex.Item>
  <Flex.Item align="start">
    I am aligning myself to the top.
  </Flex.Item>
</Flex>
```

### Justifying Flex.Items
Use the `justifyItems` property to change the justification of Flex.Items.

```js
---
example: true
---
<div>
  <Flex justifyItems="center" margin="0 0 large" withVisualDebug>
    <Flex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </Flex.Item>
    <Flex.Item>
      We are all centered!
    </Flex.Item>
    <Flex.Item>
      Yeah!
    </Flex.Item>
  </Flex>

  <Flex justifyItems="space-between" withVisualDebug margin="0 0 large">
    <Flex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </Flex.Item>
    <Flex.Item>
      Ah, a little more space.
    </Flex.Item>
    <Flex.Item>
      Totally.
    </Flex.Item>
  </Flex>

  <Flex justifyItems="end" withVisualDebug>
    <Flex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </Flex.Item>
    <Flex.Item>
      Smooshed again.
    </Flex.Item>
    <Flex.Item>
      Ugh.
    </Flex.Item>
  </Flex>
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
<Flex
  withVisualDebug
  direction="column"
>
  <Flex.Item padding="small">
    <Heading>Pandas are cute, right?</Heading>
  </Flex.Item>
  <Flex.Item size="150px" padding="small">
    <Img src={avatarSquare} />
  </Flex.Item>
</Flex>
```

### A few common layouts

#### Heading and button combination

```js
---
example: true
---
<Flex>
  <Flex.Item shouldGrow shouldShrink padding="none medium none none">
    <Heading>Lorem ipsum dolor sit amet consectetur dolor sit</Heading>
  </Flex.Item>
  <Flex.Item>
    <Button margin="none x-small none none">
      Cancel
    </Button>
    <Button color="success" renderIcon={IconUserSolid}>
      Add user
    </Button>
  </Flex.Item>
</Flex>
```

#### Centered content (note the nested Flex components and use of the `wrap` property)

```js
---
example: true
---
<Flex height="32rem" justifyItems="center" padding="large" withVisualDebug>
  <Flex.Item shouldShrink shouldGrow textAlign="center">

    <Heading level="h1" margin="0 0 medium">An amazing thing!</Heading>

    <Flex withVisualDebug wrap="wrap" justifyItems="space-around" margin="0 0 medium">
      <Flex.Item padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </Flex.Item>
      <Flex.Item padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </Flex.Item>
      <Flex.Item padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </Flex.Item>
    </Flex>

    <div>
      <Button color="primary" size="large">Sign up now!</Button>
    </div>

  </Flex.Item>
</Flex>
```

#### Quick and dirty mobile app layout

```js
---
example: true
---

<Flex height="400px" width="300px" as="div" direction="column" withVisualDebug>

  <Flex.Item padding="small" as="header" textAlign="center">
    <Heading level="h3">App</Heading>
  </Flex.Item>

  <Flex.Item shouldGrow shouldShrink padding="small" as="main">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Flex.Item>

  <Flex.Item padding="small" as="footer">

    <Flex withVisualDebug justifyItems="space-between">
      <Flex.Item>
        <IconButton
          renderIcon={IconEmailLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
      <Flex.Item>
        <IconButton
          renderIcon={IconPrinterLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
      <Flex.Item>
        <IconButton
          renderIcon={IconCalendarDayLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
      <Flex.Item>
        <IconButton
          renderIcon={IconSettingsLine}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
    </Flex>

  </Flex.Item>
</Flex>
```
