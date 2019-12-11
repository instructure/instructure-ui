---
describes: DeprecatedTable
id: DeprecatedTable__README
---

**DEPRECATED:** Table will be removed from `ui-elements` in version 7.0.0. Use the controlled-only [Table](#Table) from [ui-table](#ui-table) instead.
***

Note that the `caption` prop is required for accessibility. If you would
rather hide the caption, wrap it inside a
[ScreenReaderContent](#ScreenReaderContent) component.

```js
---
example: true
---
<DeprecatedTable
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
</DeprecatedTable>
```

### The `layout` property

The `layout` default, `auto`, lets the browser determine table column widths based on cell content.
`layout="fixed"` forces columns of equal width, regardless of content.

> If you are using [TruncateText](#TruncateText) (or CSS ellipsis) in your Table, you need to set the
> layout to `fixed`, or the text truncation will not work.

#### Table with fixed layout
```js
---
example: true
---
<DeprecatedTable
  caption={<ScreenReaderContent>Napster</ScreenReaderContent>}
  layout="fixed"
>
  <thead>
    <tr>
      <th scope="col">Band</th>
      <th scope="col">Song</th>
      <th scope="col">mp3 location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Led Zeppelin</td>
      <td>Stairway to Heaven</td>
      <td>
        <TruncateText
          truncate="word"
          position="middle"
          ellipsis="... /"
        >
          http://napster.com/files/rock/70s/led_zeppelin/albums/led_zeppelin_iv/stairway_to_heaven.mp3
        </TruncateText>
      </td>
    </tr>
  </tbody>
</DeprecatedTable>
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
<DeprecatedTable
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
</DeprecatedTable>
```

```js
---
example: true
---
<DeprecatedTable
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
</DeprecatedTable>
```
