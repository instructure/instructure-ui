---
category: Contributing/RFCs
id: TruncateTextRFC
title: TruncateText
---


## TruncateText Component

### Summary
Can be used to display long text strings without breaking the page layout.


### Use Cases
- Paragraph with read more link
- Label under icon
- Table headings
- Card heading
- Text has long url string
- Inside a button (would we use this internally in Button?)
- Breadcrumb links (would we use this internally in Breadcrumb?)


### Other Implementations
- https://github.com/ShinyChang/React-Text-Truncate
- https://github.com/FrDH/jQuery.dotdotdot

### Functional Requirements and API
- Should render the truncated text, while preserving the node structure passed to the `children` prop
- Should also make the truncated text available as a string whenever the text is updated
- Should calculate truncation while considering any child nodes and their respective font styles (fontSize, fontWeight, lineHeight, letterSpacing, textTransform)
- Should recalculate truncation whenever root element is resized
- Should account for `word-wrap: break-word` on root component to account for long words


### Examples

```javascript
// basic span
<TruncateText>Lorem ipsum dolor</TruncateText>
```

```javascript
// complex node
<TruncateText>
  <p className="testClass">
    Lorem ipsum is simply <Text weight="bold">dummy text </Text>of the printing and typesetting industry.
  </p>
</TruncateText>
```

```javascript
// callback
<TruncateText
  onUpdate={(truncated, text) => {
    console.log(truncated, text)
    // true, 'lorem ipsu...'
  }}
>
  Lorem ipsum dolor
</TruncateText>
```

```javascript
// paragraph with custom ellipsis
<Text as="p" size="large">
  <TruncateText maxLines={4} ellipsis="(...)">
    Lorem ipsum dolor
  </TruncateText>
</Text>
```

```javascript
// middle truncation
<TruncateText position="middle" truncate="word">
  Lorem ipsum dolor
</TruncateText>

```

```javascript
// button with tooltip
<Tooltip tip="Lorem ipsum dolor">
  <Button>
    <TruncateText>Lorem ipsum dolor</TruncateText>
  </Button>
</Tooltip>
```

### Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| children | node | | Required. A node to use as the content to truncate |
| maxLines | oneOfType: string, number | 1 | Number of lines to allow before truncating. 'auto' will determine number of lines that can fit |
| truncate | oneOf: 'character', 'word' | Add ellipsis after words or after any character |
| position | oneOf: 'end', 'middle' | 'end' | Where to place the ellipsis within the string |
| ellipsis | node | '\u2026' | A node to use as the ellipsis |
| ignore | arrayOf: string | [' ', '.', ','] | Characters to ignore/remove at truncated end of string |
| onUpdate | func | | Callback when truncated text has changed, provides a truncated boolean and the truncated string as arguments |


### Dependencies
Render props implementation:
- ui-themeable
- ui-utils


### Theme Variables
n/a


### Accessibility Requirements
- Screen readers need to have access to either Tooltip content or the full text (offscreen)
- For TruncateText with a Tooltip, to be KO accessible, text should be focusable


### Internationalization Requirements
- Ellipsis should be customizable


### Other Things to Consider
- Do we want to explicitly set `break-word` on the component root or should we provide a way to set `break-word` or `break-all`?
- If not providing a internal Tooltip, we will need to recommend standard usage of TruncateText for each use case
- We will need to deprecate ellipsis props in other components and use this instead
