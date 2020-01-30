---
describes: Grid
---

### Create a basic column layout

Simply create a `<Grid>` with some `<Grid.Row>` and `Grid.Col` children, and
the component will evenly distribute its columns.

Note the `visualDebug` prop you can set if you're wondering
exactly where your Grid columns are.

```js
---
example: true
---
<div>
  <Grid visualDebug>
    <Grid.Row>
      <Grid.Col>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col>
        {lorem.paragraph()}
      </Grid.Col>
    </Grid.Row>
  </Grid>
  <p>
    {lorem.paragraph()}
  </p>
</div>
```

### Make the Grid stack until a certain breakpoint/screen width

Often you will want to stack your `<Grid.Col>`s until you reach a certain
screen width. To do this, use the `startAt` prop.

Reduce the screen width and see how the Grid below only displays its
columns inline after it hits the `large` breakpoint. Note that by
default, stacked columns have bottom margin for visual separation.

```js
---
example: true
---
<Grid startAt="large" visualDebug>
  <Grid.Row>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
  </Grid.Row>
</Grid>
```

### Control the width of each column

You can control the width of the `<Grid.Col>` columns for each
breakpoint with the `width` prop. Please note the following:

+ If you don't need complex responsive behavior, you can just set
  the width property to a single value for all breakpoints after
  and including the breakpoint set via the `startAt` prop. e.g.
  `<Grid.Col width={2}>`

+ The Grid is made up of **12 columns**. If the columns' total
  width exceeds 12, the layout will break.

+ In addition to accepting the numerical values `1, 2, 3 ... 12`,
  columns can also accept an `auto` value. This tells the column
  to expand to the width of its content. (See the final example Grid
  to see how this can be useful for right-aligning column content.)

+ The `startAt` prop setting supersedes any `<Grid.Col>` width props. For
  example, if you set `width={{small: 2}}` on a column, but the `startAt` prop
  on your `<Grid>` is set to `medium`, the `width={{small: 2}}` will be ignored.

```js
---
example: true
---
<Grid visualDebug>
  <Grid.Row>
    <Grid.Col width={{small: 4, medium: 6, large: 3, xLarge: 6}}>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col width={{small: 4, medium: 4, large: 3, xLarge: 5}}>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col width={{small: 4, medium: 2, large: 6, xLarge: 1}}>
      {lorem.paragraph()}
    </Grid.Col>
  </Grid.Row>
</Grid>
```

### Add space/gutter between columns and rows

By default there is uniform spacing between Grid columns and rows, use the `colSpacing` and
`rowSpacing` props, which accept `small`, `medium`, and `large` as values, you can change amount of spacing,
or remove it with `none`.

```js
---
example: true
---
<Grid colSpacing="large" rowSpacing="small" visualDebug>
  <Grid.Row>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
  </Grid.Row>
  <Grid.Row>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
    <Grid.Col>
      {lorem.paragraph()}
    </Grid.Col>
  </Grid.Row>
</Grid>
```

Another useful method for spacing out `<Grid.Col>` elements is to use the `hAlign`
prop together with set widths on the columns. `hAlign` accepts the following
values: `start`, `center`, `end`, `space-around`, and `space-between`.

#### `hAlign="space-between"`

```js
---
example: true
---
  <Grid hAlign="space-between" visualDebug>
    <Grid.Row>
      <Grid.Col width={2}>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col width={4}>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col width={2}>
        {lorem.paragraph()}
      </Grid.Col>
    </Grid.Row>
  </Grid>
```

#### `hAlign="space-around"`

```js
---
example: true
---
  <Grid hAlign="space-around" visualDebug>
    <Grid.Row>
      <Grid.Col width={2}>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col width={4}>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col width={2}>
        {lorem.paragraph()}
      </Grid.Col>
    </Grid.Row>
  </Grid>
```

### Vertically align your columns

Align your columns along the vertical axis with the `vAlign` prop. In the example
below the Grid is set to vertically center its columns.

```js
---
example: true
---
  <Grid vAlign="middle" visualDebug>
    <Grid.Row>
      <Grid.Col>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col>
        {lorem.paragraph()}
      </Grid.Col>
      <Grid.Col>
        {lorem.paragraph()}
      </Grid.Col>
    </Grid.Row>
  </Grid>
```

### Putting it all together

Let's use `<Grid>` to create a page header with a heading on the left side
and some action buttons on the right. In addition, let's say that on small
screens &#151; like smalls &#151; we want the header to stack the heading and
the buttons.

Use `startAt="medium"` to make the Grid only affect most tablets and above. To align
the buttons to the right, add `width="auto"` to their `<Grid.Col>`. This will
make the column only expand to fit the width of the buttons. Because the
`<Grid.Col>` containing the heading has no set width, it will expand by default
to take up all the width it can, pinning the columns containing the buttons
to the right.

```js
---
example: true
---
  <Grid startAt="medium" vAlign="middle" colSpacing="none">
    <Grid.Row>
      <Grid.Col>
        <Heading>I am a fairly lengthy heading for the page</Heading>
      </Grid.Col>
      <Grid.Col width="auto">
        <Button>Cancel</Button>
        &nbsp;
        <Button color="primary" renderIcon={IconAddSolid}>Widget</Button>
      </Grid.Col>
    </Grid.Row>
  </Grid>
```
