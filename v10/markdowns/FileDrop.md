# FileDrop


`FileDrop` is a consistent way to drag and drop, as well as browse your computer to upload a media file.

The `isDragAccepted` and `isDragRejected` props can be used to signal to the user if
the dragged files are going to be accepted or not (unfortunately, this only works as intended in Chrome
and Firefox).

```js
---
type: example
---
<FileDrop
  accept="image/*"
  onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
  onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
  renderLabel={
    <View as="div" padding="xx-large large" background="primary">
      <IconModuleLine size="large" />
      <Heading>Drop files here to add them to module</Heading>
      <Text color="brand">
        Drag and drop, or click to browse your computer
      </Text>
    </View>
  }
/>
```

A disabled FileDrop

```js
---
type: example
---
<FileDrop
  renderLabel={
    <Billboard
      heading="Upload your image"
      message="Drag and drop, or click to browse your computer"
      hero={<Img src={placeholderImage(1200, 300)} />}
    />
  }
  interaction="disabled"
/>
```

### Accept

The `accept` prop dictates what type of files are allowed. It can be an array or comma-separated string of
[MIME type formats](https://en.wikipedia.org/wiki/Media_type#Common_examples) and/or file extensions.

```js
---
type: example
---
<div>
  <FileDrop
    accept=".csv"
    onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
    onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
    renderLabel={
      <View  background="secondary" as="div" textAlign="center" padding="x-large large">
        <IconUploadSolid />
        <Text as="div" weight="bold">
          Upload document
        </Text>
        <Text>Drag and drop or <Text color="brand">browse your files</Text></Text>
        <Text size="small" as="div" lineHeight="double">A single CSV document</Text>
      </View>
    }
    display="inline-block"
    width="24rem"
    margin="x-small"
  />
  <FileDrop
    accept="video/*"
    onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
    onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
    renderLabel={
      <Billboard
        size="small"
        message="All video file types"
        hero={<IconVideoLine />}
      />
    }
    display="inline-block"
    width="12rem"
    margin="x-small"
  />
</div>
```

FileDrop accepts the same `messages` prop as the other Instructure UI input components for providing
form validation feedback. If there are `error` messages in the `messages` array, FileDrop's border
will turn the theme's `rejectedColor`.

```js
---
type: example
---
<FileDrop
  accept=".jpg"
  onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
  onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
  messages={[{ text: 'Invalid file type', type: 'error' }]}
  renderLabel={
    <Billboard
      size="small"
      message="Only .jpg files"
      hero={<IconImageLine />}
    />
  }
  maxWidth="15rem"
  margin="0 auto"
/>
```

### shouldAllowMultiple

If the `shouldAllowMultiple` prop is `true`, FileDrop accepts multiple files.

```js
---
type: example
---
<FileDrop
  shouldAllowMultiple={true}
  onDropAccepted={(files) => {
    console.log(`Files accepted ${files.map((f) => f.name).join(',')}`)
  }}
  renderLabel={
    <View as="div" textAlign="center" padding="large" margin="large 0 0 0">
      <IconAnnotateLine color="brand" size="large" />
      <Text as="div" color="brand">
        Drag and Drop or Click to Browser your Computer
      </Text>
    </View>
  }
  width="18rem"
  height="16rem"
  margin="x-small"
/>
```

### height Property

If the `height` property is set to `100%`, the FileDrop container will fill the available vertical space.

```js
---
type: example
---
<div style={{height: '30rem'}}>
  <FileDrop
    height="100%"
    renderLabel={
      <Flex direction="column" height="100%" alignItems="center" justifyItems="center">
        <Flex.Item padding="small">
          <IconPdfLine size="large" />
        </Flex.Item>
        <Flex.Item padding="small">
          <Text size="large">
            Drag and Drop or Click to Browser your Computer
          </Text>
        </Flex.Item>
        <Flex.Item padding="small">
          <Text color="secondary" size="small">
            Accepted File Type is PDF
          </Text>
        </Flex.Item>
      </Flex>
    }
  />
</div>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| FileDrop | id | `string` | No | - | The id of the input (to link it to its label for a11y) |
| FileDrop | renderLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | The content of FileDrop; can be a component or React node. Components receive `isDragAccepted` and `isDragRejected` as props. |
| FileDrop | accept | `string \| string[]` | No | - | The mime media type/s or file extension/s allowed to be dropped inside |
| FileDrop | messages | `FormMessage[]` | No | `[]` | object with shape: `{ text: PropTypes.node, type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only']) }` |
| FileDrop | onClick | `(e: React.MouseEvent) => void` | No | `function (_e: React.MouseEvent) {}` | Called when clicking on drop area to select files to upload |
| FileDrop | onDrop | `( accepted: ArrayLike<DataTransferItem \| File>, rejected: ArrayLike<DataTransferItem \| File>, e: React.DragEvent ) => void` | No | - | Called when dropping files or when file dialog window exits successfully |
| FileDrop | onDropAccepted | `( accepted: ArrayLike<DataTransferItem \| File>, e: React.DragEvent \| React.ChangeEvent ) => void` | No | - | Called when dropping allowed files |
| FileDrop | onDropRejected | `( rejected: ArrayLike<DataTransferItem \| File>, e: React.DragEvent \| React.ChangeEvent ) => void` | No | - | Called when dropping rejected files |
| FileDrop | onDragEnter | `(e: React.DragEvent) => void` | No | - | Called when dragging files and passing through FileDrop's content for the first time |
| FileDrop | onDragOver | `(e: React.DragEvent) => void` | No | - | Called when dragging files and passing through FileDrop's content |
| FileDrop | onDragLeave | `(e: React.DragEvent) => void` | No | - | Called when dragging files and leaving FileDrop's content |
| FileDrop | shouldEnablePreview | `boolean` | No | `false` | Flag to use window.URL.createObjectURL for each dropped file and pass it through file.preview |
| FileDrop | shouldAllowMultiple | `boolean` | No | `false` | Flag to allow multiple files to drop at once |
| FileDrop | shouldAllowRepeats | `boolean` | No | `true` | Flag to allow upload of the same file more than once |
| FileDrop | maxSize | `number` | No | `Infinity` | the maximum file size allowed |
| FileDrop | minSize | `number` | No | `0` | the minimum file size allowed |
| FileDrop | interaction | `'enabled' \| 'disabled' \| 'readonly'` | No | - | Specifies if interaction with the input is enabled, disabled, or readonly. |
| FileDrop | display | `'block' \| 'inline-block'` | No | `'block'` | Set the CSS `display` property on FileInput's outermost element |
| FileDrop | height | `string \| number` | No | - | Set the CSS `height` property on FileInput's outermost element |
| FileDrop | width | `string \| number` | No | - | Set the CSS `width` property on FileInput's outermost element |
| FileDrop | maxWidth | `string \| number` | No | - | Set the CSS `maxWidth` property on FileInput's outermost element |
| FileDrop | minWidth | `string \| number` | No | - | Set the CSS `minWidth` property on FileInput's outermost element |
| FileDrop | margin | `Spacing` | No | - | Valid values are 0, none, auto, xxx-small, xx-small, x-small, small, medium, large, x-large, xx-large. Apply these values via familiar CSS-like shorthand. For example: margin="small auto large". |
| FileDrop | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the actual input element |

### Usage

Install the package:

```shell
npm install @instructure/ui-file-drop
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { FileDrop } from '@instructure/ui-file-drop'
```

