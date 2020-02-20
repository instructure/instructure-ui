---
title: Content Alignment
category: Patterns
id: ContentAlignment
---

## Content Alignment
* Main content areas should center between any sidebar content.
* Main content area should have a maximum width of `59.25rem` (948px) to help with content readability.
* Main content area should have a minimum width of `20rem` (320px) before a horizontal scroll bar is enforced.
* Main content should contain spacing `padding: medium` (24px) around any other page elements.
* Exceptions to the maximum width of 948px are permitted when it is helpful to the user to utilize horizontal space on larger monitors. Examples: Data tables, Gradebook, Calendars, and File browsing. Note the same `padding: medium` should be used.

> Note that the limitations of the content area within our documentation do not allow for the example to render using the actual values noted above. However, the example does illustrate the correct concept of how the content should align within the parent container as the browser width grows and shrinks.

### Illustrated Example

```javascript
---
embed: true
---
<View as="div" minHeight="31.25rem" minWidth="16.66rem">
  <Flex alignItems="stretch">
    <Flex.Item>
      <View as="div" width="3.375rem" height="100%" background="primary-inverse">
        <ScreenReaderContent>Area to simulate navigation</ScreenReaderContent>
      </View>
    </Flex.Item>
    <Flex.Item shouldGrow>
      <View as="div" minHeight="100%" withVisualDebug>
        <View as="div" height="3.75rem" borderWidth="small" padding="small">
          <Text>Breadcrumb Placeholder</Text>
        </View>
        <View as="div" maxWidth="39.5rem" minWidth="13.33rem" overflowY="auto" padding="medium" margin="0 auto" borderWidth="medium" borderColor="danger">
          <Heading>Main Content Area</Heading>
          <Text as="p">Let's assume this container is set to a max width specified above.</Text>
          <Text as="p">As the browser width grows the main content area centers within the allowed space, always maintaining the specified/initial padding.</Text>
          <Text as="p">As the browser width shrinks the content area maintains the specified padding and doesn't collapse below the min width set.</Text>
        </View>
      </View>
    </Flex.Item>
  </Flex>
</View>
```
