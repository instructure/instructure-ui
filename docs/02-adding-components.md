Eventually we'll add a generator script to the cli, but for now follow these steps to add a component (e.g. MyComponent) to the library:

1. Run `cp -r templates/component lib/components/MyComponent`.
2. Replace `Foo` with `MyComponent` in all of the file names in `lib/components/MyComponent`.
3. Replace `Foo`, with `MyComponent` in all of the files in `lib/components/MyComponent`.
4. Add/Export `MyComponent` in `lib/index.js`.
5. Kill the server (if you had it running) and run `npm start`.
6. Visit `http://localhost:8080` in a browser. You should see your component listed in the docs.
7. Start making changes to your component source and watch them update in the browser automatically.
