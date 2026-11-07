# SubNav



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SubNav | subNav | `GlobalNavSubNavWithItems \| GlobalNavSubNavWithContent` | Yes | - | The data of the top level. |
| SubNav | subNavId | `string` | Yes | - | The id of the panel, which the rail item points to with `aria-controls`. |
| SubNav | titleId | `string` | Yes | - | The id of the title, which names the panel. |
| SubNav | closeSubNavLabel | `string` | Yes | - | Screen reader text and tooltip of the close handle. |
| SubNav | backLabel | `(parentTitle: string) => string` | Yes | - | Screen reader text of the back button, from the title of the level it returns to. |
| SubNav | onClose | `(event: SyntheticEvent) => void` | Yes | - | Called when the user clicks the close handle. |
| SubNav | focusIntentRef | `MutableRefObject<FocusIntent \| undefined>` | Yes | - | The focus move that the user asked for, shared with GlobalNav. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SubNav } from '@instructure/ui-global-nav/v11_7'
```

