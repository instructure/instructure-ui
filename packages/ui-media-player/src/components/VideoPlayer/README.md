---
describes: VideoPlayer
---

With a single source:
```js
---
example: true
---
var src = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";

<VideoPlayer sources={src} />
```

With multiple sources and labels:
```js
---
example: true
---
var sources = [
  {
    src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    label: '1080p'
  },
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    label: '360p',
    defaultSelected: true
  }
];

<VideoPlayer sources={sources} />
```

With multiple sources (no labels):
```js
---
example: true
---
var sources = [
  'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
];

<VideoPlayer sources={sources} />
```