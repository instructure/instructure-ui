---
describes: Stepper
---

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
