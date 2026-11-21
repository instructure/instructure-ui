# StepItem



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| StepItem | step | `{ /** * The name of the step, always visible. */ title: string /** * Where the step is in the flow; at most one step can be `current`. */ state: StepperStepState /** * Supporting detail under the title; on an error step it is the error text. */ description?: string }` | Yes | - | The data of the step. |
| StepItem | orientation | `NonNullable<StepperProps['orientation']>` | Yes | - | Whether the steps are laid out in a row or a column. |
| StepItem | prefix | `string` | Yes | - | The visually hidden text read before the step, chosen by its state. |
| StepItem | countLabel | `string` | Yes | - | The position text of the step, for example `Step 2 of 7`. |
| StepItem | showStepCount | `boolean` | Yes | - | Whether the position text is visible. |
| StepItem | showDetails | `boolean` | Yes | - | Whether the description is visible on steps that aren't in error. |

### Usage

Install the package:

```shell
npm install @instructure/ui-stepper
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { StepItem } from '@instructure/ui-stepper/v11_7'
```

