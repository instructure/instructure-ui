---
describes: DeprecatedTruncateText
id: DeprecatedTruncateText__README
---

**DEPRECATED:** TruncateText will be removed from `ui-elements` in version 7.0.0. Use the [TruncateText](#TruncateText) from [ui-truncate-text](#ui-truncate-text) instead. Codemods are available to automatically update imports to the new package.
***

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
      <DeprecatedTruncateText>
        {lorem.paragraph()}
      </DeprecatedTruncateText>
    </Heading>
    <Text
      as="p"
      weight="bold"
      size="large"
      transform="uppercase"
      letterSpacing="expanded"
    >
      <DeprecatedTruncateText>
        {lorem.paragraph()}
      </DeprecatedTruncateText>
    </Text>
    <Text as="p">
      <DeprecatedTruncateText>
        {lorem.paragraph()}
      </DeprecatedTruncateText>
    </Text>

    <div>
      <DeprecatedTruncateText
        onUpdate={(truncated, text) => {
          console.log(truncated, text)
        }}
      >
        <span>
          Regular sized text with <Link href="#">A Text Link </Link>and <Text weight="bold">some bold text.</Text>
        </span>
      </DeprecatedTruncateText>
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
      <DeprecatedTruncateText
        maxLines={2}
        truncate="word"
        ellipsis=" (...)"
      >
        {lorem.paragraph()}
      </DeprecatedTruncateText>
      <Link href="#">Read More</Link>
    </Text>

    <Text as="p" lineHeight="double">
      <DeprecatedTruncateText
        maxLines={4}
        truncate="word"
        ellipsis=" (...)"
      >
        Esse aliqua minim veniam duis consectetur non sunt ea deserunt qui cillum laboris officia. Minim nulla commodo dolore reprehenderit commodo occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt.
      </DeprecatedTruncateText>
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
      <DeprecatedTruncateText maxLines={4} ellipsis=" (...)">
        <span>Esse aliqua minim veniam duis consectetur non sunt ea deserunt qui cillum laboris officia. <Link href="#">http://instructure.github.io/instructure-ui/#ui-elements</Link> occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt.</span>
      </DeprecatedTruncateText>
    </Text>

    <Text as="p">
      <DeprecatedTruncateText maxLines={4} ellipsis=" (...)">
        <span>Qui cillum laboris officia. <strong>supercalifragilisticexpialidocious</strong> occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt. Esse aliqua minim veniam duis consectetur non sunt ea deserunt.</span>
      </DeprecatedTruncateText>
    </Text>
  </View>
  <br />
  <div style={{height: '78px', border: 'solid 1px red'}}>
    <Text>
      <DeprecatedTruncateText maxLines="auto" ellipsis=" (...)">
        Esse aliqua minim veniam duis consectetur non sunt ea deserunt qui cillum laboris officia. Minim nulla commodo dolore reprehenderit commodo occaecat veniam ad consectetur mollit consectetur partur consectetur eiusmod dolor incididunt incididunt.
      </DeprecatedTruncateText>
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
    <DeprecatedTruncateText position="middle">
      <span>This line of text should be truncated from the middle of the string <strong>instead of the end.</strong></span>
    </DeprecatedTruncateText>
  </View>
  <br />
  <View
    as="div"
    padding="small none"
    maxWidth="480px"
    withVisualDebug
  >
    <Link href="#">
      <DeprecatedTruncateText
        position="middle"
        truncate="word"
        ellipsis=".../"
      >
        @instructure/ui-elements/somefakedir/tomakethislonger/lib/longer/TruncateText
      </DeprecatedTruncateText>
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
        <DeprecatedTruncateText onUpdate={this.handleUpdate}>
          {this.props.message}
        </DeprecatedTruncateText>
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
            renderTip={this.props.message}
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
