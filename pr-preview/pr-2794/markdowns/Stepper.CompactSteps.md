# CompactSteps



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| CompactSteps | steps | `StepperStep[]` | Yes | - | The steps of the flow in order. |
| CompactSteps | showDetails | `boolean` | Yes | - | Whether the description of the named step is visible when it isn't in error. |
| CompactSteps | stepCountLabel | `StepperProps['stepCountLabel']` | Yes | - | Returns the position text of the named step. |
| CompactSteps | compactErrorLabel | `StepperProps['compactErrorLabel']` | Yes | - | Returns the screen reader text that names a failed step. |
| CompactSteps | themeOverride | `StepperProps['themeOverride']` | Yes | - | The theme override of the Stepper, which owns the compact tokens. |

### Usage

Install the package:

```shell
npm install @instructure/ui-stepper
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { CompactSteps } from '@instructure/ui-stepper/v11_7'
```

