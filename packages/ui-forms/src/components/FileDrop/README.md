---
describes: FileDrop
---

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
  label={
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
  label={
    <Billboard
      heading="Upload your image"
      message="Drag and drop, or click to browse your computer"
      hero={<Img src={placeholderImage(1200, 300)} />}
      disabled
    />
  }
  disabled
/>
```


### Accept

The `accept` prop dictates what type of files are allowed. It can be an array or comma-separated string of
[MIME type formats](https://en.wikipedia.org/wiki/Media_type#Common_examples) and/or file extensions.

FileDrop accepts the same `messages` prop as the other Instructure UI input components for providing
form validation feedback. If there are `error` messages in the `messages` array, FileDrop's border
will turn the theme's `rejectedColor`.

```js
---
example: true
---
<Grid startAt="medium">
  <GridRow>
    <GridCol>

      <FileDrop
        accept=".jpg"
        onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
        onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
        messages={[{ text: 'Invalid file type', type: 'error' }]}
        label={
          <Billboard
            size="small"
            message="Only .jpg files"
            hero={<IconPlus />}
          />
        }
      />

    </GridCol>
    <GridCol>

      <FileDrop
        accept=".png"
        onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
        onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
        label={
          <Billboard
            size="small"
            message="Only .png files"
            hero={<IconPlus />}
          />
        }
      />

    </GridCol>
    <GridCol>

      <FileDrop
        accept="video/*"
        onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
        onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
        label={
          <Billboard
            size="small"
            message="All video file types"
            hero={<IconPlus />}
          />
        }
      />

    </GridCol>
  </GridRow>
</Grid>
```

### AllowMultiple

If the `allowMultiple` prop is set to `true`, FileDrop accepts multiple files.

```js
---
example: true
---
<Grid startAt="medium" vAlign="middle">
  <GridRow>
    <GridCol>

      <FileDrop
        allowMultiple={true}
        label={
          <Billboard
            size="small"
            heading="Upload your files"
            headingLevel="h3"
            message="Allow multiple files"
            hero={<IconPlus />}
          />
        }
      />

    </GridCol>
    <GridCol>

      <FileDrop
        label={
          <Billboard
            size="small"
            heading="Upload your file"
            message="Allow only one file"
            headingLevel="h3"
            hero={<IconPlus />}
          />
        }
      />

    </GridCol>
  </GridRow>
</Grid>
```
