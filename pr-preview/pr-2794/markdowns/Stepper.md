# Stepper


`Stepper` shows where the user is in a multi-step flow: the name and the state of every step. It reports progress and never advances it: the steps are not interactive, so the page keeps its own controls for moving on. Every text, including what screen readers hear, comes from props.

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed', description: 'Uploaded 19 August' },
  { title: 'Map columns', state: 'current', description: 'Match columns to fields' },
  { title: 'Review', state: 'notStarted' },
  { title: 'Import', state: 'notStarted' }
]

render(
  <Stepper
    label="Course import progress"
    steps={steps}
    showStepCount
    stepCountLabel={(position, total) => `Step ${position} of ${total}`}
    screenReaderLabels={{
      completed: 'Completed:',
      current: 'Current step:',
      notStarted: 'Upcoming:',
      error: 'Error:',
      mobileToggle: 'step list'
    }}
  />
)
```

### Step states

Each step has a `state`. The icon shows it, and screen readers hear it as a prefix from `screenReaderLabels`, so color is never the only signal.

| `state`      | Icon          | Screen reader prefix            | Notes                                    |
| ------------ | ------------- | ------------------------------- | ---------------------------------------- |
| `completed`  | circle-check  | `screenReaderLabels.completed`  |                                          |
| `current`    | circle-dot    | `screenReaderLabels.current`    | The title is bold, `aria-current="step"` |
| `notStarted` | circle-dashed | `screenReaderLabels.notStarted` |                                          |
| `error`      | circle-alert  | `screenReaderLabels.error`      | The description is the error text        |

At most one step can be `current`. No current step is fine too, for example when the flow is finished or a step failed.

### Step count

`showStepCount` shows the position of each step, using the text that `stepCountLabel` returns. Screen readers always hear the position of the current step, whether it is visible or not, so `stepCountLabel` is required.

### Descriptions and errors

A step's `description` adds supporting detail under its title. `showDetails={false}` hides the descriptions, except on an error step: there the description is the error text, so it always shows.

The Stepper tells the user which step has a problem, not what went wrong or how to fix it. Show that in an [Alert](Alert) near the Stepper.

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed', description: 'Uploaded 19 August' },
  { title: 'Map columns', state: 'error', description: 'Two columns could not be matched' },
  { title: 'Review', state: 'notStarted', description: 'Check the imported data' },
  { title: 'Import', state: 'notStarted', description: 'Add the data to the course' }
]

render(
  <Stepper
    label="Course import progress"
    steps={steps}
    showDetails={false}
    stepCountLabel={(position, total) => `Step ${position} of ${total}`}
    screenReaderLabels={{
      completed: 'Completed:',
      current: 'Current step:',
      notStarted: 'Upcoming:',
      error: 'Error:',
      mobileToggle: 'step list'
    }}
  />
)
```

### Orientation

`orientation="vertical"` lays the steps out in a column. Both orientations render the same markup in the same order.

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed', description: 'Uploaded 19 August' },
  { title: 'Map columns', state: 'completed' },
  { title: 'Review', state: 'current', description: 'Check the imported data' },
  { title: 'Import', state: 'notStarted' }
]

render(
  <Stepper
    label="Course import progress"
    steps={steps}
    orientation="vertical"
    stepCountLabel={(position, total) => `Step ${position} of ${total}`}
    screenReaderLabels={{
      completed: 'Completed:',
      current: 'Current step:',
      notStarted: 'Upcoming:',
      error: 'Error:',
      mobileToggle: 'step list'
    }}
  />
)
```

### Narrow containers

A horizontal Stepper switches to a summary when its steps no longer fit side by side at their natural width. It measures its own content, so it doesn't depend on the viewport size. The summary bar shows the `label`, the title of the current step and its position, and the position is a button that shows and hides the list of steps. That button is the only control in the Stepper, and screen readers hear its text followed by `screenReaderLabels.mobileToggle`. The bar always shows the `label`, even when `showLabel` is `false`. The vertical orientation and the compact layout never switch.

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed', description: 'Uploaded 19 August' },
  { title: 'Map columns', state: 'current', description: 'Match columns to fields' },
  { title: 'Review', state: 'notStarted' },
  { title: 'Import', state: 'notStarted' }
]

render(
  <View as="div" maxWidth="20rem">
    <Stepper
      label="Course import progress"
      steps={steps}
      stepCountLabel={(position, total) => `Step ${position} of ${total}`}
      screenReaderLabels={{
        completed: 'Completed:',
        current: 'Current step:',
        notStarted: 'Upcoming:',
        error: 'Error:',
        mobileToggle: 'step list'
      }}
    />
  </View>
)
```

### Compact layout

`layout="compact"` answers only "where am I": it shows the position, the title of the current step and one segment per step. Use it where the default layout doesn't fit, for example in a modal or a narrow panel. It shows less information, so choose it on purpose; the Stepper never switches to it by itself.

The position is always visible in compact, and `showStepCount` and `orientation` don't apply. A failed step only turns its segment red, so pass `compactErrorLabel` to name it for screen readers, and show the problem in an [Alert](Alert).

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed' },
  { title: 'Map columns', state: 'completed' },
  { title: 'Review', state: 'current', description: 'Check the imported data' },
  { title: 'Import', state: 'notStarted' }
]

render(
  <Stepper
    label="Course import progress"
    steps={steps}
    layout="compact"
    stepCountLabel={(position, total) => `Step ${position} of ${total}`}
    compactErrorLabel={(position, title) => `Step ${position}, ${title}, needs attention`}
    screenReaderLabels={{
      completed: 'Completed:',
      current: 'Current step:',
      notStarted: 'Upcoming:',
      error: 'Error:',
      mobileToggle: 'step list'
    }}
  />
)
```

When a step fails, its segment turns red, and screen readers hear the `compactErrorLabel` text of each failed step before the position.

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed' },
  { title: 'Map columns', state: 'error' },
  { title: 'Review', state: 'current', description: 'Check the imported data' },
  { title: 'Import', state: 'notStarted' }
]

render(
  <Stepper
    label="Course import progress"
    steps={steps}
    layout="compact"
    stepCountLabel={(position, total) => `Step ${position} of ${total}`}
    compactErrorLabel={(position, title) => `Step ${position}, ${title}, needs attention`}
    screenReaderLabels={{
      completed: 'Completed:',
      current: 'Current step:',
      notStarted: 'Upcoming:',
      error: 'Error:',
      mobileToggle: 'step list'
    }}
  />
)
```

### Heading

The Stepper is a region named by its `label`, rendered as a heading. `showLabel={false}` hides the heading visually, but screen readers still use it to name the region. Set `headingLevel` to fit the heading structure of the page.

```js
---
type: example
---
const steps = [
  { title: 'Choose file', state: 'completed' },
  { title: 'Map columns', state: 'current' },
  { title: 'Review', state: 'notStarted' }
]

render(
  <Stepper
    label="Course import progress"
    showLabel={false}
    headingLevel="h3"
    steps={steps}
    stepCountLabel={(position, total) => `Step ${position} of ${total}`}
    screenReaderLabels={{
      completed: 'Completed:',
      current: 'Current step:',
      notStarted: 'Upcoming:',
      error: 'Error:',
      mobileToggle: 'step list'
    }}
  />
)
```

### Loading

While the steps load, wrap the Stepper in a [SkeletonLoader](SkeletonLoader) and pass `Stepper.Skeleton` as its `skeleton`. The placeholder is hidden from screen readers, and `SkeletonLoader` announces `loadingLabel` and `loadedLabel` in its own live region, so the Stepper itself is never inside one. Set `stepCount` to the number of steps that will load, and `orientation` and `margin` to the values of the Stepper.

```js
---
type: example
---
const Example = () => {
  const [isLoading, setIsLoading] = useState(true)
  const steps = [
    { title: 'Choose file', state: 'completed', description: 'Uploaded 19 August' },
    { title: 'Map columns', state: 'current', description: 'Match columns to fields' },
    { title: 'Review', state: 'notStarted' },
    { title: 'Import', state: 'notStarted' }
  ]

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
        loadingLabel="Loading the import progress"
        loadedLabel="Import progress loaded"
        skeleton={<Stepper.Skeleton stepCount={4} />}
      >
        <Stepper
          label="Course import progress"
          steps={steps}
          stepCountLabel={(position, total) => `Step ${position} of ${total}`}
          screenReaderLabels={{
            completed: 'Completed:',
            current: 'Current step:',
            notStarted: 'Upcoming:',
            error: 'Error:',
            mobileToggle: 'step list'
          }}
        />
      </SkeletonLoader>
    </div>
  )
}

render(<Example />)
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Give each step a title that describes its general theme, not the current screen</Figure.Item>
    <Figure.Item>Show what went wrong and how to fix it in an Alert near the Stepper</Figure.Item>
    <Figure.Item>Use the compact layout in modals and narrow panels</Figure.Item>
    <Figure.Item>Set <code>headingLevel</code> to fit the heading structure of the page</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use the Stepper to move between steps</Figure.Item>
    <Figure.Item>Mark more than one step as current</Figure.Item>
    <Figure.Item>Rely on the compact layout's red segment to explain an error</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Stepper | steps | `StepperStep[]` | Yes | - | The steps of the flow in order, each with a title, a state and an optional description. |
| Stepper | label | `string` | Yes | - | The name of the Stepper region, rendered as its heading. |
| Stepper | showLabel | `boolean` | No | `true` | Whether the heading is visible; when `false` it is visually hidden but still names the region. |
| Stepper | headingLevel | `'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | No | `'h2'` | The level of the heading, chosen to fit the heading structure of the page. |
| Stepper | layout | `'default' \| 'compact'` | No | `'default'` | `default` names every step with its state, `compact` names only the current step and shows every step as a segment. |
| Stepper | orientation | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Lays the steps of the default layout out in a row or a column without changing their order or markup. |
| Stepper | showStepCount | `boolean` | No | `false` | Whether each step shows its position in the default layout; the current step's position is always read to screen readers. |
| Stepper | showDetails | `boolean` | No | `true` | Whether the step descriptions are visible; the description of an error step is always visible. |
| Stepper | stepCountLabel | `(position: number, total: number) => string` | Yes | - | Returns the position text of a step, for example `(2, 7) => 'Step 2 of 7'`. |
| Stepper | compactErrorLabel | `(position: number, title: string) => string` | No | - | Returns the screen reader text that names a failed step in the compact layout, for example `(5, 'Verify records') => 'Step 5, Verify records, needs attention'`. |
| Stepper | screenReaderLabels | `{ /** * Read before a completed step, for example `Completed:`. */ completed: string /** * Read before the current step, for example `Current step:`. */ current: string /** * Read before a step that hasn't started, for example `Upcoming:`. */ notStarted: string /** * Read before a failed step, for example `Error:`. */ error: string /** * Read after the mobile toggle's visible text to name what it opens, for example `step list`. */ mobileToggle: string }` | Yes | - | Visually hidden texts: the state prefix read before each step and the suffix of the mobile toggle. |
| Stepper | margin | `Spacing` | No | - | Spacing around the Stepper as Spacing tokens in CSS shorthand, for example `general.spaceMd 0`. |
| Stepper.StepperSkeleton | stepCount | `number` | Yes | - | How many placeholder steps to show, ideally the number of steps that will load. |
| Stepper.StepperSkeleton | orientation | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Lays the placeholder steps out in a row or a column, like the Stepper that will load. |
| Stepper.StepperSkeleton | margin | `Spacing` | No | - | Spacing around the placeholder, the same as the `margin` of the Stepper that will load. |

### Usage

Install the package:

```shell
npm install @instructure/ui-stepper
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Stepper } from '@instructure/ui-stepper/v11_7'
```

