# RGBAInput



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| RGBAInput | disabled | `boolean` | No | - |  |
| RGBAInput | label | `string` | No | - |  |
| RGBAInput | width | `number` | Yes | - |  |
| RGBAInput | value | `RGBAType` | Yes | - |  |
| RGBAInput | onChange | `(rgba: RGBAType) => void` | Yes | - |  |
| RGBAInput | withAlpha | `boolean` | No | `false` |  |
| RGBAInput | rgbRedInputScreenReaderLabel | `string` | Yes | - |  |
| RGBAInput | rgbGreenInputScreenReaderLabel | `string` | Yes | - |  |
| RGBAInput | rgbBlueInputScreenReaderLabel | `string` | Yes | - |  |
| RGBAInput | rgbAlphaInputScreenReaderLabel | `string` | Yes | - |  |
| RGBAInput | elementRef | `(element: Element \| null) => void` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-color-picker
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { RGBAInput } from '@instructure/ui-color-picker'
```

