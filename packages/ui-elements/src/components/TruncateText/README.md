---
describes: TruncateText
---

A component for truncating text content.

> For best results, avoid using TruncateText inside parent containers that are inline (`display: inline/inline-block`) or that default to inline display (span, link, etc.).

### Single line

```javascript
---
example: true
---

<div>
  <View
    as="div"
    padding="xx-small none"
    maxWidth="480px"
    debug
  >
    <Heading level="h1">
      <TruncateText>
        {lorem.paragraph()}
      </TruncateText>
    </Heading>
    <Text
      as="p"
      weight="bold"
      size="large"
      transform="uppercase"
      letterSpacing="expanded"
    >
      <TruncateText>
        {lorem.paragraph()}
      </TruncateText>
    </Text>
    <Text as="p">
      <TruncateText>
        {lorem.paragraph()}
      </TruncateText>
    </Text>

    <div>
      <TruncateText
        onUpdate={(truncated, text) => {
          console.log(truncated, text)
        }}
      >
        <span>
          Regular sized text with <Link href="#">A Text Link </Link>and <Text weight="bold">some bold text.</Text>
        </span>
      </TruncateText>
    </div>

  </View>
</div>
```

### Multiple lines

You can set the number of lines to display before truncation begins with the `maxLines` prop. Setting `maxLines` to `auto` will determine the number of lines that will fit.

```javascript
---
example: true
---
<div>
  <View
    as="div"
    padding="small none"
    maxWidth="480px"
    debug
  >
    <Text as="p" size="large">
      <TruncateText
        maxLines={2}
        truncate="word"
        ellipsis=" (...)"
      >
        {lorem.paragraph()}
      </TruncateText>
      <Link href="#">Read More</Link>
    </Text>

    <Text as="p" lineHeight="double">
      <TruncateText
        maxLines={4}
        truncate="word"
        ellipsis=" (...)"
      >
        Esse aliqua minim veniam duis consectetur non sunt ea deserunt qui cillum laboris officia. Minim nulla commodo dolore reprehenderit commodo occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt.
      </TruncateText>
      <Link href="#">Read More</Link>
    </Text>
  </View>
  <br />
  <View
    as="div"
    padding="small none"
    maxWidth="480px"
    debug
  >
    <Text as="p">
      <TruncateText maxLines={4} ellipsis=" (...)">
        <span>Esse aliqua minim veniam duis consectetur non sunt ea deserunt qui cillum laboris officia. <Link href="#">http://instructure.github.io/instructure-ui/#ui-elements</Link> occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt.</span>
      </TruncateText>
    </Text>

    <Text as="p">
      <TruncateText maxLines={4} ellipsis=" (...)">
        <span>Qui cillum laboris officia. <strong>supercalifragilisticexpialidocious</strong> occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt. Esse aliqua minim veniam duis consectetur non sunt ea deserunt.</span>
      </TruncateText>
    </Text>
  </View>
  <br />
  <div style={{height: '78px', border: 'solid 1px red'}}>
    <Text>
      <TruncateText maxLines="auto" ellipsis=" (...)">
        Esse aliqua minim veniam duis consectetur non sunt ea deserunt qui cillum laboris officia. Minim nulla commodo dolore reprehenderit commodo occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt.
      </TruncateText>
    </Text>
  </div>
</div>

```

### Truncate middle

You can set the position of the truncation using the `position` prop.

```javascript
---
example: true
---
<div>
  <View
    as="div"
    padding="small none"
    maxWidth="480px"
    debug
  >
    <TruncateText position="middle">
      <span>This line of text should be truncated from the middle of the string <strong>instead of the end.</strong></span>
    </TruncateText>
  </View>
  <br />
  <View
    as="div"
    padding="small none"
    maxWidth="480px"
    debug
  >
    <Link href="#">
      <TruncateText
        position="middle"
        truncate="word"
        ellipsis=".../"
      >
        @instructure/ui-elements/somefakedir/tomakethislonger/lib/components/TruncateText
      </TruncateText>
    </Link>
  </View>
</div>
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use a <Link href="/#Tooltip">Tooltip</Link> for all truncated items</FigureItem>
    <FigureItem>Use when trying to restrict the number of lines that are visible</FigureItem>
    <FigureItem>Use end ellipsis if the unique identifier is at the beginning of the string</FigureItem>
    <FigureItem>Use middle ellipsis if the unique identifier is at the end of the string</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use in <Link href="/#Button">Buttons</Link>, <Link href="/#Navigation">Nav Items</Link>, <Link href="/#TabList">TabLists</Link></FigureItem>
  </Figure>
</Guidelines>
```
