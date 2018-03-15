---
category: Contributing/RFCs
id: AutoHeadingRFC
title: Heading as="auto"
---


## Heading Component

### Summary
This component allows developers to add a `Heading` that has an autocalculated  `as` prop based on how many `Heading`s exist above it.


### Use Cases
One use case for this component is inside of component libraries like the Quiz SDK, Quiz Interactions, Outcomes SDK, and others.  These libraries often have little to no knowledge of where their components are going to be placed inside of a consuming component tree.  One consumer might need a `Heading` to be an `h1` while another might need it to be an `h3` (or some other level).


### Other Implementations
A similar component was created by Jim Simon in a private repo at a previous employer and proved to be very useful.


### Functional Requirements and API
Given a `Heading` component with its `as` prop set to auto
When it is rendered
Then it will traverse up the DOM until it finds a `body` element or `undefined`
And it will use `h1` as the heading element

Given a `Heading` component with its `as` prop set to auto
When it is rendered
Then it will traverse up the DOM until it finds an ancestor node with a child node that is one of `<h1>`, `<h2>`, `<h3>`, `<h4>`, or `<h5>` (not including its own parent or itself)
And it will use `level of found heading + 1` as the heading element

Given a `Heading` component with its `as` prop set to auto
When it is rendered
Then it will traverse up the DOM until it finds an ancestor node with a child node that is an `<h6>` (not including its own parent or itself)
And it will raise a warning if React is in development mode
And it will use `h6` as the heading element (regardless of React's mode)

### Examples
Automatic `Heading` with no other `Heading`'s:
```javascript
<body>
  <Heading as="auto">This is an h1"</Heading>
</body>
```

Automatic `Heading`'s all the way down:
```javascript
<body>
  <Heading as="auto">This is an h1"</Heading>
  <p>
    <Heading as="auto">This is an h2"</Heading>
    <p>
      <Heading as="auto">This is an h3"</Heading>
      <p>
        <Heading as="auto">This is an h4"</Heading>
        <p>
          <Heading as="auto">This is an h5"</Heading>
          <p>
            <Heading as="auto">This is an h6"</Heading>
            <p>
              <Heading as="auto">This is an h6"</Heading> <!-- raises a warning in dev mode -->
            </p>
          </p>
        </p>
      </p>
    </p>
  </p>
</body>
```

Automatic `Heading`'s at the same tree level
```javascript
<body>
  <Heading as="auto">This is an h1"</Heading>
  <p>
    <Heading as="auto">This is an h2"</Heading>
    <Heading as="auto">This is an h2"</Heading>
    <Heading as="auto">This is an h2"</Heading>
  </p>
  <p>
    <Heading as="auto">This is an h2"</Heading>
    <Heading as="auto">This is an h2"</Heading>
    <Heading as="auto">This is an h2"</Heading>
  </p>
</body>
```

Automatic `Heading`'s under a normal `Heading`
```javascript
<body>
  <p>
    <Heading as="h3">This is an h3"</Heading>
    <p>
      <Heading as="auto">This is an h4"</Heading>
      <p>
        <Heading as="auto">This is an h5"</Heading>
      </p>
    </p>
  </p>
</body>
```


Automatic `Heading`'s under a normal `Heading` that only uses `level`
```javascript
<body>
  <p>
    <Heading level="h3">This is an h3"</Heading>
    <p>
      <Heading as="auto">This is an h4"</Heading>
      <p>
        <Heading as="auto">This is an h5"</Heading>
      </p>
    </p>
  </p>
</body>
```

### Properties
Add a new `auto` value for the `as` prop


### Dependencies
N/A


### Theme Variables
N/A


### Accessibility Requirements
No special requirements are necessary since this component is primarily implemented through `Heading`.


### Internationalization Requirements
N/A


### Other Things to Consider
It may be useful to split the currrent `Heading` implementation into two child components and use `Heading` as a facade over them.
