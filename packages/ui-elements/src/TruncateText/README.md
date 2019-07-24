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
    withVisualDebug
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
    withVisualDebug
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
    withVisualDebug
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
    withVisualDebug
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
    withVisualDebug
  >
    <Link href="#">
      <TruncateText
        position="middle"
        truncate="word"
        ellipsis=".../"
      >
        @instructure/ui-elements/somefakedir/tomakethislonger/lib/longer/TruncateText
      </TruncateText>
    </Link>
  </View>
</div>
```

### Using tooltips

It's best practice to make the complete text of a truncated element available via a [Tooltip](#Tooltip).

```js
---
render: false
example: true
---
class Example extends React.Component {
  state = {
    isTruncated: false
  }

  handleUpdate = (isTruncated) => {
    if (this.state.isTruncated !== isTruncated) {
      this.setState({ isTruncated })
    }
  }

  renderLink () {
    return (
      <Link href="#">
        <TruncateText onUpdate={this.handleUpdate}>
          {this.props.message}
        </TruncateText>
      </Link>
    )
  }

  render () {
    return (
      <View
        as="div"
        padding="xx-small none"
        maxWidth="230px"
        withVisualDebug
      >
        {this.state.isTruncated ? (
          <Tooltip
            tip={this.props.message}
            mountNode={() => document.getElementById('main')}
          >
            { this.renderLink() }
          </Tooltip>
        ) : this.renderLink()}
      </View>
    )
  }
}

render(<Example message="A tooltip will display only when this text is truncated" />)
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use a <Link href="/#Tooltip">Tooltip</Link> for all truncated items</Figure.Item>
    <Figure.Item>Use when trying to restrict the number of lines that are visible</Figure.Item>
    <Figure.Item>Use end ellipsis if the unique identifier is at the beginning of the string</Figure.Item>
    <Figure.Item>Use middle ellipsis if the unique identifier is at the end of the string</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use in <Link href="/#Button">Buttons</Link>, <Link href="/#Navigation">Nav Items</Link>, <Link href="/#TabList">TabLists</Link></Figure.Item>
  </Figure>
</Guidelines>
```
