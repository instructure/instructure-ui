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
example: true
---
<div>
  <Rating
    formatValueText={function (currentRating, maxRating) {
      return currentRating + ' out of ' + maxRating
    }}
    label="Overall rating of freshman year experience"
    valueNow={68.45}
    valueMax={100}
  />
  <br />
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
</div>
```

### Sizes

Choose from `small`, `medium`, or `large`. The `margin` prop has been added to add
space around the actual rating.

```js
---
example: true
---
<div>
  <Rating
    label="Product rating"
    size="small"
    iconCount={5}
    valueNow={3.76}
    valueMax={5}
    margin="x-small medium xx-small none"
  />
  <Rating
    label="Overall rating of college experience"
    iconCount={5}
    valueNow={30}
    valueMax={100}
    margin="x-small xx-large"
  />
  <Rating
    animateFill
    label="Rating of professor"
    size="large"
    iconCount={5}
    valueNow={8}
    valueMax={8}
    margin="medium"
  />
</div>
```
