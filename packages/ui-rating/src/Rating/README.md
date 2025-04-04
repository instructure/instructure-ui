---
describes: Rating
---

Rating takes the `valueNow` and `valueMax` props and
outputs a 3- or 5-star rating. Decimals are rounded to the nearest
whole number.

### 3- or 5-star ratings

Rating defaults to a 3-star rating system. Use `iconCount` to switch
to a 5-star system. Note how you can use the `formatValueText` prop to
create readable text for screenreaders that will be outputted in the
`aria-valuetext` attribute.

Note how the second example below has filled stars that animate in. Toggle
this feature using the `animateFill` prop.

```js
---
type: example
---
<Flex gap="large">
  <Flex gap="x-small">
    <Rating
      formatValueText={function (currentRating, maxRating) {
        return currentRating + ' out of ' + maxRating
      }}
      label="Overall rating of freshman year experience"
      valueNow={68.45}
      valueMax={100}
    />
    <div>2/3</div>
  </Flex>
  <Flex gap="x-small">
    <Rating
      animateFill
      formatValueText={function (currentRating, maxRating) {
        return currentRating + ' out of ' + maxRating
      }}
      label="Overall rating of freshman year experience"
      iconCount={5}
      valueNow={68.45}
      valueMax={100}
    />
    <div>3/5</div>
  </Flex>
</Flex>
```

### Sizes

Choose from `small`, `medium`, or `large`. The `margin` prop has been added to add
space around the actual rating.

```js
---
type: example
---
<Flex gap="large">
  <Flex>
    <Rating
      label="Product rating"
      size="small"
      iconCount={5}
      valueNow={3.76}
      valueMax={5}
      margin="small"/>
    <div>4/5</div>
  </Flex>
  <Flex>
    <Rating
      label="Overall rating of college experience"
      iconCount={5}
      valueNow={30}
      valueMax={100}
      margin="small"
    />
    <div>2/5</div>
  </Flex>
  <Flex>
    <Rating
      animateFill
      label="Rating of professor"
      size="large"
      iconCount={5}
      valueNow={8}
      valueMax={8}
      margin="small"/>
    <div>5/5</div>
  </Flex>
</Flex>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Display a textual value for the rating to meet WCAG 2.1 Use of Color standards. "Non-text information within controls that uses a change of hue alone to convey the value or state of an input, such as a 1-5 star indicator where state depends on whether it's filled or empty is likely to fail the Use of color criterion"</Figure.Item>
  </Figure>
</Guidelines>
```
