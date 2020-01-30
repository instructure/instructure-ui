---
describes: rfcs
title: Flex
id: FlexRFC
---

## Flex Component

### Summary
This component allows developers to create responsive multi-column layouts without needing to know flexbox.


### Use Cases
<!--
Ideally this section should include designs and examples provided by Product Design. If no comps are provided, describe
the use case in as much detail as possible.
-->

### Other Implementations
- https://www.npmjs.com/package/flexbox-react
- https://github.com/buildo/react-flexview
- https://350-layout--mineral-ui.netlify.com/components/flex/

### Functional Requirements and API
I benchmarked a couple of existing React flexbox components. FlexView is great and was really helpful re. props. It does everything with a single component. This seemed nicer and simpler at the outset, but made the API and docs harder to understand (for me anyway). The author has to basically explain how flexbox works so users of the component can understand how width and basis are different, for example: http://buildo.github.io/react-flexview/size/Width-Height-Flex-basis.html.

My hope would be that developers wouldn't need to understand what's happening under the hood to use the component, and a Flex > FlexItem API seems like a simpler, more readable API because you're not trying to add all the props to a single component.

```javascript
// Example with all the things
<Flex
  inline
  as="header"
  alignItems="center"
  justifyItems="space-between"
  wrap
  direction="row"
  height="15rem"
  width="90%"
>
  <FlexItem
    as="div"
    grow
    shrink
    size="12rem"
    align="start"
  >
    // stuff
  </FlexItem>
</Flex>
```

```javascript
// Header with heading and action button
<Flex
  as="header"
  margin="0 0 large"
>
  <FlexItem
    grow
    shrink
    padding="0 large 0 0"
  >
    <Heading>Courses</Heading>
  </FlexItem>
  <FlexItem>
    <Button>Add Course</Button>
  </FlexItem>
</Flex>
```

```javascript
// Center content on full-height landing page
<div style={{backgroundImage: 'url(cool.jpg)', height: '100%'}}
  <Flex
    height="100%"
    width="medium"
    alignItems="center"
    justifyItems="center"
  >
    <FlexItem as="div">
      <Text as="div" align="center">
        // content
      </Text>
    </FlexItem>
  </Flex>
</div>
```

```javascript
// Responsive layout: Main content and fixed-width sidebar
<Responsive
  query={{ small: { maxWidth: '30rem' }, large: { minWidth: '30rem' }}}
  props={{
    small: { direction: 'row' },
    large: { direction: 'column' }
  }}
  <Flex
    {...props}
    alignItems="stretch"
  >
    <FlexItem size="20rem">
      // sidebar content
    </FlexItem>
    <FlexItem grow shrink>
      // main content
    </FlexItem>
  </Flex>
</Responsive>
```

### Properties

#### Flex

| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| alignItems | oneOf: 'start', 'end', 'stretch', 'center' | 'start' | |
| justifyItems | oneOf: 'start', 'end', 'center', 'space-around', 'space-between' | 'start' | |
| wrap | bool | false | |
| inline | bool | false | sets display to flex-inline if true |
| direction | oneOf: 'row', 'column' | 'row' | sets 'flex-direction' |

Notes:

- The Flex component inherits all View component properties except for `display`. The `display` prop is set
based on the `inline` prop and will be either `flex` or `inline-flex`.

#### FlexItem

| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| grow | bool | false | should fill available space |
| shrink | bool | false | should shrink if needed |
| align | oneOf: 'center', 'start', 'end', 'stretch', 'auto' | 'auto' | overrides alignItems set by Flex parent if not 'auto' |
| height | oneOfType: string, number | 'auto' | sets either View prop height or flex-basis depending on direction |
| width | oneOfType: string, number | 'auto' | sets either View prop width or flex-basis depending on direction |

Notes:

- The FlexItem component inherits all View component properties but will override `width` and `height` if necessary.

### Dependencies
- ui-layout
- ui-themeable

### Theme Variables
TBD

### Accessibility Requirements
Would recommend omitting order to avoid the a11y issues with source order. It would also probably be rarely used. Same goes for flex-direction: row-reverse, column, and column-reverse?

### Internationalization Requirements
n/a

### Other Things to Consider
n/a
