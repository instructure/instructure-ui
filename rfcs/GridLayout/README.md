---
category: Getting Started/RFCs
id: GridLayoutRFC
title: GridLayout
---


## GridLayout Component

### Summary
GridLayout is a CSS Grid-based replacement for the existing Grid component. It offers
more functionality and simpler API.

GridLayout should be tagged Experimental until IE11 support is dropped.

### Use Cases
GridLayout is intended for bi-directional layouts (rows and columns). However,
it can also be used for single-direction layouts, so it has some overlap with the
Flex component.


### Other Implementations
* [http://jxnblk.com/react-css-grid](http://jxnblk.com/react-css-grid)
* [https://github.com/dlmanning/react-css-grid-layout](https://github.com/dlmanning/react-css-grid-layout)


### Functional Requirements and API
Because they're layout components, GridLayout should share prop names with
Flex and View, where appropriate, to keep the user experience consistent. Shared props include
`height`, `width`, `visualDebug`, `alignItems`, and `justifyItems`.

CSS Grid is a really big spec and offers a few different ways of achieving identical
grid layouts. The challenge with this RFC is making the component as full-featured as
possible, without it becoming overwhelming to the point where it would just be
easier to write your own CSS.

Initially, thought it might be best to create three smaller components: GridClassic
(classic responsive column Grid a la Bootstrap), GridCard (for card layouts), and
GridCustom (for everything else). But there would be so much overlap between these
three that a single component ended up working better.


### Examples

#### Classic design grid (responsive, with equal columns)
```javascript
<GridLayout
  visualDebug
  cols="12"
  colMin="100px"
  gap='1rem 1.5rem'
>
  <GridLayoutItem
    as="header"
    colSpan="12"
  />
  <GridLayoutItem
    as="aside"
    colSpan="4"
  />
  <GridLayoutItem
    as="main"
    colSpan="8"
  />
  <GridLayoutItem
    as="footer"
    colSpan="12"
  />
</GridLayout>
```

#### Card layout (cards have default height and min/max width)
```javascript
<GridLayout
  visualDebug
  as="ul"
  cols="auto" // triggers grid auto-fit
  colMin="18rem"
  colMax="22rem"
  rowAuto="18rem"
  gap="1rem"
  justifyItems="space-between" // make cards fill full row
>
  <GridLayoutItem as="li" />
  <GridLayoutItem as="li" />
  <GridLayoutItem as="li" />
  etc.
</GridLayout>
```

#### Custom grid layout w/ 4 rows and 3 columns
```javascript
<GridLayout
  visualDebug
  width="900px"
  cols="300px grow 400px" // custom col and row templates (cols/rows do not repeat)
  rows="100px 200px 100px 200px"
>
  <GridLayoutItem
    rowSpan="4"
    as="nav"
  />
  <GridLayoutItem
    as="section"
    colSpan="3"
    rowSpan="2"
  />
  <GridLayoutItem
    as="section"
    colSpan="3"
    rowSpan="2"
  />
</GridLayout>
```

### GridLayout Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| children | CustomPropTypes.Children.oneOf | | Child should be GridLayoutItem |
| cols | oneOfType(number, string) | this.theme.cols | Default comes from theme, space delimited for custom templates |
| colMin | oneOfType(string, number) | | The smallest size a column can be |
| colMax | oneOfType(string, number) | | The largest size a column can be |
| colAuto | oneOfType(string, number) | | Sets auto size for column |
| rows | oneOfType(number, array) | | No theme default needed for row, space delimited for custom templates  |
| rowMin | oneOfType(string, number) | | The smallest size a row can be |
| rowMax | oneOfType(string, number) | | The largest size a row can be |
| rowAuto | oneOfType(string, number) | | Sets auto size for row |
| gap | string | | space between columns, rows (shorthand, space-delimited) |
| alignItems | oneOf(start, end, center, space-around, space-between, space-evenly, stretch) | stretch | aligns items on row axis |
| justifyItems | oneOf(start, end, center, space-around, space-between, space-evenly, stretch) | stretch | aligns items on column axis |
| height | string | | |
| width | string | | |
| visualDebug | boolean | false | passed down to `GridLayoutItem` |

### GridLayoutItem Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| children | CustomPropTypes.Children.oneOf | | Child should be GridLayoutItem |
| colSpan | number | | Maybe add a limit based on parent's `col` prop |
| rowSpan | number | | Maybe add a limit based on parent's `row` prop |
| alignSelf | oneOf(start, end, center, space-around, space-between, space-evenly, stretch) | | Allows grid item to align itself on the row axis independent of parent `alignItems` prop |
| justifySelf | oneOf(start, end, center, space-around, space-between, space-evenly, stretch) | | Allows grid item to justify itself on the column axis independent of parent `justifyItems` prop |
| visualDebug | boolean | false | inherits from `GridLayout` but can be overwritten |

### Theme Variables
`visualDebugColor`, `numCols`, `gap`, `fontFamily`

### Accessibility Requirements
Users should keep in mind that setting `colSpan` and `rowSpan` on GridLayoutItems does
not change the source order in the DOM.

### Internationalization Requirements
Need to investigate CSS Grid and RTL.

### Other Things to Consider
Have asked Albert C. to provide specs for Bridge grid, so we can make sure our
component addresses those.
