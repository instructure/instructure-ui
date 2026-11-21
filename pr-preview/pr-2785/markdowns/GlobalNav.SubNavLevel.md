# SubNavLevel



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SubNavLevel | subNav | `GlobalNavSubNavWithItems \| GlobalNavSubNavWithContent` | Yes | - | The data of the level. |
| SubNavLevel | titleId | `string` | Yes | - | The id of the title. |
| SubNavLevel | closeSubNavLabel | `string` | Yes | - | Screen reader text and tooltip of the close handle. |
| SubNavLevel | onClose | `(event: SyntheticEvent) => void` | Yes | - | Called when the user clicks the close handle. |
| SubNavLevel | back | `{ title: string label: string onClick: (event: SyntheticEvent) => void }` | No | - | The back button of a deeper level: the title of the level it returns to, its screen reader text and its click handler. |
| SubNavLevel | onDrillIn | `( event: MouseEvent<HTMLElement>, item: GlobalNavSubNavItem ) => void` | No | - | Called when the user activates an item with a `subNav`. |
| SubNavLevel | focusIntentRef | `MutableRefObject<FocusIntent \| undefined>` | Yes | - | The focus move that the user asked for, shared with GlobalNav. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SubNavLevel } from '@instructure/ui-global-nav/v11_7'
```

