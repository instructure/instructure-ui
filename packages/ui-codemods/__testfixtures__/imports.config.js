module.exports = [
  {
    "pattern": "^instructure-ui/lib/components",
    "replace": "@instructure/ui-core/lib/components"
  },
  {
    "pattern": "^instructure-ui/lib/components/Typography",
    "replace": "@instructure/ui-core/lib/components/Text"
  },
  {
    "pattern": "^instructure-ui/lib/themes",
    "replace": "@instructure/ui-themes"
  },
  {
    oldPath: 'example/path/Foo',
    newPath: 'something/lib/Foo'
  },
  {
    oldPath: 'example/path/Alpha',
    newPath: 'something/lib/Alpha'
  },
  {
    oldPath: 'example/path/',
    newPath: 'something/else',
    modules: [
      'Bar',
      'Baz',
      'Qux'
    ]
  }
]
