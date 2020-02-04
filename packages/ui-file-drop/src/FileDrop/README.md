---
describes: FileDrop
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      The <code>label</code> prop is deprecated. Use <code>renderLabel</code> instead.
    </Figure.Item>
    <Figure.Item>
      The <code>enablePreview</code>, <code>allowRepeatFileSelection</code>, and <code>allowMultiple</code> boolean props are deprecated. Use <code>shouldEnablePreview</code>, <code>shouldAllowRepeats</code>, and <code>shouldAllowMultiple</code>, respectively, instead.
    </Figure.Item>
  </Figure>
</Guidelines>
```

`FileDrop` is a consistent way to drag and drop, as well as browse your computer to upload a media file.

The `isDragAccepted` and `isDragRejected` props can be used to signal to the user if
the dragged files are going to be accepted or not (unfortunately, this only works as intended in Chrome
and Firefox).

```js
---
example: true
---
<FileDrop
  accept="image/*"
  onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
  onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
  renderLabel={
    <Billboard
      heading="Upload your image"
      message="Drag and drop, or click to browse your computer"
      hero={<Img src={placeholderImage(1200, 300)} />}
    />
  }
/>
```

A disabled FileDrop

```js
---
example: true
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
example: true
---
<div>
  <FileDrop
    accept=".png"
    onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
    onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
    renderLabel={
      <Billboard
        size="small"
        message="Only .png files"
        hero={<IconImageLine />}
      />
    }
    display="inline-block"
    width="12rem"
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
example: true
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
example: true
---
<FileDrop
  shouldAllowMultiple={true}
  onDropAccepted={(files) => {
    console.log(`Files accepted ${files.map((f) => f.name).join(',')}`)
  }}
  renderLabel={
    <Billboard
      size="small"
      heading="Upload your files"
      headingLevel="h3"
      message="Allow multiple files"
      hero={<IconFolderLine />}
    />
  }
/>
```
