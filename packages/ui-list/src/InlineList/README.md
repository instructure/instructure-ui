---
describes: InlineList
---

An `InlineList` component displays the list horizontally.

```javascript
---
example: true
---
  <InlineList>
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Submitted</Link></InlineList.Item>
  </InlineList>

```

### Adding a delimiter

The `delimiter` prop lets you display a separator between Items in the List. The built-in delimeter options include ['none', 'pipe', 'slash', and 'arrow'].

```javascript
---
example: true
---
<div>
  <InlineList delimiter="none" margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">No Separator</Link></InlineList.Item>
  </InlineList>
  <InlineList delimiter="pipe" margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Pipe Separator</Link></InlineList.Item>
  </InlineList>
  <InlineList delimiter="slash" margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Slash Separator</Link></InlineList.Item>
  </InlineList>
  <InlineList delimiter="arrow" margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Arrow Separator</Link></InlineList.Item>
  </InlineList>
</div>
```

### Sizing

The `size` prop lets you adjust the font-size of the List. The predefined values are aligned with other components that use a 'size' prop for overall consistency within your application. The default is 'medium'.

```javascript
---
example: true
---
<div>
  <InlineList size="small" margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>Small Size</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Submitted</Link></InlineList.Item>
  </InlineList>
  <InlineList margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>Medium (default) Size</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Submitted</Link></InlineList.Item>
  </InlineList>
  <InlineList size="large" margin="large 0">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>Large Size</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Submitted</Link></InlineList.Item>
  </InlineList>
</div>
```

### Adding predefined space between each InlineList.Item

Use the `itemSpacing` prop to add space around your list’s items. To avoid unwanted excess space at the start/end of a List, the first and last InlineList.Item will not receive margin via the `itemSpacing` prop. 
> NOTE: itemSpacing has no affect on an InlineList.Item that has the  `delimiter` prop set to anything other than **none**.

```javascript
---
example: true
---
<div>
  <InlineList itemSpacing="xxx-small">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to xxx-small</Link></InlineList.Item>
  </InlineList>
  <InlineList itemSpacing="xx-small">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to xx-small</Link></InlineList.Item>
  </InlineList>
  <InlineList itemSpacing="x-small">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b>  Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to x-small</Link></InlineList.Item>
  </InlineList>
    <InlineList itemSpacing="small">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b>  Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to small</Link></InlineList.Item>
  </InlineList>
  <InlineList itemSpacing="medium">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b>  Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to medium</Link></InlineList.Item>
  </InlineList>
  <InlineList itemSpacing="large">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to large</Link></InlineList.Item>
  </InlineList>
    <InlineList itemSpacing="x-large">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to x-large</Link></InlineList.Item>
  </InlineList>
  <InlineList itemSpacing="xx-large">
    <InlineList.Item>{lorem.sentence()}</InlineList.Item>
    <InlineList.Item>10pts</InlineList.Item>
    <InlineList.Item><b>Due:</b> Oct 1, 2019</InlineList.Item>
    <InlineList.Item><Link href="#">Set to xx-large</Link></InlineList.Item>
  </InlineList>
</div>
```
