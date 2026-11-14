# MobileSteps



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| MobileSteps | label | `string` | Yes | - | The name of the Stepper region, rendered as the heading in the summary bar. |
| MobileSteps | headingId | `string` | Yes | - | The id of the heading, which names the region. |
| MobileSteps | headingLevel | `NonNullable<StepperProps['headingLevel']>` | Yes | - | The level of the heading. |
| MobileSteps | listId | `string` | Yes | - | The id of the step list, which the toggle controls. |
| MobileSteps | steps | `StepperStep[]` | Yes | - | The steps of the flow in order. |
| MobileSteps | stepCountLabel | `StepperProps['stepCountLabel']` | Yes | - | Returns the position text of the named step. |
| MobileSteps | toggleLabel | `string` | Yes | - | The visually hidden suffix of the toggle's name. |
| MobileSteps | themeOverride | `StepperProps['themeOverride']` | Yes | - | The theme override of the Stepper, which owns the mobile tokens. |
| MobileSteps | children | `ReactNode` | Yes | - | The step items of the list. |

### Usage

Install the package:

```shell
npm install @instructure/ui-stepper
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { MobileSteps } from '@instructure/ui-stepper/v11_7'
```

