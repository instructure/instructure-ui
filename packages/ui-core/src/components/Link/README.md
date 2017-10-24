---
describes: Link
---

A Link component

```js
---
example: true
---
<Link href="https://instructure.github.io/instructure-ui/">I am a link</Link>
```

```js
---
example: true
---
<Link>I am a button that looks like a link because I have no href prop</Link>
```

```js
---
example: true
inverse: true
---
<Link variant="inverse">I am an inverse link for use with dark backgrounds</Link>
```

### Adding margin

Use the `margin` prop to add space to the left or right of the Link. Because
Link displays `inline`, top and bottom margin will not work. If you need
to add margin to the top or bottom of Link, wrap it inside a `<Container />`.

```js
---
example: true
---
<Link href="https://instructure.github.io/instructure-ui/" margin="0 0 0 large">I am a link with left margin</Link>
```
