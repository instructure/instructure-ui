---
describes: DeprecatedFileDrop
id: DeprecatedFileDrop__README
---

**DEPRECATED:** FileDrop will be removed from `ui-forms` in version 7.0.0. Use the [FileDrop](#FileDrop) from [ui-file-drop](#ui-file-drop) instead. Codemods will be available to automatically update imports to the new package.
***

```js
---
example: true
---
<DeprecatedFileDrop
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
<DeprecatedFileDrop
  label={
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

FileDrop accepts the same `messages` prop as the other Instructure UI input components for providing
form validation feedback. If there are `error` messages in the `messages` array, FileDrop's border
will turn the theme's `rejectedColor`.

```js
---
example: true
---
<Grid startAt="medium">
  <Grid.Row>
    <Grid.Col>

      <DeprecatedFileDrop
        accept=".jpg"
        onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
        onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
        messages={[{ text: 'Invalid file type', type: 'error' }]}
        label={
          <Billboard
            size="small"
            message="Only .jpg files"
            hero={<IconImageLine />}
          />
        }
      />

    </Grid.Col>
    <Grid.Col>

      <DeprecatedFileDrop
        accept=".png"
        onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
        onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
        label={
          <Billboard
            size="small"
            message="Only .png files"
            hero={<IconImageLine />}
          />
        }
      />

    </Grid.Col>
    <Grid.Col>

      <DeprecatedFileDrop
        accept="video/*"
        onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
        onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
        label={
          <Billboard
            size="small"
            message="All video file types"
            hero={<IconVideoLine />}
          />
        }
      />

    </Grid.Col>
  </Grid.Row>
</Grid>
```

### AllowMultiple

If the `allowMultiple` prop is set to `true`, FileDrop accepts multiple files.

```js
---
example: true
---
<Grid startAt="medium" vAlign="middle">
  <Grid.Row>
    <Grid.Col>

      <DeprecatedFileDrop
        allowMultiple={true}
        onDropAccepted={(files) => { console.log(`Files accepted ${files.map((f) => f.name).join(',')}`) }}
        label={
          <Billboard
            size="small"
            heading="Upload your files"
            headingLevel="h3"
            message="Allow multiple files"
            hero={<IconFolderLine />}
          />
        }
      />

    </Grid.Col>
    <Grid.Col>

      <DeprecatedFileDrop
        label={
          <Billboard
            size="small"
            heading="Upload your file"
            message="Allow only one file"
            headingLevel="h3"
            hero={<IconMsWordLine />}
          />
        }
      />

    </Grid.Col>
  </Grid.Row>
</Grid>
```
