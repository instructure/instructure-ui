# Tab



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Tab | variant | `'default' \| 'secondary'` | No | `'default'` |  |
| Tab | id | `string` | Yes | - |  |
| Tab | index | `number` | Yes | - |  |
| Tab | controls | `string` | Yes | - |  |
| Tab | isDisabled | `boolean` | No | `false` |  |
| Tab | isSelected | `boolean` | No | `false` |  |
| Tab | onClick | `( event: React.MouseEvent<ViewOwnProps>, tabData: { index: number; id: string } ) => void` | No | - |  |
| Tab | onKeyDown | `( event: React.KeyboardEvent<ViewOwnProps>, tabData: { index: number; id: string } ) => void` | No | - |  |
| Tab | children | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| Tab | isOverflowScroll | `boolean` | No | - | Whether tabOverflow prop in Tabs is set to 'scroll'. |

### Usage

Install the package:

```shell
npm install @instructure/ui-tabs
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Tab } from '@instructure/ui-tabs'
```

