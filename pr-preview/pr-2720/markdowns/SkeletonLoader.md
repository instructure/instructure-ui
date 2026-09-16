# SkeletonLoader

Wraps a loading region and owns everything a screen reader needs to know about
it. The skeleton shapes themselves are decorative; this is what announces.

Render **one of these per region**, not one per card or row — a page that
announces once per skeleton row is unusable.
@module SkeletonLoader
`SkeletonLoader` wraps a loading region and owns everything assistive technology
needs to know about it: the busy state, the polite announcement, and the error
interruption. The shapes themselves are decorative and announce nothing.

Render **one of these per region**, not one per card or row. A page that
announces once per skeleton row is unusable with a screen reader.

### Controlled

Pass `isLoading` when the wait is a data fetch and you know when it ends.

```js
---
type: example
---
class Example extends React.Component {
  state = { isLoading: true }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ isLoading: !this.state.isLoading })}
          margin="0 0 general.spaceMd 0"
        >
          Toggle
        </Button>
        <SkeletonLoader
          isLoading={this.state.isLoading}
          loadingLabel="Loading courses"
          loadedLabel="3 courses"
          skeleton={<SkeletonLoader.Shape shape="text" lines={3} />}
        >
          <List>
            <List.Item>Biology 101</List.Item>
            <List.Item>Chemistry 201</List.Item>
            <List.Item>Physics 301</List.Item>
          </List>
        </SkeletonLoader>
      </div>
    )
  }
}

render(<Example />)
```

#### When the request fails

Catch the failure, **clear `isLoading`**, and render your own error content as
children. The order matters: a skeleton still shimmering next to an error
message tells the user the page is working on it, which is the opposite of what
happened.

`SkeletonLoader` owns the announcement, not the error UI. It puts `errorLabel`
through `role="alert"` — the one case that should interrupt — and leaves the
message, the tone, and the retry affordance to you, because only the calling
code knows what failed and what the user can do about it.

Keep the failure in state rather than deriving it from a missing result. An
empty list and a failed request look identical from the outside and need
different copy — "No courses yet" is not "We couldn't load your courses."

```js
---
type: example
---
class Example extends React.Component {
  state = { isLoading: false, error: null, courses: [] }

  load = async ({ shouldFail }) => {
    this.setState({ isLoading: true, error: null })

    try {
      const courses = await new Promise((resolve, reject) =>
        setTimeout(
          () =>
            shouldFail
              ? reject(new Error('Network request failed'))
              : resolve(['Biology 101', 'Chemistry 201', 'Physics 301']),
          1200
        )
      )
      this.setState({ isLoading: false, courses })
    } catch (error) {
      // Stop the skeleton in the same update that records the failure, so the
      // two can never be on screen together.
      this.setState({ isLoading: false, error, courses: [] })
    }
  }

  render() {
    const { isLoading, error, courses } = this.state

    return (
      <div>
        <Button onClick={() => this.load({ shouldFail: false })} margin="0 general.spaceSm general.spaceMd 0">
          Load
        </Button>
        <Button color="danger" onClick={() => this.load({ shouldFail: true })} margin="0 0 general.spaceMd 0">
          Load and fail
        </Button>

        <SkeletonLoader
          isLoading={isLoading}
          isError={Boolean(error)}
          loadingLabel="Loading courses"
          loadedLabel={`${courses.length} courses`}
          errorLabel="Couldn't load courses."
          skeleton={<SkeletonLoader.Shape shape="text" lines={3} />}
        >
          {error ? (
            <Alert variant="error" margin="0">
              We couldn't load your courses.{' '}
              <Link onClick={() => this.load({ shouldFail: false })}>Try again</Link>
            </Alert>
          ) : (
            <List>
              {courses.map((course) => (
                <List.Item key={course}>{course}</List.Item>
              ))}
            </List>
          )}
        </SkeletonLoader>
      </div>
    )
  }
}

render(<Example />)
```

Setting `isError` clears the loading state even if you leave `isLoading` true,
so the two can never contradict each other in the markup. Clear it yourself
anyway — relying on the guard hides the intent from the next reader.

### Following hydration

Leave `isLoading` off and the skeleton renders on the server, stays through the
hydrating render, and gives way to the children once hydration commits. Use it
for content that cannot render correctly until it has a DOM.

The swap deliberately does **not** happen on the first client render. Checking
`typeof document !== 'undefined'` looks like it would work, but `document` is
already defined while React is hydrating, so the server and the first client
render would disagree and React would throw away the server HTML. The hydration
state comes from `useSyncExternalStore` instead, which React guarantees will
report the server value during hydration.

### Announcements

The live region ships empty and stays empty for the first 400ms, so a load that
resolves quickly is never announced — an announcement for a sub-second wait is
noise. Tune the delay with `announcementDelay`.

`loadingLabel` and `loadedLabel` are required and must be translated. Pass the
empty-state copy as `loadedLabel` when the result set is zero rather than adding
a fourth live region.

Errors go through `role="alert"`, the one case that should interrupt. See
[when the request fails](#SkeletonLoader) above for the surrounding pattern.

### What it does not do

Focus is never moved when the skeleton is replaced. On a passive page load the
user's focus is wherever they put it, and yanking it to freshly arrived content
is disorienting.

Empty and error _content_ are yours to render. This component routes the
branches and owns the announcements; it does not supply the copy or the retry
affordance.

## Shapes

`SkeletonLoader` owns the semantics; `SkeletonLoader.Shape` draws the pixels.
They are separate so that one announced region can hold several shapes — an
avatar beside a heading beside a thumbnail — without announcing three times.

`SkeletonLoader.Shape` draws one placeholder: a block of text rows, a media
rectangle, or an avatar circle. It is always decorative — `aria-hidden`, never
focusable, no text.

### Sizing without measuring

Everything is derived from CSS, never from the DOM. That is what lets a skeleton
be correct in the server response, before any JavaScript runs:

- **Text** sets `font-size` from the type ramp, then expresses the bar, the
  leading, and the block height in `em`. A block is exactly
  `lines × leading × size` tall.
- **Rectangles** use `aspect-ratio` by default, so the reserved box scales with
  whatever column it lands in — the same way an image that has not loaded yet
  should.
- **Circles** are square at their `diameter`.

Because the height is exact, swapping the skeleton for real content causes no
layout shift. A skeleton that is shorter than its content is worse than no
skeleton at all.

### Text

`size` is the font size of the text being replaced. `lines` controls how many
rows; the last one is shortened so a paragraph does not read as a solid block.

```js
---
type: example
---
<div>
  <SkeletonLoader.Shape shape="text" size="xl" />
  <br />
  <SkeletonLoader.Shape shape="text" size="md" lines={3} />
</div>
```

### Leading

Pick the ramp the replaced text actually uses. InstUI headings are `1.25` and
body copy is `1.5`; choosing the wrong one makes the block the wrong height and
shifts the layout on swap.

```js
---
type: example
---
<div>
  <SkeletonLoader.Shape shape="text" size="md" lines={3} leading="heading" />
  <br />
  <SkeletonLoader.Shape shape="text" size="md" lines={3} leading="text" />
</div>
```

### Shorthands

`SkeletonLoader.Text`, `SkeletonLoader.Circle` and `SkeletonLoader.Rectangle`
are the same component with `shape` pre-set, matching the primitive names in the
design spec. Every other prop behaves identically.

```js
---
type: example
---
<div>
  <SkeletonLoader.Text size="md" lines={2} animate={false} />
  <br />
  <SkeletonLoader.Circle diameter="2.5rem" animate={false} />
</div>
```

### Rectangles and circles

```js
---
type: example
---
<div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
  <SkeletonLoader.Shape shape="circle" diameter="3rem" />
  <div style={{ flex: 1 }}>
    <SkeletonLoader.Shape shape="rectangle" aspectRatio="16 / 9" />
  </div>
  <div style={{ flex: 1 }}>
    <SkeletonLoader.Shape shape="rectangle" height="6rem" />
  </div>
</div>
```

### Motion

A highlight sweeps from the leading edge toward the trailing one, and keeps
looping for as long as the skeleton is shown. The gradient is sized to twice the
shape's width, so the highlight stays the same size relative to whatever it sits
on — the same on a 32px avatar as on a 900px bar.

The loop is open-ended on purpose. A shimmer that stops while the request is
still in flight says the opposite of what it means: the page looks dead exactly
when the user most needs reassurance that it isn't.

**Motion respects `prefers-reduced-motion`,** and with an endless loop that is
load-bearing rather than a nicety — it is the mechanism by which a user stops
the motion, which is what WCAG 2.2.2 (Pause, Stop, Hide) asks for. The animation
is opted _in_ on `no-preference`, so a browser reporting no preference gets the
static version. Never move the animation outside that query.

**Resting is not flat.** Whenever the shape is not animating — before hydration,
under reduced motion, or with `animate={false}` — the highlight sits 30% across
the shape rather than parked off an edge, so it still reads as a shimmer caught
mid-sweep rather than a grey block.

Pass `animate={false}` to force that resting state regardless. Use it for
snapshot and visual regression tests, where a running animation makes diffs
unstable.

```js
---
type: example
---
<SkeletonLoader.Shape shape="text" size="lg" lines={2} animate={false} />
```

### Server rendering

The shapes are plain markup and their styles are ordinary Emotion rules, so
nothing here depends on client JavaScript. Emotion inlines those rules into the
server response, which means the skeleton paints correctly on first paint with
scripting disabled entirely.

Verified against the prerendered `regression-test` output: 22 shapes, every one
`aria-hidden`, with the gradient fill, the `aspect-ratio` boxes, the
`@keyframes`, and the `prefers-reduced-motion` guard all present in the HTML —
and no animation at all on the shapes rendered with `animate={false}`.


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SkeletonLoader | announcementDelay | `number` | No | - | How long to wait before announcing the loading state, in milliseconds. Sub-second loads should not announce at all. |
| SkeletonLoader | children | `ReactNode` | No | - |  |
| SkeletonLoader | elementRef | `(element: Element \| null) => void` | No | - |  |
| SkeletonLoader | errorLabel | `string` | No | - | Announced through `role="alert"` when `isError` is set. |
| SkeletonLoader | isError | `boolean` | No | - | Renders the error branch instead of the skeleton or the children. |
| SkeletonLoader | isLoading | `boolean` | No | - | Whether the region is loading. Leave it undefined to let the component follow hydration: it shows the skeleton on the server and through the hydrating render, then swaps to `children` once hydration commits. Pass a boolean to take control, which is what you want when the wait is a data fetch rather than hydration. |
| SkeletonLoader | loadedLabel | `string` | Yes | - | Announced once loading has finished. |
| SkeletonLoader | loadingLabel | `string` | Yes | - | Announced once loading has been running long enough to be worth mentioning. Required so it can be translated. |
| SkeletonLoader | skeleton | `ReactNode` | No | - | The skeleton to show while loading. If not provided, a default skeleton is shown. |
| SkeletonLoader.Shape | animate | `boolean` | No | - | Set to `false` to force a static shape regardless of the user's motion preference. Use it for snapshot and visual-regression tests, where a running animation makes diffs unstable. |
| SkeletonLoader.Shape | aspectRatio | `string` | No | - | Aspect ratio for `shape="rectangle"` when no `height` is given. |
| SkeletonLoader.Shape | diameter | `string \| number` | No | - | Diameter for `shape="circle"`. |
| SkeletonLoader.Shape | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying HTML element. |
| SkeletonLoader.Shape | height | `string \| number` | No | - | Fixed height for `shape="rectangle"`. Prefer `aspectRatio` for media, so the box scales with its column. Text height comes from `size`, not from this. |
| SkeletonLoader.Shape | leading | `'heading' \| 'text'` | No | - | Which line-height ramp the replaced text uses. InstUI headings are 1.25 and body text is 1.5; picking the wrong one shifts the layout on swap. |
| SkeletonLoader.Shape | lines | `number` | No | - | How many text rows to draw. The block height is exactly `lines x leading x size`, so it reserves the right space with no measurement. |
| SkeletonLoader.Shape | radius | `string` | No | - | Corner radius override for `shape="rectangle"`. |
| SkeletonLoader.Shape | shape | `'text' \| 'rectangle' \| 'circle'` | No | - | Which primitive to render. `text` draws one or more bars sized to a line of copy, `rectangle` reserves a media box, `circle` stands in for an avatar. |
| SkeletonLoader.Shape | size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | No | - | Step on the type ramp, used only by `shape="text"`. Sets the bar height to the font size of the text being replaced. |
| SkeletonLoader.Shape | width | `string \| number` | No | - | Width of the shape. Set it to the real content's width where that is known. |

### Usage

Install the package:

```shell
npm install @instructure/ui-skeleton
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SkeletonLoader } from '@instructure/ui-skeleton'
```

