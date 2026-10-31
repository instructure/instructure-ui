# CollapseButton



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| CollapseButton | collapsed | `boolean` | Yes | - | Whether the rail is collapsed. |
| CollapseButton | collapseLabel | `string` | Yes | - | Screen reader text and tooltip when the rail is expanded. |
| CollapseButton | expandLabel | `string` | Yes | - | Screen reader text and tooltip when the rail is collapsed. |
| CollapseButton | onCollapse | `(event: SyntheticEvent, collapsed: boolean) => void` | Yes | - | Called when the user clicks the button, with the new `collapsed` value. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { CollapseButton } from '@instructure/ui-global-nav/v11_7'
```

