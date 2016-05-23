To debug your tests and component code in the browser:

1. Run `npm run test:watch`. This command should automatically open up the Chrome browser.
2. In Chrome click the 'Debug' button at the top of the page (you may have to scroll up).
3. Open the [Developer tools](https://developers.google.com/web/tools/chrome-devtools/debug/?hl=en) (`Command + Shift + C`).
3. Now you can add breakpoints in the test code or the component code to debug issues. (`Command + P` in the 'Sources' tab)

If you'd like to run the tests in a different browser (e.g. Firefox or Safari), you can run
`./bin/instui test --browsers=Firefox --debug`.

