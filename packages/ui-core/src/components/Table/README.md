---
describes: Table
---

Note that the `caption` prop is required for accessibility. If you would
rather hide the caption, wrap it inside a
[ScreenReaderContent](#ScreenReaderContent) component.

```js
---
example: true
---
<Table
  caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}
>
  <thead>
    <tr>
      <th scope="col">Band</th>
      <th scope="col">Best Album</th>
      <th scope="col">Best Song</th>
      <th scope="col">Record Label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Beach House</th>
      <td>Depression Cherry</td>
      <td>Zebra</td>
      <td>Sub Pop</td>
    </tr>
    <tr>
      <th scope="row">Pixies</th>
      <td>Surfer Rosa</td>
      <td>Debaser</td>
      <td>4AD</td>
    </tr>
    <tr>
      <th scope="row">Falco</th>
      <td>Falco III</td>
      <td>Rock Me Amadeus</td>
      <td>Capitol Europe</td>
    </tr>
  </tbody>
</Table>
```

### Table style variants

Use the `striped` prop to give the table row- or column-stripes. The `size`
prop changes the font-size and cell padding of the table. Turn on the `hover`
prop to get highlight the row the user is hovering over. Use the `margin`
prop to add space around the table.

```js
---
example: true
---
<Table
  caption="Some great records"
  size="large"
  hover
  striped="rows"
  margin="x-large none"
>
  <thead>
    <tr>
      <th scope="col">Band</th>
      <th scope="col">Best Album</th>
      <th scope="col">Best Song</th>
      <th scope="col">Record Label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Fleetwood Mac</th>
      <td>Rumors</td>
      <td>Songbird</td>
      <td>Island</td>
    </tr>
    <tr>
      <th scope="row">R.E.M.</th>
      <td>Dead Letter Office</td>
      <td>Hairshirt</td>
      <td>Warner Bros.</td>
    </tr>
    <tr>
      <th scope="row">Modest Mouse</th>
      <td>Lonesome Crowded West</td>
      <td>Doin&#39; the Cockroach</td>
      <td>Epic</td>
    </tr>
  </tbody>
</Table>
```

```js
---
example: true
---
<Table
  caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}
  size="small"
  striped="columns"
  margin="small none large none"
>
  <thead>
    <tr>
      <th scope="col">Band</th>
      <th scope="col">Best Album</th>
      <th scope="col">Best Song</th>
      <th scope="col">Record Label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Fleetwood Mac</th>
      <td>Rumors</td>
      <td>Songbird</td>
      <td>Island</td>
    </tr>
    <tr>
      <th scope="row">R.E.M.</th>
      <td>Dead Letter Office</td>
      <td>Hairshirt</td>
      <td>Warner Bros.</td>
    </tr>
    <tr>
      <th scope="row">Modest Mouse</th>
      <td>Lonesome Crowded West</td>
      <td>Doin&#39; the Cockroach</td>
      <td>Epic</td>
    </tr>
    <tr>
      <th scope="row">Supergrass</th>
      <td>I Should Coco</td>
      <td>Caught by the Fuzz</td>
      <td>Parlophone</td>
    </tr>
    <tr>
      <th scope="row">Guided by Voices</th>
      <td>Under the Bushes Under the Stars</td>
      <td>Don&#39;t Stop Now</td>
      <td>Matador</td>
    </tr>
  </tbody>
</Table>
```
