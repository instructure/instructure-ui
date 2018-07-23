---
category: Getting Started/RFCs
id: ApplyDirectionRFC
title: ApplyDirection
---


## ApplyDirection Component

### Summary
Context provider for direction


### Use Cases
Will provide direction context for entire subtree of components that subscribe via @bidirectional


### Other Implementations
- [airbnb DirectionProvider](https://github.com/airbnb/react-with-direction/blob/master/src/DirectionProvider.jsx)


### Functional Requirements and API
We will take a similar approach here to `ApplyTheme`. 

We create the direction context by implementing the `getChildContext` method setting this.props.direction.
The render method simply returns the children via the `ensureSingleChild` function. 


### Examples
```javascript
<ApplyDirection>
  <Foo>
    hello world
  </Foo>
</ApplyDirection>

```

### Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| children | node | null | |
| direction | one of DIRECTION.ltr or DIRECTION.rtl | DIRECTION.ltr | |

### Dependencies
- ui-utils


### Theme Variables
n/a


### Accessibility Requirements
TBD


### Internationalization Requirements
Should work as designed :)


### Other Things to Consider
TBD
