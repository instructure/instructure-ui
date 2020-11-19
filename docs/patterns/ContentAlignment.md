---
title: Content Alignment
category: Patterns
id: ContentAlignment
---

## Content Alignment

- Main content area should center between any sidebar content.
- Maximum width of `59.25rem` (948px) for main content area to help with readability.
- Minimum width of `20rem` (320px) for main content. The minimum width corresponds to a desktop browser window set to a width of 1280px and zoomed in at 400%.
- Padding for content displaying above 480px should be 24px which aligns with the View component setting the padding prop to `medium`.
- Padding for content displaying below 480px should be 12px which aligns with the View padding prop set to `small`.
- Main content cannot have two-dimensional scrolling at 320px. If the page reads horizontally, then the content can only scroll vertically and vice versa.
- Exceptions to the maximum width rule are permitted when the content has a two-dimensional relationship (meaning if the content were to reflow it would lose context). Examples: complex data tables, calendars, and file browsing.

> Note that the limitations of the content area within our documentation do not allow for the example to render using the actual values noted above. However, the example does illustrate the correct concept of how the content should align within the parent container as the browser width grows and shrinks.

### Illustrated Example

```javascript
---
embed: true
theme: 'canvas'
---
<View as="div" minHeight="31.25rem" minWidth="16.66rem">
  <Flex alignItems="stretch">
    <FlexItem>
      <View as="div" width="3.375rem" height="100%" background="primary-inverse">
        <ScreenReaderContent>Area to simulate navigation</ScreenReaderContent>
      </View>
    </FlexItem>
    <FlexItem shouldGrow>
      <View as="div" minHeight="100%" withVisualDebug>
        <View as="div" height="3.75rem" borderWidth="small" padding="small">
          <Text>Breadcrumb Placeholder</Text>
        </View>
        <View as="div" maxWidth="39.5rem" minWidth="13.33rem" overflowY="auto" padding="medium" margin="0 auto" borderWidth="medium" borderColor="danger">
          <Heading>Main Content Area</Heading>
          <Text as="p">Let's assume this container is set to a max width specified above.</Text>
          <Text as="p">As the browser width grows the main content area centers within the allowed space.</Text>
          <Text as="p">As the browser width shrinks the content area maintains the specified padding and doesn't collapse below the minimum width set.</Text>
        </View>
      </View>
    </FlexItem>
  </Flex>
</View>
```
