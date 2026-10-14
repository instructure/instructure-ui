---
describes: SkeletonLoader
---

### Controlled

Set `isLoading` when you're waiting for data and know when it arrives.

```js
---
type: example
---
const Example = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      <Button
        onClick={() => setIsLoading(!isLoading)}
        margin="0 0 general.spaceMd 0"
      >
        Toggle
      </Button>
      <SkeletonLoader
        isLoading={isLoading}
        loadingLabel="Loading courses"
        loadedLabel="3 courses"
        skeleton={<SkeletonLoader.Text lines={3} />}
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

render(<Example />)
```

#### When the request fails

Set `isError` and `isLoading={false}`, and render your error message as
`children`. `SkeletonLoader` announces `errorLabel` to screen readers right
away, but the message, its wording, and any retry button are up to you.

Store the error in state instead of checking for an empty result. An empty list
and a failed request need different messages: "No courses yet" isn't the same as
"We couldn't load your courses."

```js
---
type: example
---
const Example = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState([])

  const load = async ({ shouldFail }) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await new Promise((resolve, reject) =>
        setTimeout(
          () =>
            shouldFail
              ? reject(new Error('Network request failed'))
              : resolve(['Biology 101', 'Chemistry 201', 'Physics 301']),
          1200
        )
      )
      setCourses(result)
    } catch (err) {
      setError(err)
      setCourses([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button
        onClick={() => load({ shouldFail: false })}
        margin="0 general.spaceSm general.spaceMd 0"
      >
        Load
      </Button>
      <Button
        color="danger"
        onClick={() => load({ shouldFail: true })}
        margin="0 0 general.spaceMd 0"
      >
        Load and fail
      </Button>

      <SkeletonLoader
        isLoading={isLoading}
        isError={Boolean(error)}
        loadingLabel="Loading courses"
        loadedLabel={`${courses.length} courses`}
        errorLabel="Couldn't load courses."
        skeleton={<SkeletonLoader.Text lines={3} />}
      >
        {error ? (
          <Alert variant="error" margin="0">
            We couldn't load your courses.{' '}
            <Link onClick={() => load({ shouldFail: false })}>Try again</Link>
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

render(<Example />)
```

If `isError` is set, the skeleton is hidden even when `isLoading` is still
`true`.

### Following hydration

If you don't set `isLoading`, the server renders the skeleton and `children`
replace it once the page has hydrated. Use this for content that can only
render in the browser.

### Announcements

`loadingLabel` is announced only if loading takes longer than
`announcementDelay` (400ms by default). `loadedLabel` is announced when loading
finishes. Both are required, so they can be translated. If there are no
results, put the empty message in `loadedLabel`.

`errorLabel` is announced right away with `role="alert"`.

Focus doesn't move when the content loads.

## Shapes

Build the `skeleton` from three shapes. All of them are hidden from screen
readers, so one `SkeletonLoader` can hold as many as you need and still
announce once.

- `SkeletonLoader.Text` for lines of text
- `SkeletonLoader.Rectangle` for images, video, and other media
- `SkeletonLoader.Circle` for avatars

Shapes are sized with CSS only, so they render at the right size in the server
HTML, before any JavaScript runs. When they match the size of the real content,
the page doesn't jump when it loads.

### Text

`size` is the font size of the text being replaced, and `lines` is the number
of lines. The last line is shorter so it reads as a paragraph.

```js
---
type: example
---
<div>
  <SkeletonLoader.Text size="xl" />
  <br />
  <SkeletonLoader.Text size="md" lines={3} />
</div>
```

### Line height

Set `lineHeight` to match the text you're replacing: `heading` (1.25) for
headings, or `text` (1.5) for body copy. If it doesn't match, the skeleton will
be a different height from the content and the page will jump when it loads.

```js
---
type: example
---
<div>
  <SkeletonLoader.Text size="md" lines={3} lineHeight="heading" />
  <br />
  <SkeletonLoader.Text size="md" lines={3} lineHeight="text" />
</div>
```

### Rectangle and Circle

A `Rectangle` uses `aspectRatio` by default (16 / 9), so it scales with the
width of its container. Set `height` for a fixed height instead. A `Circle` is
sized by its `diameter`.

```js
---
type: example
---
<div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
  <SkeletonLoader.Circle diameter="3rem" />
  <div style={{ flex: 1 }}>
    <SkeletonLoader.Rectangle aspectRatio="16 / 9" />
  </div>
  <div style={{ flex: 1 }}>
    <SkeletonLoader.Rectangle height="6rem" />
  </div>
</div>
```

### Animation

A highlight sweeps across each shape, from the start of the line to the end,
until the content loads.

The animation only runs when the user hasn't turned on reduced motion in their
system settings. Since it loops for as long as the content is loading, that
setting is how users stop it (WCAG 2.2.2, Pause, Stop, Hide).

When a shape isn't animating, the highlight stays partway across it, so it
still looks like a skeleton rather than a flat gray block.

Set `animate={false}` to turn the animation off, for example in snapshot and
visual regression tests.

```js
---
type: example
---
<SkeletonLoader.Text size="lg" lines={2} animate={false} />
```
