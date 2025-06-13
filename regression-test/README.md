# Regression testing app

This is a simple Next.js app importing (locally) @instructure/ui. This allows us to test a couple of different things:

- With Cypress and Chromatic we can detect visual changes in our components (e.g. the `<Button/>` component got a larger padding)
- With Cypress and axe-core we can detect a11y issues (e.g. the `<Button/>` component is missing an `aria-label`)

## Development

### To run this app and cypress tests locally

1. Run `npm install` and `npm run bootstrap` from the project root.
2. Then open the regression test folder: `cd regression-test`
3. Run the dev server with `npm run dev`
4. The dev server will be accessible at `localhost:3000`
5. Once the dev server is running you can start the Cypress e2e tests with the `npm run cypress` command

### To add a new component

1. Create a new subfolder under `src/app` with the name of your new component and add an empty `page.tsx` file. E.g. if you want to create a page for `<Avatar/>`, create the page at `instructure-ui/regression-test/src/app/avatar/page.tsx`
2. Add some examples for your component that are meaningfully different. This usually means setting some props like `disabled` or `renderLabel`. Your goal is to make a page that can be screenshotted by Chromatic and if an unexpected change happens in that component, the screenshot will have a pixel difference.
3. After you have created an example page for the component, navigate to `instructure-ui/regression-test/cypress/e2e/spec.cy.ts` and add a new test block like this:

```typescript
it('check MyComponent', () => {
  cy.visit('http://localhost:3000/my-component')
  cy.injectAxe()
  cy.checkA11y(undefined, undefined, terminalLog)
})
```

4. This should be it. Commit your changes and push it to remote. The CI tool should now include your new component in the Chromatic tests and also run Axe a11y checks on it.
